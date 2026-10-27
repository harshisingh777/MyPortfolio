import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, PillLink, Reveal, SectionHeader } from "./ui";
import { certification, journey } from "../data/resume";

// Timeline axis: Jan 2023 → Dec 2028
const AXIS_START = new Date(2023, 0, 1).getTime();
const AXIS_END = new Date(2029, 0, 1).getTime();
const years = [2023, 2024, 2025, 2026, 2027, 2028];

function toPct(ym: string, endOfMonth = false) {
  const [y, m] = ym.split("-").map(Number);
  const t = new Date(y, m - 1 + (endOfMonth ? 1 : 0), 1).getTime();
  return ((t - AXIS_START) / (AXIS_END - AXIS_START)) * 100;
}

function Gantt() {
  const [active, setActive] = useState("neeyat");
  const now = Math.min(100, Math.max(0, ((Date.now() - AXIS_START) / (AXIS_END - AXIS_START)) * 100));
  const nowLabel = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(new Date());
  const selected = journey.find((j) => j.id === active)!;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="rounded-2xl border border-line bg-night-900/70 p-5 md:p-8">
          <div className="mb-6 flex items-center justify-between font-mono text-[10px] text-bone-mute">
            <span>
              <span className="text-signal">fig. 03</span> — timeline, 2023 → 2028
            </span>
            <span className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <i className="h-2 w-3 rounded-sm bg-bone/30" /> education
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-2 w-3 rounded-sm bg-signal" /> experience
              </span>
            </span>
          </div>

          <div className="relative">
            {/* year gridlines */}
            <div className="pointer-events-none absolute inset-0">
              {years.map((y) => (
                <div key={y} className="absolute inset-y-0 border-l border-dashed border-line" style={{ left: `${toPct(`${y}-01`)}%` }}>
                  <span className="absolute -top-0 left-1.5 font-mono text-[10px] text-bone-mute">{y}</span>
                </div>
              ))}
              <div className="absolute inset-y-0 z-10 border-l border-ember" style={{ left: `${now}%` }}>
                <span className="absolute -bottom-6 -translate-x-1/2 whitespace-nowrap rounded bg-ember px-1.5 py-0.5 font-mono text-[9px] text-night">
                  now · {nowLabel}
                </span>
              </div>
            </div>

            <ul className="relative space-y-3 pb-8 pt-8">
              {journey.map((j, i) => {
                const left = toPct(j.start);
                const width = Math.max(1.6, toPct(j.end, true) - left);
                const isExp = j.kind === "Experience";
                const isActive = active === j.id;
                return (
                  <li key={j.id}>
                    <button
                      type="button"
                      onClick={() => setActive(j.id)}
                      onMouseEnter={() => setActive(j.id)}
                      className="group relative block h-14 w-full text-left"
                      aria-pressed={isActive}
                    >
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}
                        className={
                          "absolute top-1/2 h-3 -translate-y-1/2 origin-left rounded-full transition-all duration-300 " +
                          (isExp ? "bg-signal" : isActive ? "bg-bone/70" : "bg-bone/25 group-hover:bg-bone/45") +
                          (isActive ? " shadow-[0_0_0_4px_rgba(210,245,60,0.15)]" : "")
                        }
                        style={{ left: `${left}%`, width: `${width}%` }}
                      />
                      <span
                        className={
                          "absolute top-0 whitespace-nowrap text-[13px] transition-colors " +
                          (isActive ? "text-bone" : "text-bone-mute group-hover:text-bone-dim")
                        }
                        style={left > 40 ?{ right: `${100 - left - width}%` } : { left: `${left}%` }}
                      >
                        {j.title.replace(/ \(.*\)/, "")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="h-full rounded-2xl border border-line p-6 md:p-8"
          >
            <p className="label">
              <span className={selected.kind === "Experience" ? "text-signal" : ""}>{selected.kind}</span> · {selected.when}
            </p>
            <h3 className="mt-4 font-serif text-3xl leading-tight text-bone md:text-4xl">{selected.title}</h3>
            <p className="mt-2 text-bone-dim">{selected.detail}</p>
            <p className="mt-1 font-mono text-xs text-bone-mute">{selected.place}</p>
            {selected.bullets && (
              <ul className="mt-6 space-y-4 border-t border-line pt-6">
                {selected.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-bone-dim">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-8 font-mono text-[10px] text-bone-mute">hover or tap a bar to inspect</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Recognition() {
  const pos = (r: number) => (Math.log10(r) / Math.log10(27000)) * 100;
  return (
    <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
      <Reveal className="md:col-span-8">
        <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-night-900/70 p-6 md:p-10">
          <p className="label">Achievement · Amazon ML Challenge 2026</p>
          <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="font-serif text-8xl leading-[0.8] text-bone md:text-[9rem]">
              334<span className="text-signal">.</span>
            </p>
            <p className="pb-2 text-bone-dim">
              out of <span className="text-bone">27,000+</span> teams
              <br />
              <span className="font-mono text-xs text-signal">top 1.3% · score 0.987133</span>
            </p>
          </div>
          <div className="relative mt-14 h-10">
            <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${pos(334)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE }}
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-signal"
            />
            {[1, 10, 100, 1000, 10000, 27000].map((t) => (
              <div key={t} className="absolute top-1/2" style={{ left: `${pos(t)}%` }}>
                <div className="h-3 w-px -translate-y-1/2 bg-bone-mute" />
                <span className="absolute top-3 -translate-x-1/2 font-mono text-[10px] text-bone-mute">
                  {t >= 1000 ? `${t / 1000}k` : t}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-right font-mono text-[10px] text-bone-mute">final rank, log scale</p>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="md:col-span-4">
        <div className="flex h-full flex-col justify-between rounded-2xl border border-line p-6 md:p-10">
          <div>
            <p className="label">Certification</p>
            <h3 className="mt-6 font-serif text-4xl leading-tight text-bone">{certification.title}</h3>
            <p className="mt-2 font-mono text-xs text-bone-mute">{certification.issuer}</p>
          </div>
          <div className="mt-8">
            <PillLink href={certification.href}>View credential</PillLink>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index="02"
          kicker="Experience & education"
          title={
            <>
              The <span className="italic text-bone-dim">journey.</span>
            </>
          }
          aside={
            <p className="text-sm leading-relaxed text-bone-mute">
              Plotted the only way an analyst would — as a chart. Engineering degree in data science, a CS minor
              from IIT Mandi, and product work at an AI start-up.
            </p>
          }
        />
        <Reveal>
          <Gantt />
        </Reveal>
        <Recognition />
      </div>
    </section>
  );
}
