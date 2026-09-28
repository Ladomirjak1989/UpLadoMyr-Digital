'use client';

import React from 'react';
import Link from 'next/link';
import { FaPhoneAlt } from 'react-icons/fa';
import useWow from '../hooks/useWow';

import { track } from '@/lib/pixel';

const HomeBanner: React.FC = () => {
  useWow();

  return (
    <section
      id="home-hero"
      className="
        relative
        isolate
        w-full
        min-h-[100svh]
        bg-cover
        bg-center
        rounded-b-[10px]
        pt-24
        md:pt-0
        pb-24
      "
      style={{
        backgroundImage: "url('/img/bannerhome/bannerhome.avif')",
      }}
      aria-label="UpLadoMyr Digital — Custom Web Platforms"
    >
      {/* =====================================================
          BACKGROUND OVERLAYS
      ===================================================== */}

      {/* General dark overlay */}
      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-b-[10px]
          bg-black/35
        "
        aria-hidden="true"
      />

      {/* Strong dark gradient behind the main text */}
      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-b-[10px]
          bg-gradient-to-r
          from-[#040a14]/95
          via-[#071426]/78
          to-[#071426]/20
        "
        aria-hidden="true"
      />

      {/* Additional bottom contrast */}
      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-b-[10px]
          bg-gradient-to-t
          from-black/55
          via-transparent
          to-black/10
        "
        aria-hidden="true"
      />

      {/* Soft dark/blue glow behind left text */}
      <div
        className="
          pointer-events-none
          absolute
          -left-48
          top-1/2
          -z-10
          h-[700px]
          w-[700px]
          -translate-y-1/2
          rounded-full
          bg-blue-950/35
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-16
          min-h-[100svh]
          flex
          items-center
        "
      >
        {/* PRO grid: left content + right card */}
        <div
          className="
            w-full
            grid
            grid-cols-1
            md:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]
            lg:grid-cols-[minmax(0,1fr)_minmax(340px,460px)]
            gap-10
            lg:gap-14
            items-center
          "
        >
          {/* =================================================
              LEFT TEXT BLOCK
          ================================================= */}

          <div
            className="
              max-w-2xl
              text-white
              space-y-6
              sm:space-y-8
              animate__animated
              animate__fadeInLeft
            "
          >
            {/* MAIN HEADING */}
            <h1
              className="
                text-3xl
                sm:text-3xl
                md:text-7xl
                font-bold
                leading-tight
                drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]
              "
            >
              <span
                className="
                  bg-gradient-to-br
                  from-[#767675]
                  via-[#efc741]
                  to-[#904e0d]
                  bg-clip-text
                  text-transparent
                  drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)]
                "
              >
                Custom Websites
              </span>{' '}
              &{' '}
              <span
                className="
                  bg-gradient-to-br
                  from-[#767675]
                  via-[#efc741]
                  to-[#904e0d]
                  bg-clip-text
                  text-transparent
                  drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)]
                "
              >
                Scalable Web Platforms
              </span>{' '}
              Built for Growth
            </h1>

            {/* DESCRIPTION */}
            <h2
              className="
                mt-2
                text-lg
                sm:text-xl
                md:text-3xl
                text-white/95
                leading-relaxed
                drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]
              "
            >
              At{' '}
              <span
                className="
                  font-semibold
                  bg-gradient-to-r
                  from-[#debe57]
                  via-[#dad0a0]
                  to-[#eedf7cdb]
                  bg-clip-text
                  text-transparent
                  drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]
                  hover:from-[#cfd5ff]
                  hover:via-[#ffd54a]
                  hover:to-[#b75a14]
                  transition-colors
                "
              >
                UpLadoMyr Digital
              </span>
              , we engineer high-performance web products with clean architecture, secure backend
              systems and reliable delivery. From a polished business website to a complex platform
              — we build production-ready solutions designed to scale.
            </h2>

            {/* =================================================
                CTA
            ================================================= */}

            <Link
              href="/contacts"
              onClick={() =>
                track('Contact', {
                  source: 'home_hero',
                  cta: 'start_a_project',
                  destination: '/contacts',
                })
              }
              className="
                group
                relative
                inline-flex
                items-center
                gap-2
                px-9
                py-4
                border-4
                border-transparent
                text-base
                font-semibold
                rounded-full
                text-white
                bg-blue-900
                shadow-[0_0_0_2px_#c7a23f,0_10px_30px_rgba(0,0,0,0.45)]
                overflow-hidden
                transition-all
                duration-700
                ease-[cubic-bezier(0.23,1,0.32,1)]
                hover:rounded-xl
                hover:shadow-[0_0_0_12px_transparent]
                hover:text-neutral-900
                active:scale-95
                z-20
              "
            >
              {/* Gold hover background */}
              <span
                className="
                  absolute
                  top-1/2
                  left-1/2
                  w-5
                  h-5
                  bg-[#c7a23f]
                  rounded-full
                  opacity-0
                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.23,1,0.32,1)]
                  group-hover:w-[220px]
                  group-hover:h-[220px]
                  group-hover:opacity-100
                  -translate-x-1/2
                  -translate-y-1/2
                "
              />

              {/* Button text */}
              <span
                className="
                  relative
                  z-10
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(0.23,1,0.32,1)]
                  group-hover:translate-x-3
                "
              >
                START A PROJECT
              </span>

              {/* Right arrow */}
              <svg
                className="
                  absolute
                  right-4
                  group-hover:right-[-100px]
                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.23,1,0.32,1)]
                  w-6
                  z-10
                  fill-[#c7a23f]
                  group-hover:fill-neutral-900
                "
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>

              {/* Left arrow */}
              <svg
                className="
                  absolute
                  left-[-50px]
                  group-hover:left-4
                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.23,1,0.32,1)]
                  w-6
                  z-10
                  fill-[#c7a23f]
                  group-hover:fill-neutral-900
                "
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </Link>
          </div>

          {/* =================================================
              RIGHT INFO CARD
          ================================================= */}

          <aside
            className="
              hidden
              md:block
              justify-self-end
              w-full
              max-w-[420px]
              lg:max-w-[460px]
              rounded-2xl
              bg-black/40
              backdrop-blur-xl
              border
              border-white/20
              shadow-[0_20px_60px_rgba(0,0,0,0.50)]
              p-6
              lg:p-7
              animate__animated
              animate__fadeInRight
            "
            aria-label="Quick contact"
          >
            <h2
              className="
                font-tangerine
                text-lg
                lg:text-xl
                leading-relaxed
                text-white
                drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]
                break-words
                hyphens-auto
                max-w-[36ch]
              "
            >
              Serious delivery — from discovery to launch. Clean build, clear communication, no
              shortcuts.
            </h2>

            {/* PHONE */}
            <div className="mt-5 flex items-center gap-3">
              <span
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-white/95
                  text-black
                  shadow
                  border
                  border-yellow-500/80
                  w-10
                  h-10
                  shrink-0
                "
              >
                <FaPhoneAlt className="w-4 h-4" />
              </span>

              <a
                href="tel:+31619388895"
                onClick={() =>
                  track('Contact', {
                    source: 'home_hero_quick_contact',
                    method: 'phone',
                    value: '+31619388895',
                    action: 'click_tel',
                  })
                }
                className="
                  font-bold
                  text-yellow-300
                  text-lg
                  lg:text-xl
                  tracking-wide
                  hover:text-yellow-200
                  transition-colors
                  break-all
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.75)]
                "
                aria-label="Call +31 619 38 88 95"
              >
                +31 619 38 88 95
              </a>
            </div>

            <hr className="mt-5 w-52 border-white/30" />

            <h2
              className="
                mt-4
                text-sm
                text-white/85
                leading-relaxed
                drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]
              "
            >
              Available in NL / EN / UA / HU. Fast turnaround, clean process, predictable delivery.
            </h2>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
