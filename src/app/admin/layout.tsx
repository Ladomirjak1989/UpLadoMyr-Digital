// src/app/admin/layout.tsx — БЕЗ "use client"
import type { ReactNode } from 'react';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import '../globals.css';
import type { Me } from '@/types/me';
import AdminHeader from '@/components/Admin/AdminHeader';

export const dynamic = 'force-dynamic';

const COOKIE_NAME = process.env.COOKIE_NAME ?? 'token';
const SITE_URL_FROM_ENV = process.env.FRONTEND_URL_PROD; // https://upladomyr.com

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

  const meAdmin: Me = await meRes.json();
  if (meAdmin.role !== 'admin') redirect('/unauthorized');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Передаємо me в хедер як проп — ніяких клієнтських очікувань */}
      <AdminHeader me={meAdmin} />
      {children}
    </div>
  );
}
