/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ], //add paths to add template files
  theme: {

    extend: {
      colors: {
        app100: '#d9d9d9',
        app200: '#e3e3e3',
        app300: '#e6e6e6',
        action: '#7b61ff',
        primary: '#ffffff',
        secondary: '#1F2937',
        stars: '#1F2937',
        white: '#ffffff',
        purple: '#3f3cbb',
        midnight: '#121063',
        metal: '#565584',
        tahiti: '#3ab7bf',
        silver: '#ecebff',
        bubblegum: '#ff77e9',
        bermuda: '#78dcca',
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      "black",

    ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    // themes: {
    //   navBar: {
    //     primary: '#1f2937',
    //     'btn-primary-bg': '#1f2937',
    //     'btn-primary-hover-bg': '#4b5563',
    //     'btn-primary-text': '#ffffff',
    //   },
    // },
  },
}