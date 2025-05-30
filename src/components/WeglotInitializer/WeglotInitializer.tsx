// 'use client';

// import { useEffect } from 'react';

// const WeglotInitializer = () => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (typeof window !== 'undefined' && (window as any).Weglot) {
//         (window as any).Weglot.initialize({
//           api_key: process.env.NEXT_PUBLIC_WEGLOT_API_KEY,
//         });
//       }
//     }, 500); // 500 мс затримки, можна збільшити при потребі

//     return () => clearTimeout(timer);
//   }, []);

//   return null;
// };

// export default WeglotInitializer;

'use client';

import { useEffect } from 'react';

const WeglotInitializer = () => {
  useEffect(() => {
    let initialized = false;

    const initializeWeglot = () => {
      if (typeof window !== 'undefined' && (window as any).Weglot && !initialized) {
        initialized = true;
        (window as any).Weglot.initialize({
          api_key: process.env.NEXT_PUBLIC_WEGLOT_API_KEY,
        });
      }
    };

    const observer = new MutationObserver(() => {
      const weglotSwitcher = document.querySelector('.weglot-container');
      if (!weglotSwitcher) {
        initializeWeglot();
      }
    });

    // Невелика затримка перед ініціалізацією
    const timer = setTimeout(() => {
      initializeWeglot();
      observer.observe(document.body, { childList: true, subtree: true });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default WeglotInitializer;
