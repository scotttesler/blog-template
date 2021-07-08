module.exports = {
  darkMode: "class", // or 'media' or 'class'
  mode: "jit",
  plugins: [require("nightwind"), require("@tailwindcss/typography")],
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
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
      transform: ["hover", "focus"],
      typography: ["dark"],
    },
  },
};
