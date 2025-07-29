import { AuthContextProvider } from '../../context/AuthContext';
import '../globals.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AuthContextProvider>
      <body>{children}</body>
      </AuthContextProvider>
    </html>
  );
}




