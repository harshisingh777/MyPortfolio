import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";

export interface Project {
  id: string;
  title: string;
  category: string;
  medium: "screen" | "print";
  problem: string;
  role: string;
  process: string;
  outcome: string;
  hasBeforeAfter?: boolean;
  heroImage?: string;
  codeLink?: string;
  liveLink?: string;
  gallery: string[]; // paths to images for the viewer section
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Cheap CSS-driven "3D" tilt — perspective + rotateX/rotateY toward the
  // cursor, no WebGL involved.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  const glareX = useTransform(springRotateY, [-8, 8], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: 900,
        }}
        className="group relative overflow-hidden rounded-[28px] bg-clay shadow-clay-lg"
      >
        {/* device / print frame */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-white to-clay p-6 md:p-10">
          <div
            className={
              project.medium === "screen"
                ? "relative h-full w-full overflow-hidden rounded-xl border-[6px] border-ink/90 bg-white shadow-clay"
                : "relative h-full w-full overflow-hidden border-[14px] border-white bg-white shadow-clay"
            }
          >
            {project.heroImage ? (
              <img src={project.heroImage} alt={`${project.title} hero visual`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-coral/10 to-cobalt/10">
                <span className="px-6 text-center font-body text-sm text-ink/50">
                  [[placeholder: {project.title} hero visual —{" "}
                  {project.medium === "screen" ? "screen mockup" : "print / mat frame"}]]
                </span>
              </div>
            )}
          </div>

          {/* glare sweep, driven by tilt position */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundPositionX: glareX.get() ? `${glareX.get()}%` : "50%" }}
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          data-cursor-hover
          data-cursor-label={open ? "Close" : "View"}
          className="flex w-full items-center justify-between px-6 py-5 text-left md:px-8 md:py-6"
        >
          <div>
            <p className="eyebrow mb-1">{project.category}</p>
            <h3 className="font-display text-xl text-ink md:text-2xl">{project.title}</h3>
          </div>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-clay-sm font-display text-lg text-ink"
          >
            +
          </motion.span>
        </button>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="glass-panel mt-4 rounded-[28px] px-6 py-8 md:px-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                <DetailBlock label="Problem" text={project.problem} />
                <DetailBlock label="Role" text={project.role} />
                <DetailBlock label="Process" text={project.process} />
                <DetailBlock label="Outcome" text={project.outcome} />
              </div>

              {(project.codeLink || project.liveLink) && (
                <div className="mt-8 flex flex-wrap gap-4">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-ink px-6 py-2.5 font-body text-sm font-medium text-white shadow-clay transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
                    >
                      View Live Project
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-clay px-6 py-2.5 font-body text-sm font-medium text-ink shadow-clay-sm transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              )}

              {project.hasBeforeAfter && (
                <div className="mt-10">
                  <p className="eyebrow mb-3">Before / after</p>
                  <BeforeAfterSlider />
                </div>
              )}

              <div className="mt-10">
                <p className="eyebrow mb-3">Viewer</p>
                <div className="flex flex-col gap-6">
                  {project.gallery.map((imgSrc, i) => (
                    <img 
                      key={i} 
                      src={imgSrc} 
                      alt={`${project.title} viewer image ${i + 1}`} 
                      className="w-full h-auto rounded-2xl shadow-clay"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="section-number mb-2">{label}</p>
      <p className="font-body text-sm leading-relaxed text-ink/70">{text}</p>
    </div>
  );
}
