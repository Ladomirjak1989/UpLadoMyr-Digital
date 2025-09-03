// src/app/admin/layout.tsx — БЕЗ "use client"
// import type { ReactNode } from 'react';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import '../globals.css';

// const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME ?? 'token';

// export default async function AdminLayout({ children }: { children: ReactNode }) {
//   // 1) токен з куки
//   const cookieStore = await cookies();
//   const token = cookieStore.get(COOKIE_NAME)?.value;
//   if (!token) redirect('/signin');

//   // 2) базовий домен фронта
//   // - у проді: твій домен
//   // - у деві: localhost:3000
//   const base = (
//     process.env.NEXT_PUBLIC_FRONTEND_LOCALHOST_URL ??
//     (process.env.NODE_ENV === 'production' ? 'https://upladomyr.com' : 'http://localhost:3000')
//   ).replace(/\/$/, '');

//   // 3) перевіряємо роль через власний /api (rewrite → бекенд)
//   const meRes = await fetch(`${base}/api/auth/me`, {
//     headers: { cookie: `${COOKIE_NAME}=${token}` },
//     cache: 'no-store',
//   });

//   if (!meRes.ok) redirect('/signin');

//   const me = await meRes.json();
//   const role = me?.role ?? me?.user?.role ?? me?.data?.role ?? null;

//   if (role !== 'admin') redirect('/unauthorized');

//   return <div className="bg-gray-100 min-h-screen">{children}</div>;
// }

// src/app/admin/layout.tsx — БЕЗ "use client"
import type { ReactNode } from 'react';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import '../globals.css';

const COOKIE_NAME = process.env.COOKIE_NAME ?? 'token';
const SITE_URL_FROM_ENV = process.env.FRONTEND_URL_PROD; // напр. https://upladomyr.com

type Props = { children: ReactNode };

export default async function AdminLayout({ children }: Props) {
  // 1) токен з куки (await!)
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) redirect('/signin');

  // 2) абсолютний origin (await!)
  const h = await headers();
  const proto = h.get('x-forwarded-proto') ?? 'https';
  const envHost = SITE_URL_FROM_ENV ? new URL(SITE_URL_FROM_ENV).host : undefined;
  const host = envHost ?? h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';

  const origin = `${proto}://${host}`.replace(/\/$/, '');

  // 3) same-origin SSR fetch через /api (rewrites), куку прокидаємо явно
  const meRes = await fetch(`${origin}/api/auth/me`, {
    headers: { cookie: `${COOKIE_NAME}=${token}` },
    cache: 'no-store',
  });
  if (!meRes.ok) redirect('/signin');

  const me = await meRes.json();
  const role: string | null = me?.role ?? me?.user?.role ?? me?.data?.role ?? null;
  if (role !== 'admin') redirect('/unauthorized');

  return <div className="bg-gray-100 min-h-screen">{children}</div>;
}
