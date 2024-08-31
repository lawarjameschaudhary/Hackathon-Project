/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        "rato" : "#FF0000"
      },
      fontFamily: {
        "sabai" : 'rubik' ,
        "arkko" : "Nerko one",
        "ajhai-arko" : "kanit",
      }
    },
  },
  plugins: [],
}