import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── BRAND COLOR PALETTE ──────────────────────────────────────
      colors: {
        void: "#020408",          // Deep space black
        neural: "#00ffff",        // Cyan — primary accent
        plasma: "#7c3aed",        // Electric violet
        neon: "#39ff14",          // Neon green
        ember: "#ff6b35",         // Hot orange
        gold: "#ffd700",          // Patent gold
        ghost: "rgba(255,255,255,0.06)", // Glassmorphism surface
      },

      // ── FONTS ─────────────────────────────────────────────────────
      fontFamily: {
        display: ["Orbitron", "monospace"],   // Hero titles
        body: ["Space Grotesk", "sans-serif"], // Body copy
        mono: ["JetBrains Mono", "monospace"], // Code blocks / terminal
      },

      // ── CUSTOM ANIMATIONS ─────────────────────────────────────────
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "sonar": "sonar 2s ease-out infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00ffff, 0 0 10px #00ffff" },
          "100%": { boxShadow: "0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #7c3aed" },
        },
        sonar: {
          "0%": { transform: "scale(0.5)", opacity: "1" },
          "100%": { transform: "scale(3)", opacity: "0" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-4px, 2px)" },
          "40%": { transform: "translate(4px, -2px)" },
          "60%": { transform: "translate(-2px, 4px)" },
          "80%": { transform: "translate(2px, -4px)" },
          "100%": { transform: "translate(0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },

      // ── BACKGROUNDS ───────────────────────────────────────────────
      backgroundImage: {
        "neural-gradient": "radial-gradient(ellipse at center, #0a0a1a 0%, #020408 70%)",
        "latent-space": "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 25%, #0a1a2e 50%, #0a2a1a 75%, #1a1a0a 100%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      },

      // ── BLUR / GLASS ──────────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
        glass: "20px",
      },

      // ── SPACING EXTENSIONS ────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "128": "32rem",
        "144": "36rem",
      },

      // ── Z-INDEX ───────────────────────────────────────────────────
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [],
};

export default config;
