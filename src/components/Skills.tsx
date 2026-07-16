import { motion } from "framer-motion";

/**
 * [[placeholder]] Replace with Harshi's actual toolset. Common defaults
 * (Figma, Illustrator, After Effects, etc.) are left here only as
 * structural examples — confirm the real list before shipping.
 */
const groups = [
  {
    label: "Languages",
    tools: ["C++", "Python", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    label: "Frameworks & Libraries",
    tools: ["React 18", "Next.js", "Vue.js", "Tailwind CSS", "Bootstrap", "Flask"],
  },
  {
    label: "Developer Tools",
    tools: ["VS Code", "Jupyter", "Git/GitHub", "AutoCAD", "MATLAB", "Google Colab"],
  },
  {
    label: "Core Concepts",
    tools: ["Machine Learning", "Data Visualization", "RESTful APIs", "Agile", "Product Roadmap"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="section-number mb-3">03 — Skills &amp; Tools</p>
        <h2 className="mb-14 font-display text-4xl text-ink md:text-5xl">What she works with</h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {groups.map((group, gi) => (
            <div key={group.label}>
              <h3 className="mb-4 font-body text-sm font-medium uppercase tracking-wide text-ink/50">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.tools.map((tool, i) => (
                  <motion.span
                    key={tool + i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4, delay: gi * 0.05 + i * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="cursor-default rounded-full bg-clay px-5 py-2.5 font-body text-sm text-ink
                               shadow-clay-sm transition-shadow duration-300 hover:shadow-clay"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
