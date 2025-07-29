'use client';

import { useEffect } from 'react';

const WeglotInitializer = () => {
  useEffect(() => {
    let initialized = false;

    const initializeWeglot = () => {
      if (typeof window !== 'undefined' && (window as any).Weglot && !initialized) {
        initialized = true;
        console.warn('[Weglot] Initializing...');
        (window as any).Weglot.initialize({
          api_key: process.env.NEXT_PUBLIC_WEGLOT_API_KEY,
        });
      } else if (!(window as any).Weglot) {
        console.warn('[Weglot] Weglot is not loaded on window.');
      }
    };

    const observer = new MutationObserver(() => {
      const weglotSwitcher = document.querySelector('.weglot-container');
      if (!weglotSwitcher) {
        console.warn('[Weglot] Switcher not found in DOM. Reinitializing...');
        initializeWeglot();
      }
    });

    const timer = setTimeout(() => {
      initializeWeglot();
      observer.observe(document.body, { childList: true, subtree: true });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      console.warn('[Weglot] Cleanup: Timer cleared and observer disconnected');
    };
  }, []);

  return null;
};

export default WeglotInitializer;
