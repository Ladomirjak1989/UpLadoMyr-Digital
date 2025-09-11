// 'use client';

// import { AuthProvider } from '@/context/AuthContext';

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   return (

//     <AuthProvider>
//       <div className="min-h-screen flex items-center justify-center bg-white">{children}</div>
//     </AuthProvider>
//   );
// }

'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="relative min-h-[100svh]">
        {/* Фонове зображення */}
        <div className="fixed inset-0 -z-20 bg-[url('/img/bannerhome/imgfooter.jpg')] bg-cover bg-center" />

        {/* Затемнення + легкий blur поверх фону */}
        <div className="fixed inset-0 -z-10 bg-slate-900/55 backdrop-blur-[2px]" />

        {/* Контент зверху фону */}
        <main className="relative z-0 min-h-[100svh] flex items-center justify-center p-6">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
