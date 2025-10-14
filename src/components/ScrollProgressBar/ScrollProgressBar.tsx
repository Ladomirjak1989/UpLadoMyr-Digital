// // src/components/ScrollProgressBar/ScrollProgressBar.tsx
// 'use client';

// import { useEffect, useRef } from 'react';

// type Props = {
//   /** Висота лінії (px або будь-яка CSS одиниця) */
//   height?: string;
//   /** Tailwind класи/inline стилі для кольору заповнення */
//   barClassName?: string;
//   /** z-index, щоб бути поверх header, але без фанатизму :) */
//   zIndex?: number;
//   /** Якщо твій header має власну тінь — вимкни подвійну */
//   showDivider?: boolean;
// };

// export default function ScrollProgressBar({
//   height = '3px',
//   barClassName = 'bg-teal-400 dark:bg-teal-300',
//   zIndex = 60, // вище за більшість header'ів (z-50), але нижче модалок
//   showDivider = true,
// }: Props) {
//   const barRef = useRef<HTMLDivElement>(null);
//   const ariaNow = useRef<number>(0);

//   useEffect(() => {
//     // requestAnimationFrame для плавності й мінімуму reflow
//     let raf = 0;
//     const doc = document.documentElement;

//     const update = () => {
//       const total = doc.scrollHeight - doc.clientHeight;
//       const current = Math.min(Math.max(doc.scrollTop, 0), Math.max(total, 1));
//       const pct = total > 0 ? current / total : 0;

//       if (barRef.current) {
//         // transform не тригерить reflow/relayout
//         barRef.current.style.transform = `scaleX(${pct})`;
//         // ARIA (округлюємо до 0..100)
//         const now = Math.round(pct * 100);
//         if (now !== ariaNow.current) {
//           ariaNow.current = now;
//           barRef.current.setAttribute('aria-valuenow', String(now));
//         }
//       }
//     };

//     const onScrollOrResize = () => {
//       cancelAnimationFrame(raf);
//       raf = requestAnimationFrame(update);
//     };

//     update(); // init
//     window.addEventListener('scroll', onScrollOrResize, { passive: true });
//     window.addEventListener('resize', onScrollOrResize);
//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener('scroll', onScrollOrResize);
//       window.removeEventListener('resize', onScrollOrResize);
//     };
//   }, []);

//   return (
//     <div
//       className="fixed inset-x-0 top-0 pointer-events-none"
//       style={{ height, zIndex }}
//       aria-hidden={false}
//     >
//       <div
//         ref={barRef}
//         role="progressbar"
//         aria-label="Page scroll progress"
//         aria-valuemin={0}
//         aria-valuemax={100}
//         aria-valuenow={0}
//         className={`h-full origin-left scale-x-0 ${barClassName}`}
//         style={{
//           // повністю керуємо лише transform
//           transform: 'scaleX(0)',
//           transition: 'transform 80ms linear',
//         }}
//       />
//       {showDivider && <div className="h-px w-full bg-black/5 dark:bg-white/10" />}
//       {/* reduced-motion: вимикаємо анімацію для користувачів, що цього потребують */}
//       <style>
//         {`
//           @media (prefers-reduced-motion: reduce) {
//             [role="progressbar"] { transition: none !important; }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// src/components/ScrollProgressBar/ScrollProgressBar.tsx
// src/components/ScrollProgressBar/ScrollProgressBar.tsx
// src/components/ScrollProgressBar/ScrollProgressBar.tsx
// src/components/ScrollProgressBar/ScrollProgressBar.tsx
'use client';

import { useEffect, useRef } from 'react';

type Props = {
  height?: string;
  barClassName?: string;
  zIndex?: number;
  showDivider?: boolean;
  /** де малювати: зверху сторінки (fixed) чи всередині header (absolute bottom) */
  placement?: 'page' | 'header';
  /** вімкнути діагностику */
  debug?: boolean;
  /** мінімальна стартова ширина (0..1), щоб було видно на самому верху */
  initialMin?: number;
};

export default function ScrollProgressBar({
  height = '4px',
  barClassName = 'bg-emerald-500 dark:bg-emerald-400',
  zIndex = 60,
  showDivider = false,
  placement = 'page',
  debug = false,
  initialMin = 0.01, // ← видно навіть на top=0
}: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const ariaNow = useRef<number>(0);

  useEffect(() => {
    let raf = 0;
    const doc = document.documentElement;

    const update = () => {
      const total = doc.scrollHeight - doc.clientHeight;
      const current = Math.min(Math.max(doc.scrollTop, 0), Math.max(total, 1));
      let pct = total > 0 ? current / total : 0;
      if (pct < initialMin) pct = initialMin;

      if (debug) {
        // докладний лог
        // eslint-disable-next-line no-console
        console.log(
          `[ScrollProgressBar] pct=${Math.round(pct * 100)}%  (current=${current}px, total=${total}px)`
        );
      }

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`;
        const now = Math.round(pct * 100);
        if (now !== ariaNow.current) {
          ariaNow.current = now;
          barRef.current.setAttribute('aria-valuenow', String(now));
        }
      }
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [debug, initialMin]);

  const containerClass =
    placement === 'header'
      ? 'absolute left-0 right-0 bottom-0 pointer-events-none'
      : 'fixed inset-x-0 top-0 pointer-events-none';

  return (
    <div
      className={containerClass}
      style={{
        height,
        zIndex,
        ...(debug
          ? { outline: '1px dashed rgba(30,58,138,.7)', background: 'rgba(255,193,7,.06)' }
          : null),
      }}
      aria-hidden={false}
    >
      <div
        ref={barRef}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        className={`h-full w-full origin-left ${barClassName}`}
        style={{ transform: `scaleX(${initialMin})`, transition: 'transform 80ms linear' }}
      />
      {showDivider && <div className="h-px w-full bg-black/5 dark:bg-white/10" />}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [role="progressbar"] { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
