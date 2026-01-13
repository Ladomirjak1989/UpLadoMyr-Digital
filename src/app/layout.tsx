import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import CookieConsent from '@/components/CookieConsent/CookieConsent';
import type { Metadata } from 'next';
import AOSProvider from '@/components/AOSProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://upladomyr.com'),
  title: {
    default: 'UpLadoMyr Digital',
    template: '%s | UpLadoMyr Digital',
  },
  description: 'Modern, fast websites for entrepreneurs and small businesses.',
  openGraph: {
    title: 'UpLadoMyr Digital',
    description: 'We create modern, fast and user-friendly websites for small businesses.',
    url: '/',
    siteName: 'UpLadoMyr Digital',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/img/metaimage/meta-img1.avif',
        width: 1200,
        height: 630,
        alt: 'UpLadoMyr Digital – modern business website on laptop and phone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UpLadoMyr Digital',
    description: 'Modern, fast websites for entrepreneurs and small businesses.',
    images: ['/img/metaimage/meta-img1.avif'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ⬇️ було bg-[#f7f4ea], тепер чисто білий
    <html lang="en" className="h-full bg-white">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* фіксуємо light-режим */}
        <meta name="color-scheme" content="light" />

        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: dark)" />
      </head>

      <body
        className="
          min-h-screen h-full antialiased overflow-x-hidden
          selection:bg-yellow-500 selection:text-slate-900
          bg-slate-50 text-slate-900   /* ⬅️ дуже світло-сірий фон замість bg-[#f7f4ea] */
        "
        style={{
          ['--container-w' as any]: '80rem',
          WebkitTextSizeAdjust: '100%',
          textRendering: 'optimizeLegibility',
          paddingTop: 'env(safe-area-inset-top, 0)',
          paddingBottom: 'env(safe-area-inset-bottom, 0)',
          paddingLeft: 'env(safe-area-inset-left, 0)',
          paddingRight: 'env(safe-area-inset-right, 0)',
        }}
      >
        <AuthProvider>
          <AOSProvider /> {/* ✅ ADDED: AOS loads only on >=768px */}
          {children}
          <CookieConsent />
        </AuthProvider>

        <noscript>You need to enable JavaScript to run this app.</noscript>
      </body>
    </html>
  );
}
