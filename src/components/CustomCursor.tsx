import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A small circle that follows the pointer and morphs into a larger
 * label-bearing shape when hovering elements marked with
 * `data-cursor-hover` (optionally `data-cursor-label="View"`).
 *
 * Fine-pointer devices only — see the `cursor: none` rule in index.css,
 * which is scoped the same way, so touch devices keep their native cursor.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(query.matches);
    const handleQueryChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    query.addEventListener("change", handleQueryChange);
    return () => query.removeEventListener("change", handleQueryChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor-hover]"
      );
      setHovering(!!target);
      setLabel(target?.dataset.cursorLabel ?? null);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center
                 rounded-full mix-blend-difference bg-white"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovering ? 72 : 14,
        height: hovering ? 72 : 14,
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {label && (
        <span className="font-body text-[10px] font-medium uppercase tracking-wide text-ink">
          {label}
        </span>
      )}
    </motion.div>
  );
}
