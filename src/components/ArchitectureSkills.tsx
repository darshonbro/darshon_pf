"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Shield,
  Activity,
  Layers,
} from "lucide-react";

// =============================================================================
// REAL OFFICIAL BRAND SVG LOGOS (Zero Emojis, 100% Authentic Vectors)
// =============================================================================

function ReactLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextjsLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <mask id="mask0_next" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#mask0_next)">
        <circle cx="90" cy="90" r="90" fill="#000" stroke="rgba(255,255,255,0.25)" strokeWidth="4" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_next)" />
        <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_next)" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_next" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TypeScriptLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="16" fill="#3178C6" />
      <path fill="#FFF" d="M37.3 90.6c0 5 1.5 8.9 4.6 11.6 3 2.7 7.1 4 12.2 4 4.8 0 8.7-1.1 11.7-3.3 3-2.2 4.5-5.2 4.5-9 0-3.3-1.1-6-3.2-8.2-2.1-2.2-6-4.3-11.8-6.4-7.5-2.6-13-5.5-16.7-8.7-3.6-3.2-5.4-7.4-5.4-12.5 0-5.8 2.2-10.4 6.6-13.8 4.4-3.4 10.4-5.1 18-5.1 7.2 0 13.2 1.6 17.8 4.9 4.6 3.2 7.2 8.1 7.7 14.6l-13.3 2.6c-.6-3.5-1.9-6-4-7.7-2.1-1.6-5-2.4-8.7-2.4-3.8 0-6.8.9-8.9 2.7-2.1 1.8-3.1 4.1-3.1 6.8 0 2.4.9 4.5 2.6 6.1 1.8 1.6 5.4 3.3 11 5.3 7.8 2.7 13.5 5.7 17.2 8.9 3.7 3.2 5.5 7.6 5.5 13.1 0 6.3-2.3 11.3-6.9 15-4.6 3.7-11.2 5.5-19.7 5.5-8.8 0-15.7-2-20.7-6-5-4-7.6-9.7-7.9-17l13.6-1.5zm-33.8-51h46.8v11.9H32.4v54H17.8v-54H3.5V39.6z" />
    </svg>
  );
}

function TailwindLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#38BDF8" />
    </svg>
  );
}

function NodeLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 289" fill="none">
      <path fill="#5FA04E" d="M136.2 8.5l103.7 59.9c5 2.9 8.1 8.2 8.1 14v119.8c0 5.8-3.1 11.1-8.1 14l-103.7 59.9c-5 2.9-11.2 2.9-16.2 0L16.3 216.2c-5-2.9-8.1-8.2-8.1-14V82.4c0-5.8 3.1-11.1 8.1-14L120 8.5c5-2.9 11.2-2.9 16.2 0z" />
      <path fill="#FFF" d="M128 70c-2.3 0-4.6.6-6.6 1.8l-40.8 23.6c-4.1 2.4-6.6 6.8-6.6 11.5v47.2c0 4.7 2.5 9.1 6.6 11.5l40.8 23.6c4.1 2.4 9.1 2.4 13.2 0l40.8-23.6c4.1-2.4 6.6-6.8 6.6-11.5v-47.2c0-4.7-2.5-9.1-6.6-11.5l-40.8-23.6c-2-1.2-4.3-1.8-6.6-1.8zm-7 33.5l27 15.6v31.2l-27 15.6-27-15.6v-31.2l27-15.6z" />
    </svg>
  );
}

function PythonLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 110" fill="none">
      <path fill="#387EB8" d="M54.3 0C24.7 0 26.5 12.8 26.5 12.8l.03 13.3h28.3v4H15.4S0 28.3 0 57.8c0 29.6 13.5 28.6 13.5 28.6h8.1V74.8s-.4-13.8 13.6-13.8h28.1s13.1-.2 13.1-12.8V12.8S78 0 54.3 0zm-15.1 8.8a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8z" />
      <path fill="#FFE052" d="M55.7 110c29.6 0 27.8-12.8 27.8-12.8l-.03-13.3H55.2v-4h39.4s15.4 1.8 15.4-27.7c0-29.6-13.5-28.6-13.5-28.6h-8.1v11.6s.4 13.8-13.6 13.8H46.7s-13.1.2-13.1 12.8v15.4s-1.6 12.8 22.1 12.8zm15.1-8.8a4.4 4.4 0 1 1 0-8.8 4.4 4.4 0 0 1 0 8.8z" />
    </svg>
  );
}

function LaravelLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M21.1 6.8l-8.6-5a2 2 0 00-2 0l-8.6 5a2 2 0 00-1 1.7v10a2 2 0 001 1.7l8.6 5a2 2 0 002 0l8.6-5a2 2 0 001-1.7v-10a2 2 0 00-1-1.7zm-9.6 14.5l-8-4.6V7.7l8 4.6v9zm1-10.4L4.9 6.5l7.6-4.4 7.6 4.4-7.6 4.4zm7.6 5.8l-7.6 4.4v-9l7.6-4.4v9z" fill="#FF2D20" />
    </svg>
  );
}

function ExpressLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 18.588l-5.698-5.733 5.66-5.679-2.022-2.022-5.66 5.679L10.6 5.154 5.244 10.51 0 5.266l10.6 10.6 5.679-5.679 5.698 5.733L24 18.588zM5.244 13.338l5.356 5.356 2.022-2.022-5.356-5.356-2.022 2.022z" fill="#FFF" />
    </svg>
  );
}

function PostgresLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 440 449" fill="none">
      <path fill="#336791" d="M228.3 0c-40.8 0-77.9 19.7-101.4 51.5C118.8 35.8 103.7 25 86 25 55.4 25 30.6 49.8 30.6 80.4c0 14.5 5.6 27.7 14.7 37.6-18.4 20.4-29.6 47.4-29.6 77 0 59.8 46.5 108.8 105 112.5v127.3c0 7.8 6.4 14.2 14.2 14.2h10c7.8 0 14.2-6.4 14.2-14.2v-126h8.7v126c0 7.8 6.4 14.2 14.2 14.2h10c7.8 0 14.2-6.4 14.2-14.2V282h4.5c86.4 0 156.5-70.1 156.5-156.5S314.7 0 228.3 0z" />
      <path fill="#FFF" d="M196.4 202.8c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z" />
    </svg>
  );
}

function RedisLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path fill="#D82C20" d="M21.5 5.5l-9.5-5-9.5 5 9.5 5 9.5-5z" />
      <path fill="#A3241C" d="M2.5 5.5v13l9.5 5v-13l-9.5-5z" />
      <path fill="#C6281E" d="M12 10.5v13l9.5-5v-13l-9.5 5z" />
      <path fill="#FFF" d="M11.5 7.5l-4-2.1v2.1l4 2.1 4-2.1v-2.1l-4 2.1z" opacity=".85" />
    </svg>
  );
}

function SupabaseLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 109 113" fill="none">
      <path d="M63.7076 110.284C60.5481 114.374 54.0049 112.14 53.9482 106.969L53.3168 49.3248L98.6534 49.3248C105.419 49.3248 109.117 57.1751 104.795 62.7725L63.7076 110.284Z" fill="#3ECF8E" />
      <path d="M45.317 2.70476C48.4765 -1.38545 55.0197 0.848525 55.0764 6.0195L55.7078 63.6636L10.3712 63.6636C3.60558 63.6636 -0.0924978 55.8133 4.22956 50.2159L45.317 2.70476Z" fill="#249361" />
    </svg>
  );
}

function MongoLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 0C11.5 0 7 6 7 13.5c0 4.5 3 8.5 5 10.5 2-2 5-6 5-10.5C17 6 12.5 0 12 0z" fill="#47A248" />
      <path d="M12 24c-.2 0-.5-.1-.7-.2-.2-.2-4.3-4.2-4.3-10.3C7 6 11.5 0 12 0v24z" fill="#499D4A" />
      <path d="M12 24v-24c.5 0 5 6 5 13.5 0 6.1-4.1 10.1-4.3 10.3-.2.1-.5.2-.7.2z" fill="#58AA50" />
      <path d="M12 22.5c-.3 0-.5-.1-.7-.3-1.6-1.8-3.8-5.3-3.8-8.7 0-4.8 2.8-9.4 4.5-11.8v20.8z" fill="#13AA52" />
    </svg>
  );
}

function DockerLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#2496ED">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.083.185.186.185m23.108 1.637c-.328-.216-1.02-.333-1.841-.177-.52.099-1.037.337-1.465.719-.444.397-.736.938-.888 1.542-.904-.553-2.028-.867-3.238-.867-2.31 0-4.328 1.137-5.59 2.894-1.285-.36-2.673-.557-4.107-.557-7.29 0-13.385 4.965-14.896 11.663-1.08.31-2.12.78-3.09 1.393L0 19.388c3.27 4.148 8.358 6.782 14.044 6.782 9.544 0 17.587-6.237 20.264-14.862.584-.146 1.16-.367 1.716-.66.868-.456 1.637-1.127 2.15-1.99.527-.887.697-1.92.483-2.93-.16-.75-.58-1.442-1.217-1.87z" />
    </svg>
  );
}

function LinuxLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path fill="#EDEDED" d="M12 2C9.5 2 7.5 4 7.5 6.5v4c0 1.5-.5 3-1.5 4.2-.8 1-1 2.3-.5 3.3.6 1.2 2 1.8 3.5 1.5.7-.1 1.5-.4 2-.8.5.4 1.3.7 2 .8 1.5.3 2.9-.3 3.5-1.5.5-1 .3-2.3-.5-3.3-1-1.2-1.5-2.7-1.5-4.2v-4C16.5 4 14.5 2 12 2z" />
      <path fill="#FFA500" d="M10.5 7.5h3l-1.5 2z" />
      <ellipse cx="9" cy="20.5" rx="2.5" ry="1.2" fill="#FFA500" />
      <ellipse cx="15" cy="20.5" rx="2.5" ry="1.2" fill="#FFA500" />
    </svg>
  );
}

function CloudflareLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#F38020">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  );
}

function DiscordLogo({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#5865F2">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// =============================================================================
// DOMAIN DATA STRUCTURE (Clean, Minimal, Zero Fluff)
// =============================================================================

type CategoryId = "all" | "backend" | "frontend" | "database" | "infra";

interface TechItem {
  name: string;
  badge: string;
  desc: string;
  icon: React.ReactNode;
}

interface DomainSection {
  id: CategoryId;
  title: string;
  tagline: string;
  status: string;
  icon: React.ReactNode;
  latency: string;
  items: TechItem[];
}

const DOMAINS: DomainSection[] = [
  {
    id: "backend",
    title: "Backend & Systems",
    tagline: "High-throughput APIs, microservices, and asynchronous event loops.",
    status: "ACTIVE CLUSTER",
    icon: <Server className="w-4 h-4 text-emerald-400" />,
    latency: "< 8ms p99",
    items: [
      {
        name: "Node.js",
        badge: "V8 RUNTIME",
        desc: "Event-driven asynchronous service backend.",
        icon: <NodeLogo />,
      },
      {
        name: "Python",
        badge: "ASYNCIO",
        desc: "High-speed APIs, data pipelines & automation.",
        icon: <PythonLogo />,
      },
      {
        name: "Laravel",
        badge: "MVC / PHP",
        desc: "Enterprise API services & queue workers.",
        icon: <LaravelLogo />,
      },
      {
        name: "Express.js",
        badge: "REST / WS",
        desc: "Minimalist, low-latency microservices.",
        icon: <ExpressLogo />,
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    tagline: "Modern web applications, SSR hydration, and fluid UI systems.",
    status: "FLUID RENDER",
    icon: <Code2 className="w-4 h-4 text-emerald-400" />,
    latency: "60 FPS",
    items: [
      {
        name: "Next.js",
        badge: "APP ROUTER",
        desc: "Server-side rendering, streaming & edge routing.",
        icon: <NextjsLogo />,
      },
      {
        name: "React",
        badge: "CONCURRENT",
        desc: "Modern reactive component architecture.",
        icon: <ReactLogo />,
      },
      {
        name: "TypeScript",
        badge: "STRICT TYPES",
        desc: "Compile-time validation and type safety.",
        icon: <TypeScriptLogo />,
      },
      {
        name: "Tailwind CSS",
        badge: "DESIGN SYSTEM",
        desc: "Utility-first Liquid Glossium styling.",
        icon: <TailwindLogo />,
      },
    ],
  },
  {
    id: "database",
    title: "Database & Storage",
    tagline: "Relational data structures, document storage, and in-memory caches.",
    status: "CLUSTERED",
    icon: <Database className="w-4 h-4 text-emerald-400" />,
    latency: "0.2ms IOPS",
    items: [
      {
        name: "PostgreSQL",
        badge: "RELATIONAL",
        desc: "ACID transactions & indexed relational queries.",
        icon: <PostgresLogo />,
      },
      {
        name: "Redis",
        badge: "IN-MEMORY",
        desc: "Sub-millisecond memory caching & message pub/sub.",
        icon: <RedisLogo />,
      },
      {
        name: "Supabase",
        badge: "POSTGRES / AUTH",
        desc: "Real-time subscriptions and row-level security.",
        icon: <SupabaseLogo />,
      },
      {
        name: "MongoDB",
        badge: "DOCUMENT NO-SQL",
        desc: "High-flexibility replica set storage.",
        icon: <MongoLogo />,
      },
    ],
  },
  {
    id: "infra",
    title: "DevOps & Bot Engines",
    tagline: "Container isolation, security proxies, and autonomous bots.",
    status: "HARDENED",
    icon: <Shield className="w-4 h-4 text-emerald-400" />,
    latency: "99.99% SLA",
    items: [
      {
        name: "Docker",
        badge: "CONTAINERIZATION",
        desc: "Isolated, multi-stage reproducible containers.",
        icon: <DockerLogo />,
      },
      {
        name: "Linux (Debian/Ubuntu)",
        badge: "KERNEL / SYSTEM",
        desc: "Server administration, daemons & POSIX system calls.",
        icon: <LinuxLogo />,
      },
      {
        name: "Cloudflare",
        badge: "EDGE / DNS",
        desc: "DDoS shielding, SSL handshakes & edge routing.",
        icon: <CloudflareLogo />,
      },
      {
        name: "Discord & Telegram Bots",
        badge: "BOT DAEMONS",
        desc: "Real-time autonomous automation & bot infrastructure.",
        icon: <DiscordLogo />,
      },
    ],
  },
];

// =============================================================================
// MAIN ARCHITECTURE COMPONENT
// =============================================================================

export default function ArchitectureSkills() {
  const [activeTab, setActiveTab] = useState<CategoryId>("all");

  const filteredDomains =
    activeTab === "all"
      ? DOMAINS
      : DOMAINS.filter((d) => d.id === activeTab);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header (Minimal, Direct, Zero Fluff) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
              TECH STACK / SKILLS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans">
            Skills &amp; Technologies
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed font-sans">
            The core technologies, frameworks, and infrastructure I use to build scalable web applications and high-performance backend systems.
          </p>
        </div>

        {/* Minimal Tab Switcher (Floating Segment Control) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          {[
            { id: "all", label: "All Systems" },
            { id: "backend", label: "Backend" },
            { id: "frontend", label: "Frontend" },
            { id: "database", label: "Database" },
            { id: "infra", label: "DevOps & Bots" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CategoryId)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-white font-bold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-white/10 border border-white/15 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Architectural Grid */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <AnimatePresence mode="popLayout">
          {filteredDomains.map((domain, idx) => (
            <motion.div
              key={domain.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="group relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0d0f15]/80 via-[#07080b]/90 to-[#040507] p-6 sm:p-7 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_-15px_rgba(0,0,0,0.9)] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Specular Edge Line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

              <div>
                {/* Domain Header Row */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.12)]">
                      {domain.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-sans">
                        {domain.title}
                      </h3>
                      <p className="text-[11px] text-zinc-400 mt-0.5 font-sans leading-relaxed">
                        {domain.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[9px] font-mono font-bold text-emerald-400 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{domain.status}</span>
                  </span>
                </div>

                {/* Technology Nodes Grid (Breathable 2-Column Cards with Real Logos) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {domain.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-black/40 hover:bg-white/[0.03] hover:border-white/15 transition-all duration-200 flex items-start gap-3 group/tech select-none"
                    >
                      {/* Real Brand Logo Container */}
                      <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover/tech:border-white/30 transition-colors p-1.5">
                        {tech.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-zinc-100 tracking-tight font-sans">
                            {tech.name}
                          </span>
                          <span className="text-[8px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/5 uppercase shrink-0">
                            {tech.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1 font-sans">
                          {tech.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Telemetry Footer */}
              <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>LATENCY: {domain.latency}</span>
                </div>
                <div className="text-zinc-600 tracking-widest text-[10px]">
                  VERIFIED STACK
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Minimalist Highlights Ribbon (Breathable, Single Row) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#0d0f15]/80 via-[#07080b]/90 to-[#0d0f15]/80 backdrop-blur-xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x divide-white/[0.08] text-center">
          <div className="px-4">
            <div className="text-lg sm:text-xl font-black text-white font-sans tracking-tight">2+ Years</div>
            <div className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5 tracking-wider">DEVELOPMENT EXPERIENCE</div>
          </div>
          <div className="px-4">
            <div className="text-lg sm:text-xl font-black text-white font-sans tracking-tight">10+ Stacks</div>
            <div className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5 tracking-wider">CORE TECHNOLOGIES</div>
          </div>
          <div className="px-4">
            <div className="text-lg sm:text-xl font-black text-white font-sans tracking-tight">5+ Projects</div>
            <div className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5 tracking-wider">BUILT &amp; DEPLOYED</div>
          </div>
          <div className="px-4">
            <div className="text-lg sm:text-xl font-black text-emerald-400 font-sans tracking-tight">99.99%</div>
            <div className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5 tracking-wider">SYSTEM UPTIME</div>
          </div>
          <div className="px-4">
            <div className="text-lg sm:text-xl font-black text-white font-sans tracking-tight">&lt; 10ms</div>
            <div className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5 tracking-wider">P99 LATENCY</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
