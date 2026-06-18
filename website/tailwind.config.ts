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
        // BiloxiStudios brand palette (vaporwave / Gulf-Coast retrowave).
        // Source: github.com/BiloxiStudios/BiloxiStudios tailwind.config.js
        // + biloxistudios.com live site.
        vapor: {
          pink: "#FF71CE",
          blue: "#01CDFE",
          purple: "#B967FF",
          yellow: "#FFFB96",
          green: "#05FFA1",
        },
        coastal: {
          sand: "#F5E6CA",
          water: "#2B95FF",
          sunset: "#FF6B6B",
        },
        // LoreGUI semantic tokens, re-pointed at the BiloxiStudios palette so
        // every existing component reads as a Biloxi Studios property:
        //  - deep/surface  -> near-black retrowave base
        //  - accent        -> vapor-blue (cyan)
        //  - gold (2nd)    -> vapor-pink
        //  - text          -> coastal sand / white
        brand: {
          deep: "#05010d",
          "deep-light": "#0d0820",
          accent: "#01CDFE",
          "accent-hover": "#33d9ff",
          gold: "#FF71CE",
          "gold-hover": "#ff8fd8",
          surface: "#0c0718",
          "surface-light": "#140d2a",
          muted: "#b9a9d6",
          text: "#F5E6CA",
          "text-bright": "#ffffff",
        },
      },
      fontFamily: {
        // BiloxiStudios uses Space Grotesk for display, Inter for body.
        heading: ['"Space Grotesk"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      animation: {
        "gradient-shift": "gradient-shift 6s ease infinite",
        "text-shine": "text-shine 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "text-shine": {
          from: { backgroundPosition: "0% center" },
          to: { backgroundPosition: "200% center" },
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
