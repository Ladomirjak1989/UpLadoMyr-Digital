'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  className?: string;
  fallbackHref?: string; // куди йти, якщо історії немає
};

export default function BackButton({ className = '', fallbackHref = '/projects' }: Props) {
  const router = useRouter();

  const handleBack = React.useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }, [router, fallbackHref]);

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className={`group inline-flex items-center justify-center gap-2 rounded-2xl 
                  border border-amber-300 
                  bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100
                  px-5 py-2.5 text-slate-900 shadow-sm 
                  hover:from-amber-200 hover:via-orange-200 hover:to-rose-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                  transition ${className}`}
    >
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full 
                   bg-amber-500/20 group-hover:bg-amber-500/30"
        aria-hidden="true"
      >
        <svg
          className="h-4 w-4"
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
      </span>
    </button>
  );
}
