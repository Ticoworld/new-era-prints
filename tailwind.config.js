/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        kavoon: ['Kavoon', 'cursive'],
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        customGold: '#c3b97f',
        customWhite: '#fffefe',
        customBlack: ' #000000',
        customOrange: '#ffbe40',
        customGreen: '#045602',
        customBlue: '#90c3ff',
        customGray: '#bdc3c7',
        // Dark mode colors
        dark: {
          customGold: '#a89e6d',
          customWhite: '#e0dfdf',
          customOrange: '#e6a832',
          customGreen: '#034d01',
          customBlue: '#7aaef8',
          customGray: '#7f8c8d',
        },
      },
    },
  },
  darkMode: 'class', // Enable dark mode using a class
  plugins: [],
}
