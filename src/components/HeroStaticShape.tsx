/**
 * Swapped in for the WebGL canvas on mobile viewports and under
 * prefers-reduced-motion — a cheap CSS gradient blob, same silhouette,
 * zero GPU cost.
 */
export default function HeroStaticShape() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="h-[70%] w-[70%] rounded-[45%_55%_60%_40%/50%_45%_55%_50%]
                   bg-gradient-to-br from-coral via-coral/80 to-cobalt
                   shadow-clay-lg motion-safe:animate-blob-drift-1"
      />
    </div>
  );
}
