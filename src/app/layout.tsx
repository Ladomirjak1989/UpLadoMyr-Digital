// import { AuthProvider } from '@/context/AuthContext';
// import './globals.css';
// import CookieConsent from '@/components/CookieConsent/CookieConsent';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" className="h-full">
//       <head>
//         {/* iOS safe area + правильний вьюпорт */}
//         <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
//         {/* кольори статус-бара (опційно) */}
//         <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
//         <meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: dark)" />
//       </head>

//       <body
//         className="
//           min-h-screen h-full antialiased overflow-x-hidden
//           selection:bg-yellow-500 selection:text-slate-900
//         "
//         // глобальна ширина контейнера (узгоджено з Tailwind max-w-7xl = 80rem)
//         style={{
//           ['--container-w' as any]: '80rem',
//           WebkitTextSizeAdjust: '100%',
//           textRendering: 'optimizeLegibility',
//           // safe-area для iOS (щоб фіксовані елементи не залазили під чубчик/джест-бар)
//           paddingTop: 'env(safe-area-inset-top, 0)',
//           paddingBottom: 'env(safe-area-inset-bottom, 0)',
//           paddingLeft: 'env(safe-area-inset-left, 0)',
//           paddingRight: 'env(safe-area-inset-right, 0)',
//         }}
//       >
//         <AuthProvider>
//           {/* Весь UI сайту */}
//           {children}
//           {/* Банер cookies — лишаємо на root рівні */}
//           <CookieConsent />
//         </AuthProvider>

//         <noscript>You need to enable JavaScript to run this app.</noscript>
//       </body>
//     </html>
//   );
// }

import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import CookieConsent from '@/components/CookieConsent/CookieConsent';

// ✅ ADDED: тип для метаданих Next
import type { Metadata } from 'next';

// ✅ ADDED: глобальні метадані для SEO + превʼю в чатах // ✅ МЕТАДАНІ ДЛЯ PREVIEW (Viber, WhatsApp, Facebook, Viber, Telegram і т.д.)
export const metadata: Metadata = {
  metadataBase: new URL('https://upladomyr.com'),
  title: {
    default: 'UpLadoMyr Digital – modern, fast web solutions',
    template: '%s | UpLadoMyr Digital',
  },
  description:
    'Modern, fast and user-friendly websites for entrepreneurs and small businesses, with full turn-key setup and ongoing support.',
  openGraph: {
    title: 'UpLadoMyr Digital – modern, fast and user-friendly websites',
    description:
      'I create modern, fast websites for entrepreneurs and small businesses: custom-built or premium templates, full setup and ongoing support.',
    url: '/',
    siteName: 'UpLadoMyr Digital',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/img/metaimage/meta-img.png',
        width: 1200,
        height: 630,
        alt: 'UpLadoMyr Digital – modern business website on laptop and phone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UpLadoMyr Digital – modern, fast websites',
    description:
      'Modern, fast and user-friendly business websites with turn-key setup and ongoing support.',
    images: ['/img/metaimage/meta-img.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* iOS safe area + правильний вьюпорт */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* кольори статус-бара (опційно) */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: dark)" />
      </head>

      <body
        className="
          min-h-screen h-full antialiased overflow-x-hidden
          selection:bg-yellow-500 selection:text-slate-900
        "
        // глобальна ширина контейнера (узгоджено з Tailwind max-w-7xl = 80rem)
        style={{
          ['--container-w' as any]: '80rem',
          WebkitTextSizeAdjust: '100%',
          textRendering: 'optimizeLegibility',
          // safe-area для iOS (щоб фіксовані елементи не залазили під чубчик/джест-бар)
          paddingTop: 'env(safe-area-inset-top, 0)',
          paddingBottom: 'env(safe-area-inset-bottom, 0)',
          paddingLeft: 'env(safe-area-inset-left, 0)',
          paddingRight: 'env(safe-area-inset-right, 0)',
        }}
      >
        <AuthProvider>
          {/* Весь UI сайту */}
          {children}
          {/* Банер cookies — лишаємо на root рівні */}
          <CookieConsent />
        </AuthProvider>

        <noscript>You need to enable JavaScript to run this app.</noscript>
      </body>
    </html>
  );
}
