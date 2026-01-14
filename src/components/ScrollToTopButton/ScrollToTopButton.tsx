'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // --- показ/приховування по скролу ---
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // ініціальний стан

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // --- визначаємо, чи це desktop (md+) ---
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // якщо ще не проскролили достатньо – нічого не показуємо
  if (!visible) return null;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ===== DESKTOP / TABLET (floating fixed) =====
  if (isDesktop) {
    return (
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="
          fixed
          z-[80]
          hidden md:flex            /* показуємо тільки на md+ */
          items-center justify-center
          w-12 h-12
          bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d]
          border border-amber-950 text-xl
          text-black rounded-full
          shadow-lg
          hover:scale-110 transition-transform
        "
        style={{
          bottom: '3rem',
          right: '2rem',
        }}
      >
        <FaArrowUp />
      </button>
    );
  }

  // ===== MOBILE (кнопка сидить у футері, НЕ fixed) =====
  return (
    <div className="md:hidden w-full flex justify-end mt-1 pr-2">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="
        flex items-center justify-center
        w-12 h-12
        bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d]
        border border-amber-950
        text-black rounded-full
        shadow-lg
        active:scale-95 transition-transform
      "
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
