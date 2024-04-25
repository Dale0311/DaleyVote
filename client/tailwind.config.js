/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        head: ['Montserrat', 'Poppins'],
        body: ['Poppins', 'Montserrat'],
      },
    },
  },
  plugins: [],
};
