import { ReactNode, useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise on first scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Line of display type that slides up from behind a mask. The in-view check
 * lives on the (unclipped) wrapper — observing the hidden child itself would
 * never fire, since it starts fully clipped.
 */
export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
      className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
    >
      <motion.span
        variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
        transition={{ duration: 1, delay, ease: EASE }}
        className={"inline-block " + className}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Numbered section opener: "01 — Selected work" over a big serif title. */
export function SectionHeader({
  index,
  kicker,
  title,
  aside,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-16 grid grid-cols-1 items-end gap-6 border-b border-line pb-8 md:mb-20 md:grid-cols-12">
      <div className="md:col-span-8">
        <Reveal>
          <p className="label mb-5 flex items-center gap-3">
            <span className="text-signal">{index}</span>
            <span className="h-px w-8 bg-line" />
            {kicker}
          </p>
        </Reveal>
        <h2 className="font-serif text-[13vw] leading-[0.92] tracking-tight text-bone md:text-[6.4rem]">
          <MaskReveal>{title}</MaskReveal>
        </h2>
      </div>
      {aside && (
        <Reveal delay={0.15} className="md:col-span-4 md:pb-3">
          {aside}
        </Reveal>
      )}
    </div>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function ArrowUpRight({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M4.5 11.5l7-7M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Pill link used for "Live" / "Code" / social links. */
export function PillLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={
        "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 " +
        (primary
          ? "bg-signal text-night hover:bg-bone"
          : "border border-line text-bone hover:border-signal hover:text-signal")
      }
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
