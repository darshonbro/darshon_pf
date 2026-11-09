"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, Sparkles, Copy, Check } from "lucide-react";

interface CommandOutput {
  command: string;
  response: string | React.ReactNode;
}

const COMMAND_RESPONSES: Record<string, string | React.ReactNode> = {
  help: (
    <div className="space-y-1 text-zinc-300">
      <div>Available commands:</div>
      <div className="text-zinc-500">
        • <span className="text-white">whoami</span> — Identity and engineering role
      </div>
      <div className="text-zinc-500">
        • <span className="text-white">skills</span> — Tech stack &amp; core competencies
      </div>
      <div className="text-zinc-500">
        • <span className="text-white">systems</span> — Key architectural projects built
      </div>
      <div className="text-zinc-500">
        • <span className="text-white">clearance</span> — Security &amp; root authorization
      </div>
      <div className="text-zinc-500">
        • <span className="text-white">contact</span> — Transmit direct communication
      </div>
      <div className="text-zinc-500">
        • <span className="text-white">clear</span> — Reset terminal buffer
      </div>
    </div>
  ),
  whoami: (
    <div className="text-zinc-300 leading-relaxed">
      DARSHON // Core Systems Engineer &amp; Fullstack Architect.
      <br />
      Specializing in high-performance computing, distributed event loops, low-latency APIs, and defensive security.
    </div>
  ),
  skills: (
    <div className="text-zinc-300 space-y-1">
      <div>[LANGUAGES] Rust, C/C++, Go, Python, TypeScript, Assembly x86_64</div>
      <div>[SYSTEMS] Linux Kernel, Docker, Kubernetes, Nginx, Redis, MongoDB, PostgreSQL</div>
      <div>[ARCHITECTURE] Microservices, WebSockets, Zero-Copy I/O, IPC, Distributed Locks</div>
      <div>[SECURITY] Binary Analysis, Reverse Engineering, Cryptographic Pipelines</div>
    </div>
  ),
  systems: (
    <div className="text-zinc-300 space-y-1">
      <div>1. <span className="text-emerald-400">darshonvc-engine</span>: Real-time low-latency voice cluster daemon.</div>
      <div>2. <span className="text-emerald-400">anx-nexus</span>: High-throughput async message pipeline.</div>
      <div>3. <span className="text-emerald-400">core-gateway</span>: Zero-latency edge reverse proxy &amp; rate-limiter.</div>
    </div>
  ),
  clearance: (
    <div className="text-emerald-400 font-mono">
      ACCESS LEVEL: ROOT (UID: 0) // ALL NODES UNRESTRICTED
    </div>
  ),
  contact: (
    <div className="text-zinc-300">
      Telegram: @darshonbro1 // Email: darshon56@gmail.com // Discord: darshonbro
    </div>
  ),
};

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "init --core",
      response: (
        <span className="text-zinc-400">
          Core daemon initialized. Type <span className="text-white font-bold">&apos;help&apos;</span> or select below to query system nodes.
        </span>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const executeCmd = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    const res = COMMAND_RESPONSES[trimmed] || (
      <span className="text-rose-400">
        command not found: {trimmed}. Type &apos;help&apos; for instruction set.
      </span>
    );

    setHistory((prev) => [...prev, { command: cmdStr, response: res }]);
    setInputVal("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCmd(inputVal);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <section id="terminal" className="py-20 px-4 max-w-5xl mx-auto font-mono">
      <div className="rounded-2xl border border-white/10 bg-[#050505] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.03)] overflow-hidden">
        {/* Terminal Header */}
        <div className="px-4 py-3 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-zinc-400 ml-2 font-mono">darshon@core:~#</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            <span>BASH 5.2</span>
            <span>•</span>
            <span>x86_64</span>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-b border-white/5 bg-black/40 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-zinc-600 text-[11px] shrink-0">QUICK EXEC:</span>
          {["whoami", "skills", "systems", "clearance", "contact", "clear"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => executeCmd(c)}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-zinc-300 text-[11px] transition-colors shrink-0 cursor-pointer"
            >
              ${c}
            </button>
          ))}
        </div>

        {/* Terminal Screen Body */}
        <div className="p-4 sm:p-6 min-h-[300px] max-h-[460px] overflow-y-auto space-y-4 text-xs sm:text-sm">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4 text-zinc-300 leading-relaxed">{item.response}</div>
            </div>
          ))}

          {/* Active Prompt Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-bold text-sm">&gt;</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type command (e.g. skills, whoami)..."
              className="flex-1 bg-transparent text-white outline-none font-mono text-xs sm:text-sm placeholder:text-zinc-600"
              autoFocus
            />
            <button
              type="submit"
              className="text-zinc-500 hover:text-white p-1 transition-colors"
              aria-label="Send command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}

