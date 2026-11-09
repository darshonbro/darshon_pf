"use client";

import { motion } from "framer-motion";
import { GitBranch, ExternalLink, Terminal, Activity, ArrowUpRight, Zap, Shield, Cpu } from "lucide-react";

const SYSTEMS = [
  {
    id: "sys-1",
    name: "DARSHONVC // AUDIO ENGINE",
    type: "Distributed Voice Daemon",
    tagline: "Ultra-low-latency real-time voice streaming cluster with zero buffer jitter.",
    metrics: [
      { label: "P99 LATENCY", value: "< 12ms" },
      { label: "CONCURRENCY", value: "50,000+ Sockets" },
      { label: "MEMORY", value: "Zero-Copy Alloc" },
    ],
    stack: ["Rust", "WebRTC", "C++", "Linux Epoll", "Redis Cluster"],
    status: "PRODUCTION ACTIVE",
    commit: "commit a9f81bc: optimize ring buffer mutex",
  },
  {
    id: "sys-2",
    name: "ANX-NEXUS // EVENT BUS",
    type: "High-Throughput Message Pipeline",
    tagline: "Event-driven asynchronous messaging backbone routing millions of events daily.",
    metrics: [
      { label: "THROUGHPUT", value: "1.2M msg/sec" },
      { label: "UPTIME", value: "99.995%" },
      { label: "FAILOVER", value: "< 250ms Auto" },
    ],
    stack: ["Go (Golang)", "Kafka", "gRPC", "Docker", "Prometheus"],
    status: "CLUSTER ONLINE",
    commit: "commit c73d42e: raft leader election benchmark",
  },
  {
    id: "sys-3",
    name: "CORE GATEWAY // REVERSE PROXY",
    type: "Zero-Trust Security Edge",
    tagline: "High-speed HTTP/3 and WebSocket reverse proxy with dynamic DDoS mitigation.",
    metrics: [
      { label: "SSL HANDSHAKE", value: "TLS 1.3 0-RTT" },
      { label: "DDOS MITIGATION", value: "Rate-Limiting L7" },
      { label: "CPU UTILIZATION", value: "< 3.5%" },
    ],
    stack: ["Nginx C Modules", "Lua", "OpenSSL", "Linux Iptables"],
    status: "DEPLOYED",
    commit: "commit e4210ab: enforce strict memory bounds",
  },
  {
    id: "sys-4",
    name: "AGENTIC // ORCHESTRATOR",
    type: "Autonomous Intelligence Kernel",
    tagline: "Decoupled agentic framework with isolated sandbox environments and memory persistence.",
    metrics: [
      { label: "SUBAGENTS", value: "Concurrent" },
      { label: "ISOLATION", value: "Kernel Namespaces" },
      { label: "INTERPRETER", value: "Sandboxed AST" },
    ],
    stack: ["TypeScript", "Python", "Docker Engine", "Next.js", "Vector DB"],
    status: "CORE OPERATIONAL",
    commit: "commit f9819cd: async tool dispatch pipeline",
  },
];

export default function FeaturedSystems() {
  return (
    <section id="stack" className="py-24 px-4 max-w-7xl mx-auto font-mono">
      {/* Section Heading */}
      <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black font-mono text-[10px] text-zinc-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>DEPLOYED INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Architectural Systems
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg leading-relaxed">
            Real production engines, daemons, and low-latency infrastructure built with focus on endurance and speed.
          </p>
        </div>

        <div className="text-xs text-zinc-500 font-mono">
          [TOTAL ACTIVE NODES: 04]
        </div>
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SYSTEMS.map((sys, idx) => (
          <motion.div
            key={sys.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#050505] hover:border-white/25 transition-all duration-300 relative group flex flex-col justify-between"
          >
            <div>
              {/* Top Meta Header */}
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-4 pb-3 border-b border-white/5">
                <span className="text-[11px] font-bold text-emerald-400">
                  ● {sys.status}
                </span>
                <span className="text-[10px] text-zinc-600 font-mono">{sys.type}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                {sys.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed">
                {sys.tagline}
              </p>

              {/* Benchmark Telemetry Box */}
              <div className="grid grid-cols-3 gap-2 my-5 p-3 rounded-xl bg-black border border-white/5 text-center">
                {sys.metrics.map((m) => (
                  <div key={m.label} className="overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">{m.value}</div>
                    <div className="text-[9px] text-zinc-500 uppercase mt-0.5 truncate">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Stack Chips & Commit Signature */}
            <div className="space-y-4 pt-3 border-t border-white/5">
              <div className="flex flex-wrap gap-1.5">
                {sys.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-medium text-zinc-300 bg-white/[0.04] border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-600 pt-1">
                <span className="truncate max-w-[260px] font-mono">{sys.commit}</span>
                <span className="text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                  INSPECT <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

