import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useIsMobileViewport } from "../hooks/useIsMobileViewport";
import HeroStaticShape from "./HeroStaticShape";

// Code-split: the 3D bundle (three + fiber + drei) only downloads after
// first paint, and only when it's actually going to be rendered.
const Hero3DScene = lazy(() => import("./Hero3DScene"));

const headline = "Harshi Singh";

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobileViewport();

  // Per the 3D performance budget: never mount the WebGL canvas on mobile
  // widths or when the user has asked for reduced motion.
  const show3D = !reducedMotion && !isMobile;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-center px-6 pt-24 md:px-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-6">Data Analyst &amp; Data Scientist</p>

          <h1 className="font-display text-[15vw] leading-[0.95] tracking-tight text-ink md:text-[5.2vw]">
            {headline.split(" ").map((word, wordIndex) => (
              <span key={word} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + wordIndex * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 max-w-md font-body text-lg text-ink/70"
          >
            Empowering data-driven decisions through advanced analytics, machine learning, and scalable software solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex gap-4"
          >
            <a
              href="#work"
              data-cursor-hover
              className="rounded-full bg-ink px-7 py-3.5 font-body text-sm font-medium text-white
                         shadow-clay-sm transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              View selected work
            </a>
            <a
              href="#contact"
              data-cursor-hover
              className="rounded-full bg-clay px-7 py-3.5 font-body text-sm font-medium text-ink
                         shadow-clay transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <div className="relative h-[42vh] w-full md:h-[56vh]">
          {show3D ? (
            <Suspense fallback={<HeroStaticShape />}>
              <Hero3DScene />
            </Suspense>
          ) : (
            <HeroStaticShape />
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="eyebrow">Scroll</span>
        <div className="h-8 w-px bg-ink/30 motion-safe:animate-bounce-slow" />
      </motion.div>
    </section>
  );
}
