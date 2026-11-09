"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LazyTextReveal from "@/components/LazyTextReveal";
import {
  Building2,
  Database,
  Zap,
  Video,
  Cpu,
  Radio,
  Sliders,
  Music,
  Lock,
  CreditCard,
  ShoppingBag,
  Search,
  Terminal,
  Network,
  Shield,
  Activity,
  ArrowUpRight,
} from "lucide-react";

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  status: string;
  subsystem: string;
  metric: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  link: string;
  isFeatured?: boolean;
}

// 16 Real Production Systems & Architectures across 4 columns
// Highlighted: 5 user-provided live domains with active links
// Background: 11 local architectural daemons without external links
const PROJECT_COLUMNS: ProjectItem[][] = [
  // Column 0
  [
    {
      id: "p-1",
      name: "APTIVEST NEXUS",
      category: "Shariah Asset & Halal Investment Platform",
      description:
        "Independent Shariah-conscious business & investment community platform with member resource distribution and asset management.",
      stack: ["Next.js", "Prisma", "Framer Motion"],
      status: "LIVE PRODUCTION",
      subsystem: "aptivestnexus.com",
      metric: "Halal Asset Engine",
      badge: "Live Platform",
      icon: Building2,
      accentColor: "#10b981",
      link: "https://aptivestnexus.com/",
      isFeatured: true,
    },
    {
      id: "p-2",
      name: "VOICECLAW BOT",
      category: "Dynamic Voice Hub & Components V2",
      description:
        "Discord Components V2 voice channel orchestrator featuring temporary channels, soundboard routing, and permission isolation.",
      stack: ["Python", "Discord.py", "Components V2"],
      status: "ACTIVE NODE",
      subsystem: "voice/channel-daemon",
      metric: "Zero-Latency Voice RPC",
      badge: "Components V2",
      icon: Radio,
      accentColor: "#10b981",
      link: "",
      isFeatured: false,
    },
    {
      id: "p-3",
      name: "LUTIFY AUTOMATION",
      category: "Color Grade & Video LUT Daemon",
      description:
        "Automated video LUT application and color-grading dispatch engine deployed with PM2 ecosystem process management.",
      stack: ["Python", "PM2", "FFmpeg"],
      status: "PM2 ONLINE",
      subsystem: "video/lut-pipeline",
      metric: "Automated Grading",
      badge: "Pipeline Core",
      icon: Sliders,
      accentColor: "#ec4899",
      link: "",
      isFeatured: false,
    },
    {
      id: "p-4",
      name: "MOVIE STREAM ROOM",
      category: "Synchronized P2P Watch Party",
      description:
        "Real-time synchronized video streaming platform allowing remote users to watch movies with zero playback desync.",
      stack: ["React", "Node.js", "Socket.io"],
      status: "DEPLOYED P2P",
      subsystem: "media/watch-party",
      metric: "< 50ms Clock Desync",
      badge: "Zero Desync",
      icon: Activity,
      accentColor: "#f97316",
      link: "",
      isFeatured: false,
    },
  ],

  // Column 1
  [
    {
      id: "p-5",
      name: "PROBASH VALLEY ERP",
      category: "ARK Global Remittance & Debtor ERP",
      description:
        "Multi-currency enterprise remittance ledger and financial operations ERP managing cross-border transactions and liquidity.",
      stack: ["Laravel", "MySQL", "Nginx"],
      status: "DEPLOYED ERP",
      subsystem: "probashvalley.top",
      metric: "Multi-Currency Forex",
      badge: "Enterprise ERP",
      icon: Database,
      accentColor: "#06b6d4",
      link: "https://probashvalley.top/",
      isFeatured: true,
    },
    {
      id: "p-6",
      name: "REACT AUTO PAYMENT GATEWAY",
      category: "Enterprise SaaS Checkout Platform",
      description:
        "High-polish modern merchant checkout dashboard inspired by Stripe and Linear with real-time settlement telemetry.",
      stack: ["React", "TypeScript", "Tailwind"],
      status: "SAAS CLUSTER",
      subsystem: "fintech/merchant-saas",
      metric: "Stripe-Grade UX",
      badge: "Fintech SaaS",
      icon: CreditCard,
      accentColor: "#10b981",
      link: "",
      isFeatured: false,
    },
    {
      id: "p-7",
      name: "ULTRA MUSIC BOT",
      category: "100k+ Guild LavaLink Cluster",
      description:
        "Scalable audio streaming bot with multi-node LavaLink integration, web-based playback controller, and premium sound filtering.",
      stack: ["JavaScript", "LavaLink", "Docker"],
      status: "LAVALINK CLUSTER",
      subsystem: "audio/lavalink-mesh",
      metric: "100k+ Guild Cluster",
      badge: "Lossless Audio",
      icon: Music,
      accentColor: "#6366f1",
      link: "",
      isFeatured: false,
    },
    {
      id: "p-8",
      name: "G-MAP LEAD GEN SAAS",
      category: "Automated Lead Extraction Engine",
      description:
        "High-speed Google Maps business data scraper and lead generation dashboard with automated n8n workflow integration.",
      stack: ["React", "TypeScript", "n8n"],
      status: "AUTOMATION CORE",
      subsystem: "scraper/lead-gen",
      metric: "Bulk B2B Extraction",
      badge: "Lead Scraper",
      icon: Search,
      accentColor: "#eab308",
      link: "",
      isFeatured: false,
    },
  ],

  // Column 2
  [
    {
      id: "p-9",
      name: "DARSHON EDIT",
      category: "Creative Agency & Video Production",
      description:
        "High-retention short-form video editing, motion graphics design, and visual storytelling portfolio for creators and brands.",
      stack: ["Next.js", "Motion Graphics", "Tailwind"],
      status: "PRODUCTION LIVE",
      subsystem: "jahidhasanedit.com",
      metric: "10M+ Client Views",
      badge: "Creative Hub",
      icon: Video,
      accentColor: "#f59e0b",
      link: "https://jahidhasanedit.com/",
      isFeatured: true,
    },
    {
      id: "p-10",
      name: "PIPRAPAY GATEWAY",
      category: "Self-Hosted Payment Gateway",
      description:
        "Automated payment processing gateway supporting bKash, Nagad, and Rocket instant transaction verification.",
      stack: ["PHP", "MySQL", "bKash API"],
      status: "GATEWAY ACTIVE",
      subsystem: "pay/piprapay-core",
      metric: "Instant bKash Verification",
      badge: "Secure Gateway",
      icon: Lock,
      accentColor: "#f43f5e",
      link: "",
      isFeatured: false,
    },
    {
      id: "p-11",
      name: "BN_SHOP COMMERCE",
      category: "Digital Goods Marketplace",
      description:
        "Automated digital products & virtual voucher delivery e-commerce engine with inventory tracking and instant code dispatch.",
      stack: ["Laravel", "MySQL", "REST"],
      status: "E-COMM ACTIVE",
      subsystem: "shop/digital-goods",
      metric: "Auto Voucher Delivery",
      badge: "Digital Store",
      icon: ShoppingBag,
      accentColor: "#14b8a6",
      link: "",
      isFeatured: false,
    },
    {
      id: "p-12",
      name: "HAYATO COMMUNITY BOT",
      category: "Engagement & Server Protection",
      description:
        "Community moderation and gamified economy bot protecting servers with automated raid filtering and member onboarding.",
      stack: ["Python", "SQLite", "Wispbyte"],
      status: "COMMUNITY ACTIVE",
      subsystem: "bot/hayato-core",
      metric: "Anti-Raid Defense",
      badge: "Moderation Core",
      icon: Shield,
      accentColor: "#a855f7",
      link: "",
      isFeatured: false,
    },
  ],

  // Column 3
  [
    {
      id: "p-13",
      name: "OYO BOT INFRASTRUCTURE",
      category: "AWS-Hosted Discord Automation",
      description:
        "Scalable cloud-hosted bot architecture on dedicated AWS infrastructure with 24/7 uptime and automated guild sharding.",
      stack: ["Node.js", "AWS EC2", "Redis"],
      status: "AWS HOSTED",
      subsystem: "oyobot.space",
      metric: "24/7 Cloud Cluster",
      badge: "Verified Bot",
      icon: Cpu,
      accentColor: "#8b5cf6",
      link: "https://oyobot.space/",
      isFeatured: true,
    },
    {
      id: "p-14",
      name: "BDMY // PLAYERSBD",
      category: "Remittance & Gaming Voucher Gateway",
      description:
        "Automated digital currency, gaming voucher exchange, and instant wallet balance replenishment infrastructure.",
      stack: ["PHP", "Laravel", "SSL Edge"],
      status: "ACTIVE STORE",
      subsystem: "bdmy.top",
      metric: "Instant Topup Dispatch",
      badge: "Payment Node",
      icon: Zap,
      accentColor: "#3b82f6",
      link: "https://bdmy.top/",
      isFeatured: true,
    },
    {
      id: "p-15",
      name: "DARSHON-PRESENCE DAEMON",
      category: "Windows Kernel RPC & Workspace Sync",
      description:
        "24/7 background Windows daemon tracking active developer workspaces and VS Code RPC states with zero latency drift.",
      stack: ["C++", "WinAPI", "Python"],
      status: "KERNEL SYNC",
      subsystem: "rpc/presence-daemon",
      metric: "24/7 Real-Time Telemetry",
      badge: "WinAPI Daemon",
      icon: Terminal,
      accentColor: "#10b981",
      link: "",
      isFeatured: false,
    },
    {
      id: "p-16",
      name: "DISCORD SELFBOT PANEL",
      category: "Multi-Account Session Orchestrator",
      description:
        "Centralized web management panel controlling multi-token Discord voice stays, auto-responders, and status rotation.",
      stack: ["Node.js", "Express", "WebSockets"],
      status: "PANEL ONLINE",
      subsystem: "panel/session-sync",
      metric: "Multi-Token Rotation",
      badge: "Session Manager",
      icon: Network,
      accentColor: "#38bdf8",
      link: "",
      isFeatured: false,
    },
  ],
];

export default function ProjectsShowcase() {
  const wallRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeTileId, setActiveTileId] = useState<string | null>(null);

  // Physics & Animation state refs
  const mouseParallax = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const hoveredCol = useRef<number>(-1);

  // Speeds per column: alternating upward & downward drift with organic variance (Razebot math)
  const columnSpeeds = useMemo(() => [-36, 38, -32, 34], []);
  const offsets = useRef<number[]>([0, 180, 80, 240]);
  const currentSpeeds = useRef<number[]>([...columnSpeeds]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Ticker animation loop
  useEffect(() => {
    // 4 projects per column, tile height 175px + gap 18px = 193px
    const tileFullHeight = 193;
    const copyHeight = 4 * tileFullHeight; // 772px

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const dt = Math.min(0.05, Math.max(0, (time - lastTimeRef.current) / 1000));
      lastTimeRef.current = time;

      // Spring smoothed mouse parallax tilt
      const targetX = isHovered.current ? mouseParallax.current.x * 6.5 : 0;
      const targetY = isHovered.current ? mouseParallax.current.y * -6.5 : 0;
      const smoothFactor = 1 - Math.exp(-dt / 0.12);
      currentParallax.current.x += (targetX - currentParallax.current.x) * smoothFactor;
      currentParallax.current.y += (targetY - currentParallax.current.y) * smoothFactor;

      if (planeRef.current) {
        const tiltX = 12 + currentParallax.current.y;
        const turnY = -10 + currentParallax.current.x;
        planeRef.current.style.transform = `translate(-50%, -50%) scale(1.15) rotateX(${tiltX.toFixed(2)}deg) rotateY(${turnY.toFixed(2)}deg) translateZ(-85px)`;
      }

      // Update column tracks
      for (let c = 0; c < 4; c++) {
        const track = trackRefs.current[c];
        if (!track) continue;

        // When a column's card is hovered, smoothly brake to 0; otherwise cruise at column speed
        const isThisColHovered = isHovered.current && hoveredCol.current === c;
        const targetSpeed = isThisColHovered ? 0 : columnSpeeds[c];

        // Smooth speed deceleration / acceleration
        const speedEase = 1 - Math.exp(-dt / (isThisColHovered ? 0.14 : 0.26));
        currentSpeeds.current[c] += (targetSpeed - currentSpeeds.current[c]) * speedEase;

        // Advance track offset
        offsets.current[c] += currentSpeeds.current[c] * dt;
        offsets.current[c] = ((offsets.current[c] % copyHeight) + copyHeight) % copyHeight;

        track.style.transform = `translate3d(0, ${-offsets.current[c].toFixed(1)}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [columnSpeeds]);

  // Pointer event listeners for container
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!wallRef.current) return;
    const rect = wallRef.current.getBoundingClientRect();
    mouseParallax.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };

    const tile = (e.target as HTMLElement).closest("[data-tile-id]") as HTMLElement | null;
    if (tile && tile.dataset.col !== undefined) {
      const col = parseInt(tile.dataset.col, 10);
      hoveredCol.current = col;
      setActiveTileId(tile.dataset.tileId || null);
    } else {
      hoveredCol.current = -1;
      setActiveTileId(null);
    }
  };

  const handlePointerEnter = () => {
    isHovered.current = true;
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
    hoveredCol.current = -1;
    setActiveTileId(null);
    mouseParallax.current = { x: 0, y: 0 };
  };

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.35, 1, 1, 0.35]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      id="projects"
      className="pt-6 sm:pt-10 pb-20 relative overflow-hidden select-none font-sans"
      aria-label="Engineered Systems & Infrastructure Showcase"
    >
      {/* Top Header Section */}
      <div className="max-w-7xl mx-auto px-4 mb-10 flex flex-col items-start">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] text-zinc-400 font-mono mb-3 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>DEPLOYED SYSTEMS // ARCHITECTURE MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none uppercase">
            Engineered <br className="hidden sm:inline" />
            <span className="text-zinc-400">Systems.</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 max-w-lg leading-relaxed">
            Live web platforms, remittance ERPs, and cloud automation engineered by DARSHON.
          </p>
        </div>
      </div>

      {/* 3D Tilted Perspective Drift Wall Container */}
      <div className="w-full h-[580px] md:h-[660px] relative overflow-hidden">
        <div
          ref={wallRef}
          className="drift-wall"
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          role="group"
          aria-label="3D Drifting Wall of Engineered Projects"
        >
          {/* 3D Rotated Plane */}
          <div ref={planeRef} className="drift-wall__plane">
            {PROJECT_COLUMNS.map((colProjects, colIdx) => {
              // 3 copies to create an endless seamless vertical ribbon
              const copies = [0, 1, 2];

              return (
                <div key={colIdx} className="drift-wall__col">
                  <div
                    ref={(el) => {
                      trackRefs.current[colIdx] = el;
                    }}
                    className="drift-wall__track"
                  >
                    {copies.map((copyIdx) =>
                      colProjects.map((project, projIdx) => {
                        const tileId = `${colIdx}-${projIdx}-${copyIdx}`;
                        const isActive = activeTileId === tileId;
                        const isFeatured = Boolean(project.isFeatured && project.link);
                        const Icon = project.icon;

                        return (
                          <div
                            key={tileId}
                            tabIndex={isFeatured ? 0 : -1}
                            role={isFeatured ? "button" : "article"}
                            aria-label={project.name}
                            data-tile-id={tileId}
                            data-col={colIdx}
                            className={`drift-wall__tile ${isActive ? "is-active" : ""} ${
                              isFeatured
                                ? "is-featured cursor-pointer"
                                : "cursor-default opacity-60 hover:opacity-100"
                            }`}
                            onClick={
                              isFeatured
                                ? () => window.open(project.link, "_blank", "noopener,noreferrer")
                                : undefined
                            }
                          >
                            <span className="drift-wall__inner">
                              <div className="flex flex-col justify-between h-full text-left">
                                {/* Top Row: Tech Stack / Live Status + Badge Pill */}
                                <div>
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-1.5">
                                      {isFeatured ? (
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/20 text-[10px] font-mono text-white font-bold">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                          <span>ONLINE</span>
                                        </div>
                                      ) : (
                                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-mono text-zinc-500">
                                          <span>{project.stack[0]}</span>
                                        </div>
                                      )}
                                    </div>
                                    <span
                                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                                        isFeatured
                                          ? "font-bold text-white bg-white/10 border-white/20 shadow-sm"
                                          : "font-medium text-zinc-600 bg-white/[0.02] border-white/5"
                                      }`}
                                    >
                                      {project.badge}
                                    </span>
                                  </div>

                                  {/* Project Title */}
                                  <h3
                                    className={`text-xs sm:text-[13px] tracking-wide truncate ${
                                      isFeatured
                                        ? "font-black text-white"
                                        : "font-semibold text-zinc-400"
                                    }`}
                                  >
                                    {project.name}
                                  </h3>

                                  {/* Project Tagline (Clean, unquoted) */}
                                  <p
                                    className={`text-[11px] font-medium leading-relaxed line-clamp-3 mt-1.5 ${
                                      isFeatured ? "text-zinc-300" : "text-zinc-600"
                                    }`}
                                  >
                                    {project.description}
                                  </p>
                                </div>

                                {/* Bottom Row: Author Squircle Icon + Info + Action */}
                                <div className="flex items-center justify-between pt-2.5 border-t border-[#242424] mt-2">
                                  <div className="flex items-center gap-2.5 overflow-hidden">
                                    <div
                                      className={`w-8 h-8 rounded-xl border flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner ${
                                        isFeatured
                                          ? "bg-[#14161f] border-white/20"
                                          : "bg-[#0A0A0A] border-[#242424]"
                                      }`}
                                    >
                                      <Icon
                                        className={`w-4 h-4 ${
                                          isFeatured ? "text-white" : "text-zinc-500"
                                        }`}
                                      />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                      <span
                                        className={`text-xs font-bold tracking-wide truncate ${
                                          isFeatured ? "text-white" : "text-zinc-400"
                                        }`}
                                      >
                                        DARSHON
                                      </span>
                                      <span
                                        className={`text-[10px] font-mono truncate flex items-center gap-1 ${
                                          isFeatured
                                            ? "text-zinc-300 font-medium"
                                            : "text-zinc-600"
                                        }`}
                                      >
                                        {project.subsystem}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Right Action: ONLY on user-provided featured projects */}
                                  {isFeatured ? (
                                    <div className="inline-flex items-center gap-1.5 text-[10px] text-white font-mono font-bold bg-white/[0.08] hover:bg-white/[0.18] px-2.5 py-1 rounded-md border border-white/20 flex-shrink-0 shadow-sm transition-all">
                                      <span>VISIT</span>
                                      <ArrowUpRight className="w-3 h-3 text-zinc-300" />
                                    </div>
                                  ) : (
                                    <div className="flex items-center text-[9px] text-zinc-700 font-mono uppercase flex-shrink-0">
                                      NODE
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Subtle glass reflection overlay */}
                              <span className="drift-wall__overlay" aria-hidden="true" />
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
