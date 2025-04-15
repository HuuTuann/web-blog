/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

export const content = [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {},
};
export const darkMode = "class";
export const plugins = [heroui()];
