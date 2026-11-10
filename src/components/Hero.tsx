"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiveCodingActivity from "@/components/LiveCodingActivity";

const TITLE_LETTERS = ["D", "A", "R", "S", "H", "O", "N"];

const SUBTITLE_WORDS = [
  "FULL-STACK DEVELOPER",
  "•",
  "BACKEND ENGINEER",
  "•",
  "SYSTEM BUILDER",
];

const BIO_TEXT =
  "Building modern web applications, scalable backend systems, and powerful digital experiences. Focused on clean architecture, performance, automation, and turning complex ideas into reality.";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // =========================================================================
  // STAGE 1 (PROGRESS 0.0 -> 0.22): ONLY "DARSHON"
  // Initially only the massive typographic DARSHON fills the 100vh screen.
  // As user starts scrolling, it smoothly dissolves into darkness without clipping.
  // =========================================================================
  const s1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.22], [1, 1, 0]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.22], [1, 0.90]);
  const s1Y = useTransform(scrollYProgress, [0, 0.22], [0, -30]);
  const s1Display = useTransform(scrollYProgress, (p) => (p > 0.25 ? "none" : "flex"));

  // =========================================================================
  // STAGE 2 (PROGRESS 0.12 -> 1.0): IDENTITY, BIO & LIVE PRESENCE HUD
  // As DARSHON dissolves, Stage 2 smoothly emerges with generous overlap.
  // =========================================================================
  const s2Opacity = useTransform(
    scrollYProgress,
    [0.12, 0.24, 0.90, 1.0],
    [0, 1, 1, 0]
  );
  const s2Y = useTransform(
    scrollYProgress,
    [0.12, 0.24, 0.90, 1.0],
    [25, 0, 0, -30]
  );
  const s2Scale = useTransform(
    scrollYProgress,
    [0.12, 0.24, 0.90, 1.0],
    [0.96, 1, 1, 0.95]
  );
  const s2Display = useTransform(scrollYProgress, (p) => (p < 0.10 ? "none" : "flex"));
  const s2PointerEvents = useTransform(scrollYProgress, (p) =>
    p >= 0.14 && p <= 0.98 ? "auto" : "none"
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[125vh] bg-transparent select-none"
    >
      {/* Sticky Fullscreen Frame (Pins at top while scrolling through the track) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4">
        {/* ===================================================================
            STAGE 1: FULLSCREEN ONLY "DARSHON"
            Crisp Metallic Typography with Staggered Letter Reveal (Zero Clipping / Zero White Bloom)
            =================================================================== */}
        <motion.div
          style={{
            opacity: s1Opacity,
            scale: s1Scale,
            y: s1Y,
            display: s1Display,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4"
        >
          <div className="text-center">
            <h1 className="text-[17vw] sm:text-[15vw] lg:text-[13vw] font-black tracking-normal sm:tracking-[0.01em] leading-none font-sans select-none flex items-center justify-center">
              {TITLE_LETTERS.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 36, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 select-none px-[0.03em] will-change-transform"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>
        </motion.div>

        {/* ===================================================================
            STAGE 2: REST OF THE DATA
            Smoothly emerges, holds center stage, and dissolves as user scrolls
            =================================================================== */}
        <motion.div
          style={{
            opacity: s2Opacity,
            scale: s2Scale,
            y: s2Y,
            display: s2Display,
            pointerEvents: s2PointerEvents,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20"
        >
          <div className="w-full max-w-4xl flex flex-col items-center text-center space-y-6 pt-16 sm:pt-12">
            {/* Subtitle / Core Engineering Identifiers with Staggered Word Reveal */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 font-sans font-semibold text-xs sm:text-sm tracking-[0.22em] text-zinc-400 uppercase">
              {SUBTITLE_WORDS.map((item, idx) => {
                if (item === "•") {
                  return (
                    <span
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full bg-zinc-600 inline-block"
                    />
                  );
                }
                return (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.08 + idx * 0.04 }}
                    className="inline-block"
                  >
                    {item}
                  </motion.span>
                );
              })}
            </div>

            {/* Developer Philosophy & Bio with Word-by-Word Reveal */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-sans font-normal leading-relaxed max-w-2xl mx-auto px-2">
              {BIO_TEXT.split(" ").map((word, wIdx) => (
                <motion.span
                  key={wIdx}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.12 + wIdx * 0.015,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-1.5"
                >
                  {word}
                </motion.span>
              ))}
            </p>

            {/* Live IDE / Antigravity / VS Code Presence HUD */}
            <div className="w-full pt-2">
              <LiveCodingActivity />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
