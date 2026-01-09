"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";

// Dynamic import to avoid SSR issues with 3D context
const FloatingDataCubes = dynamic(() => import("@/components/3d/FloatingDataCubes"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-950 selection:bg-primary-500/30 selection:text-white">
      {/* Global 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <FloatingDataCubes />
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-900/80 to-dark-950/90 pointer-events-none" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <ScrollProgress />
        <CustomCursor />
        <Navbar />

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </div>
    </main>
  );
}

