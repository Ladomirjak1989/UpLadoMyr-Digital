// components/Authentication/GoogleButton.tsx  // [ADD]
'use client';
import { useState } from 'react';

export default function GoogleButton({ label = 'Continue with Google' }: { label?: string }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        setLoading(true);
        window.location.href = '/api/auth/google';
      }} // <-- правильно з baseURL '/api' + rewrites
      disabled={loading}
      className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 transition hover:bg-gray-200 disabled:opacity-60"
    >
      <img src="/img/signup/search.png" alt="" width={20} height={20} />
      {loading ? 'Redirecting…' : label}
    </button>
  );
}
