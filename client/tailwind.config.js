/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryGreen: {
          400: "#43AA8B",
          950: "#0B2822",
          800: "#1D443A",
        },
        secondBlack: {
          900: "#18181B",
          700: "#25252A",
          400: "#393941",
          100: "#B8B9C1",
        },
        acentColor: {
          blue: {
            bg: "#1D2D44",
            border: "#435BAA",
          },
          yellow: {
            bg: "#44361D",
            border: "#AA7F43",
          },
          green: {
            bg: "#25441D",
            border: "#64AA43",
          },
          red: {
            bg: "#441D21",
            border: "#AA434D",
          },
          magenta: {
            bg: "#441D3F",
            border: "#8F43AA",
          },
          aquaGreen: {
            bg: "#1D443F",
            border: "#43AA9E",
          },
        },
      },
    },
  },
  plugins: [],
};
