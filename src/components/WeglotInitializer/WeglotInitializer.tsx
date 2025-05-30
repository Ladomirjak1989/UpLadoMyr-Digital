'use client';

import { useEffect } from 'react';

const WeglotInitializer = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).Weglot) {
        (window as any).Weglot.initialize({
          api_key: process.env.NEXT_PUBLIC_WEGLOT_API_KEY,
        });
      }
    }, 500); // 500 мс затримки, можна збільшити при потребі

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default WeglotInitializer;
