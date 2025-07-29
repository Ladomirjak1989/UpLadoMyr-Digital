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
      className="relative w-full h-[100vh] bg-cover bg-center flex items-center justify-start px-4 sm:px-6 lg:px-16 rounded-b-[10px]"
      style={{ backgroundImage: "url('/img/bannerhome/bannerhome.png')" }}
    >
      {/* Затемнення фону */}
      <div className="absolute inset-0 bg-black/40 rounded-b-[10px] z-0" />

      {/* Основний текстовий блок */}
      <div className="relative z-10 text-white max-w-2xl space-y-6 sm:space-y-8 animate__animated animate__fadeInLeft">
        <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-md leading-tight">
          Custom Websites & WebApps for Self-Employed Professionals (ZZP) and Small Businesses
        </h1>
        <p className="mt-2 text-2xl sm:text-lg md:text-2xl text-white/90 leading-relaxed">
          At <span className="text-accent font-semibold text-yellow-500">UpLadoMyr Digital</span>,
          we craft stylish, high-performing online solutions to help your business grow online —
          fast, responsive, and built to convert.
        </p>

        {/* Кнопка */}
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

          {/* Arrow out — ховається далеко вправо */}
          <svg
            className="absolute right-4 group-hover:right-[-100px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] w-6 z-10 fill-[#c7a23f] group-hover:fill-neutral-900"
            viewBox="0 0 24 24"
          >
            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>

          {/* Arrow in — злітає зліва */}
          <svg
            className="absolute left-[-50px] group-hover:left-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] w-6 z-10 fill-[#c7a23f] group-hover:fill-neutral-900"
            viewBox="0 0 24 24"
          >
            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>
        </Link>
      </div>

      <div className="absolute bottom-3 right-1 sm:right-20 bg-deep/90 backdrop-blur-md text-white p-2 sm:p-8 max-w-lg rounded-tl-2xl shadow-lg z-10 animate__animated animate__fadeInRight mt-6">
        <p className="font-tangerine text-2xl sm:text-xl leading-relaxed text-white/90">
          Get a complete website from A to Z – from design to launch, fast and professional.
        </p>
        <p className="font-tangerine mt-4 text-yellow-400 flex items-center gap-2 font-bold text-accent animate__animated animate__pulse animate__infinite text-lg sm:text-xl">
          <FaPhoneAlt className="text-accent bg-white rounded-full p-3 w-12 h-12 shadow-md border border-yellow-500 hover:shadow-lg transition-transform duration-300 hover:scale-110" />
          +31 (06) 19 - 38 - 88 - 95
        </p>
        <hr className="mt-4 w-52 text-white border-accent" />
      </div>
    </section>
  );
};

export default HomeBanner;
