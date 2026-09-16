import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import CookieConsent from '@/components/CookieConsent/CookieConsent';
import type { Metadata } from 'next';
import AOSProvider from '@/components/AOSProvider';
import MetaPixel from '@/components/MetaPixel/MetaPixel';

// ✅✅✅ ADDED
import { Suspense } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://upladomyr.com'),

  title: {
    default: 'UpLadoMyr Digital | Custom Web Development',
    template: '%s | UpLadoMyr Digital',
  },

  description:
    'UpLadoMyr Digital provides custom website development, web application development, full-stack development, Next.js, React, API integrations and website maintenance for businesses.',

  applicationName: 'UpLadoMyr Digital',

  keywords: [
    'web development',
    'custom web development',
    'website development',
    'web application development',
    'custom website development',
    'custom web applications',
    'business website development',
    'full stack web development',
    'Next.js development',
    'React development',
    'Node.js development',
    'API integration',
    'SaaS development',
    'responsive web design',
    'website maintenance',
  ],

  authors: [
    {
      name: 'UpLadoMyr Digital',
      url: 'https://upladomyr.com',
    },
  ],

  creator: 'UpLadoMyr Digital',
  publisher: 'UpLadoMyr Digital',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: 'UpLadoMyr Digital | Custom Web Development',

    description:
      'Custom websites, web applications, SaaS platforms and full-stack web development for businesses.',

    url: '/',
    siteName: 'UpLadoMyr Digital',

    type: 'website',
    locale: 'en_US',

    images: [
      {
        url: '/img/metaimage/meta-img1.avif',
        width: 1200,
        height: 630,
        alt: 'UpLadoMyr Digital custom web development',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'UpLadoMyr Digital | Custom Web Development',

    description: 'Custom website and web application development for businesses.',

    images: ['/img/metaimage/meta-img1.avif'],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
        {/* ✅✅✅ CHANGED: wrap MetaPixel with Suspense (fix useSearchParams prerender error) */}
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>

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
