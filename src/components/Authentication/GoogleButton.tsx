// components/Authentication/GoogleButton.tsx
'use client';
import { useState } from 'react';

export default function GoogleButton({ label = 'Continue with Google' }: { label?: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    // [LOG] старт натискання
    console.warn('[GoogleButton] click, loading:', loading);

    // [LOG] куди редіректимо
    const url = '/api/auth/google';
    console.warn('[GoogleButton] redirect to:', url);

    setLoading(true);

    // [LOG] перед самим переходом
    console.warn('[GoogleButton] navigating now…');
    window.location.href = url;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 transition hover:bg-gray-200 disabled:opacity-60"
    >
      <img src="/img/signup/search.png" alt="" width={20} height={20} />
      {loading ? 'Redirecting…' : label}
    </button>
  );
}
