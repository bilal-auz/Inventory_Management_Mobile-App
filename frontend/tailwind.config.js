/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      darkgreen: "#5c7f67",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
