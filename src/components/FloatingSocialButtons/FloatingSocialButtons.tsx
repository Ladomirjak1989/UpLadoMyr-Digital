'use client';

import { useState, useEffect, useRef } from 'react';
import { FaTelegramPlane, FaViber, FaWhatsapp, FaTimes } from 'react-icons/fa';

interface FloatingSocialButtonsProps {
  isMenuOpen?: boolean;
}

const FloatingSocialButtons: React.FC<FloatingSocialButtonsProps> = ({ isMenuOpen = false }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [hideBannerOnScroll, setHideBannerOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setShowBanner(true), 100);

    const handleScroll = () => {
      const current = window.scrollY;
      setHideBannerOnScroll(current > lastScrollY); // вниз — ховаємо, вгору — показуємо
      setLastScrollY(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Пауза/відтворення відео
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (showBanner && !hideBannerOnScroll) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [showBanner, hideBannerOnScroll]);

  return (
    <>
      {/* 🔥 Promo Banner */}
      {showBanner && !hideBannerOnScroll && (
        <div
          className={`
            fixed
            
            bg-gradient-to-r from-slate-950/95 via-sky-900/95 to-slate-950/95
            text-white
            px-3 py-2
            sm:px-4 sm:py-3
            rounded-2xl
            shadow-lg
            flex items-start justify-between
            gap-2 sm:gap-3
            z-[70]
            max-w-[88vw] sm:max-w-xs
            text-xs sm:text-sm
            transition-all duration-300
            ${isMenuOpen ? 'hidden' : ''}
          `}
          style={{
            // ⬅︎ НОВЕ: ураховуємо “чубчик” зверху
            top: 'calc(env(safe-area-inset-top, 0px) + 6.5rem)',
            right: 'calc(env(safe-area-inset-right, 0px) + 0.75rem)',
          }}
          data-aos="fade-down"
        >
          <div className="flex items-start gap-2 pr-3 sm:pr-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-lg border border-sky-400/60 shadow-md shadow-sky-900/40">
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
                <source src="/media/winter_blue_badge_loop.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="font-medium leading-snug">
              <span className="text-sky-300 font-bold">
                Winter Special{' '}
                <span className="inline-block text-amber-500 text-xl font-bold animate-pulse">
                  -10%
                </span>
              </span>
              <br />
              <span className="hidden sm:inline">on website development</span>
              <span className="sm:hidden">on website development</span>
            </div>
          </div>

          <button
            onClick={() => setShowBanner(false)}
            className="ml-1 mt-0.5 sm:mt-1 text-slate-200 hover:text-red-400 transition"
            aria-label="Close promo banner"
          >
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {/* 🌐 Floating Contact Buttons */}
      <div
        className={`
          fixed
          z-[80]
          flex flex-col items-end gap-3
          transition-all duration-300
          ${isMenuOpen ? 'hidden' : ''}
        `}
        style={{
          // ⬅︎ НОВЕ: піднімаємо над нижньою панеллю й Weglot
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)',
          right: 'calc(env(safe-area-inset-right, 0px) + 1rem)',
        }}
      >
        {/* TELEGRAM */}
        <div className="relative group" data-aos="fade-up" data-aos-once="true">
          <span
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                       rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white
                       opacity-0 invisible
                       shadow-lg shadow-slate-900/40
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
            <span
              className="absolute inset-x-0 bottom-0 h-0 rounded-full
                         bg-black/20
                         transition-all duration-300
                         group-hover:h-full"
            />
            <FaTelegramPlane className="relative z-10 w-6 h-6 text-white" />
          </a>
        </div>

        {/* VIBER */}
        <div className="relative group" data-aos="fade-up" data-aos-once="true">
          <span
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                       rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white
                       opacity-0 invisible
                       shadow-lg shadow-slate-900/40
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
            <span
              className="absolute inset-x-0 bottom-0 h-0 rounded-full
                         bg-black/20
                         transition-all duration-300
                         group-hover:h-full"
            />
            <FaViber className="relative z-10 w-6 h-6 text-white" />
          </a>
        </div>

        {/* WHATSAPP */}
        <div className="relative group" data-aos="fade-up" data-aos-once="true">
          <span
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
                       rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white
                       opacity-0 invisible
                       shadow-lg shadow-slate-900/40
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
            <span
              className="absolute inset-x-0 bottom-0 h-0 rounded-full
                         bg-black/20
                         transition-all duration-300
                         group-hover:h-full"
            />
            <FaWhatsapp className="relative z-10 w-6 h-6 text-white" />
          </a>
        </div>
      </div>
    </>
  );
};

export default FloatingSocialButtons;
