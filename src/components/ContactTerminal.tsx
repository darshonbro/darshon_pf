"use client";

import { useState } from "react";
import { use3DCardTilt } from "@/hooks/use3DCardTilt";
import {
  Send,
  Check,
  Copy,
  ExternalLink,
  Mail,
} from "lucide-react";

interface DirectChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  badge: string;
  color: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

const DIRECT_CHANNELS: DirectChannel[] = [
  {
    id: "telegram",
    name: "Telegram",
    handle: "@darshonbro1",
    url: "https://t.me/darshonbro1",
    badge: "Fastest Direct Response",
    color: "#229ED9",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0Zm29.6 43.1L83.5 90.9c-.8 3.5-2.8 4.3-5.8 2.7L62.4 82.3l-7.4 7.1c-.8.8-1.5 1.5-3.1 1.5l1.1-15.6 28.4-25.7c1.2-1.1-.3-1.7-1.9-.6L44.1 78.4 29 73.7c-3.3-1-3.3-3.3.7-4.9l59.1-22.8c2.7-1 5.1.7 4.8 3.1Z" />
      </svg>
    ),
  },
  {
    id: "discord",
    name: "Discord",
    handle: "@darshonbro",
    url: "https://discord.com/users/1281114279948582923",
    badge: "Realtime Dev Node",
    color: "#5865F2",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M107.7 22.8A99.4 99.4 0 0 0 83.2 15a70.9 70.9 0 0 0-3.2 6.5 92.4 92.4 0 0 0-28 0A68 68 0 0 0 48.8 15a99 99 0 0 0-24.5 7.8C8.5 46.2 4.3 69 6.4 91.5a99.8 99.8 0 0 0 30.6 15.5 76 76 0 0 0 6.5-10.6 64.9 64.9 0 0 1-10.3-5 50.8 50.8 0 0 0 2.5-2c19.7 9.2 41 9.2 60.5 0a51.6 51.6 0 0 0 2.6 2c-3.3 1.9-6.8 3.6-10.4 5a76 76 0 0 0 6.5 10.6A99.6 99.6 0 0 0 125.6 91.5c2.6-26.3-4.5-49-17.9-68.7ZM43.4 77.8c-6.1 0-11.2-5.6-11.2-12.5s4.9-12.5 11.2-12.5c6.3 0 11.3 5.7 11.2 12.5 0 6.9-4.9 12.5-11.2 12.5Zm45.2 0c-6.1 0-11.2-5.6-11.2-12.5s4.9-12.5 11.2-12.5c6.3 0 11.3 5.7 11.2 12.5 0 6.9-4.9 12.5-11.2 12.5Z" />
      </svg>
    ),
  },
  {
    id: "email",
    name: "Email",
    handle: "darshon56@gmail.com",
    url: "mailto:darshon56@gmail.com",
    badge: "Direct Mail Protocol",
    color: "#FFFFFF",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function ContactTerminal() {
  const [copied, setCopied] = useState<string | null>(null);

  const cardRef = use3DCardTilt<HTMLDivElement>({
    maxTilt: 4,
    scale: 1.01,
    glowColor: "rgba(255, 255, 255,",
  });

  const copyToClipboard = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 max-w-3xl mx-auto relative select-none">
      {/* EinsamVFX Style High-Gloss Contact Shell */}
      <div
        ref={cardRef}
        className="relative rounded-[32px] bg-gradient-to-b from-[#111320]/95 via-[#090b14]/98 to-[#05060b] border border-white/15 p-7 sm:p-11 shadow-[0_30px_90px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-3xl spring-tilt-card text-center"
      >
        <div className="tilt-inner-clip flex flex-col items-center">
          {/* Eyebrow Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] sm:text-xs font-mono text-zinc-300 mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="tracking-[0.16em] uppercase">DIRECT COMMUNICATION // CHANNELS</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-sans">
            Let&apos;s Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">Together.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 max-w-md mx-auto font-sans leading-relaxed">
            Have a project in mind, need scalable architecture, or want to consult on backend systems? Reach out directly across verified nodes.
          </p>

          {/* High-Contrast Glass Node Tiles (Spacious & Cleanly Separated) */}
          <div className="w-full max-w-xl mx-auto space-y-3.5 my-8">
            {DIRECT_CHANNELS.map((ch) => {
              const Icon = ch.icon;
              return (
                <div
                  key={ch.id}
                  onClick={() => window.open(ch.url, "_blank")}
                  className="group/node relative p-4 sm:p-4.5 rounded-2xl border border-white/15 bg-gradient-to-r from-[#161a2b]/90 via-[#0e111d]/95 to-[#090b14]/90 hover:from-[#1d2338] hover:to-[#121624] hover:border-white/30 transition-all duration-300 cursor-pointer flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)]"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <div
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 group-hover/node:scale-110 transition-transform shadow-inner"
                      style={{ color: ch.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="text-left min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-sans font-bold text-white tracking-wide">
                          {ch.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 font-normal">
                          • {ch.badge}
                        </span>
                      </div>
                      <div className="text-xs sm:text-[13px] font-mono font-medium text-zinc-100 tracking-tight mt-0.5 select-all truncate">
                        {ch.handle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <button
                      type="button"
                      onClick={(e) => copyToClipboard(ch.handle, ch.id, e)}
                      title="Copy handle"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.06] border border-white/15 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                    >
                      {copied === ch.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <div
                      title="Open Link"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.06] border border-white/15 group-hover/node:bg-white group-hover/node:text-black text-zinc-400 flex items-center justify-center transition-all shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href="https://t.me/darshonbro1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow btn-sheen inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs font-sans font-bold tracking-wider text-black bg-white hover:bg-zinc-100 transition-all active:scale-95 shadow-[0_0_24px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <span>MESSAGE ON TELEGRAM</span>
              <Send className="w-3.5 h-3.5" />
            </a>

            <a
              href="mailto:darshon56@gmail.com"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs font-sans font-semibold tracking-wider text-zinc-200 hover:text-white bg-white/[0.06] hover:bg-white/15 border border-white/15 transition-all active:scale-95 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-300" />
              <span>SEND EMAIL</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
