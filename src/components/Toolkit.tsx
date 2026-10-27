import { motion } from "framer-motion";
import { EASE, Reveal, SectionHeader } from "./ui";
import { skills } from "../data/resume";

const total = skills.reduce((n, g) => n + g.items.length, 0);

export default function Toolkit() {
  return (
    <section id="toolkit" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index="03"
          kicker="Technical skills"
          title={
            <>
              The <span className="italic text-bone-dim">toolkit.</span>
            </>
          }
        />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-night-900/70">
            <div className="border-b border-line px-5 py-5 font-mono text-[13px] md:px-8">
              <span className="text-signal">SELECT</span> <span className="text-bone">category, skills</span>{" "}
              <span className="text-signal">FROM</span> <span className="text-bone">harshi.toolkit</span>{" "}
              <span className="text-signal">GROUP BY</span> <span className="text-bone">category</span>;
            </div>

            <div className="hidden grid-cols-12 border-b border-line px-8 py-3 font-mono text-[10px] uppercase tracking-label text-bone-mute md:grid">
              <span className="col-span-3">category</span>
              <span className="col-span-8">skills</span>
              <span className="col-span-1 text-right">n</span>
            </div>

            {skills.map((g, gi) => (
              <div
                key={g.group}
                className="group grid grid-cols-1 gap-4 border-b border-line px-5 py-6 transition-colors duration-500 last:border-b-0 hover:bg-signal/[0.035] md:grid-cols-12 md:px-8 md:py-7"
              >
                <div className="flex items-baseline justify-between md:col-span-3 md:block">
                  <h3 className="font-serif text-3xl text-bone transition-colors duration-300 group-hover:text-signal">
                    {g.group}
                  </h3>
                  <span className="font-mono text-xs text-bone-mute md:hidden">{g.items.length}</span>
                </div>
                <div className="flex flex-wrap gap-2 md:col-span-8">
                  {g.items.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.5, delay: gi * 0.04 + i * 0.03, ease: EASE }}
                      className="rounded-full border border-line px-4 py-2 text-sm text-bone-dim transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-night"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
                <span className="hidden text-right font-mono text-sm text-bone-mute md:col-span-1 md:block">
                  {g.items.length}
                </span>
              </div>
            ))}

            <div className="flex justify-between border-t border-line px-5 py-3 font-mono text-[11px] text-bone-mute md:px-8">
              <span>
                {skills.length} rows · {total} skills
              </span>
              <span>query ok · 0.4 ms</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
