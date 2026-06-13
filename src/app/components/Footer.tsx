// ============================================================================
// 08. CONTACT & FOOTER LAYOUT COMPONENT
// ============================================================================

// --- IMPORTS ---
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { SubtleSectionSpotlight } from "./SubtleSectionSpotlight";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/amanpatre33", handle: "@amanpatre33" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/aman-patre-968064intial", handle: "in/aman-patre" },
  { icon: Mail, label: "Email", href: "mailto:amanpatre33@gmail.com", handle: "amanpatre33" },
];

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 sm:py-24 md:py-36 bg-[#0e0d11] relative overflow-hidden"
    >
      <SubtleSectionSpotlight containerRef={sectionRef} />
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-15"
          style={{
            background:
              "radial-gradient(ellipse at bottom, rgba(249,115,22,0.25) 0%, rgba(236,72,153,0.1) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-4"
        >
          <span
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[#fdba74]/80 text-xs tracking-[0.4em] uppercase font-semibold"
          >
            06 / Get In Touch
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "#ffffff",
            fontSize: "clamp(2.2rem, 8vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
          }}
          className="leading-none mb-6"
        >
          Let's build
          <br />
          {" "}
          <span
            style={{ fontStyle: "italic", color: "transparent" }}
            className="[-webkit-text-stroke:1px_rgba(249,115,22,0.7)]"
          >
            something great
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10"
        >
          I'm currently open to new opportunities — whether that's a full-time
          role, a consulting project, or an interesting side venture. Let's talk.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 120 }}
          href="mailto:amanpatre33@gmail.com"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#f97316] to-[#ec4899] text-white rounded-full font-semibold hover:from-[#ff8c3a] hover:to-[#f43f5e] transition-all duration-200 hover:shadow-[0_0_50px_rgba(249,115,22,0.45)] mb-14 group"
        >
          Say Hello
          <ArrowUpRight
            size={18}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </motion.a>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-8 mb-16"
        >
          {SOCIALS.map(({ icon: Icon, label, href, handle }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="group flex flex-col items-center gap-2"
              aria-label={label}
            >
              <div className="w-10 h-10 rounded-full border border-white/8 flex items-center justify-center text-[#a1a1aa] group-hover:border-[#f97316]/50 group-hover:text-[#fdba74] transition-all duration-200">
                <Icon size={16} />
              </div>
              <span
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-[10px] text-[#a1a1aa]/60 group-hover:text-[#fdba74]/65 transition-colors"
              >
                {handle}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-[#f97316]/20 via-[#ec4899]/20 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <a
            href="#"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.03em" }}
            className="text-[#ffffff] text-lg hover:text-[#fdba74] transition-colors"
          >
            Aman <span className="text-[#fdba74]"> Patre </span>
          </a>
          <p
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="text-[#a1a1aa]/40 text-[10px] tracking-wider"
          >
            Thank you visiting & Feel free to interact with Minecraft Boy
          </p>
          <a
            href="#"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-[10px] text-[#a1a1aa]/40 hover:text-[#fdba74] transition-colors tracking-wider"
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </section>
  );
}
