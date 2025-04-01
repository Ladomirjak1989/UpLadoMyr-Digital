'use client';

import React from 'react';
import Link from 'next/link';

import 'animate.css';
import { FaPhoneAlt } from 'react-icons/fa';
import useWow from '../hooks/useWow';

const HomeBanner: React.FC = () => {
  useWow();

  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-start px-6 lg:px-16"
      style={{ backgroundImage: "url('/img/bannerhome/bannerhome.png')" }}
    >
      {/* Затемнення фону */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Основний текстовий блок */}
      <div className="relative z-10 text-white max-w-xl space-y-6 animate__animated animate__fadeInLeft">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight drop-shadow-md">
          Professional websites for freelancers (ZZP) & small businesses
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed text-white/90 drop-shadow-sm">
          At <span className="text-accent font-semibold text-yellow-500">UpLadoMyr Digital</span> build modern,
          fast, and stylish landing pages to strengthen your online presence.
        </p>

        {/* Кнопка з анімацією */}
        <Link
          href="/contacts"
          className="inline-block px-6 py-3 rounded-full bg-deep text-white  hover:text-yellow-500 font-semibold shadow-lg transition-all bg-blue-900 duration-300 hover:bg-blue-800 animate__animated animate__fadeInUp"
        >
          Get in Touch
        </Link>
      </div>

      {/* Інформаційний блок у правому нижньому куті */}
      <div className="absolute bottom-6 right-6 bg-deep/90 backdrop-blur-md text-white p-5 sm:p-6 max-w-md rounded-tl-2xl shadow-lg z-10 animate__animated animate__fadeInRight">
        <p className="text-sm sm:text-base leading-relaxed">
          Get a complete website from A to Z – from design to launch, fast and professional.
        </p>
        <p className="mt-3 text-yellow-500 flex items-center gap-2 font-bold text-accent animate__animated animate__pulse animate__infinite">
          <FaPhoneAlt
            className="text-accent bg-white rounded-full p-3 w-12 h-12 shadow-md 
             border border-yellow-500 hover:shadow-lg transition-transform duration-300 hover:scale-110"
          />

          +31 (06) 19 - 38 - 88 - 95
        </p>
        <hr className="mt-2 w-52 text-white border-accent" />
      </div>
    </section>
  );
};

export default HomeBanner;
