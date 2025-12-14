// src/theme/tokens.ts
export const lavcTheme = {
  colors: {
    primary: {
      DEFAULT: "#9155FD",       // antes palette.primary.main
      soft: "#F2EBFF",          // antes palette.primary.light o soft
      foreground: "#FFFFFF",
    },
    secondary: {
      DEFAULT: "#FFB400",
      soft: "#FFF5DA",
      foreground: "#1A1A1A",
    },
    success: {
      DEFAULT: "#56CA00",
      soft: "#E9FCD4",
      foreground: "#1A1A1A",
    },
    error: {
      DEFAULT: "#FF4C51",
      soft: "#FFE0E3",
      foreground: "#1A1A1A",
    },
    warning: {
      DEFAULT: "#FFB400",
      soft: "#FFF5DA",
      foreground: "#1A1A1A",
    },
    info: {
      DEFAULT: "#16B1FF",
      soft: "#E0F7FF",
      foreground: "#0B1220",
    },
    background: "#F4F5FA",   // antes background.default
    paper: "#FFFFFF",        // antes background.paper
    text: {
      primary: "#3A3541",
      secondary: "#787589",
      disabled: "#9EA3AE",
    },
  },
  radius: {
    lg: "0.75rem",
    md: "0.5rem",
    sm: "0.25rem",
  },
  shadow: {
    xs: "0px 2px 4px rgba(58,53,65,0.16)",
    sm: "0px 3px 6px rgba(58,53,65,0.18)",
    md: "0px 4px 10px rgba(58,53,65,0.20)",
    lg: "0px 6px 16px rgba(58,53,65,0.22)",
    xl: "0px 8px 28px rgba(58,53,65,0.24)",
  },
} as const
