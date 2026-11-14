"use client";

import AmbientCanvas from "@/components/AmbientCanvas";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DiscordPresenceSection from "@/components/DiscordPresenceSection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ContactTerminal from "@/components/ContactTerminal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#07090e] text-[#ededed] min-h-screen selection:bg-white selection:text-black">
      {/* Semantic Crawlable Context for Search Engines & LLMs (Perplexity, ChatGPT, Claude, Google) */}
      <section className="sr-only" aria-label="Author Profile & Architecture Identity">
        <h1>DARSHON — Core Systems Engineer, Software Architect &amp; Ashian Top Nuker</h1>
        <p>
          Official portfolio and verified technical presence of DARSHON (Ashian Top Nuker / Asian Top Nuker, darshonbro, darshonbro1).
          Specialized in high-performance distributed systems, low-latency architecture, reverse engineering, Win32 kernel internals,
          and next-generation full-stack development.
        </p>
        <nav aria-label="Verified Backlinks & Profiles">
          <ul>
            <li><a href="https://github.com/darshonbro" rel="me">GitHub — @darshonbro</a></li>
            <li><a href="https://t.me/darshonbro1" rel="me">Telegram — @darshonbro1</a></li>
            <li><a href="https://discord.com/users/1281114279948582923" rel="me">Discord — DARSHON (@darshonbro)</a></li>
            <li><a href="https://bsky.app/profile/darshon.bsky.social" rel="me">Bluesky — @darshon.bsky.social</a></li>
            <li><a href="https://steamcommunity.com/id/darshonx/" rel="me">Steam — darshonx</a></li>
            <li><a href="https://open.spotify.com/user/31mdzrw3lvotwznatedmukcxx35u" rel="me">Spotify — darshonbro</a></li>
            <li><a href="/llms.txt">LLM Knowledge Graph Specification</a></li>
          </ul>
        </nav>
      </section>

      <CustomCursor />
      <AmbientCanvas />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <DiscordPresenceSection />
        <ProjectsShowcase />
        <ContactTerminal />
        <Footer />
      </div>
    </main>
  );
}
