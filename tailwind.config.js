
const defaultTheme = require("tailwindcss/defaultTheme")


module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js"
],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Montserrat: ["Montserrat"],
    },
    screens: {
      "xs": "475px",
      mf: "990px",
      ...defaultTheme.screens
    },
    extend: {
      animation: {
        flip:'flip 1s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes:{
        flip: {
          'from': { transform:'rotateX(0deg)', transformOrigin: '50% bottom ',},
          'to':{transform:  'rotateX(180deg)', transformOrigin: '50% bottom ',}
        }
      },
        
    
      flex: {
        "2": "2 2 0%",
        "3": "3 3 0%",
        "4": "4 4 0%"
      },
      maxWidth: {
        "8xl": "1920px"
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}
