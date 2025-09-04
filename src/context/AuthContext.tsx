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
      const res = await axios.get<User>('/auth/me');
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
      await axios.post('/auth/login', { email, password, remember });
      // ⭐ інвалідовуємо кеш поточного маршруту (signin), щоб не тягнувся префетчений редірект
      router.refresh();
      const res = await axios.get<User>('/auth/me');
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
      await axios.post('/auth/logout');
    } catch {
      // ignore
    } finally {
      setUser(null);

      localStorage.removeItem('rememberMe');
      // ⭐ інвалідовуємо кеш після виходу, щоб серверні компоненти не бачили старий стан
      router.refresh();
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
