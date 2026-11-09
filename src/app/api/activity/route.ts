import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getLatestWorkspaceActivity } from "@/lib/activityTracker";
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
  status: "online" | "idle";
  source: "agent" | "local_scan";
}

// In-memory cache for ultra-fast sub-5ms responses
let memoryPresence: DiscordPresenceData | null = null;

function getStorePath(): string {
  const dataDir = path.join(process.cwd(), "src", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, "live_presence.json");
}

function loadStoredPresence(): DiscordPresenceData | null {
  if (memoryPresence) return memoryPresence;
  try {
    const storePath = getStorePath();
    if (fs.existsSync(storePath)) {
      const raw = fs.readFileSync(storePath, "utf-8");
      memoryPresence = JSON.parse(raw);
      return memoryPresence;
    }
  } catch {
    // Ignore read errors
  }
  return null;
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

  // If we have stored presence data
  if (stored && stored.fileName && !stored.fileName.startsWith("scratch_")) {
    const isRecent = now - stored.lastHeartbeat < 1000 * 60 * 15;
    return NextResponse.json(
      {
        ...stored,
        status: isRecent ? (stored.status || "online") : "idle",
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }

  // Otherwise, automatically fall back to workspace activity or validator.ts
  try {
    const local = getLatestWorkspaceActivity();
    const safeFile = local.file || "validator.ts";
    const safeExt = local.extension || "ts";
    const safeLang = local.language || "TypeScript";

    const fallback: DiscordPresenceData = {
      appName: "Code",
      workspace: `In ${local.workspace || "Jahid_Hasan"} - 0 problems found`,
      details: `Working on ${safeFile}:1:1`,
      fileName: safeFile,
      extension: safeExt,
      language: safeLang,
      startTime: now - 1000 * 60 * 93 - 1000 * 15,
      lastHeartbeat: now,
      status: "online",
      source: "agent",
    };

    return NextResponse.json(fallback, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json(
      {
        appName: "Code",
        workspace: "In Jahid_Hasan - 0 problems found",
        details: "Working on validator.ts:1:1",
        fileName: "validator.ts",
        extension: "ts",
        language: "TypeScript",
        startTime: now - 1000 * 60 * 93 - 1000 * 15,
        lastHeartbeat: now,
        status: "online",
        source: "agent",
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
        status: 200,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ─── Zombie Daemon Drop ──────────────────────────────────────────
    // Reject any packet from old legacy agents (which lack version "2.0")
    if (body.version !== "2.0") {
      return NextResponse.json(
        { success: false, message: "Ignored legacy daemon packet" },
        { status: 200 }
      );
    }

    const now = Date.now();
    const isIdle = body.status === "idle";

    let cleanFile = (body.fileName || "").trim();
    let cleanWorkspace = (body.workspace || "In Jahid_Hasan - 0 problems found").trim();
    let details = (body.details || "").trim();

    // Reject folder names being passed as file names
    const isFolder =
      !cleanFile.includes(".") ||
      cleanFile.toLowerCase() === "owo-farmer" ||
      cleanFile.toLowerCase() === "jahid_hasan" ||
      cleanFile.toLowerCase() === "nexus" ||
      cleanFile.toLowerCase() === "darshon_portfolio";

    if (isFolder || !cleanFile) {
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
      details: details || (isIdle ? "Idle — Not coding right now" : `Working on ${cleanFile}:1:1`),
      fileName: cleanFile,
      extension: ext,
      language: body.language || "TypeScript",
      startTime: Number(body.startTime) || now - 1000 * 60 * 15,
      lastHeartbeat: now,
      status: isIdle ? "idle" : "online",
      source: "agent",
    };

    saveStoredPresence(packet);
    try {
      activityEmitter.emit("activity", packet);
    } catch {}

    return NextResponse.json({
      success: true,
      syncedAt: now,
      fileName: packet.fileName,
      workspace: packet.workspace,
    });
  } catch (err: unknown) {
    console.error("CRITICAL ACTIVITY POST ERROR:", err);
    const message = err instanceof Error ? err.message : "Bad Request";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
