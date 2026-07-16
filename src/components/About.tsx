import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm"
        >
          {/* Organic blob-mask crop, claymorphic frame — replace the fill
              below with Harshi's real portrait photo. */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-clay to-white shadow-clay-lg"
            style={{
              borderRadius: "62% 38% 55% 45% / 48% 45% 55% 52%",
            }}
          />
          <div
            className="absolute inset-4 flex items-center justify-center overflow-hidden bg-coral/10 text-center"
            style={{
              borderRadius: "62% 38% 55% 45% / 48% 45% 55% 52%",
            }}
          >
            <img src="/harshi-portrait.jpeg" alt="Harshi Singh" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <div>
          <p className="section-number mb-4">About</p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl leading-tight text-ink md:text-5xl"
          >
            Data that drives impact, not just insights.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel mt-8 rounded-3xl px-7 py-6"
          >
            <p className="font-body text-base leading-relaxed text-ink/75">
              I am a Data Science student and a Computer Science Student (minor degree) at IIT mandi with a passion for building intelligent systems. I specialize in data analysis, machine learning, and full-stack development. My goal is to make data actionable and accessible, driving meaningful outcomes through data-driven decision making and automation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
