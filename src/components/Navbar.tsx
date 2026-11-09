"use client";

import { useState, useEffect } from "react";
import { Terminal, X, Menu, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/avatar.gif");

  useEffect(() => {
    // Fetch live avatar from Discord API with safe local fallback
    fetch("/api/discord?userId=1281114279948582923")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data?.avatarUrl) {
          setAvatarUrl(json.data.avatarUrl);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["hero", "discord-hub", "projects", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "discord-hub", label: "Presence" },
    { id: "projects", label: "Showcase" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* ===================================================================
          EINSAMVFX STYLE FLOATING PILL DOCK NAVBAR (Guaranteed Visibility)
          =================================================================== */}
      <header
        className={`fixed top-3 sm:top-5 inset-x-0 mx-auto w-fit max-w-[94vw] z-50 transition-all duration-300 ${
          scrolled ? "scale-[0.98] -translate-y-1" : "scale-100"
        }`}
      >
        <nav
          className="relative flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-5 py-2 rounded-full bg-[#090b12]/90 border border-white/15 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(255,255,255,0.04)]"
          aria-label="Main Navigation"
        >
          {/* 1. BRAND AVATAR LOGO */}
          <a
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer select-none"
            aria-label="Darshon Home"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0.5 bg-gradient-to-b from-white/40 to-transparent group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-[#0d0f17] border border-white/20 overflow-hidden flex items-center justify-center">
                <img
                  src={avatarUrl}
                  alt="Darshon"
                  className="w-full h-full object-cover"
                  onError={() => setAvatarUrl("/avatar.gif")}
                />
              </div>
              {/* Online Pulse Dot */}
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-black shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
            <span className="font-sans font-bold tracking-tight text-xs sm:text-sm text-white group-hover:text-zinc-200 transition-colors">
              DARSHON
            </span>
          </a>

          {/* 2. CENTER PILL LINKS (Desktop) */}
          <ul className="hidden md:flex items-center gap-1 bg-black/50 border border-white/[0.08] rounded-full p-1 text-xs font-sans font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`relative px-3.5 py-1.5 rounded-full transition-all duration-300 block select-none ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-white/[0.14] border border-white/20 backdrop-blur-md shadow-[0_2px_12px_rgba(255,255,255,0.08)] -z-10" />
                    )}
                    <span className="flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
                      )}
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* 3. RIGHT HIGH-GLOSS CTA BUTTON */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="btn-glow btn-sheen relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wide text-black bg-white hover:bg-zinc-100 transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.25)] select-none"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3 h-3 text-black/70" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ===================================================================
          MOBILE FLOATING MENU OVERLAY
          =================================================================== */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/85 backdrop-blur-2xl flex flex-col items-center justify-center px-6"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-[#0c0e17]/98 border border-white/15 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="font-bold text-sm text-white tracking-widest font-sans">
                  DARSHON
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? "bg-white/10 text-white font-semibold border border-white/15"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                  )}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-2xl bg-white text-black font-semibold text-xs tracking-wider uppercase shadow-[0_0_24px_rgba(255,255,255,0.3)] mt-2"
            >
              Start Project // Connect
            </a>
          </div>
        </div>
      )}
    </>
  );
}
