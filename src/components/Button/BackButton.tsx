'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.history.length > 1) router.back();
    else router.push('/');
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="
        shrink-0 inline-flex items-center justify-center
        rounded-full bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] border-1 border-amber-950 text-black shadow-lg hover:scale-110 transition-transform
      "
      // ! фіксований фізичний розмір (≈ 1 см). Працює і на мобільних
      style={{ width: '1cm', height: '1cm' }}
      aria-label="Go back"
    >
      <svg
        className="h-[0.45cm] w-[0.45cm]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
