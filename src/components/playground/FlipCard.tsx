import { useState } from "react";

/** Click-to-flip card using pure CSS `transform-style: preserve-3d` — no WebGL. */
export default function FlipCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      data-cursor-hover
      onClick={() => setFlipped((v) => !v)}
      className="h-full w-full [perspective:1000px]"
      aria-pressed={flipped}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-coral text-white [backface-visibility:hidden]">
          <span className="font-body text-sm">Click to flip</span>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-cobalt text-white [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span className="font-body text-sm">Flipped!</span>
        </div>
      </div>
    </button>
  );
}
