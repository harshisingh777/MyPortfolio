import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Hero figure: a cloud of random points that settles into a clean linear
 * trend ("noise → signal"), with a fitted line, confidence band and a couple
 * of flagged outliers. Moving the pointer through the plot injects noise
 * locally. Plain canvas 2D — no WebGL — and it only animates while on screen.
 */

interface Pt {
  nx: number; // noise position (0..1)
  ny: number;
  sx: number; // signal position (0..1)
  sy: number;
  dx: number; // pointer displacement (px)
  dy: number;
  delay: number;
  outlier: boolean;
}

const SIGNAL = "#D2F53C";
const EMBER = "#FF7A45";

function gaussian() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lineY = (x: number) => 0.14 + 0.66 * x; // trend in plot units (0 bottom, 1 top)

function makePoints(n: number): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const sx = Math.random();
    const outlier = i < 3;
    const sy = outlier ? lineY(sx) + (i === 1 ? -0.32 : 0.3) : lineY(sx) + gaussian() * 0.045;
    return {
      nx: Math.random(),
      ny: Math.random(),
      sx,
      sy: Math.min(0.98, Math.max(0.02, sy)),
      dx: 0,
      dy: 0,
      delay: Math.random() * 0.35,
      outlier,
    };
  });
}

export default function SignalScatter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const isSmall = window.innerWidth < 768;
    const points = makePoints(isSmall ? 90 : 150);
    const pointer = { x: -9999, y: -9999, active: false };
    const start = performance.now() + 500;
    const duration = 2600;
    let rafId = 0;
    let visible = true;

    const pad = { l: 34, r: 18, t: 18, b: 30 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const px = (x: number) => pad.l + x * (width - pad.l - pad.r);
    const py = (y: number) => height - pad.b - y * (height - pad.t - pad.b);

    function drawAxes(progress: number) {
      ctx!.strokeStyle = "rgba(236,232,223,0.18)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(pad.l, pad.t);
      ctx!.lineTo(pad.l, height - pad.b);
      ctx!.lineTo(width - pad.r, height - pad.b);
      ctx!.stroke();

      ctx!.fillStyle = "rgba(236,232,223,0.38)";
      ctx!.font = "10px 'Geist Mono', monospace";
      for (let i = 0; i <= 4; i++) {
        const t = i / 4;
        const x = px(t);
        const y = py(t);
        ctx!.fillRect(x, height - pad.b, 1, 4);
        ctx!.fillRect(pad.l - 4, y, 4, 1);
        ctx!.textAlign = "right";
        ctx!.fillText((t * 100).toFixed(0), pad.l - 8, y + 3);
      }

      // faint horizontal gridlines
      ctx!.strokeStyle = "rgba(236,232,223,0.05)";
      for (let i = 1; i <= 4; i++) {
        ctx!.beginPath();
        ctx!.moveTo(pad.l, py(i / 4));
        ctx!.lineTo(width - pad.r, py(i / 4));
        ctx!.stroke();
      }

      // fitted line + 95% band fade in at the end
      const fit = Math.max(0, (progress - 0.75) / 0.25);
      if (fit > 0) {
        ctx!.fillStyle = `rgba(210,245,60,${0.07 * fit})`;
        ctx!.beginPath();
        ctx!.moveTo(px(0), py(lineY(0) + 0.09));
        ctx!.lineTo(px(1), py(lineY(1) + 0.09));
        ctx!.lineTo(px(1), py(lineY(1) - 0.09));
        ctx!.lineTo(px(0), py(lineY(0) - 0.09));
        ctx!.closePath();
        ctx!.fill();

        ctx!.strokeStyle = SIGNAL;
        ctx!.globalAlpha = fit;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(px(0), py(lineY(0)));
        ctx!.lineTo(px(fit), py(lineY(fit)));
        ctx!.stroke();
        ctx!.globalAlpha = 1;
      }
    }

    function frame(now: number) {
      const elapsed = reducedMotion ? duration * 2 : now - start;
      const progress = Math.min(1, Math.max(0, elapsed / duration));

      ctx!.clearRect(0, 0, width, height);
      drawAxes(progress);

      for (const p of points) {
        const local = easeInOut(Math.min(1, Math.max(0, (progress - p.delay) / (1 - p.delay))));
        const x = px(p.nx + (p.sx - p.nx) * local);
        const y = py(p.ny + (p.sy - p.ny) * local);

        // pointer pushes points away — "injecting noise"
        if (pointer.active && !reducedMotion) {
          const ddx = x - pointer.x;
          const ddy = y - pointer.y;
          const dist = Math.hypot(ddx, ddy);
          if (dist < 80 && dist > 0.01) {
            const force = (1 - dist / 80) * 26;
            p.dx += ((ddx / dist) * force - p.dx) * 0.2;
            p.dy += ((ddy / dist) * force - p.dy) * 0.2;
          } else {
            p.dx *= 0.9;
            p.dy *= 0.9;
          }
        } else {
          p.dx *= 0.9;
          p.dy *= 0.9;
        }

        const fx = x + p.dx;
        const fy = y + p.dy;
        const settled = local > 0.98;

        if (p.outlier && settled) {
          ctx!.strokeStyle = EMBER;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(fx, fy, 7, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.fillStyle = EMBER;
        } else {
          ctx!.fillStyle = settled ? "rgba(236,232,223,0.78)" : "rgba(236,232,223,0.45)";
        }
        ctx!.beginPath();
        ctx!.arc(fx, fy, p.outlier ? 2.6 : 2, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (progress >= 1) {
        const o = points[0];
        const ox = px(o.sx) + o.dx;
        const oy = py(o.sy) + o.dy;
        ctx!.fillStyle = "rgba(255,122,69,0.9)";
        ctx!.font = "10px 'Geist Mono', monospace";
        ctx!.textAlign = ox > width - 90 ? "right" : "left";
        ctx!.fillText("outlier · IQR", ox + (ox > width - 90 ? -12 : 12), oy - 8);
      }

      const stillMoving =
        progress < 1 || points.some((p) => Math.abs(p.dx) > 0.05 || Math.abs(p.dy) > 0.05) || pointer.active;
      if (visible && stillMoving && !reducedMotion) {
        rafId = requestAnimationFrame(frame);
      } else {
        rafId = 0;
      }
    }

    function kick() {
      if (!rafId && visible) rafId = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      kick();
    }
    function onLeave() {
      pointer.active = false;
      kick();
    }

    resize();
    kick();

    const ro = new ResizeObserver(() => {
      resize();
      kick();
      if (!rafId) frame(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full touch-pan-y"
      role="img"
      aria-label="Animated scatter plot: random points settle into a clear upward trend with a fitted line and two flagged outliers."
    />
  );
}
