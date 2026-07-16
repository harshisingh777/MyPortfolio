import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** A soft blob that trails the pointer, bounded to its own demo box. */
export default function CursorBlob() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.6 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-cobalt/10 to-coral/10"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-16 w-16 rounded-full bg-cobalt/60 blur-md"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-body text-sm text-ink/40">Move your cursor here</span>
      </div>
    </div>
  );
}
