// src/app/admin/layout.tsx — БЕЗ "use client"
import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import '../globals.css';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // 1) токен з куки
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) redirect('/signin');

  // 2) базовий домен фронта
  // - у проді: твій домен
  // - у деві: localhost:3000
  const base = (
    process.env.NEXT_PUBLIC_FRONTEND_LOCALHOST_URL ??
    (process.env.NODE_ENV === 'production' ? 'https://upladomyr.com' : 'http://localhost:3000')
  ).replace(/\/$/, '');

  // 3) перевіряємо роль через власний /api (rewrite → бекенд)
  const meRes = await fetch(`${base}/api/auth/me`, {
    headers: { cookie: `token=${token}` },
    cache: 'no-store',
  });

  if (meRes.status === 401) redirect('/signin'); // не залогінений
  if (meRes.status === 403) redirect('/unauthorized'); // роль не підходить

  if (!meRes.ok) redirect('/signin');

  const me = await meRes.json();
  const role = me?.role ?? me?.user?.role ?? me?.data?.role ?? null;

  if (role !== 'admin') redirect('/unauthorized');

  return <div className="bg-gray-100 min-h-screen">{children}</div>;
}
