'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const LanguageSwitcher = () => {
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

      <div></div>
    </>
  );
};

export default LanguageSwitcher;
