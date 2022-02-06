const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coolgray: colors.coolGray,
        truegray: colors.trueGray,
        mejito: '#41ffca',
        lightmejito: '#c3f2ef',
        green: colors.green,
        mejitodark: "#00C853"
      }
    },
  },
  plugins: [],
}
