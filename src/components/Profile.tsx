import { motion } from "framer-motion";
import { EASE, Reveal, SectionHeader } from "./ui";
import { profile } from "../data/resume";

const info = [
  ["name", "Harshi Singh", "str"],
  ["role", "Data Analyst", "str"],
  ["degree", "B.Tech CSE (Data Science) · AKTU · 2028", "str"],
  ["minor", "Computer Science · IIT Mandi", "str"],
  ["based_in", "Prayagraj, Uttar Pradesh, India", "str"],
  ["core_stack", "Python · SQL · Pandas · dbt · scikit-learn", "list"],
  ["focus", "EDA · statistics · retention · dashboards", "list"],
] as const;

function Cell({ n, code, children, delay = 0 }: { n: number; code: string; children?: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="border-b border-line py-5 last:border-b-0"
    >
      <div className="flex gap-4 font-mono text-[13px]">
        <span className="shrink-0 text-bone-mute">In [{n}]:</span>
        <code className="text-bone">
          {!code && <span className="inline-block h-4 w-2 animate-blink bg-signal align-middle" />}
          {code.split(/(\.\w+\(|"[^"]*")/).map((part, i) =>
            part.startsWith('"') ? (
              <span key={i} className="text-ember">{part}</span>
            ) : part.startsWith(".") ? (
              <span key={i} className="text-signal">{part}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </code>
      </div>
      {children && <div className="mt-4 sm:pl-[4.6rem]">{children}</div>}
    </motion.div>
  );
}

export default function Profile() {
  return (
    <section id="profile" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index="00"
          kicker="Profile"
          title={
            <>
              Hello, <span className="italic text-bone-dim">I'm Harshi.</span>
            </>
          }
          aside={
            <p className="text-sm leading-relaxed text-bone-mute">
              A data science undergraduate who likes her answers tested, her SQL validated and her charts honest.
            </p>
          }
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <figure className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <img
                  src="/harshi-portrait.webp"
                  alt="Portrait of Harshi Singh"
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                {/* corner registration marks */}
                {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map(
                  (c) => (
                    <span key={c} className={"absolute h-4 w-4 border-signal " + c} />
                  )
                )}
              </div>
              <figcaption className="mt-3 flex justify-between font-mono text-[10px] text-bone-mute">
                <span>
                  <span className="text-signal">fig. 02</span> — the analyst
                </span>
                <span>hover → colour</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="md:col-span-8">
            <div className="rounded-2xl border border-line bg-night-900/80 px-5 md:px-8">
              <div className="flex items-center justify-between border-b border-line py-3 font-mono text-[11px] text-bone-mute">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-signal" /> about_harshi.ipynb
                </span>
                <span>Python 3 · kernel idle</span>
              </div>

              <Cell n={1} code="from harshi import profile" />

              <Cell n={2} code="profile.summary()" delay={0.08}>
                <p className="font-serif text-2xl leading-snug text-bone md:text-[2rem]">
                  “{profile.summary}”
                </p>
              </Cell>

              <Cell n={3} code="profile.info()" delay={0.16}>
                <div className="overflow-x-auto">
                  <p className="mb-2 font-mono text-xs text-bone-mute">&lt;class 'harshi.Analyst'&gt;</p>
                  <table className="w-full min-w-[460px] font-mono text-[12px]">
                    <thead>
                      <tr className="text-left text-bone-mute">
                        <th className="w-8 py-1.5 font-normal">#</th>
                        <th className="w-32 py-1.5 font-normal">Field</th>
                        <th className="py-1.5 font-normal">Value</th>
                        <th className="w-12 py-1.5 text-right font-normal">Dtype</th>
                      </tr>
                    </thead>
                    <tbody>
                      {info.map(([k, v, t], i) => (
                        <tr key={k} className="border-t border-line/60 transition-colors hover:bg-signal/[0.06]">
                          <td className="py-2 text-bone-mute">{i}</td>
                          <td className="py-2 text-signal">{k}</td>
                          <td className="py-2 text-bone">{v}</td>
                          <td className="py-2 text-right text-bone-mute">{t}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-3 font-mono text-xs text-bone-mute">
                    dtypes: curiosity(1), rigor(1) · memory usage: always learning
                  </p>
                </div>
              </Cell>

              <Cell n={4} code="" delay={0.24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
