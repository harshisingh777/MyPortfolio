import type { Config } from "tailwindcss";

// ---------------------------------------------------------------------------
// DESIGN TOKENS — "Bold Editorial" direction
// White/near-white base, deep coral + cobalt as the two accent colors,
// ink black reserved for headline type and high-contrast CTAs.
// ---------------------------------------------------------------------------

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FFFFFF",
        paper: "#FAFAF9", // near-white page background
        clay: "#F2F0EB", // warm neutral used under clay elements
        ink: "#111111", // primary text / high-contrast CTA
        coral: {
          DEFAULT: "#FF5A5F",
          dim: "#E14448",
        },
        cobalt: {
          DEFAULT: "#0057FF",
          dim: "#0044CC",
        },
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        body: ["'General Sans'", "sans-serif"],
      },
      boxShadow: {
        // Claymorphism: soft inflated shadows, light top-left / dark bottom-right
        clay: "7px 7px 14px rgba(17,17,17,0.10), -6px -6px 14px rgba(255,255,255,0.85)",
        "clay-sm": "4px 4px 9px rgba(17,17,17,0.09), -3px -3px 9px rgba(255,255,255,0.8)",
        "clay-lg": "12px 12px 28px rgba(17,17,17,0.12), -10px -10px 24px rgba(255,255,255,0.9)",
        "clay-pressed": "inset 4px 4px 9px rgba(17,17,17,0.14), inset -3px -3px 8px rgba(255,255,255,0.7)",
        "clay-coral": "7px 7px 18px rgba(255,90,95,0.28), -6px -6px 14px rgba(255,255,255,0.7)",
        glass: "0 8px 32px rgba(17,17,17,0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "blob-drift-1": "blobDrift1 38s ease-in-out infinite",
        "blob-drift-2": "blobDrift2 44s ease-in-out infinite",
        "blob-drift-3": "blobDrift3 32s ease-in-out infinite",
        "bounce-slow": "bounceSlow 2.2s ease-in-out infinite",
      },
      keyframes: {
        blobDrift1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(6%, 8%) scale(1.08)" },
          "66%": { transform: "translate(-4%, 5%) scale(0.96)" },
        },
        blobDrift2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "40%": { transform: "translate(-7%, -6%) scale(1.05)" },
          "70%": { transform: "translate(5%, -3%) scale(0.94)" },
        },
        blobDrift3: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(4%, -7%) scale(1.1)" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
