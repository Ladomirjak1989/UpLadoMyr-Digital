/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'stroiteli.dp.ua',
      'nash-mayster.lviv.ua',
      'encrypted-tbn0.gstatic.com',
      'masteron.ge',
      'bigfoto.name',
      'xn--90aibchjc2ankc9k.xn--p1ai', // 👈 це транслітерований домен
      'remont-otdelka.ru',
    ],
  },
};

module.exports = nextConfig;
