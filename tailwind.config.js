
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"
];
export const theme = {
  extend: {
    colors: {
      "white": "#ffffff",
      "black": "#121212" 
    },

    fontFamily: {
      "monserrat": ["Montserrat", "sans-serif"]
    }
  },
};
export const plugins = [nextui()];