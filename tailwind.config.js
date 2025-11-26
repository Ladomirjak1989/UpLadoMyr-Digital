/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        arial: ['Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#f7f4ea',
          mid: '#e5dfd0',
          sand: '#d4bfaa',
        },
        accent: '#ffcd00',
        deep: '#1e3a8a',
        graphite: '#374151',
      },
      transitionDelay: {
        400: '400ms',
      },
      animation: {
        dots: 'dots 0.5s linear infinite',
        'move-bg': 'move-bg 5s ease infinite', // ✅ Додано для btn-tw
      },
      keyframes: {
        dots: {
          '0%': {
            backgroundPosition: '0 0, 4px 4px',
          },
          '100%': {
            backgroundPosition: '8px 0, 12px 4px',
          },
        },
        // ✅ Додано для градієнтної кнопки
        'move-bg': {
          '0%': {
            backgroundPosition: '31% 0%',
          },
          '50%': {
            backgroundPosition: '70% 100%',
          },
          '100%': {
            backgroundPosition: '31% 0%',
          },
        },
      },
    },
  },
  plugins: [],
};
