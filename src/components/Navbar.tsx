const links = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Skills", href: "#skills" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-6">
      <nav
        className="glass-nav flex w-full max-w-3xl items-center justify-between rounded-full
                   px-6 py-3 shadow-glass"
      >
        <a
          href="#hero"
          data-cursor-hover
          className="font-display text-base font-medium tracking-tight text-ink"
        >
          Harshi Singh
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor-hover
                className="font-body text-sm text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          data-cursor-hover
          className="rounded-full bg-ink px-4 py-2 font-body text-xs font-medium text-white
                     transition-transform hover:scale-105 active:scale-95 md:hidden"
        >
          Menu
        </a>
      </nav>
    </header>
  );
}
