module.exports = {
  mode: "jit",
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
          },
        },
      },
    },
    nightwind: { typography: true },
  },
  variants: {
    extend: {
      typography: ["dark"],
      transform: ["hover", "focus"],
    },
  },
  plugins: [require("nightwind"), require("@tailwindcss/typography")],
};
