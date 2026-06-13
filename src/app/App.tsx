// ============================================================================
// 00. MAIN APPLICATION ROUTER & ROOT CONTAINER
// ============================================================================

// --- IMPORTS ---
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";
import { InteractivePet } from "./components/InteractivePet";

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090f]">
      {/* 01. NAVIGATION HEADER */}
      <Navbar />
      
      <main>
        {/* 02. HERO / INTRODUCTION SECTION */}
        <Hero />
        
        {/* 03. ABOUT ME / CORE STATS SECTION */}
        <About />
        
        {/* 04. PROFESSIONAL EXPERIENCE SECTION */}
        <Experience />
        
        {/* 05. PORTFOLIO PROJECTS SECTION */}
        <Projects />
        
        {/* 06. ACADEMIC EDUCATION & CERTS SECTION */}
        <Education />
        
        {/* 07. TECHNICAL SKILLS & TOOLS SECTION */}
        <Skills />
        
        {/* 08. CONTACT INFO & FOOTER SECTION */}
        <Footer />
      </main>
      
      {/* 09. INTERACTIVE COMPANION (MINECRAFT PET) */}
      <InteractivePet />
    </div>
  );
}

