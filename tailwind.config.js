module.exports = {
  mode: "jit",
  content: ["./**/*.{js,ts,jsx,tsx}"], // remove unused styles in production
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
