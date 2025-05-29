'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';

const LanguageSwitcher = () => {
  const router = useRouter();
  const [selected, setSelected] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langPath = e.target.value;
    setSelected(langPath);
    if (langPath) {
      router.push(langPath);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Weglot) {
      (window as any).Weglot.initialize({
        api_key: process.env.NEXT_PUBLIC_WEGLOT_API_KEY,
      });
    }
  }, []);

  return (
    <>
      {/* Load Weglot script dynamically */}
      <Script src="https://cdn.weglot.com/weglot.min.js" strategy="afterInteractive" />

      <div className="fixed top-5 right-5 z-50 bg-white border border-gray-300 rounded-md shadow-md px-3 py-1 md:px-4 md:py-2 text-sm md:text-base">
        <select
          value={selected}
          onChange={handleChange}
          className="appearance-none bg-transparent text-gray-800 font-medium focus:outline-none"
        >
          <option value="">🌐 Choose Language</option>
          <option value="/uk">🇬🇧 English (UK)</option>
          <option value="/nl">🇳🇱 Nederlands</option>
          <option value="/uk">🇺🇦 Українська</option>
          <option value="/hu">🇭🇺 Magyar</option>
        </select>
      </div>
    </>
  );
};

export default LanguageSwitcher;
