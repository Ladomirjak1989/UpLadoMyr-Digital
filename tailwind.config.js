/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#f7f4ea',     // світлий кремовий (фон)
          mid: '#e5dfd0',       // теплий бежевий (фон 2)
          sand: '#d4bfaa',      // пісочний, завершення градієнту
        },
        accent: '#ffcd00',       // жовто-золотий (акцент)
        deep: '#1e3a8a',         // темно-синій (текст, кнопки)
        graphite: '#374151',     // графітовий (нейтральний)
      },
    },
  },
  plugins: [],
};
