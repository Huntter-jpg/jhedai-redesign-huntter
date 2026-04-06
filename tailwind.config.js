/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "jhedai-primary": "#003865",
        "jhedai-secondary": "#00A9E0",
        "jhedai-accent": "#FF585D",
        "jhedai-neutral": "#D0D3D4",
        "jhed-gold": "#D4AF37", // Keep for now if needed, but primary is better
      },
      fontFamily: {
        sans: ['"Open Sans"', "Montserrat", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
