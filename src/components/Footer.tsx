"use client";

import {
  ArrowUp,
  ArrowRight,
} from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

const SOCIAL_LINKS_ROW1: SocialLink[] = [
  {
    name: "Telegram",
    url: "https://t.me/darshonbro1",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0Zm29.6 43.1L83.5 90.9c-.8 3.5-2.8 4.3-5.8 2.7L62.4 82.3l-7.4 7.1c-.8.8-1.5 1.5-3.1 1.5l1.1-15.6 28.4-25.7c1.2-1.1-.3-1.7-1.9-.6L44.1 78.4 29 73.7c-3.3-1-3.3-3.3.7-4.9l59.1-22.8c2.7-1 5.1.7 4.8 3.1Z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    url: "https://discord.com/users/1281114279948582923",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M107.7 22.8A99.4 99.4 0 0 0 83.2 15a70.9 70.9 0 0 0-3.2 6.5 92.4 92.4 0 0 0-28 0A68 68 0 0 0 48.8 15a99 99 0 0 0-24.5 7.8C8.5 46.2 4.3 69 6.4 91.5a99.8 99.8 0 0 0 30.6 15.5 76 76 0 0 0 6.5-10.6 64.9 64.9 0 0 1-10.3-5 50.8 50.8 0 0 0 2.5-2c19.7 9.2 41 9.2 60.5 0a51.6 51.6 0 0 0 2.6 2c-3.3 1.9-6.8 3.6-10.4 5a76 76 0 0 0 6.5 10.6A99.6 99.6 0 0 0 125.6 91.5c2.6-26.3-4.5-49-17.9-68.7ZM43.4 77.8c-6.1 0-11.2-5.6-11.2-12.5s4.9-12.5 11.2-12.5c6.3 0 11.3 5.7 11.2 12.5 0 6.9-4.9 12.5-11.2 12.5Zm45.2 0c-6.1 0-11.2-5.6-11.2-12.5s4.9-12.5 11.2-12.5c6.3 0 11.3 5.7 11.2 12.5 0 6.9-4.9 12.5-11.2 12.5Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/darshonbro",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64 0C28.6 0 0 28.6 0 64c0 28.3 18.3 52.3 43.8 60.8 3.2.6 4.4-1.4 4.4-3.1 0-1.5-.1-5.6-.1-11-17.8 3.9-21.6-8.6-21.6-8.6-2.9-7.4-7.1-9.4-7.1-9.4-5.8-4 .4-3.9.4-3.9 6.4.5 9.8 6.6 9.8 6.6 5.7 9.8 15 7 18.6 5.3.6-4.1 2.2-7 4.1-8.6-14.2-1.6-29.2-7.1-29.2-31.6 0-7 2.5-12.7 6.6-17.2-.7-1.6-2.9-8.1.6-17 0 0 5.4-1.7 17.6 6.6 5.1-1.4 10.6-2.1 16-2.2 5.4.1 10.9.8 16 2.2 12.2-8.3 17.6-6.6 17.6-6.6 3.5 8.9 1.3 15.4.6 17 4.1 4.5 6.6 10.2 6.6 17.2 0 24.6-15 30-29.3 31.6 2.3 2 4.4 5.9 4.4 11.9 0 8.6-.1 15.5-.1 17.6 0 1.7 1.2 3.7 4.4 3.1C109.7 116.3 128 92.3 128 64c0-35.4-28.6-64-64-64Z" />
      </svg>
    ),
  },
];

const SOCIAL_LINKS_ROW2: SocialLink[] = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/user/31mdzrw3lvotwznatedmukcxx35u?si=9092e0fecce54bb9",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0Zm29.4 92.3c-1.1 1.9-3.6 2.5-5.5 1.3-15.1-9.2-34.1-11.3-56.5-6.2-2.2.5-4.3-.9-4.8-3.1-.5-2.2.9-4.3 3.1-4.8 24.5-5.6 45.6-3.2 62.4 7.1 1.9 1.2 2.5 3.7 1.3 5.7Zm7.8-17.4c-1.4 2.3-4.5 3.1-6.8 1.6-17.3-10.6-43.6-13.7-64.1-7.5-2.6.8-5.4-.7-6.2-3.3-.8-2.6.7-5.4 3.3-6.2 23.4-7.1 52.4-3.7 72.2 8.5 2.4 1.5 3.1 4.6 1.6 6.9Zm.7-18.1C80 43.7 49 42.6 31.1 48c-3.3 1-6.8-.9-7.8-4.2-1-3.3.9-6.8 4.2-7.8 20.9-6.3 55.1-5.1 77.8 8.4 3 1.8 3.9 5.6 2.2 8.5-1.8 3-5.7 3.9-8.6 2.1Z" />
      </svg>
    ),
  },
  {
    name: "Steam",
    url: "https://steamcommunity.com/id/darshonx/",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64 0C28.9 0 .4 28.3 0 63.3l34.4 14.2c2.9-2.2 6.5-3.5 10.5-3.5 1.4 0 2.7.2 4 .5l18.8-27.3c-.1-.7-.2-1.5-.2-2.3 0-12.7 10.3-23 23-23s23 10.3 23 23-10.3 23-23 23c-.7 0-1.4-.1-2.1-.2L61.2 95.1c.3 1.2.5 2.4.5 3.7 0 9.5-7.7 17.2-17.2 17.2-7.8 0-14.3-5.2-16.4-12.3L1.5 93.3C9.5 113.6 29.4 128 52.8 128c35.3 0 64-28.7 64-64S88.1 0 52.8 0H64Zm26.5 67.9c-8.5 0-15.4-6.9-15.4-15.4s6.9-15.4 15.4-15.4 15.4 6.9 15.4 15.4-6.9 15.4-15.4 15.4Zm0-23.1c-4.2 0-7.7 3.5-7.7 7.7s3.5 7.7 7.7 7.7 7.7-3.5 7.7-7.7-3.4-7.7-7.7-7.7Z" />
      </svg>
    ),
  },
];

const SOCIAL_LINKS_ROW3: SocialLink[] = [
  {
    name: "SoundCloud",
    url: "https://soundcloud.com/darshonbro",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M108 52c-1.3 0-2.6.2-3.8.5C101.4 36.3 88.5 28 73.6 28c-12 0-22.8 5.4-28.9 14.1-1.6-.4-3.2-.6-4.9-.6-12.3 0-22.5 9.1-24.1 21.1C6.9 64.8 0 73.6 0 84c0 13.3 10.7 24 24 24h84c11 0 20-9 20-20s-9-36-20-36z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:darshon56@gmail.com",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full px-4 pb-12 pt-8">
      {/* Outer Shell Card Matching Reference */}
      <div className="max-w-7xl mx-auto rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#0f111a]/95 via-[#08090f]/98 to-[#05060a] border border-white/10 p-7 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl">
        {/* Ambient Top-Right Studio Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12)_0%,transparent_70%)] blur-[100px] pointer-events-none -z-0" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* =================================================================
              LEFT COLUMN (6 COLS): BRAND, TAGLINE & SOCIAL PILLS (3 ROWS)
              ================================================================= */}
          <div className="md:col-span-12 lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand Header */}
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 bg-gradient-to-b from-white/40 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.15)] shrink-0">
                  <div className="w-full h-full rounded-full bg-[#0d0f17] border border-white/25 overflow-hidden flex items-center justify-center">
                    <img
                      src="/avatar.gif"
                      alt="Darshon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Realtime Online Indicator */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-wider font-sans">
                  DARSHON<span className="text-sky-400">.</span>
                </h3>
              </div>

              {/* Tagline */}
              <p className="text-sm text-zinc-400 font-sans mt-3.5 max-w-md leading-relaxed">
                Engineering scalable systems, core architecture, and modern high-performance digital platforms.
              </p>
            </div>

            {/* Social Pill Buttons (3 Rows Matching Reference Layout) */}
            <div className="space-y-2.5 pt-2">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center gap-2">
                {SOCIAL_LINKS_ROW1.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.12] hover:border-white/25 text-xs font-sans font-medium text-zinc-300 hover:text-white transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                      <span>{s.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap items-center gap-2">
                {SOCIAL_LINKS_ROW2.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.12] hover:border-white/25 text-xs font-sans font-medium text-zinc-300 hover:text-white transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                      <span>{s.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Row 3 */}
              <div className="flex flex-wrap items-center gap-2">
                {SOCIAL_LINKS_ROW3.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.12] hover:border-white/25 text-xs font-sans font-medium text-zinc-300 hover:text-white transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                      <span>{s.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =================================================================
              MIDDLE COLUMN (3 COLS): EXPLORE LINKS
              ================================================================= */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
              EXPLORE
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <a
                  href="#hero"
                  className="text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transition-transform"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#discord-hub"
                  className="text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transition-transform"
                >
                  Presence
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transition-transform"
                >
                  Showcase
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transition-transform"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* =================================================================
              RIGHT COLUMN (3 COLS): GET IN TOUCH & CTA BUTTON
              ================================================================= */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
              GET IN TOUCH
            </h4>
            <div className="text-sm text-zinc-400 font-sans leading-relaxed space-y-1">
              <p>Ready to build high-performance systems?</p>
              <p>Initiate direct consultation.</p>
            </div>

            {/* Glowing CTA Button Matching Reference Shape & Color */}
            <div className="pt-2">
              <a
                href="#contact"
                className="btn-sheen inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-sans font-bold tracking-wider text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:brightness-110 shadow-[0_0_24px_rgba(99,102,241,0.45)] transition-all active:scale-95 cursor-pointer"
              >
                <span>BOOK A CALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM COPYRIGHT BAR & RETURN TO TOP
            =================================================================== */}
        <div className="relative z-10 border-t border-white/[0.08] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-500">
          <p className="text-center sm:text-left">
            &copy; 2026 DARSHON. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs font-mono"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
