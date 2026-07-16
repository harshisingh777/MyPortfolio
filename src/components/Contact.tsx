import { motion } from "framer-motion";

const links = [
  { label: "Email", href: "mailto:harshisingh2609@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harshi-singh-9a1713332/" },
  { label: "GitHub", href: "https://github.com/harshisingh777" },
  { label: "Resume", href: "https://drive.google.com/file/d/1pJnHXemc8bdCFaHnwaThbJ7MkWgst5Hd/view?usp=sharing" },
  { label: "Instagram", href: "https://www.instagram.com/harshi.py?igsh=MWtiNTRqZ2c0bG1sZA==" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32 md:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="section-number mb-4">05 — Contact</p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl leading-tight text-ink md:text-6xl"
        >
          Let's build something worth remembering.
        </motion.h2>

        <motion.a
          href={links[0].href}
          data-cursor-hover
          data-cursor-label="Say hi"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 inline-block rounded-full bg-ink px-10 py-5 font-body text-base font-medium text-white
                     shadow-clay-lg transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
        >
          harshisingh2609@gmail.com
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          {links.slice(1).map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor-hover
              className="rounded-full bg-clay px-6 py-3 font-body text-sm text-ink shadow-clay-sm
                         transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        <p className="mt-20 font-body text-xs text-ink/40">
          © {new Date().getFullYear()} Harshi Singh. Designed &amp; built as a live portfolio piece.
        </p>
      </div>
    </section>
  );
}
