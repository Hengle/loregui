import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // LoreGUI brand palette -- same studio DNA as StudioBrain
        // (dark, deep-navy base) tuned for a developer / version-control tool:
        // a cool blue-cyan primary accent + a violet secondary accent.
        brand: {
          deep: "#0e1525",
          "deep-light": "#161f33",
          accent: "#3b82f6",
          "accent-hover": "#2f6fe0",
          gold: "#8b5cf6",
          "gold-hover": "#7a47e8",
          surface: "#131c2e",
          "surface-light": "#1b2740",
          muted: "#8896b5",
          text: "#e6e9f0",
          "text-bright": "#ffffff",
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      animation: {
        "gradient-shift": "gradient-shift 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
