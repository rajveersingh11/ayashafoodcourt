/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffdf9',
          100: '#fffaf2',
          200: '#f8ecd9',
          300: '#f5ead9',
          400: '#eadfce',
        },
        saffron: {
          300: '#f5dcaf',
          400: '#f1d6a1',
          500: '#e6b866',
          600: '#d79a26',
          700: '#b87c14',
        },
        crimson: {
          500: '#c7472b',
          600: '#a72d20',
          700: '#8d2a1c',
          800: '#6d351c',
          900: '#3a1d13',
        },
        cardamom: {
          500: '#347a50',
          600: '#285b3b',
          700: '#1d7042',
        },
        charcoal: {
          800: '#201712',
          900: '#17120f',
        },
        muted: '#75675d',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 18px 50px rgba(54, 31, 17, 0.10)',
        'warm-lg': '0 25px 60px rgba(54, 31, 17, 0.16)',
        'warm-glow': '0 0 35px rgba(230, 184, 102, 0.25)',
      }
    },
  },
  plugins: [],
}
