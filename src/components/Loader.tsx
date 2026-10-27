import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { EASE } from "./ui";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Intro screen styled as a data pipeline run: a 0→100 counter, log lines
 * that tick to "ok" as the progress passes them, and a histogram that fills
 * in. Exits once the count finishes *and* the web fonts are ready, then
 * lifts away like a curtain and hands control back via `onDone`.
 */

const steps = [
  { at: 8, label: "loading profile.csv", result: "ok" },
  { at: 28, label: "cleaning 1.06M rows", result: "ok" },
  { at: 50, label: "running hypothesis tests", result: "p < 0.05" },
  { at: 72, label: "training 5 models", result: "AUC 0.89" },
  { at: 92, label: "rendering portfolio", result: "ready" },
];

// bell-ish histogram heights, fixed so it renders identically every visit
const bins = Array.from({ length: 36 }, (_, i) => {
  const x = (i - 17.5) / 7;
  return 0.12 + 0.88 * Math.exp(-x * x) * (0.82 + 0.18 * Math.sin(i * 2.3) ** 2);
});

const MIN_MS = 2300;

export default function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const progress = useMotionValue(0);
  const [value, setValue] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const barWidth = useTransform(progress, (v) => `${v}%`);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    // never let a slow font CDN hold the page hostage
    const fontsOrTimeout = Promise.race([fontsReady, new Promise((r) => setTimeout(r, 4000))]);

    const counted = new Promise<void>((resolve) => {
      animate(progress, 100, {
        duration: (reducedMotion ? 600 : MIN_MS) / 1000,
        ease: [0.65, 0, 0.35, 1],
        onUpdate: (v) => setValue(Math.round(v)),
        onComplete: resolve,
      });
    });

    let cancelled = false;
    Promise.all([counted, fontsOrTimeout]).then(() => {
      if (cancelled) return;
      setTimeout(() => {
        setLeaving(true);
        // let the hero start rising while the curtain is still lifting
        setTimeout(onReveal, reducedMotion ? 0 : 350);
      }, 250);
    });
    return () => {
      cancelled = true;
    };
    // run once on mount; reduced-motion only shortens the timings
  }, []);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio, ${value}%`}
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: reducedMotion ? 0.01 : 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (!leaving) return;
        document.documentElement.style.overflow = "";
        onDone();
      }}
      className="graph-paper fixed inset-0 z-[90] flex flex-col justify-between overflow-hidden bg-night px-5 py-6 md:px-10 md:py-8"
    >
      {/* the curtain's leading edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-signal/60" />

      <motion.div
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between font-mono text-[11px] text-bone-mute"
      >
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-signal" />
          harshi_singh.portfolio
        </span>
        <span className="hidden sm:inline">Data Analyst · Prayagraj, IN</span>
      </motion.div>

      <motion.div
        animate={{ opacity: leaving ? 0 : 1, y: leaving ? -40 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="grid grid-cols-1 items-end gap-10 md:grid-cols-12"
      >
        <div className="md:col-span-7">
          <p className="font-serif text-[34vw] leading-[0.8] tracking-tight text-bone tabular-nums md:text-[17rem]">
            {value}
            <span className="text-signal">%</span>
          </p>
        </div>

        <ul className="space-y-2.5 font-mono text-[11px] md:col-span-5 md:pb-6 md:text-xs">
          {steps.map((s) => {
            const started = value >= s.at - 8;
            const done = value >= s.at;
            return (
              <li
                key={s.label}
                className={
                  "flex items-baseline gap-3 transition-opacity duration-300 " + (started ? "opacity-100" : "opacity-0")
                }
              >
                <span className={done ? "text-signal" : "text-bone-mute"}>→</span>
                <span className="text-bone-dim">{s.label}</span>
                <span className="flex-1 overflow-hidden whitespace-nowrap text-bone-mute/50">
                  ······································
                </span>
                <span className={done ? "text-signal" : "text-bone-mute"}>{done ? s.result : "…"}</span>
              </li>
            );
          })}
        </ul>
      </motion.div>

      <motion.div animate={{ opacity: leaving ? 0 : 1 }} transition={{ duration: 0.3 }}>
        <div className="flex h-16 items-end gap-[3px] md:h-20" aria-hidden="true">
          {bins.map((h, i) => {
            const lit = value >= ((i + 1) / bins.length) * 100;
            return (
              <div
                key={i}
                className={
                  "flex-1 origin-bottom rounded-t-[2px] transition-all duration-500 " +
                  (lit ? "bg-signal" : "bg-bone/10")
                }
                style={{ height: `${h * 100}%`, transform: `scaleY(${lit ? 1 : 0.35})` }}
              />
            );
          })}
        </div>
        <div className="relative mt-3 h-px w-full bg-line">
          <motion.div className="absolute inset-y-0 left-0 bg-signal" style={{ width: barWidth }} />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] text-bone-mute">
          <span>n = {Math.round((value / 100) * 2412).toLocaleString("en-US")} rows</span>
          <span>{value < 100 ? "processing" : "done"}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
