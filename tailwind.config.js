/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "jarkata": '"Plus Jakarta Sans",system-ui,sans-serif',
        "Inter": '"Inter", sans-serif',
        "Salsa": '"Salsa", cursive'
      },
      backgroundImage: {
        "gradient": "linear-gradient(90deg, rgba(28,21,144,1) 18%, rgba(145,3,92,1) 79%)"
      },
      colors:{
        "near-white": '#f6f3f5'
      }
    },
  },
  plugins: [],
}