import { useRef, useState, useCallback } from "react";

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * Draggable before/after comparison. Pure DOM + pointer events — no
 * dependency, no WebGL cost. Swap the two placeholder panes for Harshi's
 * real "before" and "after" design iteration images.
 */
export default function BeforeAfterSlider({
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percent
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor-hover
      data-cursor-label="Drag"
      className="relative aspect-video w-full select-none overflow-hidden rounded-2xl shadow-clay"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
    >
      {/* "After" pane — placeholder, replace with real iteration image */}
      <div className="absolute inset-0 flex items-center justify-center bg-cobalt/10">
        <span className="font-body text-sm text-ink/50">
          [[placeholder: "after" image]]
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 font-body text-xs text-white">
          {afterLabel}
        </span>
      </div>

      {/* "Before" pane — clipped by the handle position */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden bg-coral/10"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <span className="font-body text-sm text-ink/50">
          [[placeholder: "before" image]]
        </span>
        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 font-body text-xs text-white">
          {beforeLabel}
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 h-full w-[3px] bg-white shadow-[0_0_0_1px_rgba(17,17,17,0.15)]"
        style={{ left: `${position}%` }}
      >
        <div
          className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2
                     items-center justify-center rounded-full bg-white shadow-clay-sm"
        >
          <span className="font-display text-xs text-ink">↔</span>
        </div>
      </div>
    </div>
  );
}
