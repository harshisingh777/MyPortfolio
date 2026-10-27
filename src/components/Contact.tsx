import { useState } from "react";
import { ArrowUpRight, MaskReveal, Reveal } from "./ui";
import { profile } from "../data/resume";

const links = [
  { label: "LinkedIn", value: "in/harshi-singh", href: profile.linkedin },
  { label: "GitHub", value: "@harshisingh777", href: profile.github },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}` },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section id="contact" className="graph-paper relative overflow-hidden border-t border-line px-5 pb-10 pt-28 md:px-10 md:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.12] blur-[140px]"
        style={{ background: "radial-gradient(circle, #D2F53C 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <p className="label mb-8 flex items-center gap-3">
            <span className="text-signal">04</span>
            <span className="h-px w-8 bg-line" />
            Contact
          </p>
        </Reveal>

        <h2 className="font-serif text-[15vw] leading-[0.86] tracking-tight text-bone md:text-[10rem]">
          {["Let's find the", "signal in your data."].map((line, i) => (
            <MaskReveal key={line} delay={i * 0.1} className={i === 1 ? "italic text-bone-dim" : ""}>
              {line}
            </MaskReveal>
          ))}
        </h2>

        <Reveal delay={0.15} className="mt-14 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            data-cursor-label="Write"
            className="group inline-flex items-center gap-4 rounded-full bg-signal py-4 pl-7 pr-4 text-base text-night transition-colors duration-300 hover:bg-bone md:text-lg"
          >
            {profile.email}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-night text-signal transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-full border border-line px-5 py-4 font-mono text-xs uppercase tracking-wider text-bone-dim transition-colors hover:border-signal hover:text-signal"
          >
            {copied ? "Copied ✓" : "Copy email"}
          </button>
        </Reveal>

        <div className="mt-24 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.06}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between border-b border-line py-6 pr-2 transition-colors duration-300 hover:text-signal sm:pr-6 lg:border-b-0"
              >
                <span>
                  <span className="label block">{l.label}</span>
                  <span className="mt-2 block truncate text-bone transition-colors group-hover:text-signal">{l.value}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-bone-mute transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
              </a>
            </Reveal>
          ))}
        </div>

        <footer className="mt-24 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] text-bone-mute md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Harshi Singh · {profile.location}</span>
          <a href="#top" className="self-start rounded-full border border-line px-4 py-2 transition-colors hover:border-signal hover:text-signal md:self-auto">
            back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
