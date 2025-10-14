'use client';

import { useState, useEffect, useRef } from 'react';
import { FaTelegramPlane, FaViber, FaWhatsapp, FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface FloatingSocialButtonsProps {
  isMenuOpen: boolean;
}

const FloatingSocialButtons: React.FC<FloatingSocialButtonsProps> = ({ isMenuOpen }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [hideBannerOnScroll, setHideBannerOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800 });

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

  // Пауза/відтворення відео, щоб економити ресурси
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
          className={`fixed top-20 right-4 sm:top-24 sm:right-6 bg-blue-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-start justify-between gap-3 z-[60] max-w-[90vw] sm:max-w-xs transition-all duration-300 ${
            isMenuOpen ? 'hidden' : ''
          }`}
          data-aos="fade-down"
        >
          <div className="flex items-start gap-2 pr-4">
            {/* 🎞️ Легка анімація (WebM/MP4 + GIF fallback) */}

            <div className="w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-md">
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
                {/*discount-badge-10-vp9.webm - новіша версія browsera */}
                {/* <source src="/media/discount-badge-10.webm" type="video/webm" /> */}
                <source src="/media/discount-badge-10-baseline.mp4" type="video/mp4" />
                {/* опційний запасний варіант */}
                {/* <img src="/media/discount-badge-10.gif" alt="10%" /> */}
              </video>
            </div>

            <div className="text-sm font-medium leading-snug">
              <span className="text-yellow-400 font-bold">-10%</span> on website development
              <br />
              until the end of the month
            </div>
          </div>

          <button
            onClick={() => setShowBanner(false)}
            className="ml-auto mt-1 text-white hover:text-red-500 transition"
            aria-label="Close promo banner"
          >
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {/* 🌐 Floating Contact Buttons */}
      <div
        className={`fixed bottom-60 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
          isMenuOpen ? 'hidden' : ''
        }`}
      >
        {/* Telegram */}
        <a
          href="https://t.me/your_telegram"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0088cc] hover:bg-[#0077b5] p-3 rounded-full shadow-md transition duration-300"
          data-aos="fade-up"
          data-aos-once="true"
          aria-label="Open Telegram"
        >
          <FaTelegramPlane className="text-white w-5 h-5 sm:w-6 sm:h-6" />
        </a>

        {/* Viber */}
        <a
          href="viber://chat?number=%2B123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#7360f2] hover:bg-[#5a4cc5] p-3 rounded-full shadow-md transition duration-300"
          data-aos="fade-up"
          data-aos-once="true"
          aria-label="Open Viber"
        >
          <FaViber className="text-white w-5 h-5 sm:w-6 sm:h-6" />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25d366] hover:bg-[#1ebc57] p-3 rounded-full shadow-md transition duration-300"
          data-aos="fade-up"
          data-aos-once="true"
          aria-label="Open WhatsApp"
        >
          <FaWhatsapp className="text-white w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>
    </>
  );
};

export default FloatingSocialButtons;
