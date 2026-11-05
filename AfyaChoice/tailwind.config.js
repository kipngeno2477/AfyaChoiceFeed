/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          dark: '#063d20',
          primary: '#0b542c',
          light: '#147a40',
          surface: '#f0f9f3',
          border: '#cce8dc'
        },
        brandGreen: {
          DEFAULT: '#0b542c',
          dark: '#063a1e',
          light: '#147a40',
          mint: '#f0f9f3',
          border: '#d1ebd9'
        },
        brandOrange: {
          DEFAULT: '#e86014',
          hover: '#cf500d',
          light: '#fff4ec',
          dark: '#b84809'
        },
        rooster: {
          red: '#d32f2f',
          dark: '#990000',
          light: '#ef4444'
        },
        amberGold: {
          DEFAULT: '#e86014',
          light: '#f59e0b',
          dark: '#c25e00'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
