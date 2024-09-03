/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        "gay" : "#808080",
        "xer" : "#50C878"

      },
      fontFamily: {
        "sabai" : 'rubik' ,
        "arkko" : "Nerko one",
        "ajhai-arko" : "kanit",
        "logo" : "Matemasie"
      }
    },
  },
  plugins: [],
}