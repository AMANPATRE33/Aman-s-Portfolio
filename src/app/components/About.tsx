// ============================================================================
// 03. ABOUT ME / CORE STATS SECTION COMPONENT
// ============================================================================

// --- IMPORTS ---
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SubtleSectionSpotlight } from "./SubtleSectionSpotlight";

// --- SECTION DATA CONFIG ---
const STATS = [
  { value: "9.16", label: "Overall CGPA" },
  { value: "2.2k+", label: "Records Clustered" },
  { value: "5+", label: "End-to-End Projects" },
  { value: "200+", label: "IoT Anomalies Identified" },
];

export function About() {
  // --- SCROLL ANIMATION & LAYOUT HOOKS ---
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-16 sm:py-24 md:py-32"
      style={{
        background:
          "linear-gradient(to bottom, #0e0d11 0%, #18161d 50%, #0e0d11 100%)",
      }}
    >
      {/* BACKGROUND CURSOR SPOTLIGHT */}
      <SubtleSectionSpotlight containerRef={sectionRef} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* ========================================================== */}
          {/* SUB-SECTION: LEFT COLUMN - BIOGRAPHY TEXT                  */}
          {/* ========================================================== */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-[#fdba74]/80 text-xs tracking-[0.4em] uppercase font-semibold"
              >
                01 / About Me
              </span>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#ffffff",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
                className="mt-2 leading-none"
              >
                Personal{" "}
                <span
                  style={{ fontStyle: "italic", color: "transparent" }}
                  className="[-webkit-text-stroke:1px_rgba(249,115,22,0.7)]"
                >
                  Journey
                </span>
              </h2>
              <div className="mt-4 w-12 h-[1px] bg-gradient-to-r from-[#f97316]/50 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="mt-8 space-y-6 text-[#9ca3af] text-base md:text-lg leading-relaxed font-normal"
            >
              <p>
                Hello! I am Aman Patre, a passionate Data Scientist and Machine Learning Engineer. I graduated in Computer Engineering with a strong focus on building highly scalable, data-driven systems.
              </p>
              <p>
                I care deeply about building end-to-end machine learning pipelines, clustering models, and production-ready data solutions that drive real business outcomes.
              </p>
            </motion.div>

            {/* INTEREST TAGS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {[
                "Data Science",
                "Machine Learning",
                "Predictive Analytics",
                "Process Optimization",
                "Data Analyst",
                "Data Visualization",
                "Statistics",
              ].map((interest) => (
                <span
                  key={interest}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-[10px] px-3 py-1.5 rounded-full border border-[#f97316]/20 text-[#fdba74] bg-[#f97316]/5 tracking-wide"
                >
                  {interest}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ========================================================== */}
          {/* SUB-SECTION: RIGHT COLUMN - STATISTICS GRID                */}
          {/* ========================================================== */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl border border-[#f97316]/10 p-4 sm:p-6 md:p-8 hover:border-[#f97316]/35 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all duration-300 group"
                style={{ background: "rgba(24,22,29,0.75)" }}
              >
                <div
                  className="mb-2 group-hover:scale-105 transition-transform duration-300 origin-left bg-gradient-to-r from-[#f97316] to-[#ec4899] bg-clip-text text-transparent font-extrabold"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-muted-foreground text-sm"
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
