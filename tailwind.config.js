/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "540px",
      },
    },
  },
  plugins: [],
};
