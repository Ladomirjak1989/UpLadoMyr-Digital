'use client';

import { useEffect } from 'react';

const DESKTOP_MQ = '(min-width: 768px)';
const AOS_CSS_ID = 'aos-css';

function ensureAosCssLoaded() {
  if (document.getElementById(AOS_CSS_ID)) return;

  const link = document.createElement('link');
  link.id = AOS_CSS_ID;
  link.rel = 'stylesheet';
  link.href = '/vendor/aos.css'; // public/vendor/aos.css
  document.head.appendChild(link);
}

function removeAosCss() {
  document.getElementById(AOS_CSS_ID)?.remove();
}

function stripAosAttributesAndStyles() {
  // remove AOS data attributes
  document.querySelectorAll<HTMLElement>('[data-aos]').forEach((el) => {
    el.removeAttribute('data-aos');
    el.removeAttribute('data-aos-delay');
    el.removeAttribute('data-aos-duration');
    el.removeAttribute('data-aos-easing');
    el.removeAttribute('data-aos-offset');
    el.removeAttribute('data-aos-anchor');
    el.removeAttribute('data-aos-anchor-placement');
  });

  // remove AOS classes + inline styles that may remain
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

    let disposed = false;
    let aos: any = null;

    const enableAos = async () => {
      if (disposed) return;

      ensureAosCssLoaded();

      // load JS only on tablet/desktop
      const mod = await import('aos');
      if (disposed) return;

      aos = mod.default;

      aos.init({
        duration: 600,
        once: true,
        mirror: false,
      });

      // safe call (no empty catch)
      try {
        aos.refreshHard?.();
      } catch (err) {
        // ignore: AOS may fail in edge cases during hydration/navigation
        void err;
      }
    };

    const disableAos = () => {
      // remove visual effects + CSS for mobile
      stripAosAttributesAndStyles();
      removeAosCss();

      // also try to refresh/reset internal state if available
      try {
        aos?.refreshHard?.();
      } catch (err) {
        // ignore
        void err;
      }
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
      disposed = true;
      mq.removeEventListener('change', handle);
    };
  }, []);

  return null;
}
