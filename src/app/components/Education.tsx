// ============================================================================
// 06. ACADEMIC EDUCATION & CERTS TIMELINE COMPONENT
// ============================================================================

// --- IMPORTS ---
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, BookOpen, Users } from "lucide-react";
import { SubtleSectionSpotlight } from "./SubtleSectionSpotlight";

const EDUCATION = [
  {
    degree: "B.E. Computer Engineering",
    school: "UPL University of Sustainable Technology, Gujarat",
    short: "UPL University",
    period: "2022 — 2026",
    gpa: "9.16 / 10",
    logo: "UPL",
    accent: "#f97316",
    coursework: [
      "Machine Learning",
      "Database Management Systems (DBMS)",
      "Data Mining",
      "Probability & Statistics",
      "Artificial Intelligence",
      "Data Structures & Algorithms",
    ],
    activities: [
      { icon: BookOpen, text: "Developed Smart Anna Intelligent Cafeteria platform" },
      { icon: Users, text: "Completed Deloitte Australia Data Analytics simulation" },
      { icon: Award, text: "Academic Excellence with 9.25 SPI in 7th Semester" },
    ],
  },
];

const CERTS = [
  {
    name: "Python For Data Visualization",
    issuer: "Udemy",
    year: "2025",
    color: "#f97316",
    link: "https://www.udemy.com/certificate/UC-b8c0f712-9100-4792-8526-cd46a72ab16e/",
  },
  {
    name: "Data Analysis Using Python",
    issuer: "IBM",
    year: "2025",
    color: "#ec4899",
    link: "https://www.credly.com/badges/5a06342b-6b08-48d4-b2cd-4d271b794ce4",
  },
  {
    name: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
    year: "2025",
    color: "#fdba74",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_eHLw3zZqbxoE2JZYj_1755105474761_completion_certificate.pdf",
  },
];

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative overflow-hidden py-16 sm:py-24 md:py-32"
      style={{ background: "#0e0d11" }}
    >
      <SubtleSectionSpotlight containerRef={sectionRef} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[#fdba74]/80 text-xs tracking-[0.4em] uppercase font-semibold"
          >
            04 / Education
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
            Academic{" "}
            <span
              style={{ fontStyle: "italic", color: "transparent" }}
              className="[-webkit-text-stroke:1px_rgba(249,115,22,0.7)]"
            >
              Foundation
            </span>
          </h2>
          <div className="mt-4 w-12 h-[1px] bg-gradient-to-r from-[#f97316]/50 to-transparent" />
        </motion.div>

        {EDUCATION.map((edu, idx) => (
          <motion.div
            key={edu.school}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-3xl border border-[#f97316]/10 overflow-hidden mb-8 hover:border-[#f97316]/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all duration-300"
            style={{ background: "rgba(24, 22, 29, 0.75)" }}
          >
            {/* Header */}
            <div
              className="px-4 py-6 sm:px-8 sm:py-8 border-b border-[#f97316]/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(236,72,153,0.02) 100%)",
              }}
            >
              <div className="flex flex-wrap items-start gap-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10"
                  style={{ background: `${edu.accent}20` }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "var(--primary)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {edu.logo}
                  </span>
                </div>
                <div className="flex-1">
                  <h3
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#ffffff", fontWeight: 700, letterSpacing: "-0.02em" }}
                    className="text-2xl md:text-3xl mb-1"
                  >
                    {edu.degree}
                  </h3>
                  <p
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className="text-primary font-semibold mb-2"
                  >
                    {edu.school}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      className="text-[#a1a1aa] text-xs"
                    >
                      {edu.period}
                    </span>
                    <span
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      className="text-[#fdba74] text-xs"
                    >
                      GPA {edu.gpa}
                    </span>
                    <span
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      className="text-[#f97316] text-xs"
                    >
                      {edu.honors}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-8">
              {/* Coursework */}
              <div>
                <h4
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-[10px] tracking-[0.4em] uppercase text-[#a1a1aa] mb-4 font-semibold"
                >
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#f97316]/5 border border-white/5 text-muted-foreground hover:border-[#f97316]/40 hover:text-[#fdba74] transition-colors"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <h4
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-[10px] tracking-[0.4em] uppercase text-[#a1a1aa] mb-4 font-semibold"
                >
                  Activities & Honors
                </h4>
                <div className="space-y-3">
                  {edu.activities.map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={12} className="text-[#f97316]" />
                      </div>
                      <p
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        className="text-muted-foreground text-sm leading-relaxed"
                      >
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <h4
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[10px] tracking-[0.4em] uppercase text-[#fdba74]/80 mb-6 font-semibold"
          >
            Certifications
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CERTS.map((cert) => (
              <a
                key={cert.name}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[#f97316]/10 p-4 sm:p-5 hover:border-[#f97316]/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all duration-300 block hover:-translate-y-1 transform cursor-pointer"
                style={{ background: "rgba(24, 22, 29, 0.75)" }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: cert.color }}
                  />
                  <span className="text-[#a1a1aa] hover:text-[#ffffff] transition-colors text-[10px] uppercase font-bold tracking-wider">
                    Verify ↗
                  </span>
                </div>
                <p
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#ffffff" }}
                  className="text-sm font-semibold mb-1"
                >
                  {cert.name}
                </p>
                <p
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-[#a1a1aa] text-xs"
                >
                  {cert.issuer} · {cert.year}
                </p>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
