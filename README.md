# Harshi Singh — Portfolio

Vite + React 18 + TypeScript + Tailwind + Framer Motion + React Three Fiber.

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

## Before this goes live — fill in every `[[placeholder]]`

Nothing fake was invented for Harshi. Every project name, bio line, testimonial,
image, and social link is a marked placeholder. Search the codebase for
`[[` to find them all, or use the checklist below.

| File | What to replace |
|---|---|
| `src/components/Hero.tsx` | Tagline sentence |
| `src/components/About.tsx` | Real bio (background, philosophy, specialty) + portrait photo |
| `src/components/Work.tsx` | Real case studies — swap the whole `projects` array. Add/remove entries to match however many she actually has. |
| `src/components/ProjectCard.tsx` | Hero visual / mockup images per project (currently a labeled placeholder block) |
| `src/components/BeforeAfterSlider.tsx` | Real before/after design images, only used where `hasBeforeAfter: true` |
| `src/components/Process.tsx` | Her actual process description per step, if the 5 default steps (Research → Ideate → Prototype → Test → Ship) don't match her real workflow |
| `src/components/Skills.tsx` | Her real tools, grouped however makes sense |
| `src/components/Playground.tsx` | Swap the 4 example micro-interactions for ones she's actually proud of, if different |
| `src/components/Contact.tsx` | Real email + Behance/Dribbble/LinkedIn/Instagram links (remove any platform she doesn't use professionally) |

If she has real, attributable testimonials, add a `Testimonials.tsx` section
back into `src/App.tsx` (it was intentionally left out rather than filled
with invented quotes).

## Design system reference

- **Palette** — "Bold editorial" direction: white/near-white base (`#FAFAF9`),
  deep coral (`#FF5A5F`), cobalt (`#0057FF`), ink black (`#111111`) for
  headline type and high-contrast CTAs. Defined in `tailwind.config.ts`.
- **Type** — Display: Bricolage Grotesque. Body: General Sans (loaded via
  Google Fonts / Fontshare in `index.html`).
- **Claymorphism** — `shadow-clay`, `shadow-clay-sm`, `shadow-clay-lg`,
  `shadow-clay-pressed`, `shadow-clay-coral` utilities, hand-tuned dual
  shadows on the `clay` background color. Used for cards, chips, buttons.
- **Glassmorphism** — `.glass-panel` / `.glass-nav` classes, used sparingly
  for the nav bar and the case-study detail panel.

## Performance notes (why this doesn't lag)

- Exactly one genuine WebGL element: the hero blob in
  `src/components/Hero3DScene.tsx` — procedural icosahedron + drei's
  `MeshDistortMaterial`, no imported `.glb`.
- It's `React.lazy()`-loaded from `Hero.tsx` and code-split into its own
  chunk (see `manualChunks` in `vite.config.ts`), so it never blocks first
  paint.
- It never mounts on mobile-width viewports or under
  `prefers-reduced-motion` — `HeroStaticShape.tsx` (a CSS gradient blob) is
  swapped in instead.
- Everywhere else — project card tilt, the flip-card demo, the custom
  cursor — the "3D" feeling is CSS `perspective`/`rotateX`/`rotateY` and
  `transform-style: preserve-3d`, not WebGL.
- Background drift, blob movement, and Lenis smooth-scroll all respect
  `prefers-reduced-motion`.
