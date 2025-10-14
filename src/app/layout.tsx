// import { AuthProvider } from '@/context/AuthContext';
// import './globals.css';
// import CookieConsent from '@/components/CookieConsent/CookieConsent';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>
//           {children}
//           <CookieConsent />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import CookieConsent from '@/components/CookieConsent/CookieConsent';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* критично для iOS safe-area */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-screen">
        <AuthProvider>
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
