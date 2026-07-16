/**
 * Ambient gradient-mesh backdrop — three soft color blobs drifting slowly
 * over the near-white base. Pure CSS (transform + blur), so it costs
 * nothing on the GPU compared to the WebGL hero element.
 *
 * Drift is driven by Tailwind's animate-blob-drift-* keyframes and is fully
 * disabled under prefers-reduced-motion via the motion-reduce: variant.
 */
export default function MeshBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-paper"
    >
      <div
        className="absolute -top-[10%] -left-[10%] h-[55vw] w-[55vw] max-h-[720px] max-w-[720px]
                   rounded-full bg-coral/25 blur-[110px]
                   animate-blob-drift-1 motion-reduce:animate-none"
      />
      <div
        className="absolute top-[20%] -right-[15%] h-[50vw] w-[50vw] max-h-[640px] max-w-[640px]
                   rounded-full bg-cobalt/20 blur-[110px]
                   animate-blob-drift-2 motion-reduce:animate-none"
      />
      <div
        className="absolute bottom-[-15%] left-[20%] h-[45vw] w-[45vw] max-h-[560px] max-w-[560px]
                   rounded-full bg-ink/[0.06] blur-[110px]
                   animate-blob-drift-3 motion-reduce:animate-none"
      />
    </div>
  );
}
