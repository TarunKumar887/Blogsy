/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This line enables dark mode
  theme: {
    extend: {
      colors: {
        primary: '#6A5AF9', // Assuming this is your primary color
      }
    },
  },
  plugins: [],
}