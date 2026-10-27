import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue } from "framer-motion";
import { createPortal } from "react-dom";
import type { Shot } from "../../data/resume";
import { mocks, ScaledArtboard } from "./Mocks";
import { EASE } from "../ui";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const SLIDE_MS = 5200;

function ShotView({ shot, eager = false }: { shot: Shot; eager?: boolean }) {
  if (shot.kind === "image") {
    return (
      <img
        src={shot.src}
        alt={shot.label}
        loading={eager ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover object-left-top"
      />
    );
  }
  const Mock = mocks[shot.mock];
  return (
    <ScaledArtboard>
      <Mock />
    </ScaledArtboard>
  );
}

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-night-700/80 px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
      </div>
      <div className="mx-auto flex min-w-0 max-w-[60%] items-center gap-2 rounded-md bg-night/70 px-3 py-1 font-mono text-[10.5px] text-bone-mute">
        <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="none" aria-hidden="true">
          <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" stroke="currentColor" />
          <path d="M5.5 7V5.5a2.5 2.5 0 015 0V7" stroke="currentColor" />
        </svg>
        <span className="truncate">{url}</span>
      </div>
      <span className="w-[42px]" />
    </div>
  );
}

export default function ShotDeck({ shots, title, mobileShot }: { shots: Shot[]; title: string; mobileShot?: string }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const reducedMotion = usePrefersReducedMotion();
  const progress = useMotionValue(0);

  const running = inView && !hovered && !zoomed && !reducedMotion && shots.length > 1;

  useAnimationFrame((_, delta) => {
    if (!running) return;
    const next = progress.get() + delta / SLIDE_MS;
    if (next >= 1) {
      progress.set(0);
      setIndex((i) => (i + 1) % shots.length);
    } else {
      progress.set(next);
    }
  });

  function go(i: number) {
    progress.set(0);
    setIndex(i);
  }

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
      if (e.key === "ArrowRight") go((index + 1) % shots.length);
      if (e.key === "ArrowLeft") go((index - 1 + shots.length) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed, index, shots.length]);

  const shot = shots[index];

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="relative">
      <button
        type="button"
        onClick={() => setZoomed(true)}
        data-cursor-label="Zoom"
        aria-label={`Enlarge ${title} — ${shot.label}`}
        className="group block w-full overflow-hidden rounded-xl border border-line bg-night-800 text-left shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
      >
        <BrowserChrome url={shot.url} />
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-night-900">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.015]"
            >
              <ShotView shot={shot} eager={index === 0} />
            </motion.div>
          </AnimatePresence>
        </div>
      </button>

      {mobileShot && (
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="absolute -bottom-10 -right-3 hidden w-[19%] overflow-hidden rounded-[22px] border-[5px] border-night-600 bg-night shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] md:block lg:-right-8"
        >
          <img src={mobileShot} alt={`${title} on mobile`} loading="lazy" className="block w-full" />
        </motion.div>
      )}

      <div role="tablist" aria-label={`${title} screens`} className="mt-4 flex flex-wrap gap-x-1 gap-y-2 pr-[22%] md:pr-0">
        {shots.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => go(i)}
            className={
              "relative overflow-hidden rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition-colors duration-300 " +
              (i === index ? "border-signal/50 text-bone" : "border-line text-bone-mute hover:text-bone")
            }
          >
            {i === index && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-full origin-left bg-signal/15"
                style={{ scaleX: running ? progress : 1 }}
              />
            )}
            <span className="relative">
              {String(i + 1).padStart(2, "0")} · {s.label}
            </span>
          </button>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {zoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-night/95 p-4 backdrop-blur-md md:p-10"
              onClick={() => setZoomed(false)}
              role="dialog"
              aria-modal="true"
              aria-label={`${title} — ${shot.label}`}
            >
              <motion.div
                initial={{ scale: 0.94, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 10 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="w-full max-w-[1400px] overflow-hidden rounded-xl border border-line"
                onClick={(e) => e.stopPropagation()}
              >
                <BrowserChrome url={shot.url} />
                <div className="relative aspect-[16/10] w-full bg-night-900">
                  <ShotView shot={shot} eager />
                </div>
              </motion.div>
              <div className="mt-5 flex items-center gap-4 font-mono text-xs text-bone-mute" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={() => go((index - 1 + shots.length) % shots.length)} className="rounded-full border border-line px-3 py-1.5 hover:text-bone">
                  ← prev
                </button>
                <span>
                  {index + 1} / {shots.length} · {shot.label}
                </span>
                <button type="button" onClick={() => go((index + 1) % shots.length)} className="rounded-full border border-line px-3 py-1.5 hover:text-bone">
                  next →
                </button>
                <button type="button" onClick={() => setZoomed(false)} className="rounded-full bg-bone px-3 py-1.5 text-night">
                  close · esc
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
