/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A1020", // navy-950
        foreground: "#E5E7EB", // gray-200
        navy: {
          900: "#0F172A",
          950: "#0A1020",
        },
        lime: {
          300: "#A3E635",
          400: "#84CC16",
        },
        cyan: {
          300: "#67E8F9",
          400: "#22D3EE",
        },
        gray: {
          200: "#E5E7EB",
          400: "#9CA3AF",
          600: "#4B5563",
        },
        border: "#22D3EE", // cyan-400
        card: "#0F172A", // navy-900
        primary: "#22D3EE", // cyan-400
        "muted-foreground": "#9CA3AF", // gray-400
        destructive: "#EF4444",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};