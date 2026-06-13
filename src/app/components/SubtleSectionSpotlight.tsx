import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface SubtleSectionSpotlightProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function SubtleSectionSpotlight({ containerRef }: SubtleSectionSpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, mouseX, mouseY]);

  if (!hovered) return null;

  return (
    <motion.div
      className="pointer-events-none absolute rounded-full overflow-hidden z-0"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 450,
        height: 450,
        background:
          "radial-gradient(circle, rgba(253,186,116,0.04) 0%, rgba(249,115,22,0.01) 50%, transparent 70%)",
      }}
    />
  );
}
