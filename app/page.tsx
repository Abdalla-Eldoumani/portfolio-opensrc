import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/ui/scroll-progress";

// Lazy-load below-fold sections to reduce initial bundle size
const About = dynamic(() => import("@/components/about").then(mod => ({ default: mod.About })), {
  loading: () => <div className="min-h-[80vh]" />,
});
const Skills = dynamic(() => import("@/components/skills").then(mod => ({ default: mod.Skills })), {
  loading: () => <div className="min-h-[100vh]" />,
});
const Experience = dynamic(() => import("@/components/experience").then(mod => ({ default: mod.Experience })), {
  loading: () => <div className="min-h-[80vh]" />,
});
const Projects = dynamic(() => import("@/components/projects").then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="min-h-[80vh]" />,
});
const Contact = dynamic(() => import("@/components/contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="min-h-[60vh]" />,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <ScrollProgress />
      <Navbar />
      <CommandPalette />

      <main id="main">
        <section id="home">
          <HeroSection />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}
