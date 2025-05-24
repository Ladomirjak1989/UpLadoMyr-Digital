/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#f7f4ea', // світлий кремовий (фон)
          mid: '#e5dfd0', // теплий бежевий (фон 2)
          sand: '#d4bfaa', // пісочний, завершення градієнту
        },
        accent: '#ffcd00', // жовто-золотий (акцент)
        deep: '#1e3a8a', // темно-синій (текст, кнопки)
        graphite: '#374151', // графітовий (нейтральний)
      },
      transitionDelay: {
        400: '400ms',
      },
      animation: {
        dots: 'dots 0.5s linear infinite',
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
      },
    },
  },
  plugins: [],
};
