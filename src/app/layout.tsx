// import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
// import './globals.css';
// import StoreProvider from '../store/StoreProvider';
// import Header from '../components/Header/Header';
// import Footer from '../components/Footer/Footer';
// import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton';
// import WeglotInitializer from '../components/WeglotInitializer/WeglotInitializer';
// import { AuthProvider } from '../context/AuthContext';
// import { Toaster } from 'react-hot-toast';

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

// export default function RootLayout({ children }: { children: React.ReactNode }) {
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
//         <AuthProvider>
//           <StoreProvider>
//             <Header />
//             <main style={{ flex: 1 }}>{children}</main>
//             <Footer />
//             <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
//             <WeglotInitializer />
//             <ScrollToTopButton />
//           </StoreProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
