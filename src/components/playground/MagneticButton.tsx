import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** A button that pulls toward the cursor within a small radius, then snaps back. */
export default function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 14 });
  const springY = useSpring(y, { stiffness: 200, damping: 14 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.4);
    y.set(relY * 0.4);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      style={{ x: springX, y: springY }}
      className="rounded-full bg-coral px-8 py-4 font-body text-sm font-medium text-white shadow-clay-coral"
    >
      Magnetic button
    </motion.button>
  );
}
