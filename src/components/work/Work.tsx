import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShotDeck from "./ShotDeck";
import { PillLink, Reveal, SectionHeader } from "../ui";
import { projects, type Project } from "../../data/resume";

function ProjectShowcase({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numeralY = useTransform(scrollYProgress, [0, 1], ["-12%", "18%"]);

  return (
    <article ref={ref} id={project.id} className="relative border-b border-line py-20 last:border-b-0 last:pb-0 md:py-28 md:last:pb-0">
      {/* oversized outlined index numeral drifting behind the header */}
      <motion.span
        aria-hidden="true"
        style={{ y: numeralY }}
        className="pointer-events-none absolute -top-6 right-0 select-none font-serif text-[38vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(236,232,223,0.07)] md:-top-10 md:text-[22rem]"
      >
        {project.index}
      </motion.span>

      <div className="relative mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="label mb-4">
            <span className="text-signal">Case {project.index}</span> / 04 · {project.subtitle}
          </p>
          <h3 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight text-bone md:text-7xl">{project.title}</h3>
        </Reveal>
        <Reveal delay={0.1} className="flex shrink-0 flex-wrap gap-3">
          {project.live && (
            <PillLink href={project.live} primary>
              Live demo
            </PillLink>
          )}
          <PillLink href={project.code}>Source</PillLink>
        </Reveal>
      </div>

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-8 lg:order-2">
          <Reveal y={50}>
            <ShotDeck shots={project.shots} title={project.title} mobileShot={project.mobileShot} />
          </Reveal>
          {project.note && <p className="mt-4 font-mono text-[10px] text-bone-mute">* {project.note}</p>}
        </div>

        <div className="lg:col-span-4 lg:order-1">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-night px-4 py-5">
                    <dd className="font-serif text-4xl leading-none text-signal">{m.value}</dd>
                    <dt className="mt-2 font-mono text-[10px] uppercase tracking-wider text-bone-mute">{m.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>

            <ol className="mt-8 space-y-5">
              {project.bullets.map((b, i) => (
                <Reveal key={i} delay={0.05 * i} y={16}>
                  <li className="flex gap-4 text-[15px] leading-relaxed text-bone-dim">
                    <span className="mt-1 font-mono text-[10px] text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <span>{b}</span>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index="01"
          kicker="Selected work"
          title={
            <>
              Case <span className="italic text-bone-dim">studies.</span>
            </>
          }
          aside={
            <p className="text-sm leading-relaxed text-bone-mute">
              Four projects — from a deployed analytics workbench to a top-1.3% finish in the Amazon ML Challenge.
              Click any screen to enlarge it.
            </p>
          }
        />
        {projects.map((p) => (
          <ProjectShowcase key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
