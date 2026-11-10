import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { activityEmitter } from "@/lib/activityEvents";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export interface DiscordPresenceData {
  appName: string;
  workspace: string;
  details: string;
  fileName: string;
  extension: string;
  language: string;
  startTime: number;
  lastHeartbeat: number;
  status: "online" | "idle" | "offline";
  source: "agent" | "local_scan";
}

let memoryPresence: DiscordPresenceData | null = null;

function getStorePath(): string {
  // Support writable /tmp on serverless (Vercel)
  if (process.env.VERCEL) {
    return path.join("/tmp", "live_presence.json");
  }
  const dataDir = path.join(process.cwd(), "src", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, "live_presence.json");
}

function loadStoredPresence(): DiscordPresenceData | null {
  try {
    const storePath = getStorePath();
    if (fs.existsSync(storePath)) {
      const raw = fs.readFileSync(storePath, "utf-8");
      const parsed: DiscordPresenceData = JSON.parse(raw);
      memoryPresence = parsed;
      return parsed;
    }
  } catch {
    // Ignore read errors
  }
  return memoryPresence;
}

function saveStoredPresence(data: DiscordPresenceData) {
  memoryPresence = data;
  try {
    const storePath = getStorePath();
    fs.writeFileSync(storePath, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Ignore write errors
  }
}

export async function GET() {
  const stored = loadStoredPresence();
  const now = Date.now();

  // Freshness check: if last heartbeat arrived within 60 seconds
  const isHeartbeatFresh = stored && (now - stored.lastHeartbeat < 60000);

  // If we have an active, fresh online presence
  if (stored && isHeartbeatFresh && stored.status === "online" && stored.fileName) {
    return NextResponse.json(
      {
        ...stored,
        status: "online",
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  }

  // When IDE is closed or heartbeat is stale (> 25s), return clean OFFLINE state
  const offlinePacket: DiscordPresenceData = {
    appName: "Code",
    workspace: "No active development session",
    details: "Offline — Inactive",
    fileName: "",
    extension: "ts",
    language: "TypeScript",
    startTime: 0,
    lastHeartbeat: stored ? stored.lastHeartbeat : now,
    status: "offline",
    source: "agent",
  };

  return NextResponse.json(offlinePacket, {
    headers: {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Reject legacy agent versions
    if (body.version !== "2.0") {
      return NextResponse.json(
        { success: false, message: "Ignored legacy daemon packet" },
        { status: 200 }
      );
    }

    const now = Date.now();
    const isOffline = body.status === "offline" || body.status === "idle" || !body.status;

    // Handle offline / closed IDE state
    if (isOffline || !body.fileName) {
      const offlinePacket: DiscordPresenceData = {
        appName: "Code",
        workspace: "No active development session",
        details: "Offline — Inactive",
        fileName: "",
        extension: "ts",
        language: "TypeScript",
        startTime: 0,
        lastHeartbeat: now,
        status: "offline",
        source: "agent",
      };

      saveStoredPresence(offlinePacket);
      try {
        activityEmitter.emit("activity", offlinePacket);
      } catch {}

      return NextResponse.json({
        success: true,
        status: "offline",
        syncedAt: now,
      });
    }

    // Active online presence validation
    let cleanFile = (body.fileName || "").trim();
    let cleanWorkspace = (body.workspace || "In Jahid_Hasan - 0 problems found").trim();
    let details = (body.details || "").trim();

    // Reject invalid files
    const isFolder =
      !cleanFile.includes(".") ||
      cleanFile.toLowerCase() === "owo-farmer" ||
      cleanFile.toLowerCase() === "jahid_hasan" ||
      cleanFile.toLowerCase() === "nexus" ||
      cleanFile.toLowerCase() === "darshon_portfolio";

    if (isFolder) {
      return NextResponse.json(
        { success: false, message: "Folder name rejected" },
        { status: 200 }
      );
    }

    if (cleanWorkspace.includes("Antigravity IDE")) {
      cleanWorkspace = "In Jahid_Hasan - 0 problems found";
    }

    const ext = path.extname(cleanFile).replace(".", "").toLowerCase() || "tsx";

    const packet: DiscordPresenceData = {
      appName: body.appName || "Code",
      workspace: cleanWorkspace,
      details: details || `Working on ${cleanFile}:1:1`,
      fileName: cleanFile,
      extension: ext,
      language: body.language || "TypeScript",
      startTime: Number(body.startTime) || now,
      lastHeartbeat: now,
      status: "online",
      source: "agent",
    };

    saveStoredPresence(packet);
    try {
      activityEmitter.emit("activity", packet);
    } catch {}

    return NextResponse.json({
      success: true,
      status: "online",
      syncedAt: now,
      fileName: packet.fileName,
      workspace: packet.workspace,
      startTime: packet.startTime,
    });
  } catch (err: unknown) {
    console.error("CRITICAL ACTIVITY POST ERROR:", err);
    const message = err instanceof Error ? err.message : "Bad Request";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
