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
      className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-start px-6 lg:px-16 rounded-b-[80px]"
      style={{ backgroundImage: "url('/img/bannerhome/bannerhome.png')" }}
    >
      {/* Затемнення фону */}
      <div className="absolute inset-0 bg-black/40 rounded-b-[80px] z-0" />

      {/* Основний текстовий блок */}
      <div className="relative z-10 text-white max-w-xl space-y-6 animate__animated animate__fadeInLeft">
        <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
          Custom Websites & WebApps for Self-Employed Professionals (ZZP) and Small Businesses
        </h1>
        <p className="mt-2 text-base sm:text-lg text-white/90 leading-relaxed">
          At <span className="text-accent font-semibold text-yellow-500">UpLadoMyr Digital</span>,
          we craft stylish, high-performing online solutions to help your business grow online —
          fast, responsive, and built to convert.
        </p>

        {/* Кнопка з анімацією */}

        <Link
          href="/contacts"
          className="group relative inline-flex items-center gap-2 px-9 py-4 border-4 border-transparent text-base font-semibold rounded-full text-white bg-blue-900 shadow-[0_0_0_2px_#c7a23f] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-xl hover:shadow-[0_0_0_12px_transparent] hover:text-neutral-900 active:scale-95"
        >
          {/* Circle animation */}
          <span className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#c7a23f] rounded-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transform -translate-x-1/2 -translate-y-1/2" />

          {/* Text */}
          <span className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3">
            GET IN TOUCH
          </span>

          {/* Arrow out */}
          <svg
            className="absolute right-4 w-6 z-10 fill-[#c7a23f] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:right-[-25%] group-hover:fill-neutral-900"
            viewBox="0 0 24 24"
          >
            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>

          {/* Arrow in */}
          <svg
            className="absolute left-[-25%] w-6 z-10 fill-[#c7a23f] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:left-4 group-hover:fill-neutral-900"
            viewBox="0 0 24 24"
          >
            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>
        </Link>
      </div>

      {/* Інформаційний блок у правому нижньому куті */}
      <div className="absolute bottom-6 right-20 bg-deep/90 backdrop-blur-md text-white p-5 sm:p-6 max-w-md rounded-tl-2xl shadow-lg z-10 animate__animated animate__fadeInRight">
        <p className="font-tangerine text-sm sm:text-base leading-relaxed">
          Get a complete website from A to Z – from design to launch, fast and professional.
        </p>
        <p className="font-tangerine mt-3 text-yellow-500 flex items-center gap-2 font-bold text-accent animate__animated animate__pulse animate__infinite">
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
