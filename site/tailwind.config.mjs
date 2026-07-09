/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f8f8",
          100: "#e7eaeb",
          200: "#cdd3d5",
          300: "#a8b2b6",
          400: "#78868c",
          500: "#596970",
          600: "#445157",
          700: "#333e43",
          800: "#232c30",
          900: "#151c20",
          950: "#0c1114"
        },
        leaf: {
          100: "#dbece2",
          300: "#92c7a7",
          700: "#286345",
          900: "#153825"
        },
        brass: {
          100: "#f7e7bb",
          300: "#d8ae46",
          700: "#775415",
          900: "#3f2a0a"
        },
        steel: {
          100: "#dbe5ef",
          300: "#91abc8",
          700: "#31587d",
          900: "#182c44"
        }
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace"
        ]
      }
    }
  },
  plugins: []
};
