// ============================================================================
// 02. HERO / INTRODUCTION PROFILE COVER COMPONENT
// ============================================================================

// --- IMPORTS ---
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";

const PROFILE_URL = "/profile.jpg";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/amanpatre33" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/aman-patre-968064intial" },
  { icon: Mail, label: "Email", href: "mailto:amanpatre33@gmail.com" },
];



const PARTICLES: Array<{ id: number; x: number; size: number; delay: number; duration: number; opacity: number }> = [];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0e0d11]"
      style={{ paddingTop: 80 }}
    >
      {/* Cursor glow */}
      {ready && (
        <motion.div
          className="pointer-events-none absolute rounded-full"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(236,72,153,0.05) 50%, transparent 70%)",
          }}
        />
      )}

      {/* Ambient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
            filter: "blur(110px)",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full">
        {/* Profile image */}
        <div className="relative mb-10">
          {/* Outer pulse rings */}
          <motion.div
            className="absolute rounded-full border border-orange-500/10"
            style={{ inset: -40 }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full border border-orange-500/5"
            style={{ inset: -72 }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Rotating dashed ring */}
          <motion.div
            className="absolute rounded-full border border-dashed border-orange-500/20"
            style={{ inset: -20 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Profile image pop-in */}
          <motion.div
            initial={{ scale: 0.2, opacity: 0, filter: "blur(30px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 12,
              delay: 0.4,
            }}
            className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 2px rgba(249,115,22,0.35), 0 0 40px rgba(249,115,22,0.25), 0 0 80px rgba(236,72,153,0.15)",
            }}
          >
            <img
              src={PROFILE_URL}
              alt="Aman Patre"
              className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d11]/30 via-transparent to-transparent" />
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#18161d] border border-[#f97316]/20 rounded-full px-3 py-1 flex items-center gap-2 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="text-[10px] text-[#fdba74] tracking-wider font-semibold"
            >
              Available for hire
            </span>
          </motion.div>
        </div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mb-5 px-4"
        >
          <span
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[9px] xs:text-[10px] sm:text-[11px] text-[#fdba74] tracking-[0.2em] xs:tracking-[0.3em] sm:tracking-[0.45em] uppercase text-center block"
          >
            Ankleshwar, Gujarat · CGPA: 9.16
          </span>
        </motion.div>

        {/* Name — character stagger */}
        <div className="overflow-hidden mb-4">
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6">
            <span className="inline-block whitespace-nowrap">
              {"AMAN".split("").map((char, i) => (
                <motion.span
                  key={`aman-${i}`}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: 1.0 + i * 0.045,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(3rem, 9vw, 8rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                    color: "#ffffff",
                    display: "inline-block",
                    fontWeight: 800,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="inline-block whitespace-nowrap">
              {"PATRE".split("").map((char, i) => (
                <motion.span
                  key={`patre-${i}`}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: 1.0 + (i + 4) * 0.045,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(3rem, 9vw, 8rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                    color: "#ffffff",
                    display: "inline-block",
                    fontWeight: 800,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </div>
        </div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.65, duration: 0.6 }}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="text-[#fdba74]/80 tracking-[0.25em] uppercase text-xs md:text-sm mb-6"
        >
          Data Analyst & Data Scientist & AI/ML Enthusiast
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.6 }}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-[#9d9ba1] max-w-lg leading-relaxed mb-10 text-base"
        >
          Computer Engineering graduate with hands-on industry experience in data science,
          predictive analytics, and process optimization. Skilled in building end-to-end ML
          pipelines, clustering models, and interactive data systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.05, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <a
            href="#projects"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="px-8 py-3.5 bg-gradient-to-r from-[#f97316] to-[#ec4899] text-white rounded-full font-semibold hover:from-[#ff8c3a] hover:to-[#f43f5e] transition-all duration-200 hover:shadow-[0_0_30px_rgba(249,115,22,0.45)]"
          >
            View My Work
          </a>
          <a
            href="#contact"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="px-8 py-3.5 border border-[#f97316]/30 text-[#f5ede4] rounded-full hover:border-[#f97316]/60 hover:text-white transition-all duration-200 hover:bg-white/5"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
          className="flex gap-6"
        >
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-[#9d9ba1] hover:text-[#f97316] transition-colors duration-200 hover:scale-110 transform"
            >
              <Icon size={19} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="text-[10px] text-[#f97316]/50 tracking-[0.3em] uppercase"
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#f97316]/40"
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
