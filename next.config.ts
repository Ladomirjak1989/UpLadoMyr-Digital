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
        hostname: 'res.cloudinary.com',
      },
    ],
  },
 

  // next.config.js
  async rewrites() {
    const backend =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      (process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_BACKEND_LOCALHOST_URL
        : process.env.NEXT_PUBLIC_RENDER_URL);

    if (!backend) {
      console.warn('⚠️ No backend URL set for rewrites()');
      return [];
    }

    const target = backend.replace(/\/$/, ''); // прибираємо трейлінг-слеш

    return [
      { source: '/api/:path*', destination: `${target}/api/:path*` },
    ];
  },
};

module.exports = nextConfig;
