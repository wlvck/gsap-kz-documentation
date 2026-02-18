import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./content/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        gsap: {
          bg: {
            primary: "#0e100f",
            secondary: "#161817",
            tertiary: "#1c1e1d",
          },
          green: {
            DEFAULT: "#0ae448",
            dark: "#0ba934",
            light: "#3eff7a",
          },
          text: {
            primary: "#fffce1",
            secondary: "#a1a1a6",
            muted: "#6b6b70",
          },
          border: "#2a2d2b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#fffce1",
            "--tw-prose-headings": "#fffce1",
            "--tw-prose-links": "#0ae448",
            "--tw-prose-bold": "#fffce1",
            "--tw-prose-code": "#0ae448",
            "--tw-prose-pre-bg": "#161817",
            "--tw-prose-pre-code": "#fffce1",
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
