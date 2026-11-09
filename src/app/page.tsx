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
