/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: { DEFAULT: '#30251E', dark: '#1a1210' },
        parchment: '#F1E6D2',
        terracotta: '#914B35',
        gold: '#C5A36A',
        olive: '#69715A',
        warmwhite: '#FAF7F0',
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        lora: ['"Lora"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
        notoserif: ['"Noto Serif Devanagari"', 'serif'],
        hind: ['"Hind"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
