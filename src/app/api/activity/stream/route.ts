import { NextRequest } from "next/server";
import { activityEmitter } from "@/lib/activityEvents";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function getStoredPresence() {
  try {
    const storePath = path.join(process.cwd(), "src", "data", "live_presence.json");
    if (fs.existsSync(storePath)) {
      return JSON.parse(fs.readFileSync(storePath, "utf-8"));
    }
  } catch {}
  return null;
}

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send immediate initial presence snapshot
      const initial = getStoredPresence();
      if (initial) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(initial)}\n\n`));
      }

      // Listener for real-time instant broadcast
      const onActivity = (data: unknown) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          cleanup();
        }
      };

      activityEmitter.on("activity", onActivity);

      // Watch live_presence.json for immediate disk sync pushes
      let watcher: fs.FSWatcher | null = null;
      try {
        const storePath = path.join(process.cwd(), "src", "data", "live_presence.json");
        watcher = fs.watch(storePath, () => {
          try {
            const updated = getStoredPresence();
            if (updated) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(updated)}\n\n`));
            }
          } catch {}
        });
      } catch {}

      // Heartbeat ping every 15s to keep SSE connection alive
      const pingInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping\n\n`));
        } catch {
          cleanup();
        }
      }, 15000);

      const cleanup = () => {
        activityEmitter.off("activity", onActivity);
        if (watcher) {
          try {
            watcher.close();
          } catch {}
        }
        clearInterval(pingInterval);
      };

      req.signal.addEventListener("abort", cleanup);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

