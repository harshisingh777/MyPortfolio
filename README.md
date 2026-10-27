# Harshi Singh — Portfolio

Vite + React 18 + TypeScript + Tailwind + Framer Motion + Lenis smooth scroll.

## Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Where things live

| What | File |
|---|---|
| All copy (summary, projects, experience, education, skills, links) | `src/data/resume.ts` |
| Hero + animated "noise → signal" scatter plot | `src/components/Hero.tsx`, `src/components/SignalScatter.tsx` |
| Profile as a Jupyter notebook | `src/components/Profile.tsx` |
| Case studies, screenshot carousel, lightbox | `src/components/work/` |
| Mock screens for projects without a live demo (Amazon ML, AcquireKeep) | `src/components/work/Mocks.tsx` |
| Experience & education Gantt chart, achievement, certification | `src/components/Journey.tsx` |
| Skills as a SQL result table | `src/components/Toolkit.tsx` |
| Project screenshots | `public/projects/*.webp` |

To add a project, append an entry to `projects` in `src/data/resume.ts` — use
`{ kind: "image", src }` for a real screenshot or `{ kind: "mock", mock }` for a
component registered in `Mocks.tsx`.

## Design system

- **Palette** — near-black graph-paper canvas (`#0B0B0C`), bone-white type
  (`#ECE8DF`), a single chartreuse "signal" accent (`#D2F53C`) and an ember
  (`#FF7A45`) for outliers. Tokens in `tailwind.config.ts`.
- **Type** — Instrument Serif (display), Geist (body), Geist Mono (labels).
- **Motion** — Lenis smooth scroll, masked headline reveals, count-up stats,
  auto-advancing screenshot decks. All of it respects `prefers-reduced-motion`.
