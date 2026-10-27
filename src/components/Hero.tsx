import { motion } from "framer-motion";
import SignalScatter from "./SignalScatter";
import { Counter, EASE } from "./ui";
import { headlineStats, profile } from "../data/resume";

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="top" className="relative w-full overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pt-32">
      {/* soft signal glow behind the figure */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px] rounded-full opacity-[0.10] blur-[120px]"
        style={{ background: "radial-gradient(circle, #D2F53C 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="label mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 md:mb-4"
        >
          <span className="flex items-center gap-2 text-bone-dim">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-signal" />
            Portfolio · {new Date().getFullYear()}
          </span>
          <span>{profile.role}</span>
          <span className="hidden sm:inline">B.Tech CSE (Data Science)</span>
          <span>Prayagraj, IN</span>
        </motion.div>

        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <h1 className="font-serif text-[22vw] leading-[0.82] tracking-[-0.02em] text-bone lg:col-span-6 lg:text-[10.5vw] 2xl:text-[11rem]">
            {["Harshi", "Singh"].map((word, i) => (
              <span key={word} className="-mb-[0.16em] block overflow-hidden pb-[0.16em]">
                <motion.span
                  className={"inline-block " + (i === 1 ? "pl-[12vw] italic lg:pl-[7vw] 2xl:pl-[7.5rem]" : "")}
                  initial={{ y: "110%" }}
                  animate={ready ? { y: "0%" } : undefined}
                  transition={{ duration: 1.05, delay: 0.15 + i * 0.12, ease: EASE }}
                >
                  {word}
                  {i === 1 && <span className="text-signal">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
            className="relative lg:col-span-6"
          >
            <div className="graph-paper relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-night-900">
              <div className="absolute left-4 top-3 z-10 flex items-center gap-3 font-mono text-[10px] text-bone-mute">
                <span className="text-signal">fig. 01</span>
                <span>noise → signal</span>
              </div>
              <div className="absolute right-4 top-3 z-10 hidden font-mono text-[10px] text-bone-mute sm:block">
                r = 0.97 · p &lt; 0.001
              </div>
              <div className="absolute inset-0 pt-6">
                {ready && <SignalScatter />}
              </div>
            </div>
            <figcaption className="mt-3 flex justify-between font-mono text-[10px] text-bone-mute">
              <span>x → data explored</span>
              <span className="hidden sm:inline">move your cursor through the plot</span>
              <span>y → decisions made</span>
            </figcaption>
          </motion.figure>
        </div>

        <div className="mt-12 grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            className="md:col-span-7"
          >
            <p className="max-w-2xl text-lg leading-relaxed text-bone-dim md:text-2xl md:leading-snug">
              I find the <span className="font-serif text-2xl italic text-bone">signal</span> in messy data —
              with Python, SQL and statistics. Cleaning, EDA, hypothesis tests, cohort &amp; retention analysis,
              KPI dashboards and predictive models.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="md:col-span-5 md:flex md:justify-end"
          >
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                data-cursor-label="Scroll"
                className="group inline-flex items-center gap-3 rounded-full bg-signal px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-night transition-colors duration-300 hover:bg-bone"
              >
                See the work
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-bone transition-colors duration-300 hover:border-signal hover:text-signal"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-2 border-t border-line md:grid-cols-4"
        >
          {headlineStats.map((s, i) => (
            <div
              key={s.label}
              className={
                "border-line py-6 pr-4 " +
                (i % 2 === 1 ? "pl-4 md:pl-6 " : "md:pl-6 ") +
                (i > 0 ? "md:border-l " : "md:!pl-0 ") +
                (i % 2 === 1 ? "border-l " : "") +
                (i > 1 ? "border-t md:border-t-0" : "")
              }
            >
              <dd className="font-serif text-4xl text-bone md:text-5xl">
                {/* mount after the intro so the count-up is actually seen */}
                {ready ? (
                  <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                ) : (
                  <span className="opacity-0">0</span>
                )}
              </dd>
              <dt className="mt-2 max-w-[16rem] text-xs leading-snug text-bone-mute">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
