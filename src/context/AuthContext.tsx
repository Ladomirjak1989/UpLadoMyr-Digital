// 'use client';

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback,
//   useMemo,
//   type ReactNode,
// } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from '@/lib/axios';

// type Role = 'user' | 'admin' | null;

// interface User {
//   userId: number;
//   email: string;
//   role: Role;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   login: (email: string, password: string, remember: boolean) => Promise<User>;
//   logout: () => Promise<void>;
//   refreshMe: () => Promise<void>;
// }

// const Ctx = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const router = useRouter();

//   // ⬇️ всі хуки оголошені топ-рівнем і завжди в одному порядку
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const fetchMe = useCallback(async () => {
//     try {
//       const res = await axios.get<User>('/api/auth/me');
//       setUser(res.data);
//     } catch {
//       setUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const refreshMe = useCallback(async () => {
//     setIsLoading(true);
//     await fetchMe();
//   }, [fetchMe]);

//   const login = useCallback(
//     async (email: string, password: string, remember: boolean) => {
//       await axios.post('/api/auth/login', { email, password });
//       const res = await axios.get<User>('/api/auth/me');
//       const data = res.data;
//       setUser(data);
//       if (remember) localStorage.setItem('rememberMe', 'true');
//       else localStorage.removeItem('rememberMe');

//       const target = data.role === 'admin' ? '/admin' : '/';
//       router.replace(target);
//       router.refresh()
//       return data;
//     },
//     [router]
//   );

//   const logout = useCallback(async () => {
//     try {
//       await axios.post('/api/auth/logout');
//     } catch {
//       // ignore
//     } finally {
//       setUser(null);
//       localStorage.removeItem('rememberMe');
//       router.replace('/signin');
//       router.refresh()
//     }
//   }, [router]);

//   useEffect(() => {
//     // без умовних викликів хуків; “софт” скасування без AbortController
//     let ignore = false;
//     (async () => {
//       try {
//         const res = await axios.get<User>('/api/auth/me');
//         if (!ignore) setUser(res.data);
//       } catch {
//         if (!ignore) setUser(null);
//       } finally {
//         if (!ignore) setIsLoading(false);
//       }
//     })();
//     return () => {
//       ignore = true;
//     };
//   }, []);

//   // значення контексту мемоізуємо
//   const value = useMemo<AuthContextType>(
//     () => ({ user, isLoading, login, logout, refreshMe }),
//     [user, isLoading, login, logout, refreshMe]
//   );

//   // ❗ ВАЖЛИВО: провайдер завжди рендериться. Ніяких ранніх `return null`.
//   // Щоб уникнути мерехтіння — просто не показуємо дітей поки іде первинна перевірка.
//   return (
//     <Ctx.Provider value={value}>
//       {isLoading ? null : children}
//     </Ctx.Provider>
//   );
// }

// export function useAuth(): AuthContextType {
//   const ctx = useContext(Ctx);
//   if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
//   return ctx;
// }

'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

type Role = 'user' | 'admin' | null;

interface User {
  userId: number;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<User>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
}

const Ctx = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMe = useCallback(async () => {
    try {
      const res = await axios.get<User>('/api/auth/me');
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshMe = useCallback(async () => {
    setIsLoading(true);
    await fetchMe();
  }, [fetchMe]);

  const login = useCallback(
    async (email: string, password: string, remember: boolean) => {
      // ⬇️ обов'язково передаємо remember на бекенд
      await axios.post('/api/auth/login', { email, password, remember });
      const res = await axios.get<User>('/api/auth/me');
      const data = res.data;
      setUser(data);

      // зберігаємо лише прапорець, НЕ пароль/токен
      if (remember) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      const target = data.role === 'admin' ? '/admin' : '/';
      router.replace(target);

      return data;
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch {
      // ignore
    } finally {
      setUser(null);

      localStorage.removeItem('rememberMe');
      router.replace('/'); // після виходу ведемо на головну
    }
  }, [router]);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const value = useMemo<AuthContextType>(
    () => ({ user, isLoading, login, logout, refreshMe }),
    [user, isLoading, login, logout, refreshMe]
  );

  return <Ctx.Provider value={value}>{isLoading ? null : children}</Ctx.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
