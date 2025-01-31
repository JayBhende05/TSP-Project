/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    
  ],
  theme: {
    extend: {
      fontFamily:{
        lato:['Lato','sans-serif'],
        cinzel:['Cinzel', 'serif'],
        simple:['Playfair Display', 'serif']
      }
    },
  },
  plugins: [
    require('flowbite/plugin')],
}