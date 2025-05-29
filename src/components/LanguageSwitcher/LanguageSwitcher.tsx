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

      <div>

      </div>
    </>
  );
};

export default LanguageSwitcher;
