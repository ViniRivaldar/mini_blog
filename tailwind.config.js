/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#070D21',
          secondary: '#191970',
          tertiary: '#D3D3D3',
        },
        fontFamily: {
          anton: ['Anton', 'sans-serif'],
          openSans: ['Open Sans', 'sans-serif'],
        },
      },
    },
    plugins: [],
}
  