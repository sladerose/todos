/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <-- REQUIRED
  content: ['./src/**/*.{html,js,svelte,ts}'], // <-- MUST include .svelte
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};