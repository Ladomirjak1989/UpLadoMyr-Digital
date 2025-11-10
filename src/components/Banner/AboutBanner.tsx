'use client';

import Image from 'next/image';

const AboutBanner = () => {
  return (
    <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-b-[40px]">
      <Image
        src="/img/bannerabout/about-banner.webp"
        alt="About Us Banner"
        fill
        className="object-cover w-full h-full"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex items-end justify-end p-1 sm:p-12">
        <div className="text-right px-4 mb-32 max-w-xl">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-2">
            Who We Are
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg font-light italic">
            A forward-thinking web development company dedicated to building performant, hand-coded
            websites — no templates, no shortcuts, just clean code and creative solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
