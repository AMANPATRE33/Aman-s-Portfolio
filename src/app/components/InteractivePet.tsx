// ============================================================================
// 09. INTERACTIVE MINECRAFT COMPANION WIDGET (PET)
// ============================================================================

// --- IMPORTS ---
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// --- DIALOGUE REMARKS CONFIGURATION ---
const SECTION_MESSAGES: Record<string, string[]> = {
  about: [
    "Crafting ML models block by block! 🧱",
    "Mining deep insights from raw datasets! ⛏️",
    "Check out my stats on the left!",
  ],
  experience: [
    "UPL Limited was an epic quest! ⚔️",
    "Optimized IoT telemetry like redstone!",
    "Analyzing industrial data workloads!",
  ],
  projects: [
    "UIDAI biometric forecast is fully optimized!",
    "Teleport to any live demo card by clicking!",
    "All projects are in my inventory!",
  ],
  education: [
    "Graduated from UPL University! 🎓",
    "XP level: CGPA 9.16/10!",
    "Unlocked certifications below!",
  ],
  skills: [
    "Redstone, Python, and SQL are in my hotbar! 🛠️",
    "Building automated ML pipelines!",
    "Database crafting is my specialty!",
  ],
  contact: [
    "Let's co-op on something great! 🤝",
    "Email: amanpatre33@gmail.com",
    "Throw a splash mail by clicking Say Hello!",
  ],
  default: [
    "Hello! Welcome to my world! 🌍",
    "Nice cursor skin! ✨",
    "Right-click or click me for hearts!",
  ],
};

export function InteractivePet() {
  // --- STATE & REF HOOKS ---
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("");
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [mood, setMood] = useState<"normal" | "surprised" | "happy" | "sleepy">("normal");
  const [cookiesEaten, setCookiesEaten] = useState(0);
  const [feeding, setFeeding] = useState(false);
  const [chewing, setChewing] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  // ==========================================================
  // HOOKS: CURSOR, HOVER, SCROLL, IDLE TIMERS
  // ==========================================================

  // Active section detection
  useEffect(() => {
    const sections = ["about", "experience", "projects", "education", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -40% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Dynamically update bubble message when scrolling to a new section if bubble is open
  useEffect(() => {
    if (showBubble && !chewing && !feeding && mood === "normal") {
      const msgs = SECTION_MESSAGES[activeSection] || SECTION_MESSAGES.default;
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      setMessage(randomMsg);
    }
  }, [activeSection]);

  // Idle timer for sleepy mood
  const resetIdleTimer = () => {
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    if (mood === "sleepy") setMood("normal");
    idleTimeoutRef.current = setTimeout(() => {
      setMood("sleepy");
    }, 15000);
  };

  useEffect(() => {
    const handleMouseMoveGlobal = () => {
      resetIdleTimer();
    };
    window.addEventListener("mousemove", handleMouseMoveGlobal);
    resetIdleTimer();
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [mood]);

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const petCenterX = rect.left + rect.width / 2;
      const petCenterY = rect.top + rect.height / 2;
      const deltaX = e.clientX - petCenterX;
      const deltaY = e.clientY - petCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(2.5, Math.hypot(deltaX, deltaY) / 100); // Cap travel distance for rectangular eyes
      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance * 0.7, // Flatten slightly to match Minecraft eye aspect ratio
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ==========================================================
  // COMPONENT EVENT HANDLERS (CLICK, FEED, CHEW)
  // ==========================================================

  const handleHoverStart = () => {
    if (chewing) return;
    const msgs = SECTION_MESSAGES[activeSection] || SECTION_MESSAGES.default;
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
    setMessage(randomMsg);
    setShowBubble(true);
  };

  const handleHoverEnd = () => {
    setShowBubble(false);
  };

  const handlePetClick = () => {
    if (chewing || feeding) return;

    if (mood === "sleepy") {
      setMood("surprised");
      setMessage("Whoa! You startled me! 😲");
      setShowBubble(true);
      setHearts((prev) => [...prev, { id: Date.now(), x: Math.random() * 40 - 20 }]);
      setTimeout(() => {
        setMood("normal");
      }, 2000);
      return;
    }

    setMood("happy");
    setHearts((prev) => [...prev, { id: Date.now(), x: Math.random() * 40 - 20 }]);
    setMessage("Yay! Redstone pulse! ❤️");
    setShowBubble(true);
    setTimeout(() => {
      setMood("normal");
    }, 2500);
  };

  const handleFeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (feeding || chewing) return;
    setFeeding(true);
  };

  // ==========================================================
  // JSX RENDERING LAYOUT (BUBBLE, CONTROL BUTTON, SVG BODY)
  // ==========================================================
  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center select-none"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-24 sm:bottom-28 bg-[#111827] border border-[#3b82f6]/30 text-[#f3f4f6] px-4 py-2 rounded-2xl text-xs font-semibold shadow-lg whitespace-normal break-words max-w-[180px] sm:max-w-[280px]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              boxShadow: "0 4px 20px rgba(59,130,246,0.15)",
            }}
          >
            {message}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111827] border-r border-b border-[#3b82f6]/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 1, y: 0, scale: 0.8, x: h.x }}
          animate={{ opacity: 0, y: -80, scale: 1.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onAnimationComplete={() => {
            setHearts((prev) => prev.filter((item) => item.id !== h.id));
          }}
          className="absolute text-red-500 text-lg pointer-events-none bottom-20 sm:bottom-24"
        >
          ❤️
        </motion.div>
      ))}

      {/* Floating Cookie */}
      {feeding && (
        <motion.div
          initial={{ opacity: 1, y: -60, x: -10, rotate: 0 }}
          animate={{ opacity: [1, 1, 0], y: 15, x: 0, rotate: 360 }}
          transition={{ duration: 1.2, ease: "easeIn" }}
          onAnimationComplete={() => {
            setFeeding(false);
            setChewing(true);
            setMood("happy");
            const nextCount = cookiesEaten + 1;
            setCookiesEaten(nextCount);
            
            let feedMsg = "Mmm, delicious cookie! 🍪";
            if (nextCount === 3) {
              feedMsg = "Wow, I'm getting full! 😋";
            } else if (nextCount === 5) {
              feedMsg = "Minecraft cookies are the best! 🍪✨";
            } else if (nextCount >= 10) {
              feedMsg = "Oof, I'm stuffed! Aman feeds me cookies well. 😴";
              setMood("sleepy");
            }
            
            setMessage(feedMsg);
            setShowBubble(true);
            setHearts((prev) => [...prev, { id: Date.now(), x: 0 }]);
            
            setTimeout(() => {
              setChewing(false);
              if (nextCount < 10) {
                setMood("normal");
              }
            }, 2500);
          }}
          className="absolute pointer-events-none text-xl bottom-20 sm:bottom-24"
        >
          🍪
        </motion.div>
      )}

      {/* Feed Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleFeed}
        className="absolute -left-11 sm:-left-16 bottom-1 sm:bottom-2 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#3b82f6]/20 bg-[#111827]/90 flex flex-col items-center justify-center text-[10px] sm:text-xs shadow-lg backdrop-blur-md text-[#f3f4f6] hover:border-[#22d3ee]/60 transition-colors"
        title="Feed a cookie!"
        style={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.3), 0 0 10px rgba(59,130,246,0.1)",
        }}
      >
        <span className="text-sm">🍪</span>
        <span className="text-[9px] font-bold text-[#22d3ee]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {cookiesEaten}
        </span>
      </motion.button>

      {/* Floating Avatar Head */}
      <motion.div
        whileHover={{ y: -6, scale: 1.05 }}
        onClick={handlePetClick}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full cursor-pointer flex items-center justify-center border border-[#3b82f6]/25 shadow-xl overflow-visible bg-gradient-to-tr from-[#111827]/95 to-[#1f2937]/95 backdrop-blur-md"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(59,130,246,0.15)",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Head & Features Bob Group (Chewing / Happy bounce + constant idle float) */}
          <motion.g
            animate={{
              y: chewing 
                ? [0, -3, 0, -3, 0, -3, 0] 
                : mood === "happy" 
                ? [0, -5, 0, -3, 0] 
                : [0, -2.5, 0]
            }}
            transition={{
              y: chewing 
                ? { duration: 2, ease: "easeInOut" } 
                : mood === "happy" 
                ? { duration: 0.5, ease: "easeOut" } 
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Blue Hoodie (Body Background with 3D Shading Blocks) */}
            <rect x="25" y="70" width="50" height="25" fill="#1e40af" />
            {/* Hoodie Darker Shading Sides */}
            <rect x="25" y="70" width="6" height="25" fill="#172554" />
            <rect x="69" y="70" width="6" height="25" fill="#172554" />
            {/* Hoodie Collar Shadow */}
            <rect x="31" y="70" width="38" height="4" fill="#1e3a8a" />
            {/* Hoodie Front Pocket */}
            <rect x="34" y="80" width="32" height="15" fill="#1d4ed8" rx="1" />
            <rect x="38" y="83" width="24" height="12" fill="#1e3a8a" />
            {/* Drawstrings */}
            <rect x="42" y="70" width="2" height="10" fill="white" />
            <rect x="56" y="70" width="2" height="10" fill="white" />
            <rect x="41" y="80" width="4" height="2" fill="#9ca3af" />
            <rect x="55" y="80" width="4" height="2" fill="#9ca3af" />

            {/* Minecraft Crown (Glows & Floats slightly) */}
            <motion.g
              animate={{
                y: [0, -1.5, 0, -1.5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Crown Base - Shaded Gold */}
              <rect x="32" y="26" width="36" height="4" fill="#854d0e" />
              <rect x="32" y="24" width="36" height="2" fill="#ca8a04" />
              {/* Left Peak */}
              <rect x="32" y="16" width="6" height="8" fill="#eab308" />
              <rect x="32" y="16" width="3" height="8" fill="#facc15" />
              {/* Center Peak */}
              <rect x="47" y="12" width="6" height="12" fill="#eab308" />
              <rect x="47" y="12" width="3" height="12" fill="#facc15" />
              {/* Right Peak */}
              <rect x="62" y="16" width="6" height="8" fill="#eab308" />
              <rect x="62" y="16" width="3" height="8" fill="#facc15" />
              {/* Gems */}
              <rect x="34" y="20" width="2" height="2" fill="#ef4444" />
              <rect x="49" y="16" width="2" height="2" fill="#3b82f6" />
              <rect x="64" y="20" width="2" height="2" fill="#22c55e" />
            </motion.g>

            {/* Head Block - Skin with Shading Layers */}
            <rect x="28" y="32" width="44" height="38" fill="#fdba74" rx="1" />
            {/* Skin Shading Blocks (Forehead Shadow and Chin Shadow) */}
            <rect x="28" y="66" width="44" height="4" fill="#f43f5e" opacity="0.15" />
            <rect x="28" y="44" width="6" height="22" fill="#f43f5e" opacity="0.1" />
            <rect x="66" y="44" width="6" height="22" fill="#f43f5e" opacity="0.1" />
            {/* Nose outline/bridge shadow */}
            <rect x="46" y="56" width="8" height="6" fill="#f43f5e" opacity="0.12" />

            {/* Hair (Textured Brown Pixel Art Shading) */}
            {/* Base dark brown hair layer */}
            <rect x="28" y="32" width="44" height="8" fill="#451a03" />
            <rect x="28" y="40" width="6" height="12" fill="#451a03" />
            <rect x="66" y="40" width="6" height="12" fill="#451a03" />
            <rect x="34" y="40" width="8" height="6" fill="#451a03" />
            <rect x="58" y="40" width="8" height="6" fill="#451a03" />
            <rect x="46" y="40" width="8" height="4" fill="#451a03" />

            {/* Medium Brown Hair highlights (adds depth) */}
            <rect x="30" y="34" width="10" height="4" fill="#78350f" />
            <rect x="50" y="34" width="16" height="4" fill="#78350f" />
            <rect x="28" y="42" width="4" height="6" fill="#78350f" />
            <rect x="68" y="42" width="4" height="6" fill="#78350f" />
            <rect x="36" y="40" width="4" height="4" fill="#78350f" />
            <rect x="60" y="40" width="4" height="4" fill="#78350f" />
            <rect x="48" y="40" width="4" height="2" fill="#78350f" />

            {/* Light Brown Hair highlights (adds shine) */}
            <rect x="34" y="32" width="4" height="2" fill="#9a3412" />
            <rect x="54" y="32" width="6" height="2" fill="#9a3412" />
            <rect x="30" y="40" width="2" height="4" fill="#9a3412" />
            <rect x="68" y="40" width="2" height="4" fill="#9a3412" />

            {/* Eyes */}
            {mood === "sleepy" ? (
              <>
                {/* Closed blocky eyes */}
                <rect x="35" y="52" width="10" height="2" fill="#78350f" />
                <rect x="55" y="52" width="10" height="2" fill="#78350f" />
              </>
            ) : mood === "happy" ? (
              <>
                {/* Happy closed arched eyes */}
                <path d="M 35 53 L 40 49 L 45 53" stroke="#78350f" strokeWidth="2" strokeLinecap="square" fill="none" />
                <path d="M 55 53 L 60 49 L 65 53" stroke="#78350f" strokeWidth="2" strokeLinecap="square" fill="none" />
              </>
            ) : mood === "surprised" ? (
              <>
                {/* Wide blocky surprised eyes with centered tiny pupils */}
                <rect x="34" y="47" width="12" height="10" fill="white" stroke="#3b82f6" strokeWidth="1" />
                <rect x="38" y="50" width="4" height="4" fill="#111827" />
                
                <rect x="54" y="47" width="12" height="10" fill="white" stroke="#3b82f6" strokeWidth="1" />
                <rect x="58" y="50" width="4" height="4" fill="#111827" />
              </>
            ) : (
              <>
                {/* Normal tracking eyes */}
                <rect x="35" y="48" width="10" height="8" fill="white" />
                <motion.rect x={37.5 + pupilOffset.x} y={50 + pupilOffset.y} width="5" height="5" fill="#111827" />
                <motion.rect x={37.5 + pupilOffset.x} y={50 + pupilOffset.y} width="2" height="2" fill="white" />

                <rect x="55" y="48" width="10" height="8" fill="white" />
                <motion.rect x={57.5 + pupilOffset.x} y={50 + pupilOffset.y} width="5" height="5" fill="#111827" />
                <motion.rect x={57.5 + pupilOffset.x} y={50 + pupilOffset.y} width="2" height="2" fill="white" />
              </>
            )}

            {/* Eyebrows */}
            <rect x="34" y="45" width="12" height="2" fill="#451a03" />
            <rect x="54" y="45" width="12" height="2" fill="#451a03" />

            {/* Blush */}
            <rect x="30" y="58" width="4" height="2" fill="#fca5a5" opacity="0.6" />
            <rect x="66" y="58" width="4" height="2" fill="#fca5a5" opacity="0.6" />

            {/* Mouth */}
            <rect x="46" y="61" width="8" height="2" fill="#78350f" />

            {/* Headphones (Cyan Glow Accent & 3D Shaded Structure) */}
            {/* Headband main arch */}
            <rect x="26" y="27" width="48" height="4" fill="#1f2937" />
            <rect x="28" y="27" width="44" height="1" fill="#4b5563" />
            
            {/* Left Earmuff cup (3D layers) */}
            <rect x="23" y="37" width="8" height="22" fill="#1f2937" rx="1" />
            <rect x="25" y="39" width="4" height="18" fill="#111827" />
            <motion.rect
              x="25"
              y="44"
              width="4"
              height="8"
              fill="#22d3ee"
              rx="0.5"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Right Earmuff cup (3D layers) */}
            <rect x="69" y="37" width="8" height="22" fill="#1f2937" rx="1" />
            <rect x="71" y="39" width="4" height="18" fill="#111827" />
            <motion.rect
              x="71"
              y="44"
              width="4"
              height="8"
              fill="#22d3ee"
              rx="0.5"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Headphone Microphone (Wiggling slightly) */}
            <motion.g
              animate={{
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              style={{ transformOrigin: "73px 48px" }}
            >
              <path d="M 72 48 L 60 58 L 52 58" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="square" fill="none" />
              <rect x="46" y="56" width="6" height="4" fill="#111827" />
            </motion.g>

          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
