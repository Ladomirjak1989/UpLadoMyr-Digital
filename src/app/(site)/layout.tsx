// import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
// import './globals.css';
// import StoreProvider from '@/store/StoreProvider';
// import Header from '@/components/Header/Header';
// import Footer from '@/components/Footer/Footer';
// import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton';
// import WeglotInitializer from '@/components/WeglotInitializer/WeglotInitializer';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export const metadata: Metadata = {
//   title: 'UpLadoMyr Digital',
//   description: 'Where ideas come to life in code',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" href="/favicon.ico" />
//       </head>

//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           minHeight: '100vh',
//         }}
//       >
//         {/* <Header /> */}
//         <main style={{ flex: 1 }}>
//           <StoreProvider>{children}</StoreProvider>
//         </main>
//         <Footer />
//         <WeglotInitializer />
//         <ScrollToTopButton />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import StoreProvider from '@/store/StoreProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton';
import WeglotInitializer from '@/components/WeglotInitializer/WeglotInitializer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'UpLadoMyr Digital',
  description: 'Where ideas come to life in code',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <main style={{ flex: 1 }}>
          <StoreProvider>{children}</StoreProvider>
        </main>
        <Footer />
        <WeglotInitializer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
