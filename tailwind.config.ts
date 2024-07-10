import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        purple: {
          DEFAULT: "#665BE3",
          800: "#3C1F63",
        },
        yellow: {
          DEFAULT: "#EFDE68",
          800: "#CBB43B",
        },
        gray: {
          200: "#FAFAFA",
          300: "#DADADA",
          400: "#D9D9D9",
          500: "#747474",
          600: "#646464",
        },
        black: {
          DEFAULT: "#252628",
          800: "#1E1F21",
        },
        pink: {
          400: "#EC6C6C",
          600: "#B74C85",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
