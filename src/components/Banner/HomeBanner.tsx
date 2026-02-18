// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { FaPhoneAlt } from 'react-icons/fa';
// import useWow from '../hooks/useWow';

// const HomeBanner: React.FC = () => {
//   useWow();

//   return (
//     <section
//       id="home-hero"
//       className="
//         relative isolate w-full
//         min-h-[100svh] bg-cover bg-center
//         flex items-center
//         px-4 sm:px-6 lg:px-16
//         rounded-b-[10px]
//         pt-24 md:pt-0
//         pb-28
//       "
//       style={{ backgroundImage: "url('/img/bannerhome/bannerhome.avif')" }}
//       aria-label="UpLadoMyr Digital — Custom Web Platforms"
//     >
//       {/* overlay */}
//       <div className="absolute inset-0 -z-10 bg-black/45 rounded-b-[10px]" />

//       {/* LEFT TEXT BLOCK */}
//       <div className="relative z-10 max-w-2xl text-white space-y-6 sm:space-y-8 animate__animated animate__fadeInLeft">
//         <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold drop-shadow-md leading-tight">
//           <span className="bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
//             Custom Websites
//           </span>{' '}
//           &{' '}
//           <span className="bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
//             Scalable Web Platforms
//           </span>{' '}
//           Built for Growth
//         </h1>

//         <p className="mt-2 text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
//           At{' '}
//           <span
//             className="font-semibold
//               bg-gradient-to-r from-[#debe57] via-[#dad0a0] to-[#eedf7cdb]
//               bg-clip-text text-transparent
//               drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]
//               hover:from-[#cfd5ff] hover:via-[#ffd54a] hover:to-[#b75a14]
//               transition-colors"
//           >
//             UpLadoMyr Digital
//           </span>
//           , we engineer high-performance web products with clean architecture, secure backend
//           systems and reliable delivery. From a polished business website to a complex platform — we
//           build production-ready solutions designed to scale.
//         </p>

//         {/* CTA */}
//         <Link
//           href="/contacts"
//           className="group relative inline-flex items-center gap-2 px-9 py-4 border-4 border-transparent text-base font-semibold rounded-full text-white bg-blue-900 shadow-[0_0_0_2px_#c7a23f] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-xl hover:shadow-[0_0_0_12px_transparent] hover:text-neutral-900 active:scale-95 z-20"
//         >
//           <span className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#c7a23f] rounded-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 -translate-x-1/2 -translate-y-1/2" />
//           <span className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3">
//             START A PROJECT
//           </span>
//           <svg
//             className="absolute right-4 group-hover:right-[-100px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] w-6 z-10 fill-[#c7a23f] group-hover:fill-neutral-900"
//             viewBox="0 0 24 24"
//           >
//             <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
//           </svg>
//           <svg
//             className="absolute left-[-50px] group-hover:left-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] w-6 z-10 fill-[#c7a23f] group-hover:fill-neutral-900"
//             viewBox="0 0 24 24"
//           >
//             <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
//           </svg>
//         </Link>
//       </div>

//       {/* RIGHT INFO CARD */}
//       <aside
//         className="
//           hidden md:block
//           absolute bottom-6
//           right-[max(1rem,calc((100vw-var(--container-w,80rem))/2+1rem))]
//           max-w-lg p-6 sm:p-8
//           rounded-2xl md:rounded-tl-2xl
//           text-white bg-deep/90 backdrop-blur-md shadow-lg z-10
//         "
//         aria-label="Quick contact"
//       >
//         <p className="font-tangerine text-xl sm:text-2xl leading-relaxed text-white/90">
//           Serious delivery — from discovery to launch. Clean build, clear communication, no
//           shortcuts.
//         </p>

//         <p className="font-tangerine mt-4 text-yellow-400 flex items-center gap-2 font-bold text-accent animate__animated animate__pulse animate__infinite text-xl">
//           <FaPhoneAlt className="text-accent bg-white rounded-full p-3 w-12 h-12 shadow-md border border-yellow-500" />
//           +31 619 - 38 - 88 - 95
//         </p>

//         <hr className="mt-4 w-52 border-accent/80" />
//       </aside>
//     </section>
//   );
// };

// export default HomeBanner;

'use client';

import React from 'react';
import Link from 'next/link';
import { FaPhoneAlt } from 'react-icons/fa';
import useWow from '../hooks/useWow';

const HomeBanner: React.FC = () => {
  useWow();

  return (
    <section
      id="home-hero"
      className="
        relative isolate w-full
        min-h-[100svh]
        bg-cover bg-center
        rounded-b-[10px]
        pt-24 md:pt-0
        pb-24
      "
      style={{ backgroundImage: "url('/img/bannerhome/bannerhome.avif')" }}
      aria-label="UpLadoMyr Digital — Custom Web Platforms"
    >
      {/* overlay */}
      <div className="absolute inset-0 -z-10 bg-black/45 rounded-b-[10px]" />

      <div
        className="
          mx-auto max-w-7xl
          px-4 sm:px-6 lg:px-16
          min-h-[100svh]
          flex items-center
        "
      >
        {/* PRO grid: left content + right card */}
        <div
          className="
            w-full
            grid grid-cols-1
            md:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]
            lg:grid-cols-[minmax(0,1fr)_minmax(340px,460px)]
            gap-10 lg:gap-14
            items-center
          "
        >
          {/* LEFT TEXT BLOCK */}
          <div className="max-w-2xl text-white space-y-6 sm:space-y-8 animate__animated animate__fadeInLeft">
            <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold drop-shadow-md leading-tight">
              <span className="bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                Custom Websites
              </span>{' '}
              &{' '}
              <span className="bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                Scalable Web Platforms
              </span>{' '}
              Built for Growth
            </h1>

            <p className="mt-2 text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
              At{' '}
              <span
                className="font-semibold
                  bg-gradient-to-r from-[#debe57] via-[#dad0a0] to-[#eedf7cdb]
                  bg-clip-text text-transparent
                  drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]
                  hover:from-[#cfd5ff] hover:via-[#ffd54a] hover:to-[#b75a14]
                  transition-colors"
              >
                UpLadoMyr Digital
              </span>
              , we engineer high-performance web products with clean architecture, secure backend
              systems and reliable delivery. From a polished business website to a complex platform
              — we build production-ready solutions designed to scale.
            </p>

            {/* CTA */}
            <Link
              href="/contacts"
              className="group relative inline-flex items-center gap-2 px-9 py-4 border-4 border-transparent text-base font-semibold rounded-full text-white bg-blue-900 shadow-[0_0_0_2px_#c7a23f] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-xl hover:shadow-[0_0_0_12px_transparent] hover:text-neutral-900 active:scale-95 z-20"
            >
              <span className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#c7a23f] rounded-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 -translate-x-1/2 -translate-y-1/2" />
              <span className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3">
                START A PROJECT
              </span>

              <svg
                className="absolute right-4 group-hover:right-[-100px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] w-6 z-10 fill-[#c7a23f] group-hover:fill-neutral-900"
                viewBox="0 0 24 24"
              >
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>

              <svg
                className="absolute left-[-50px] group-hover:left-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] w-6 z-10 fill-[#c7a23f] group-hover:fill-neutral-900"
                viewBox="0 0 24 24"
              >
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </Link>
          </div>

          {/* RIGHT INFO CARD (PRO, НЕ РОЗДУВАЄТЬСЯ ВІД МОВИ) */}
          <aside
            className="
              hidden md:block
              justify-self-end
              w-full
              max-w-[420px] lg:max-w-[460px]
              rounded-2xl
              bg-white/10
              backdrop-blur-xl
              border border-white/15
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              p-6 lg:p-7
              animate__animated animate__fadeInRight
            "
            aria-label="Quick contact"
          >
            <p
              className="
                font-tangerine
                text-lg lg:text-xl
                leading-relaxed
                text-white/90
                break-words
                hyphens-auto
                max-w-[36ch]
              "
            >
              Serious delivery — from discovery to launch. Clean build, clear communication, no
              shortcuts.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-white/95 text-black shadow border border-yellow-500/80 w-10 h-10">
                <FaPhoneAlt className="w-4 h-4" />
              </span>

              <a
                href="tel:+31619388895"
                className="
                  font-bold
                  text-yellow-300
                  text-lg lg:text-xl
                  tracking-wide
                  hover:text-yellow-200
                  transition-colors
                  break-all
                "
                aria-label="Call +31 619 38 88 95"
              >
                +31 619 38 88 95
              </a>
            </div>

            <hr className="mt-5 w-52 border-white/25" />

            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Available in NL / EN / UA / HU. Fast turnaround, clean process, predictable delivery.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
