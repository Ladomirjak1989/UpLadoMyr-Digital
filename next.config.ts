/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stroiteli.dp.ua',
      },
      {
        protocol: 'https',
        hostname: 'nash-mayster.lviv.ua',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'masteron.ge',
      },
      {
        protocol: 'https',
        hostname: 'bigfoto.name',
      },
      {
        protocol: 'https',
        hostname: 'xn--90aibchjc2ankc9k.xn--p1ai',
      },
      {
        protocol: 'https',
        hostname: 'remont-otdelka.ru',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // ✅ Cloudinary
      },
    ],
  },
};

module.exports = nextConfig;
