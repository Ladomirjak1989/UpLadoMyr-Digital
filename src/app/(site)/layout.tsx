'use client';

import StoreProvider from '../../store/StoreProvider';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import WeglotInitializer from '../../components/WeglotInitializer/WeglotInitializer';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreProvider>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <WeglotInitializer />
        <ScrollToTopButton />
      </StoreProvider>
    </AuthProvider>
  );
}
