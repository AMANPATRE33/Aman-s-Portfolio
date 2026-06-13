// ============================================================================
// 01. NAVIGATION BAR HEADER COMPONENT
// ============================================================================

// --- IMPORTS ---
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 60));
  }, [scrollY]);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#0e0d11]/90 backdrop-blur-md border-b border-[#f97316]/15"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.03em" }}
            className="text-xl text-[#ffffff] tracking-tight hover:text-[#fdba74] transition-colors"
          >
            Aman<span className="text-[#fdba74]"> Patre</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className={`text-sm transition-colors relative group ${activeSection === link.href.replace("#", "")
                  ? "text-[#f97316]"
                  : "text-muted-foreground hover:text-[#ffffff]"
                  }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-[#f97316] to-[#ec4899] transition-all duration-300 ${activeSection === link.href.replace("#", "")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                    }`}
                />
              </a>
            ))}
            <a
              href="mailto:amanpatre33@gmail.com"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-sm px-5 py-2 border border-[#f97316]/30 text-[#f5ede4] rounded-full hover:bg-[#f97316]/10 hover:border-[#f97316]/60 hover:text-white transition-all duration-200"
            >
              Hire Me
            </a>
          </div>

          <button
            className="md:hidden text-[#f5ede4] hover:text-[#fdba74] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className={`fixed top-[64px] left-0 right-0 z-40 bg-[#0e0d11]/95 backdrop-blur-md border-b border-[#f97316]/15 md:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-muted-foreground hover:text-[#f97316] transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:amanpatre33@gmail.com"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-center text-sm mt-2 px-5 py-2.5 border border-[#f97316]/30 text-[#f5ede4] rounded-full hover:bg-[#f97316]/10 hover:border-[#f97316]/60 hover:text-white transition-all duration-200"
            onClick={() => setMobileOpen(false)}
          >
            Hire Me
          </a>
        </div>
      </motion.div>
    </>
  );
}
