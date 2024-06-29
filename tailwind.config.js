/* eslint-disable no-undef */
import daisyui from "daisyui";
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [daisyui],
};
