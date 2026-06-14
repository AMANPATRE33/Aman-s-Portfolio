// ============================================================================
// 05. PORTFOLIO SELECTED PROJECTS GRID COMPONENT
// ============================================================================

// --- IMPORTS ---
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Github, ExternalLink, Star } from "lucide-react";
import { SubtleSectionSpotlight } from "./SubtleSectionSpotlight";

const PROJECTS = [
  {
    id: 1,
    name: "Customer Segmentation Engine",
    tagline: "Unsupervised ML & Behavior Modeling",
    description:
      "Built an unsupervised ML pipeline on 2,200+ customer records. Applied K-Means clustering with Elbow Method hyperparameter tuning to identify 6 optimal segments, reducing misclassification. Engineered 5+ behavioral features and applied PCA to reduce 7D space to 2D for personas visualization.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=480&h=300&fit=crop&auto=format&q=80",
    tags: ["Machine Learning", "Clustering"],
    tech: ["Python", "K-Means", "PCA", "Streamlit", "Scikit-learn", "joblib"],
    stars: "2.2k Records",
    users: "15k+",
    featured: true,
    accent: "#fdba74",
    github: "https://github.com/AMANPATRE33/CUSTOMER-SEGMENTATION-ANALYTICS",
    demo: "https://customer-segmentation-analytics-unsupervisedlearning.streamlit.app/",
    gridClass: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 2,
    name: "Smart Anna Cafeteria System",
    tagline: "IoT-Enabled Occupancy & Ordering Platform",
    description:
      "IoT-enabled full-stack cafeteria platform with real-time occupancy dashboards across 5+ zone sensors, digital ordering system, and revenue analytics. Architected a Supabase cloud backend supporting 200+ daily transactions with normalized schemas.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=480&h=300&fit=crop&auto=format&q=80",
    tags: ["IoT", "Full Stack"],
    tech: ["Python", "IoT", "Supabase", "PostgreSQL", "React", "Vercel"],
    stars: "200+ Tx/Day",
    users: "8k+",
    featured: true,
    accent: "#ec4899",
    github: "https://github.com/AMANPATRE33",
    demo: "https://smartannaupluniversity.vercel.app/",
    gridClass: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 3,
    name: "AgriYield Pro",
    tagline: "Crop Yield Prediction Platform",
    description:
      "End-to-end ML web application predicting crop yield across 10+ crop types using a Random Forest pipeline. Features a Streamlit dashboard with dynamic forms, prediction history tracking, and feature importance visualization.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=300&fit=crop&auto=format&q=80",
    tags: ["Predictive ML", "Agriculture"],
    tech: ["Python", "Streamlit", "Random Forest", "Scikit-learn", "Pandas"],
    stars: "5k+ Samples",
    users: "3k+",
    featured: false,
    accent: "#f97316",
    github: "https://github.com/AMANPATRE33/model_yeild",
    demo: "https://github.com/AMANPATRE33/model_yeild",
    gridClass: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 4,
    name: "EduPredict Pro",
    tagline: "Student Performance Prediction System",
    description:
      "Trained a Linear Regression pipeline on 7 student features, achieving 88% prediction accuracy for math scores. Engineered instant single-prediction UI, batch CSV mode, and a Scenario Simulator to quantify academic interventions.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=480&h=300&fit=crop&auto=format&q=80",
    tags: ["Regression", "Education"],
    tech: ["Python", "Scikit-learn", "Streamlit", "Plotly"],
    stars: "88% Accuracy",
    users: "2k+",
    featured: false,
    accent: "#fbbf24",
    github: "https://github.com/AMANPATRE33/ML-project",
    demo: "https://ml-project-4k3t8uhxkxwchaab9qqwtt.streamlit.app/",
    gridClass: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 5,
    name: "UIDAI Biometric Dashboard",
    tagline: "AI Workforce & Demand Forecasting",
    description:
      "Engineered an AI-powered planning dashboard processing 1.8M+ simulation data points to forecast Aadhaar biometric enrollment demands across multiple states. Built automated operational risk models to prevent system bottlenecks at scale.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=480&h=300&fit=crop&auto=format&q=80",
    tags: ["Predictive Analytics", "Hackathon"],
    tech: ["Python", "Streamlit", "Time-Series", "Predictive Analytics"],
    stars: "1.8M+ Points",
    users: "2k+",
    featured: false,
    accent: "#ec4899",
    github: "https://github.com/AMANPATRE33/Aadhar-Uidai",
    demo: "https://aadhar-uidai-demo.streamlit.app/",
    gridClass: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 6,
    name: "Product Rating Classifier",
    tagline: "XGBoost E-Commerce Classification",
    description:
      "Reframed a rating regression problem as classification to handle low target variance, training an XGBoost classifier achieving 70% accuracy on 10,000+ product records. Identified discount percentage and review count as the top rating drivers.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=480&h=300&fit=crop&auto=format&q=80",
    tags: ["Classification", "E-Commerce"],
    tech: ["Python", "XGBoost", "Feature Engineering", "Pandas"],
    stars: "10k+ Records",
    users: "1k+",
    featured: false,
    accent: "#fdba74",
    github: "https://github.com/AMANPATRE33/amazon_ratings",
    demo: "https://github.com/AMANPATRE33/amazon_ratings",
    gridClass: "md:col-span-1 lg:col-span-1",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={project.gridClass}
    >
      <motion.div
        animate={
          hovered
            ? { rotateX: tilt.x, rotateY: tilt.y, scale: 1.02 }
            : { rotateX: 0, rotateY: 0, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d", perspective: 1000, background: "rgba(24, 22, 29, 0.75)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
        onMouseMove={handleMouseMove}
        onClick={() => window.open(project.demo, "_blank")}
        className="h-full rounded-2xl overflow-hidden border border-[#f97316]/10 hover:border-[#f97316]/30 hover:shadow-[0_0_25px_rgba(249,115,22,0.08)] transition-all duration-300 cursor-pointer group"
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${project.featured ? "h-56 sm:h-64" : "h-48 sm:h-52"}`}>
          <motion.img
            src={project.image}
            alt={project.name}
            width={480}
            height={300}
            loading="lazy"
            decoding="async"
            animate={hovered ? { scale: 1.06 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover grayscale brightness-[0.9] group-hover:grayscale-0 transition-all duration-500"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${project.accent}15 0%, rgba(24,22,29,0.9) 100%)`,
            }}
          />

          {/* Tags */}
          <div className="absolute top-4 left-4 flex gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: `${project.accent}12`,
                  color: project.accent,
                  borderColor: `${project.accent}25`,
                }}
                className="text-[10px] px-2.5 py-1 rounded-full border tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hover overlay links */}
          <div
            className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-[#0c0c0c]/85 border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-[#f97316] transition-colors"
              title="View Repository"
            >
              <Github size={14} />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-[#0c0c0c]/85 border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-[#f97316] transition-colors"
              title="Live Demo"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 xs:p-5 sm:p-6">
          <div className="flex items-start justify-between mb-2">
            <h3
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#ffffff", fontWeight: 700, letterSpacing: "-0.02em" }}
              className="text-xl"
            >
              {project.name}
            </h3>
            <div className="flex items-center gap-1 text-[#fbbf24] text-xs mt-1">
              <Star size={11} className="fill-[#fbbf24] text-[#fbbf24]" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa" }}>
                {project.stars}
              </span>
            </div>
          </div>

          <p
            style={{ fontFamily: "'JetBrains Mono', monospace", color: project.accent }}
            className="text-xs mb-3 font-semibold uppercase tracking-wider"
          >
            {project.tagline}
          </p>

          <p
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-muted-foreground text-sm leading-relaxed mb-5"
          >
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#a1a1aa] border border-white/6"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-16 sm:py-24 md:py-32"
      style={{ background: "linear-gradient(to bottom, #0e0d11, #18161d)" }}
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
            03 / Selected Work
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
            Things I've{" "}
            <span
              style={{ fontStyle: "italic", color: "transparent" }}
              className="[-webkit-text-stroke:1px_rgba(249,115,22,0.7)]"
            >
              Built
            </span>
          </h2>
          <div className="mt-4 w-12 h-[1px] bg-gradient-to-r from-[#f97316]/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/AMANPATRE33"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-[#9ca3af] text-sm hover:text-[#f97316] transition-colors border-b border-[#9ca3af]/30 hover:border-[#f97316]/50 pb-0.5"
          >
            View all projects on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
