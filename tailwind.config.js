/** @type {import('tailwindcss').Config} */
export default {
  // This line is crucial for dark mode to work with class toggling
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
