/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stiletto: '#96333C',
        mischka: '#D6D5D7',
        ebonyClay: '#243341',
        havelockBlue: '#4E98D5',
      },
      fontFamily: {
        header: ['"Concert One"', 'cursive'],
        body: ['"Nunito Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
