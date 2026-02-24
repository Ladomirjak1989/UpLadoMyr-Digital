'use client';

import NextLink from 'next/link';
import Image from 'next/image';

const LandingBanner = () => {
  return (
    <section
      className="
        relative w-full 
        min-h-[75vh] sm:min-h-[85vh]
        overflow-hidden
        bg-white
        rounded-b-[40px] sm:rounded-b-[60px]
      "
    >
      {/* ===== DESKTOP IMAGE ===== */}
      <div className="hidden sm:block">
        <Image
          src="/img/bannerlandingpage/landing-photo1.png"
          alt="Landing Banner Desktop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ===== MOBILE IMAGE ===== */}
      <div className="block sm:hidden">
        <Image
          src="/img/bannerlandingpage/landing-mob.png"
          alt="Landing Banner Mobile"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 min-h-[75vh] sm:min-h-[85vh]">
        <div
          className="
            max-w-7xl mx-auto 
            px-6 sm:px-10 lg:px-16 
            w-full
            min-h-[75vh] sm:min-h-[85vh]
            flex items-start sm:items-center
            pt-14 sm:pt-0
          "
        >
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            <div className="hidden lg:block w-1/2" />

            <div className="w-full lg:w-1/2 text-center lg:text-right">
              <p className="text-xs sm:text-base uppercase tracking-widest text-white/85 font-semibold">
                PREMIUM WEB DEVELOPMENT
              </p>

              <h1 className="mt-3 sm:mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl leading-tight">
                Grow your business.
                <br />
                Let’s do it together.
              </h1>

              <div className="mt-6 sm:mt-8 flex justify-center lg:justify-end">
                <NextLink
                  href="/contacts"
                  className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-br from-[#5a5a5a] via-[#ffd659] to-[#8c4a12] text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  Start a Project
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingBanner;
