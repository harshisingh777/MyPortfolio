import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "./ui";

const links = [
  { label: "Profile", href: "#profile", n: "00" },
  { label: "Work", href: "#work", n: "01" },
  { label: "Journey", href: "#journey", n: "02" },
  { label: "Toolkit", href: "#toolkit", n: "03" },
  { label: "Contact", href: "#contact", n: "04" },
];

function useIstClock() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive("#" + e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Navbar() {
  const time = useIstClock();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-signal"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-line bg-night/70 py-2 pl-2 pr-2 backdrop-blur-xl md:pr-3">
          <a href="#top" className="flex items-center gap-3 rounded-full py-1 pl-1 pr-3" aria-label="Harshi Singh — back to top">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bone font-serif text-[15px] italic text-night">
              hs
            </span>
            <span className="text-sm font-medium tracking-tight text-bone">Harshi Singh</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={
                      "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors duration-300 " +
                      (isActive ? "text-night" : "text-bone-dim hover:text-bone")
                    }
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-signal"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={"relative font-mono text-[10px] " + (isActive ? "text-night/60" : "text-bone-mute")}>
                      {link.n}
                    </span>
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[11px] text-bone-mute sm:block">
              Prayagraj <span className="text-bone-dim">{time}</span> IST
            </span>
            <a
              href="#contact"
              className="hidden rounded-full bg-bone px-4 py-2 text-xs font-medium text-night transition-colors duration-300 hover:bg-signal md:block"
            >
              Say hello
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line lg:hidden"
            >
              <span className="relative block h-2.5 w-4">
                <span
                  className={
                    "absolute left-0 h-px w-4 bg-bone transition-all duration-300 " +
                    (open ? "top-1/2 rotate-45" : "top-0")
                  }
                />
                <span
                  className={
                    "absolute left-0 h-px w-4 bg-bone transition-all duration-300 " +
                    (open ? "top-1/2 -rotate-45" : "top-full")
                  }
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="graph-paper fixed inset-0 z-40 flex flex-col justify-end bg-night px-6 pb-12 pt-24 lg:hidden"
          >
            <ul className="space-y-1">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: EASE }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-3 font-serif text-5xl text-bone"
                  >
                    <span className="font-mono text-xs text-signal">{link.n}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-xs text-bone-mute">Prayagraj · {time} IST</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
