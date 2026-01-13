'use client';

import { useEffect } from 'react';

const DESKTOP_MQ = '(min-width: 768px)';
const AOS_CSS_ID = 'aos-css';

function ensureAosCssLoaded() {
  if (document.getElementById(AOS_CSS_ID)) return;

  const link = document.createElement('link');
  link.id = AOS_CSS_ID;
  link.rel = 'stylesheet';
  link.href = '/vendor/aos.css'; // ✅ public/vendor/aos.css
  document.head.appendChild(link);
}

function removeAosCss() {
  document.getElementById(AOS_CSS_ID)?.remove();
}

function stripAosAttributesAndStyles() {
  // прибираємо атрибути
  document.querySelectorAll<HTMLElement>('[data-aos]').forEach((el) => {
    el.removeAttribute('data-aos');
    el.removeAttribute('data-aos-delay');
    el.removeAttribute('data-aos-duration');
    el.removeAttribute('data-aos-easing');
    el.removeAttribute('data-aos-offset');
    el.removeAttribute('data-aos-anchor');
    el.removeAttribute('data-aos-anchor-placement');
  });

  // прибираємо класи/стилі, які AOS міг накласти
  document.querySelectorAll<HTMLElement>('.aos-init, .aos-animate').forEach((el) => {
    el.classList.remove('aos-init', 'aos-animate');
    el.style.removeProperty('opacity');
    el.style.removeProperty('transform');
    el.style.removeProperty('transition');
  });
}

export default function AOSProvider() {
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);

    let aosInstance: any = null;

    const enableAos = async () => {
      // ✅ грузимо CSS тільки для tablet/desktop
      ensureAosCssLoaded();

      // ✅ грузимо JS тільки для tablet/desktop
      const mod = await import('aos');
      const AOS = mod.default;

      AOS.init({
        duration: 600,
        once: true, // ✅ менше навантаження
        mirror: false,
      });

      AOS.refreshHard();
      aosInstance = AOS;
    };

    const disableAos = () => {
      // ✅ мобіла: прибираємо ефекти повністю
      if (aosInstance?.refreshHard) {
        try {
          aosInstance.refreshHard();
        } catch {}
      }
      stripAosAttributesAndStyles();

      // ✅ і найважливіше — не тягнемо CSS на мобілці
      removeAosCss();
    };

    const handle = () => {
      if (mq.matches) {
        void enableAos();
      } else {
        disableAos();
      }
    };

    handle();
    mq.addEventListener('change', handle);

    return () => {
      mq.removeEventListener('change', handle);
    };
  }, []);

  return null;
}
