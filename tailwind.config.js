/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./sections/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#15803d', /* Forcing brand green */
          300: '#15803d',
          400: '#15803d',
          500: '#15803d', /* Main Brand Green */
          600: '#166534', /* Hover state (slightly darker) */
          700: '#15803d', /* Primary Utility Class used */
          800: '#14532d', /* Darker accent */
          900: '#14532d',
          950: '#052e16',
        },
        brand: {
          green: '#15803d',
          dark: '#14532d',
        }
      }
    },
  },
  plugins: [],
}

