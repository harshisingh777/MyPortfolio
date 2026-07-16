import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Sets up Lenis smooth-scroll for the "premium" scroll feel.
 * Skipped entirely under prefers-reduced-motion, per accessibility rules.
 */
export function useSmoothScroll() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);
}
