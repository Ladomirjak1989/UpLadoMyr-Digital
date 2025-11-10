// 'use client';

// import StoreProvider from '../../store/StoreProvider';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';
// import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
// import WeglotInitializer from '../../components/WeglotInitializer/WeglotInitializer';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from '@/context/AuthContext';

// export default function SiteLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AuthProvider>
//       <StoreProvider>
//         <Header />
//         <main style={{ flex: 1 }}>{children}</main>
//         <Footer />
//         <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
//         <WeglotInitializer />
//         <ScrollToTopButton />
//       </StoreProvider>
//     </AuthProvider>
//   );
// }

'use client';

import StoreProvider from '../../store/StoreProvider';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import WeglotInitializer from '../../components/WeglotInitializer/WeglotInitializer';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

const CONTAINER_CLASS = 'app-container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreProvider>
        {/* root shell + глобальна змінна ширини контейнера */}
        <div
          className="min-h-screen flex flex-col"
          style={{
            // 80rem = 1280px, синхронізовано з Tailwind max-w-7xl
            ['--container-w' as any]: '80rem',
          }}
        >
          <Header />

          {/* ЄДИНИЙ КОНТЕЙНЕР ДЛЯ ВМІСТУ */}
          <div className="flex-1">
            <div className={CONTAINER_CLASS}>
              <main>{children}</main>
            </div>
          </div>

          <Footer />

          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          <WeglotInitializer />
          <ScrollToTopButton />
        </div>
      </StoreProvider>
    </AuthProvider>
  );
}
