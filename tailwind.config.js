/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const withMT = require("@material-tailwind/react/utils/withMT");


module.exports= withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors:{
        light_gray: "#F2F4F5",
        zinc: {
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400:"#a1a1aa",
          500:"#71717a",
          600:"#52525b",
          900:"#18181b"
        }
      }
      
    },
  },
  plugins: [ require('@tailwindcss/forms'),],
})
