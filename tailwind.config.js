/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend:{
      fontFamily:{
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    }
  },
  plugins: [],
}

