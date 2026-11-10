"use client";

import { useState, useEffect } from "react";
import { Gamepad2, CheckCircle2, Code2 } from "lucide-react";

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

// Mini Official VS Code Logo for bottom-right badge
function VSCodeBadge({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none">
      <path
        d="M178.6 248.8a12 12 0 0 0 11.2-1.3l57.7-41.9a12 12 0 0 0 4.5-9.6V59.9a12 12 0 0 0-4.5-9.6L189.8 8.4a12 12 0 0 0-14.8 1.4l-95.6 87.2-46.7-35.4a12 12 0 0 0-14.6.2L3.9 86.8a12 12 0 0 0-.2 18.7l41.6 38.4L3.7 182.3a12 12 0 0 0 .2 18.7l14.2 15a12 12 0 0 0 14.6.2l46.7-35.4 95.6 87.2c2.4 2.2 5.5 3.4 8.7 3.4"
        fill="#007ACC"
      />
      <path
        d="M192 68.6v118.8l-72-59.4 72-59.4z"
        fill="#fff"
        fillOpacity="0.25"
      />
      <path
        d="M192 68.6L99.4 145.1l-54.1-41.2L192 68.6z"
        fill="#0065A9"
      />
      <path
        d="M192 187.4L45.3 152.1l54.1-41.2 92.6 76.5z"
        fill="#1F8AD2"
      />
    </svg>
  );
}

const BADGE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  ts: { bg: "bg-[#007ACC]", text: "text-white", label: "TS" },
  tsx: { bg: "bg-[#007ACC]", text: "text-white", label: "TS" },
  js: { bg: "bg-[#F7DF1E]", text: "text-black", label: "JS" },
  jsx: { bg: "bg-[#00D8FF]", text: "text-black", label: "JSX" },
  json: { bg: "bg-[#F59E0B]", text: "text-black", label: "JSON" },
  cs: { bg: "bg-[#239120]", text: "text-white", label: "C#" },
  py: { bg: "bg-[#3776AB]", text: "text-white", label: "PY" },
  c: { bg: "bg-[#555555]", text: "text-white", label: "C" },
  cpp: { bg: "bg-[#00599C]", text: "text-white", label: "C++" },
  rs: { bg: "bg-[#DEA584]", text: "text-black", label: "RS" },
  go: { bg: "bg-[#00ADD8]", text: "text-black", label: "GO" },
  java: { bg: "bg-[#EA2D2E]", text: "text-white", label: "JAVA" },
  kt: { bg: "bg-[#7F52FF]", text: "text-white", label: "KT" },
  swift: { bg: "bg-[#F05138]", text: "text-white", label: "SWIFT" },
  dart: { bg: "bg-[#0175C2]", text: "text-white", label: "DART" },
  php: { bg: "bg-[#777BB4]", text: "text-white", label: "PHP" },
  rb: { bg: "bg-[#CC342D]", text: "text-white", label: "RB" },
  lua: { bg: "bg-[#000080]", text: "text-white", label: "LUA" },
  css: { bg: "bg-[#38BDF8]", text: "text-black", label: "CSS" },
  scss: { bg: "bg-[#CF649A]", text: "text-white", label: "SCSS" },
  html: { bg: "bg-[#E34F26]", text: "text-white", label: "HTML" },
  vbs: { bg: "bg-[#264DE4]", text: "text-white", label: "VBS" },
  bat: { bg: "bg-[#C1F12E]", text: "text-black", label: "BAT" },
  ps1: { bg: "bg-[#012456]", text: "text-white", label: "PS" },
  md: { bg: "bg-[#083344]", text: "text-cyan-200", label: "MD" },
  sql: { bg: "bg-[#E38C00]", text: "text-black", label: "SQL" },
  sh: { bg: "bg-[#4EAA25]", text: "text-black", label: "SH" },
  yml: { bg: "bg-[#CB171E]", text: "text-white", label: "YAML" },
  yaml: { bg: "bg-[#CB171E]", text: "text-white", label: "YAML" },
  xml: { bg: "bg-[#E34F26]", text: "text-white", label: "XML" },
  toml: { bg: "bg-[#9C4121]", text: "text-white", label: "TOML" },
  vue: { bg: "bg-[#4FC08D]", text: "text-white", label: "VUE" },
  svelte: { bg: "bg-[#FF3E00]", text: "text-white", label: "SVELTE" },
  zig: { bg: "bg-[#F7A41D]", text: "text-black", label: "ZIG" },
  txt: { bg: "bg-[#4B5563]", text: "text-white", label: "TXT" },
  exe: { bg: "bg-[#334155]", text: "text-white", label: "EXE" },
  dll: { bg: "bg-[#1E293B]", text: "text-white", label: "DLL" },
  bin: { bg: "bg-[#0F172A]", text: "text-white", label: "BIN" },
  env: { bg: "bg-[#065F46]", text: "text-white", label: "ENV" },
};

const ICON_MAP: Record<string, string> = {
  ts: "ts",
  tsx: "tsx",
  js: "js",
  jsx: "jsx",
  mjs: "js",
  cjs: "js",
  json: "json",
  cs: "cs",
  py: "py",
  c: "c",
  cpp: "cpp",
  h: "c",
  hpp: "cpp",
  rs: "rs",
  go: "go",
  java: "java",
  kt: "kt",
  swift: "swift",
  dart: "dart",
  php: "php",
  rb: "rb",
  lua: "lua",
  html: "html",
  css: "css",
  scss: "scss",
  sql: "sql",
  sh: "sh",
  bat: "bat",
  cmd: "bat",
  ps1: "ps1",
  vbs: "vbs",
  md: "md",
  yaml: "yaml",
  yml: "yml",
  xml: "html",
  toml: "json",
  vue: "vue",
  svelte: "svelte",
  zig: "zig",
  exe: "exe",
  dll: "exe",
  bin: "exe",
  env: "env",
  txt: "txt",
};

export default function LiveCodingActivity() {
  const [presence, setPresence] = useState<DiscordPresenceData>({
    appName: "Code",
    workspace: "No active development session",
    details: "Offline — Inactive",
    fileName: "",
    extension: "ts",
    language: "TypeScript",
    startTime: 0,
    lastHeartbeat: 0,
    status: "offline",
    source: "agent",
  });

  const [elapsed, setElapsed] = useState("00:00");

  // Instant 0ms Server-Sent Events (SSE) Stream + Fast Polling Fallback
  useEffect(() => {
    let isMounted = true;
    let eventSource: EventSource | null = null;

    // Connect to real-time SSE stream
    try {
      eventSource = new EventSource("/api/activity/stream");
      eventSource.onmessage = (event) => {
        try {
          const data: DiscordPresenceData = JSON.parse(event.data);
          if (isMounted && data) {
            setPresence(data);
          }
        } catch {}
      };
    } catch {}

    // Fast polling fallback (every 1000ms) for instant responsiveness
    const fetchPresence = async () => {
      try {
        const res = await fetch("/api/activity", { cache: "no-store" });
        if (res.ok) {
          const data: DiscordPresenceData = await res.json();
          if (isMounted) {
            setPresence(data);
          }
        }
      } catch {}
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, 1000);

    return () => {
      isMounted = false;
      if (eventSource) {
        eventSource.close();
      }
      clearInterval(interval);
    };
  }, []);

  // Live real-time timer ticking every 1000ms from startTime (when IDE opens)
  useEffect(() => {
    const updateTimer = () => {
      if (!presence.startTime || presence.startTime <= 0 || presence.status !== "online") {
        setElapsed("00:00");
        return;
      }
      const totalSeconds = Math.max(0, Math.floor((Date.now() - presence.startTime) / 1000));
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (n: number) => n.toString().padStart(2, "0");

      if (hours > 0) {
        setElapsed(`${hours}:${pad(minutes)}:${pad(seconds)}`);
      } else {
        setElapsed(`${pad(minutes)}:${pad(seconds)}`);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [presence.startTime, presence.status]);

  const isOnline = presence.status === "online" && !!presence.fileName;

  const extKey = (presence.extension || "ts").toLowerCase().replace(".", "");
  const iconName = ICON_MAP[extKey] || "ts";
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [extKey]);

  const badgeConfig = BADGE_STYLES[extKey] || {
    bg: "bg-[#007ACC]",
    text: "text-white",
    label: extKey.toUpperCase().slice(0, 3),
  };

  return (
    <div className="w-full max-w-xl mx-auto pt-1 select-none">
      {/* Discord RPC Replica with Liquid Glossium Aesthetics */}
      <div className="relative group rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#14161f]/90 via-[#0a0c13]/95 to-[#05060a] p-4 sm:p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-emerald-500/30 transition-all duration-300">
        {/* Top Specular Edge Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Top Ribbon */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
            {isOnline ? "PLAYING NOW" : "ACTIVITY STATUS"}
          </span>

          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                  ONLINE
                </span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500" />
                </span>
                <span className="font-mono text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                  OFFLINE
                </span>
              </>
            )}
          </div>
        </div>

        {/* Main Body Layout matching Discord Rich Presence Screenshot */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* Large Square Asset */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#181c28] to-[#0c0e16] p-2.5 sm:p-3 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] border border-white/[0.12] group-hover:border-white/25 transition-all select-none overflow-hidden">
              {isOnline ? (
                !imgError ? (
                  <img
                    src={`/icons/langs/${iconName}.svg`}
                    alt={presence.language}
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div
                    className={`w-full h-full rounded-xl ${badgeConfig.bg} flex items-center justify-center font-black font-mono text-sm sm:text-base ${badgeConfig.text}`}
                  >
                    {badgeConfig.label}
                  </div>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  <Code2 className="w-7 h-7 text-zinc-500" />
                </div>
              )}
            </div>

            {/* Small Overlay Icon (VS Code Logo in bottom right) */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0a0c13] border border-white/20 flex items-center justify-center shadow-md p-0.5">
              <VSCodeBadge className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-80" />
            </div>
          </div>

          {/* Activity Information */}
          <div className="min-w-0 flex-1">
            {/* Application Name */}
            <div className="flex items-center gap-1.5">
              <h3 className="text-base sm:text-lg font-bold font-sans text-white tracking-tight leading-tight">
                {presence.appName || "Code"}
              </h3>
              {isOnline && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
            </div>

            {/* State (Workspace & Problems) */}
            <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-0.5 truncate leading-tight">
              {isOnline ? presence.workspace : "No active development session"}
            </p>

            {/* Details (Active File & Line) */}
            <p className="text-xs text-zinc-400 font-sans mt-0.5 truncate leading-tight">
              {isOnline ? presence.details : "Offline — Currently away from keyboard"}
            </p>

            {/* Live Ticking Elapsed Timer — ONLY SHOWN WHEN ONLINE AND IDE IS OPEN */}
            {isOnline && presence.startTime > 0 && (
              <div className="flex items-center gap-1.5 mt-1 text-xs font-mono font-medium text-emerald-400 tabular-nums">
                <Gamepad2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{elapsed}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
