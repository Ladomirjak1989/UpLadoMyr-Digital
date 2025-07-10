// 'use client';

// import { useState } from 'react';
// import { FaTelegramPlane, FaViber, FaWhatsapp, FaTag, FaTimes } from 'react-icons/fa';

// const FloatingSocialButtons = () => {
//   const [showBanner, setShowBanner] = useState(true);

//   return (
//     <div className="fixed right-4 mb-32 bottom-4 md:right-5 md:bottom-52 flex flex-col items-end z-50 gap-3">
//       {/* Promo Message */}
//       {showBanner && (
//         <div
//           className="bg-blue-900 text-white px-2 py-2 rounded-lg shadow-md flex items-start gap-2 max-w-[90vw] sm:max-w-sm relative"
//           data-aos="fade-left"
//           data-aos-duration="800"
//         >
//           <FaTag className="mt-1 text-amber-700" />
//           <div className="text-sm sm:text-md font-medium leading-snug">
//             <span className="text-yellow-500 font-bold">-10%</span> on website development
//             <br />
//             until the end of the month
//           </div>
//           <button
//             onClick={() => setShowBanner(false)}
//             className="absolute top-1 right-2 text-white hover:text-red-400 transition"
//           >
//             <FaTimes size={12} />
//           </button>
//         </div>
//       )}

//       {/* Telegram */}
//       <a
//         href="https://t.me/your_telegram"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="bg-[#0088cc] hover:bg-[#0077b5] p-3 rounded-full shadow-md transition duration-300"
//       >
//         <FaTelegramPlane size={20} color="white" />
//       </a>

//       {/* Viber */}
//       <a
//         href="viber://chat?number=%2B123456789"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="bg-[#7360f2] hover:bg-[#5a4cc5] p-3 rounded-full shadow-md transition duration-300"
//       >
//         <FaViber size={20} color="white" />
//       </a>

//       {/* WhatsApp */}
//       <a
//         href="https://wa.me/123456789"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="bg-[#25d366] hover:bg-[#1ebc57] p-3 rounded-full shadow-md transition duration-300"
//       >
//         <FaWhatsapp size={20} color="white" />
//       </a>
//     </div>
//   );
// };

// export default FloatingSocialButtons;

// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   FaTelegramPlane,
//   FaViber,
//   FaWhatsapp,
//   FaTag,
//   FaTimes,
// } from 'react-icons/fa';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// interface FloatingSocialButtonsProps {
//   isMenuOpen: boolean;
// }

// const FloatingSocialButtons: React.FC<FloatingSocialButtonsProps> = ({ isMenuOpen }) => {
//   const [showBanner, setShowBanner] = useState(false);
//   const [hideBannerOnScroll, setHideBannerOnScroll] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 800 });

//     const timeout = setTimeout(() => {
//       setShowBanner(true);
//     }, 100);

//     const handleScroll = () => {
//       setHideBannerOnScroll(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       clearTimeout(timeout);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       {/* 🔥 Promo Banner */}
//       {showBanner && !hideBannerOnScroll && (
//         <div
//           className={`fixed top-20 right-4 sm:top-24 sm:right-6 bg-blue-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-start justify-between gap-3 z-[60] max-w-[90vw] sm:max-w-xs transition-all duration-300 ${isMenuOpen ? 'hidden' : ''
//             }`}
//           data-aos="fade-down"
//         >
//           <div className="flex items-start gap-2 pr-4">
//             <FaTag className="mt-1 text-yellow-600 flex-shrink-0" />
//             <div className="text-sm font-medium leading-snug">
//               <span className="text-yellow-400 font-bold">-10%</span> on website development
//               <br />
//               until the end of the month
//             </div>
//           </div>
//           <button
//             onClick={() => setShowBanner(false)}
//             className="ml-auto mt-1 text-white hover:text-red-500 transition"
//           >
//             <FaTimes size={14} />
//           </button>
//         </div>
//       )}

//       {/* 🌐 Floating Contact Buttons */}
//       <div
//         className={`fixed bottom-60 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${isMenuOpen ? 'hidden' : ''
//           }`}
//       >
//         {/* Telegram */}
//         <a
//           href="https://t.me/your_telegram"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-[#0088cc] hover:bg-[#0077b5] p-3 rounded-full shadow-md transition duration-300"
//           data-aos="fade-up"
//           data-aos-anchor-placement="top-bottom"
//           data-aos-once="false"
//         >
//           <FaTelegramPlane className="text-white w-5 h-5 sm:w-6 sm:h-6" />
//         </a>

//         {/* Viber */}
//         <a
//           href="viber://chat?number=%2B123456789"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-[#7360f2] hover:bg-[#5a4cc5] p-3 rounded-full shadow-md transition duration-300"
//           data-aos="fade-up"
//           data-aos-anchor-placement="top-bottom"
//           data-aos-once="false"
//         >
//           <FaViber className="text-white w-5 h-5 sm:w-6 sm:h-6" />
//         </a>

//         {/* WhatsApp */}
//         <a
//           href="https://wa.me/123456789"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-[#25d366] hover:bg-[#1ebc57] p-3 rounded-full shadow-md transition duration-300"
//           data-aos="fade-up"
//           data-aos-anchor-placement="top-bottom"
//           data-aos-once="false"
//         >
//           <FaWhatsapp className="text-white w-5 h-5 sm:w-6 sm:h-6" />
//         </a>
//       </div>
//     </>
//   );
// };

// export default FloatingSocialButtons;

'use client';

import { useState, useEffect } from 'react';
import { FaTelegramPlane, FaViber, FaWhatsapp, FaTag, FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface FloatingSocialButtonsProps {
  isMenuOpen: boolean;
}

const FloatingSocialButtons: React.FC<FloatingSocialButtonsProps> = ({ isMenuOpen }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [hideBannerOnScroll, setHideBannerOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800 });

    const timeout = setTimeout(() => {
      setShowBanner(true);
    }, 100);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Скрол вниз — ховаємо банер
        setHideBannerOnScroll(true);
      } else {
        // Скрол вгору — показуємо банер
        setHideBannerOnScroll(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
            <FaTag className="mt-1 text-yellow-600 flex-shrink-0" />
            <div className="text-sm font-medium leading-snug">
              <span className="text-yellow-400 font-bold">-10%</span> on website development
              <br />
              until the end of the month
            </div>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="ml-auto mt-1 text-white hover:text-red-500 transition"
          >
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {/* 🌐 Floating Contact Buttons */}
      <div
        className={`fixed bottom-60 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${isMenuOpen ? 'hidden' : ''}`}
      >
        {/* Telegram */}
        <a
          href="https://t.me/your_telegram"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0088cc] hover:bg-[#0077b5] p-3 rounded-full shadow-md transition duration-300"
          data-aos="fade-up"
          data-aos-once="true"
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
        >
          <FaWhatsapp className="text-white w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>
    </>
  );
};

export default FloatingSocialButtons;
