import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        paper: "var(--paper)",
        stone: "var(--stone)",
        ink: "var(--ink)",
        soft: "var(--soft)",
        "on-ink": "var(--on-ink)",
        "on-ink-soft": "var(--on-ink-soft)",
        honey: "var(--honey)",
        "honey-deep": "var(--honey-deep)",
      },
      spacing: {
        section: "var(--section-space)",
      },
    },
  },
} satisfies Config;
