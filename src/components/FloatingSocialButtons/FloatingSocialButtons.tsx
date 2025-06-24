'use client';

import { useState } from 'react';
import { FaTelegramPlane, FaViber, FaWhatsapp, FaTag, FaTimes } from 'react-icons/fa';

const FloatingSocialButtons = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="fixed right-4 mb-32 bottom-4 md:right-5 md:bottom-52 flex flex-col items-end z-50 gap-3">
      {/* Promo Message */}
      {showBanner && (
        <div
          className="bg-blue-900 text-white px-2 py-2 rounded-lg shadow-md flex items-start gap-2 max-w-[90vw] sm:max-w-sm relative"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <FaTag className="mt-1 text-amber-700" />
          <div className="text-sm sm:text-md font-medium leading-snug">
            <span className="text-yellow-500 font-bold">-10%</span> on website development
            <br />
            until the end of the month
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-1 right-2 text-white hover:text-red-400 transition"
          >
            <FaTimes size={12} />
          </button>
        </div>
      )}

      {/* Telegram */}
      <a
        href="https://t.me/your_telegram"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#0088cc] hover:bg-[#0077b5] p-3 rounded-full shadow-md transition duration-300"
      >
        <FaTelegramPlane size={20} color="white" />
      </a>

      {/* Viber */}
      <a
        href="viber://chat?number=%2B123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#7360f2] hover:bg-[#5a4cc5] p-3 rounded-full shadow-md transition duration-300"
      >
        <FaViber size={20} color="white" />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25d366] hover:bg-[#1ebc57] p-3 rounded-full shadow-md transition duration-300"
      >
        <FaWhatsapp size={20} color="white" />
      </a>
    </div>
  );
};

export default FloatingSocialButtons;
