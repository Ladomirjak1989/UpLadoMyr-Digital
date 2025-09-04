// src/components/Admin/AdminHeader.tsx
'use client';

import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import type { Me } from '@/types/me';
import Link from 'next/link';

export default function AdminHeader({ me }: { me: Me }) {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      router.replace('/signin');
      router.refresh(); // щоб сервер одразу побачив, що куки немає
    }
  };

  return (
    <header className="flex items-center justify-between border-b bg-amber-50 px-4 py-3">
      <Link
        href="/admin"
        className="px-6 py-3 font-bold bg-blue-100 text-black rounded-lg shadow hover:bg-yellow-100 transition"
      >
        {' '}
        Admin
      </Link>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-700">{me.email}</span>
        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{me.id}</span>

        <button
          onClick={onLogout}
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-800"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
