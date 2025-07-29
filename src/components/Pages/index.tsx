import { useEffect } from 'react';
import WOW from 'wowjs'; // Імпортуємо wowjs
import 'animate.css';

export default function Banner() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      new WOW.WOW().init(); // Використовуємо WOW.WOW()
    }
  }, []);

  return (
    <div className="wow animate__animated animate__fadeIn">
      <h1>Hello, Next.js + WOW.js! 🎉</h1>
    </div>
  );
}
