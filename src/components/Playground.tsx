import { motion } from "framer-motion";
import MagneticButton from "./playground/MagneticButton";
import CursorBlob from "./playground/CursorBlob";
import PaletteGenerator from "./playground/PaletteGenerator";
import FlipCard from "./playground/FlipCard";

const demos = [
  { title: "Magnetic button", node: <MagneticButton /> },
  { title: "Cursor-follow blob", node: <CursorBlob /> },
  { title: "Palette generator", node: <PaletteGenerator /> },
  { title: "Flip card", node: <FlipCard /> },
];

export default function Playground() {
  return (
    <section id="playground" className="relative px-6 py-28 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="section-number mb-3">04 — Playground</p>
        <h2 className="mb-3 font-display text-4xl text-ink md:text-5xl">Micro-interactions</h2>
        <p className="mb-14 max-w-xl font-body text-ink/60">
          {/* [[placeholder]] — swap in whichever experiments Harshi is actually
              proud of; these four are structural examples. */}
          A handful of small interactions, built with CSS and Framer Motion —
          no WebGL required.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex h-64 flex-col rounded-3xl bg-clay p-2 shadow-clay"
            >
              <div className="flex-1 overflow-hidden rounded-2xl">{demo.node}</div>
              <p className="px-3 pt-2 font-body text-xs uppercase tracking-wide text-ink/40">
                {demo.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
