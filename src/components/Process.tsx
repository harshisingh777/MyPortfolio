import { motion } from "framer-motion";

const steps = [
  { label: "Research", detail: "Understand the problem through user interviews, competitor analysis, and requirement gathering." },
  { label: "Ideate", detail: "Explore multiple solutions using brainstorming, sketches, and mood boards to shape the best direction." },
  { label: "Prototype", detail: "Create interactive wireframes and prototypes to visualize ideas and test functionality early." },
  { label: "Design", detail: "Refine the visual identity, layouts, typography, and interactions to create a polished experience." },
  { label: "Test", detail: "Validate the design with usability testing, gather feedback, and iterate based on user insights." },
  { label: "Ship", detail: "Deliver the final product with complete documentation, developer handoff, and post-launch support." },
];

export default function Process() {
  return (
    <section id="process" className="relative px-6 py-28 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="section-number mb-3">02 — Process</p>
        <h2 className="mb-16 font-display text-4xl text-ink md:text-5xl">How she works</h2>

        <div className="relative">
          {/* connecting line, draws in on scroll */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink/10 md:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="absolute left-0 right-0 top-6 hidden h-px bg-coral md:block"
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <div
                  className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full
                             bg-clay font-display text-sm text-ink shadow-clay"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 font-display text-lg text-ink">{step.label}</h3>
                <p className="font-body text-sm leading-relaxed text-ink/60">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
