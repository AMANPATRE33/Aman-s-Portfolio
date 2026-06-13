// ============================================================================
// 04. PROFESSIONAL EXPERIENCE TIMELINE COMPONENT
// ============================================================================

// --- IMPORTS ---
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SubtleSectionSpotlight } from "./SubtleSectionSpotlight";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

const EXPERIENCES = [
  {
    id: 1,
    role: "Data Science Intern",
    company: "UPL Limited",
    period: "July 2025 — September 2025",
    location: "Gujarat, India",
    accent: "#f97316",
    logo: "U",
    highlights: [
      "Cleaned and analyzed 3+ industrial IoT sensor datasets using Python (Pandas, NumPy), identifying 200+ anomalous records across shift-level production logs to surface actionable operational inefficiencies.",
      "Built optimization models across 6 operational parameters, improving plant energy efficiency KPIs and reducing manual reporting effort for weekly cross-departmental reviews.",
      "Developed 3 interactive Power BI dashboards tracking real-time energy consumption metrics, adopted by 2 engineering departments for daily operational decision-making.",
      "Annotated 1,000+ video frames with structured quality criteria to build training datasets for a computer vision analytics pipeline, maintaining defect-log documentation throughout.",
    ],
    skills: ["Python", "Pandas", "NumPy", "Power BI", "IoT", "Data Science", "Computer Vision"],
  },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex gap-3 sm:gap-6 md:gap-10"
    >
      {/* Timeline dot & line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
          className="relative w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border"
          style={{ background: `${exp.accent}12`, borderColor: `${exp.accent}30` }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: exp.accent,
              fontSize: "1.1rem",
              fontWeight: 700,
            }}
          >
            {exp.logo}
          </span>
          {/* Glow dot */}
          <div
            className="absolute inset-0 rounded-full opacity-25 blur-md"
            style={{ background: exp.accent }}
          />
        </motion.div>
        {index < EXPERIENCES.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
            className="w-[1px] flex-1 mt-4 origin-top"
            style={{
              background: `linear-gradient(to bottom, ${exp.accent}30 0%, transparent 100%)`,
              minHeight: 60,
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-12 pb-2 rounded-2xl border border-[#f97316]/10 p-4 sm:p-6 md:p-8 hover:border-[#f97316]/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all duration-300 group"
        style={{ background: "rgba(24, 22, 29, 0.75)" }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <h3
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#ffffff", fontWeight: 700, letterSpacing: "-0.02em" }}
              className="text-xl md:text-2xl mb-1"
            >
              {exp.role}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <span
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: exp.accent }}
                className="font-semibold"
              >
                {exp.company}
              </span>
              <span className="text-[#a1a1aa] text-xs">·</span>
              <span
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-[#a1a1aa] text-xs flex items-center gap-1"
              >
                <Calendar size={11} />
                {exp.period}
              </span>
              <span
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-[#a1a1aa] text-xs flex items-center gap-1"
              >
                <MapPin size={11} />
                {exp.location}
              </span>
            </div>
          </div>
          <a
            href="#"
            className="text-[#a1a1aa] hover:text-[#ffffff] transition-colors opacity-0 group-hover:opacity-100"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Highlights */}
        <ul className="space-y-2.5 mb-6">
          {exp.highlights.map((h, i) => (
            <li
              key={i}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-[#9ca3af] text-sm leading-relaxed flex gap-3"
            >
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: exp.accent }}
              />
              {h}
            </li>
          ))}
        </ul>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                borderColor: `${exp.accent}30`,
                color: "#cbd5e1",
              }}
              className="text-[10px] px-2.5 py-1 rounded-full border tracking-wide bg-[#f97316]/5 hover:bg-[#f97316]/15 hover:text-white transition-all cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden py-16 sm:py-24 md:py-32 bg-[#0e0d11]"
    >
      <SubtleSectionSpotlight containerRef={sectionRef} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[#fdba74]/80 text-xs tracking-[0.4em] uppercase font-semibold"
          >
            02 / Work History
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
            Where I've{" "}
            <span
              style={{ fontStyle: "italic", color: "transparent" }}
              className="[-webkit-text-stroke:1px_rgba(249,115,22,0.7)]"
            >
              Worked
            </span>
          </h2>
          <div className="mt-4 w-12 h-[1px] bg-gradient-to-r from-[#f97316]/50 to-transparent" />
        </motion.div>

        <div>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
