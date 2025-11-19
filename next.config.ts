/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ✅ Твої конкретні домени
      { protocol: 'https', hostname: 'stroiteli.dp.ua' },
      { protocol: 'https', hostname: 'nash-mayster.lviv.ua' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'masteron.ge' },
      { protocol: 'https', hostname: 'bigfoto.name' },
      { protocol: 'https', hostname: 'xn--90aibchjc2ankc9k.xn--p1ai' },
      { protocol: 'https', hostname: 'remont-otdelka.ru' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },

      // ✅ Дозволити будь-який HTTPS хост
      { protocol: 'https', hostname: '**' },
      // (необов’язково) дозволити HTTP теж:
      // { protocol: 'http', hostname: '**' },
    ],
  },




  async rewrites() {
    const DEV_BACKEND =
      process.env.BACKEND_LOCALHOST_URL ||
      process.env.NEXT_PUBLIC_BACKEND_LOCALHOST_URL || // запасний
      'http://localhost:5000';

    const PROD_BACKEND =
      process.env.RENDER_URL ||             // ✅ основна назва у тебе
      process.env.NEXT_PUBLIC_RENDER_URL || // залишаємо як fallback
      '';

    const backend =
      process.env.NODE_ENV === 'development' ? DEV_BACKEND : PROD_BACKEND;

    if (!backend) {
      console.warn('⚠️ No backend URL set for rewrites()');
      return [];
    }

    const target = backend.replace(/\/$/, '');
    // // фронт /api/* → бек {target}/api/*
    return [{ source: '/api/:path*', destination: `${target}/api/:path*` }];
  }
};

module.exports = nextConfig;
