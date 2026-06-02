/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter Tight'", "Helvetica", "Arial", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        ink: "#1a1a1a",
        cream: "#fdfbf6",
        butter: "#f3ede1",
        oat: "#d6cfbf",
        rust: "#c0392b",
        forest: "#1f4d2e",
        amber: "#8a6d1f",
        slate: "#2a3b5f",
      },
    },
  },
  plugins: [],
};
