import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Curated hue seeds so generated palettes stay tasteful rather than random noise.
const HUE_SEEDS = [355, 210, 45, 265, 165, 15, 195, 320];

function randomPalette(): string[] {
  const baseHue = HUE_SEEDS[Math.floor(Math.random() * HUE_SEEDS.length)];
  return Array.from({ length: 4 }, (_, i) => {
    const hue = (baseHue + i * (360 / 9)) % 360;
    const sat = 55 + Math.random() * 25;
    const light = 45 + i * 8;
    return `hsl(${Math.round(hue)}, ${Math.round(sat)}%, ${Math.round(light)}%)`;
  });
}

export default function PaletteGenerator() {
  const [palette, setPalette] = useState<string[]>(randomPalette());

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-white p-5">
      <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-xl">
        <AnimatePresence mode="popLayout">
          {palette.map((color, i) => (
            <motion.div
              key={color + i}
              layout
              initial={{ opacity: 0, scaleY: 0.7 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-20 w-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </AnimatePresence>
      </div>
      <button
        type="button"
        data-cursor-hover
        onClick={() => setPalette(randomPalette())}
        className="mt-4 self-start rounded-full bg-clay px-5 py-2.5 font-body text-xs font-medium text-ink shadow-clay-sm transition-transform active:scale-95"
      >
        Generate palette
      </button>
    </div>
  );
}
