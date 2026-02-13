/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/frontend/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'gallery': {
          50: '#faf7f5',
          100: '#f5ede8',
          200: '#e8d5c8',
          300: '#d4b59e',
          400: '#c09474',
          500: '#a67c5b',
          600: '#8b6545',
          700: '#6d4f37',
          800: '#4a3525',
          900: '#2d1f16',
        },
        'accent': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6fe',
          300: '#a5b9fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        }
      }
    }
  },
  plugins: [],
}
