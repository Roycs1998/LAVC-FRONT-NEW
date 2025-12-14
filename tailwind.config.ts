// tailwind.config.ts
import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import { lavcTheme } from "./src/theme/tokens"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: lavcTheme.colors.background,
        foreground: lavcTheme.colors.text.primary,

        primary: {
          DEFAULT: lavcTheme.colors.primary.DEFAULT,
          foreground: lavcTheme.colors.primary.foreground,
        },
        secondary: {
          DEFAULT: lavcTheme.colors.secondary.DEFAULT,
          foreground: lavcTheme.colors.secondary.foreground,
        },
        success: {
          DEFAULT: lavcTheme.colors.success.DEFAULT,
          foreground: lavcTheme.colors.success.foreground,
        },
        destructive: {
          DEFAULT: lavcTheme.colors.error.DEFAULT,
          foreground: lavcTheme.colors.error.foreground,
        },
        muted: {
          DEFAULT: "#F5F5F7",
          foreground: lavcTheme.colors.text.secondary,
        },
        card: {
          DEFAULT: lavcTheme.colors.paper,
          foreground: lavcTheme.colors.text.primary,
        },
      },

      borderRadius: {
        lg: lavcTheme.radius.lg,
        md: lavcTheme.radius.md,
        sm: lavcTheme.radius.sm,
      },

      boxShadow: {
        card: lavcTheme.shadow.md,
        "card-lg": lavcTheme.shadow.lg,
      },

      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        heading: ["Saira Condensed", ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
}

export default config
