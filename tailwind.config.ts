import type { Config } from "tailwindcss";

// ---------------------------------------------------------------------------
// DESIGN TOKENS — "Lab Notebook, after dark"
// Near-black graph-paper canvas, bone-white type, one chartreuse "signal"
// accent for anything that matters, and a warm ember for secondary data.
// ---------------------------------------------------------------------------

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#0B0B0C", // page
          900: "#0F0F11",
          800: "#141416", // surfaces
          700: "#1B1B1E",
          600: "#26262A",
        },
        bone: {
          DEFAULT: "#ECE8DF", // primary text
          dim: "#A9A59C",
          mute: "#6E6B65",
        },
        signal: {
          DEFAULT: "#D2F53C", // chartreuse accent
          dim: "#A9C62B",
        },
        ember: "#FF7A45",
        line: "rgba(236,232,223,0.09)",
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Geist'", "system-ui", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        pulseDot: "pulseDot 2.4s ease-in-out infinite",
        blink: "blink 1.1s steps(2, start) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.8)" },
        },
        blink: {
          to: { visibility: "hidden" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
