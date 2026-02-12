// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { FaTelegramPlane, FaViber, FaWhatsapp, FaTimes } from 'react-icons/fa';

// interface FloatingSocialButtonsProps {
//   isMenuOpen?: boolean;
// }

// const FloatingSocialButtons: React.FC<FloatingSocialButtonsProps> = ({ isMenuOpen = false }) => {
//   const [showBanner, setShowBanner] = useState(false);
//   const [hideBannerOnScroll, setHideBannerOnScroll] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   useEffect(() => {
//     const timeout = setTimeout(() => setShowBanner(true), 100);

//     const handleScroll = () => {
//       const current = window.scrollY;
//       setHideBannerOnScroll(current > lastScrollY); // вниз — ховаємо, вгору — показуємо
//       setLastScrollY(current);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       clearTimeout(timeout);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [lastScrollY]);

//   // Пауза/відтворення відео
//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;
//     if (showBanner && !hideBannerOnScroll) {
//       v.play().catch(() => {});
//     } else {
//       v.pause();
//     }
//   }, [showBanner, hideBannerOnScroll]);

//   return (
//     <>
//       {/* 🔥 Promo Banner */}
//       {showBanner && !hideBannerOnScroll && (
//         <div
//           className={`
//             fixed

//             bg-gradient-to-r from-slate-950/95 via-sky-900/95 to-slate-950/95
//             text-white
//             px-3 py-2
//             sm:px-4 sm:py-3
//             rounded-2xl
//             shadow-lg
//             flex items-start justify-between
//             gap-2 sm:gap-3
//             z-[70]
//             max-w-[88vw] sm:max-w-xs
//             text-xs sm:text-sm
//             transition-all duration-300
//             ${isMenuOpen ? 'hidden' : ''}
//           `}
//           style={{
//             // ⬅︎ НОВЕ: ураховуємо “чубчик” зверху
//             top: 'calc(env(safe-area-inset-top, 0px) + 6.5rem)',
//             right: 'calc(env(safe-area-inset-right, 0px) + 0.75rem)',
//           }}
//           data-aos="fade-down"
//         >

//           <div className="flex items-start gap-2 pr-3 sm:pr-4">
//             <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-lg border border-sky-400/60 shadow-md shadow-sky-900/40">
//               <video
//                 ref={videoRef}
//                 playsInline
//                 muted
//                 loop
//                 autoPlay
//                 preload="metadata"
//                 className="w-full h-full object-cover pointer-events-none"
//                 aria-hidden="true"
//               >
//                 <source src="/media/winter_blue_badge_loop.mp4" type="video/mp4" />
//               </video>
//             </div>

//             <div className="font-medium leading-snug">
//               <span className="text-sky-300 font-bold">
//                 Winter Special{' '}
//                 <span className="inline-block text-amber-500 text-xl font-bold animate-pulse">
//                   -10%
//                 </span>
//               </span>
//               <br />
//               <span className="hidden sm:inline">on website development</span>
//               <span className="sm:hidden">on website development</span>
//             </div>
//           </div>

//           <button
//             onClick={() => setShowBanner(false)}
//             className="ml-1 mt-0.5 sm:mt-1 text-slate-200 hover:text-red-400 transition"
//             aria-label="Close promo banner"
//           >
//             <FaTimes size={14} />
//           </button>
//         </div>
//       )}

//       {/* 🌐 Floating Contact Buttons */}
//       <div
//         className={`
//           fixed
//           z-[80]
//           flex flex-col items-end gap-3
//           transition-all duration-300
//           ${isMenuOpen ? 'hidden' : ''}
//         `}
//         style={{
//           // ⬅︎ НОВЕ: піднімаємо над нижньою панеллю й Weglot
//           bottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)',
//           right: 'calc(env(safe-area-inset-right, 0px) + 1rem)',
//         }}
//       >
//         {/* TELEGRAM */}
//         <div className="relative group" data-aos="fade-up" data-aos-once="true">
//           <span
//             className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
//                        rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white
//                        opacity-0 invisible
//                        shadow-lg shadow-slate-900/40
//                        transition-all duration-300
//                        group-hover:opacity-100 group-hover:visible group-hover:-top-10"
//           >
//             Telegram
//           </span>

//           <a
//             href="https://t.me/bettinaladomirjak"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Open Telegram"
//             className="relative flex h-12 w-12 items-center justify-center
//                        rounded-full overflow-hidden
//                        shadow-[0_6px_18px_rgba(15,23,42,0.45)]
//                        transition-all duration-300
//                        hover:-translate-y-0.5"
//             style={{ backgroundColor: '#0088cc' }}
//           >
//             <span
//               className="absolute inset-x-0 bottom-0 h-0 rounded-full
//                          bg-black/20
//                          transition-all duration-300
//                          group-hover:h-full"
//             />
//             <FaTelegramPlane className="relative z-10 w-6 h-6 text-white" />
//           </a>
//         </div>

//         {/* VIBER */}
//         <div className="relative group" data-aos="fade-up" data-aos-once="true">
//           <span
//             className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
//                        rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white
//                        opacity-0 invisible
//                        shadow-lg shadow-slate-900/40
//                        transition-all duration-300
//                        group-hover:opacity-100 group-hover:visible group-hover:-top-10"
//           >
//             Viber
//           </span>

//           <a
//             href="viber://chat?number=+380507252223"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Open Viber"
//             className="relative flex h-12 w-12 items-center justify-center
//                        rounded-full overflow-hidden
//                        shadow-[0_6px_18px_rgba(15,23,42,0.45)]
//                        transition-all duration-300
//                        hover:-translate-y-0.5"
//             style={{ backgroundColor: '#7360F2' }}
//           >
//             <span
//               className="absolute inset-x-0 bottom-0 h-0 rounded-full
//                          bg-black/20
//                          transition-all duration-300
//                          group-hover:h-full"
//             />
//             <FaViber className="relative z-10 w-6 h-6 text-white" />
//           </a>
//         </div>

//         {/* WHATSAPP */}
//         <div className="relative group" data-aos="fade-up" data-aos-once="true">
//           <span
//             className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
//                        rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white
//                        opacity-0 invisible
//                        shadow-lg shadow-slate-900/40
//                        transition-all duration-300
//                        group-hover:opacity-100 group-hover:visible group-hover:-top-10"
//           >
//             WhatsApp
//           </span>

//           <a
//             href="https://wa.me/+31619388895"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Open WhatsApp"
//             className="relative flex h-12 w-12 items-center justify-center
//                        rounded-full overflow-hidden
//                        shadow-[0_6px_18px_rgba(15,23,42,0.45)]
//                        transition-all duration-300
//                        hover:-translate-y-0.5"
//             style={{ backgroundColor: '#25D366' }}
//           >
//             <span
//               className="absolute inset-x-0 bottom-0 h-0 rounded-full
//                          bg-black/20
//                          transition-all duration-300
//                          group-hover:h-full"
//             />
//             <FaWhatsapp className="relative z-10 w-6 h-6 text-white" />
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FloatingSocialButtons;

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FaTelegramPlane, FaViber, FaWhatsapp, FaTimes } from 'react-icons/fa';

interface FloatingSocialButtonsProps {
  isMenuOpen?: boolean;
}

/**
 * ✅ Promo window (NL time) — February 2026
 * Start: 01-02-2026 00:00 (CET +01:00)
 * End:   28-02-2026 23:59:59 (CET +01:00)
 */
const CAMPAIGN_START_ISO = '2026-02-01T00:00:00+01:00';
const CAMPAIGN_END_ISO = '2026-02-28T23:59:59+01:00';

// behavior
const DISMISS_KEY = 'springPromoBannerDismissedUntil';
const AUTO_CLOSE_MS = 30000;

// urgency thresholds
const MS_48H = 48 * 60 * 60 * 1000;
const MS_24H = 24 * 60 * 60 * 1000;
const MS_6H = 6 * 60 * 60 * 1000;

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function calcTimeLeft(endTs: number) {
  const now = Date.now();
  const diff = Math.max(0, endTs - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { diff, days, hours, minutes, seconds };
}

const FloatingSocialButtons: React.FC<FloatingSocialButtonsProps> = ({ isMenuOpen = false }) => {
  // client-only guard (prevents SSR mismatch)
  const [mounted, setMounted] = useState(false);

  // banner state
  const [showBanner, setShowBanner] = useState(false);
  const [hideBannerOnScroll, setHideBannerOnScroll] = useState(false);

  // countdown state
  const [timeLeft, setTimeLeft] = useState({
    diff: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastScrollYRef = useRef(0);

  // timestamps
  const campaignStartTs = useMemo(() => new Date(CAMPAIGN_START_ISO).getTime(), []);
  const campaignEndTs = useMemo(() => new Date(CAMPAIGN_END_ISO).getTime(), []);

  // derived: campaign active (client-only)
  const [campaignActive, setCampaignActive] = useState(false);

  // mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // scroll show/hide (client-only)
  useEffect(() => {
    if (!mounted) return;

    const onScroll = () => {
      const current = window.scrollY;
      const last = lastScrollYRef.current;
      setHideBannerOnScroll(current > last);
      lastScrollYRef.current = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  // campaign active + initial timeLeft (client-only)
  useEffect(() => {
    if (!mounted) return;

    const now = Date.now();
    const active = now >= campaignStartTs && now <= campaignEndTs;

    setCampaignActive(active);
    setTimeLeft(calcTimeLeft(campaignEndTs));
  }, [mounted, campaignStartTs, campaignEndTs]);

  // tick countdown once per second while active
  useEffect(() => {
    if (!mounted || !campaignActive) return;

    const id = window.setInterval(() => {
      setTimeLeft(calcTimeLeft(campaignEndTs));
    }, 1000);

    return () => window.clearInterval(id);
  }, [mounted, campaignActive, campaignEndTs]);

  // decide to show banner (client-only)
  useEffect(() => {
    if (!mounted) return;

    if (!campaignActive) {
      setShowBanner(false);
      return;
    }

    // dismissed?
    const raw = localStorage.getItem(DISMISS_KEY);
    const dismissedUntil = raw ? Number(raw) : 0;
    if (dismissedUntil && Date.now() < dismissedUntil) return;

    const t = window.setTimeout(() => setShowBanner(true), 120);
    return () => window.clearTimeout(t);
  }, [mounted, campaignActive]);

  // auto-close after 8 sec (dismiss 24h)
  useEffect(() => {
    if (!mounted || !showBanner) return;

    const id = window.setTimeout(() => {
      setShowBanner(false);
      localStorage.setItem(DISMISS_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
    }, AUTO_CLOSE_MS);

    return () => window.clearTimeout(id);
  }, [mounted, showBanner]);

  // video play/pause
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (mounted && showBanner && !hideBannerOnScroll && !isMenuOpen) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [mounted, showBanner, hideBannerOnScroll, isMenuOpen]);

  // urgency flags
  const msLeft = timeLeft.diff;
  const isLast48h = campaignActive && msLeft <= MS_48H;
  const isLast24h = campaignActive && msLeft <= MS_24H;
  const isLast6h = campaignActive && msLeft <= MS_6H;

  const countdownLabel = useMemo(() => {
    if (!campaignActive) return '';
    const { days, hours, minutes, seconds } = timeLeft;
    if (days > 0) return `${days}d ${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
    return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
  }, [campaignActive, timeLeft]);

  const countdownPrefix = useMemo(() => {
    if (!campaignActive) return '';
    if (isLast24h) return 'Last 24h';
    if (isLast48h) return 'Last 48h';
    return 'Ends in';
  }, [campaignActive, isLast48h, isLast24h]);

  const handleClose = () => {
    setShowBanner(false);
    // manual close: hide until campaign ends
    localStorage.setItem(DISMISS_KEY, String(campaignEndTs));
  };

  // styles by urgency
  const bannerGradient = isLast24h
    ? 'from-slate-950/95 via-rose-950/85 to-slate-950/95'
    : isLast48h
      ? 'from-slate-950/95 via-amber-950/80 to-slate-950/95'
      : 'from-slate-950/95 via-emerald-950/90 to-slate-950/95';

  const badgeBorder = isLast24h
    ? 'border-rose-400/60'
    : isLast48h
      ? 'border-amber-400/60'
      : 'border-emerald-400/60';

  const pillRing = isLast24h
    ? 'ring-rose-400/30'
    : isLast48h
      ? 'ring-amber-400/30'
      : 'ring-emerald-400/30';

  const glowClass = isLast24h
    ? 'bg-rose-400/18'
    : isLast48h
      ? 'bg-amber-400/16'
      : 'bg-emerald-400/20';

  const pulseClass = isLast6h ? 'animate-pulse' : '';

  // ✅ render nothing until mounted (prevents SSR mismatch completely)
  if (!mounted) return null;

  return (
    <>
      {/* 🌿 Promo Banner */}
      {campaignActive && showBanner && !hideBannerOnScroll && !isMenuOpen && (
        <div
          className={`
            fixed z-[70]
            max-w-[92vw] sm:max-w-sm
            rounded-2xl
            px-3 py-2 sm:px-4 sm:py-3
            text-white
            shadow-lg shadow-slate-950/40
            ring-1 ring-white/10
            transition-all duration-300
            bg-gradient-to-r ${bannerGradient}
            backdrop-blur-md
          `}
          style={{
            top: 'calc(env(safe-area-inset-top, 0px) + 6.5rem)',
            right: 'calc(env(safe-area-inset-right, 0px) + 0.75rem)',
          }}
          data-aos="fade-down"
        >
          {/* glow */}
          <div
            className={`pointer-events-none absolute -left-12 -top-10 h-28 w-28 rounded-full blur-2xl ${glowClass}`}
          />
          <div className="pointer-events-none absolute -right-12 -bottom-10 h-28 w-28 rounded-full bg-white/5 blur-2xl" />

          <div className="relative flex items-start justify-between gap-3">
            {/* Left */}
            <div className="flex items-start gap-3 min-w-0 pr-6">
              {/* Badge */}
              <div
                className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-lg border ${badgeBorder} shadow-md shadow-slate-950/40`}
              >
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload="metadata"
                  className="w-full h-full object-cover pointer-events-none"
                  aria-hidden="true"
                >
                  <source src="/media/spring_green_fixed.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Copy */}
              <div className="min-w-0 leading-snug">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-white/90 font-semibold tracking-wide">
                    {isLast24h ? 'Final Sprint' : 'Spring Special'}
                  </span>

                  <span
                    className={`inline-flex items-baseline rounded-md bg-white/5 px-2 py-0.5 ring-1 ${pillRing}`}
                  >
                    <span
                      className={`text-amber-300 text-lg sm:text-xl font-extrabold ${pulseClass}`}
                    >
                      -10%
                    </span>
                  </span>

                  <span
                    className={`inline-flex items-center gap-2 rounded-md bg-white/5 px-2 py-0.5 ring-1 ring-white/10 ${pulseClass}`}
                  >
                    <span className="text-[10px] sm:text-xs text-white/70">{countdownPrefix}</span>
                    <span className="text-[11px] sm:text-sm font-semibold text-white">
                      {countdownLabel}
                    </span>
                  </span>
                </div>

                <div className="text-white/85 text-sm sm:text-base">Website development</div>

                <div className="mt-0.5 text-[11px] sm:text-sm text-white/70">
                  For new website projects starting at{' '}
                  <span className="text-white/90 font-semibold">€2000</span> — receive 10% off.
                </div>
              </div>
            </div>

            {/* Close */}
            <button
              onClick={handleClose}
              className="shrink-0 mt-0.5 text-white/70 hover:text-red-300 transition"
              aria-label="Close promo banner"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>
      )}

      {/* 🌐 Floating Contact Buttons */}
      <div
        className={`
          fixed z-[80]
          flex flex-col items-end gap-3
          transition-all duration-300
          ${isMenuOpen ? 'hidden' : ''}
        `}
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)',
          right: 'calc(env(safe-area-inset-right, 0px) + 1rem)',
        }}
      >
        {/* TELEGRAM */}
        <div className="relative group" data-aos="fade-up" data-aos-once="true">
          <span
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                       rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white
                       opacity-0 invisible shadow-lg shadow-slate-900/40
                       transition-all duration-300
                       group-hover:opacity-100 group-hover:visible group-hover:-top-10"
          >
            Telegram
          </span>

          <a
            href="https://t.me/bettinaladomirjak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Telegram"
            className="relative flex h-12 w-12 items-center justify-center
                       rounded-full overflow-hidden
                       shadow-[0_6px_18px_rgba(15,23,42,0.45)]
                       transition-all duration-300
                       hover:-translate-y-0.5"
            style={{ backgroundColor: '#0088cc' }}
          >
            <span className="absolute inset-x-0 bottom-0 h-0 rounded-full bg-black/20 transition-all duration-300 group-hover:h-full" />
            <FaTelegramPlane className="relative z-10 w-6 h-6 text-white" />
          </a>
        </div>

        {/* VIBER */}
        <div className="relative group" data-aos="fade-up" data-aos-once="true">
          <span
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                       rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white
                       opacity-0 invisible shadow-lg shadow-slate-900/40
                       transition-all duration-300
                       group-hover:opacity-100 group-hover:visible group-hover:-top-10"
          >
            Viber
          </span>

          <a
            href="viber://chat?number=+380507252223"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Viber"
            className="relative flex h-12 w-12 items-center justify-center
                       rounded-full overflow-hidden
                       shadow-[0_6px_18px_rgba(15,23,42,0.45)]
                       transition-all duration-300
                       hover:-translate-y-0.5"
            style={{ backgroundColor: '#7360F2' }}
          >
            <span className="absolute inset-x-0 bottom-0 h-0 rounded-full bg-black/20 transition-all duration-300 group-hover:h-full" />
            <FaViber className="relative z-10 w-6 h-6 text-white" />
          </a>
        </div>

        {/* WHATSAPP */}
        <div className="relative group" data-aos="fade-up" data-aos-once="true">
          <span
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                       rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white
                       opacity-0 invisible shadow-lg shadow-slate-900/40
                       transition-all duration-300
                       group-hover:opacity-100 group-hover:visible group-hover:-top-10"
          >
            WhatsApp
          </span>

          <a
            href="https://wa.me/+31619388895"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open WhatsApp"
            className="relative flex h-12 w-12 items-center justify-center
                       rounded-full overflow-hidden
                       shadow-[0_6px_18px_rgba(15,23,42,0.45)]
                       transition-all duration-300
                       hover:-translate-y-0.5"
            style={{ backgroundColor: '#25D366' }}
          >
            <span className="absolute inset-x-0 bottom-0 h-0 rounded-full bg-black/20 transition-all duration-300 group-hover:h-full" />
            <FaWhatsapp className="relative z-10 w-6 h-6 text-white" />
          </a>
        </div>
      </div>
    </>
  );
};

export default FloatingSocialButtons;
