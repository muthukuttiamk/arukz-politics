/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        teko:       ["Teko",           "sans-serif"],
        instrument: ["Instrument Sans", "sans-serif"],
        tamil:      ["Noto Sans Tamil", "sans-serif"],
      },
      /*
       * All documentary colors are defined inline in components
       * and driven by src/config.js.
       *
       * Only a few token shortcuts live here for Tailwind className use.
       */
      colors: {
        maroon: {
          DEFAULT: "#8d1016",
          light:   "#b01820",
          dark:    "#5c1a1b",
          deep:    "#3d0c0e",
        },
        gold: {
          DEFAULT: "#ffca00",
          light:   "#ffe082",
          dark:    "#c8a000",
        },
        cream: {
          DEFAULT: "#f5f7fb",
          dark:    "#eceef4",
        },
      },
      animation: {
        "pulse-slow": "pulse 3.5s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};
