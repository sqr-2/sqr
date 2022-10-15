const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    // "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: ["JetBrains Mono"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "2.5rem",
      "6xl": "3rem",
      "7xl": "3.125rem",
      "8xl": "4rem",
    },
    extend: {
      colors: {
        "contrast": "#fff",
        "background": "#000",
        "foreground": "#333",

        "red": "#f00",
        "blue": "#00f",
        "green": "#0f0",
        "cyan": "#0ff",
        "magenta": "#f0f",
        "yellow": "#ff0"
      },
    },
  },
  plugins: [],
};
