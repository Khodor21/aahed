/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#E4543C",
        black: "#2B2B2B",
        white: "#FFFCF7",
        lightgrey: "#EAEAEA",
      },
      fontFamily: {
        sans: ["Thmanyah Sans", "sans-serif"],
        serif: ["Thmanyah Serif Display", "serif"],
      },
    },
  },
  plugins: [],
};