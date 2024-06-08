/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customLightBlueGray: "#F8FAFD",
        customBlack: "#0A0E27",
        customButton: "#252E6A",
        customButtonBtn: "#1B2025",
      },
      fontFamily: {
        Modarat: ["Moderat-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
