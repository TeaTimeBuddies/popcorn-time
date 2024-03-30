/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"], //add paths to add template files
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

