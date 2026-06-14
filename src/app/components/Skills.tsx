// ============================================================================
// 07. TECHNICAL SKILLS & TOOLKIT COMPONENT
// ============================================================================

// --- IMPORTS ---
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Code2, Layout, Server, Cloud } from "lucide-react";
import { SubtleSectionSpotlight } from "./SubtleSectionSpotlight";

const SKILL_GROUPS = [
  {
    category: "Languages & Querying",
    Icon: Code2,
    color: "#f97316",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "SQL", level: "Advanced" },
      { name: "Power BI", level: "Project Experience" },
    ],
  },
  {
    category: "Machine Learning & AI",
    Icon: Layout,
    color: "#ec4899",
    skills: [
      { name: "Scikit-learn", level: "Advanced" },
      { name: "Predictive & Clustering ML", level: "Project Experience" },
      { name: "Computer Vision (OpenCV)", level: "Working Knowledge" },
      { name: "TensorFlow / PyTorch", level: "Working Knowledge" },
    ],
  },
  {
    category: "Data Analytics & Vis",
    Icon: Server,
    color: "#fdba74",
    skills: [
      { name: "Power BI", level: "Project Experience" },
      { name: "Streamlit Development", level: "Advanced" },
      { name: "Pandas & NumPy", level: "Advanced" },
      { name: "Plotly / Matplotlib / Seaborn", level: "Project Experience" },
    ],
  },
  {
    category: "Cloud & Web Platforms",
    Icon: Cloud,
    color: "#fbbf24",
    skills: [
      { name: "Supabase (PostgreSQL)", level: "Project Experience" },
      { name: "Vercel / Git / GitHub", level: "Daily Use" },
      { name: "Google Cloud / Colab", level: "Working Knowledge" },
    ],
  },
];

function SkillBar({
  skill,
  color,
  index,
  groupInView,
}: {
  skill: { name: string; level: string };
  color: string;
  index: number;
  groupInView: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-sm text-[#eaf1fb]"
        >
          {skill.name}
        </span>
        <span
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="text-xs text-[#a1a1aa]"
        >
          {skill.level}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={groupInView ? { width: "100%" } : { width: "0%" }}
          transition={{
            duration: 1.2,
            delay: 0.4 + index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}90, ${color})`,
            boxShadow: `0 0 8px ${color}50`,
          }}
        />
      </div>
    </div>
  );
}

function SkillGroup({
  group,
  index,
}: {
  group: (typeof SKILL_GROUPS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl border border-[#f97316]/10 p-4 sm:p-6 md:p-8 hover:border-[#f97316]/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all duration-300"
      style={{ background: "rgba(24, 22, 29, 0.75)" }}
    >
      {/* Group header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/8"
          style={{ background: `${group.color}18` }}
        >
          <group.Icon size={16} style={{ color: group.color }} />
        </div>
        <span
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#ffffff", fontWeight: 700, letterSpacing: "-0.02em" }}
          className="text-lg"
        >
          {group.category}
        </span>
      </div>

      {group.skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          skill={skill}
          color={group.color}
          index={i}
          groupInView={inView}
        />
      ))}
    </motion.div>
  );
}

const TOOLS = [
  "Jupyter Notebook", "Git & GitHub", "Google Colab", "joblib / Dill",
  "Excel (Advanced)", "EDA", "Statistical Analysis", "RFM Analysis",
  "Cohort Analysis", "A/B Testing", "Power BI", "Vercel"
];

export function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsInView = useInView(toolsRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden py-16 sm:py-24 md:py-32"
      style={{
        background: "linear-gradient(to bottom, #0e0d11, #18161d)",
      }}
    >
      <SubtleSectionSpotlight containerRef={sectionRef} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
            05 / Technical Skills
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
            Tools of the{" "}
            <span
              style={{ fontStyle: "italic", color: "transparent" }}
              className="[-webkit-text-stroke:1px_rgba(249,115,22,0.7)]"
            >
              Trade
            </span>
          </h2>
          <div className="mt-4 w-12 h-[1px] bg-gradient-to-r from-[#f97316]/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {SKILL_GROUPS.map((group, i) => (
            <SkillGroup key={group.category} group={group} index={i} />
          ))}
        </div>

        {/* Other tools */}
        <motion.div
          ref={toolsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={toolsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-[#f97316]/10 p-4 sm:p-6 md:p-8 hover:border-[#f97316]/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all duration-300"
          style={{ background: "rgba(24, 22, 29, 0.75)" }}
        >
          <h4
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[10px] tracking-[0.4em] uppercase text-[#fdba74]/80 mb-5 font-semibold"
          >
            Daily Tools & Environment
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {TOOLS.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={toolsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.05 + 0.2, type: "spring", stiffness: 200 }}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-sm px-4 py-2 rounded-full border border-white/8 text-muted-foreground hover:border-[#f97316]/40 hover:text-[#fdba74] hover:bg-[#f97316]/5 transition-all duration-200 cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
