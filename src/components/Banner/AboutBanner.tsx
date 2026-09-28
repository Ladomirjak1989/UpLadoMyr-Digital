'use client';

import Image from 'next/image';
import Link from 'next/link';

const AboutBanner = () => {
  return (
    <section
      className="
        relative
        isolate
        w-full
        min-h-[520px]
        sm:min-h-[580px]
        lg:min-h-[650px]
        overflow-hidden
        rounded-b-[32px]
        sm:rounded-b-[40px]
        bg-blue-950
      "
      aria-labelledby="about-page-title"
    >
      {/* ================= BACKGROUND IMAGE ================= */}

      <Image
        src="/img/bannerabout/about-banner.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* ================= OVERLAYS ================= */}

      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-blue-950/45" aria-hidden="true" />

      {/* Directional overlay for text readability */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#071426]/95
          via-[#071426]/75
          to-[#071426]/20
        "
        aria-hidden="true"
      />

      {/* Bottom depth */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#071426]/80
          via-transparent
          to-[#071426]/15
        "
        aria-hidden="true"
      />

      {/* Gold decorative glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-1/2
          h-[360px]
          w-[360px]
          -translate-y-1/2
          rounded-full
          bg-amber-400/10
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* ================= CONTENT ================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[520px]
          max-w-7xl
          items-center
          px-5
          py-20
          sm:min-h-[580px]
          sm:px-8
          lg:min-h-[650px]
          lg:px-12
        "
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-9 bg-amber-400" />

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-amber-300
              "
            >
              Who We Are
            </p>
          </div>

          {/* Main SEO heading */}
          <h1
            id="about-page-title"
            className="
              mt-5
              max-w-3xl
              text-4xl
              font-bold
              leading-[1.08]
              tracking-tight
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-[4rem]
            "
          >
            A Web Development Company{' '}
            <span
              className="
                bg-gradient-to-r
                from-[#d89b2a]
                via-[#f0cb58]
                to-[#c07a18]
                bg-clip-text
                text-transparent
              "
            >
              Focused on Your Digital Goals
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-6
              max-w-2xl
              text-base
              leading-8
              text-white/70
              sm:text-lg
            "
          >
            UpLadoMyr Digital creates professional websites, web applications, e-commerce solutions,
            MVPs, SaaS platforms, and custom digital products tailored to real business
            requirements.
          </p>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-7
              text-white/55
              sm:text-base
            "
          >
            From efficient template-based websites to fully custom development, the approach is
            selected according to your project, functionality, timeline, and budget — without
            forcing every business into the same solution.
          </p>

          {/* ================= TRUST POINTS ================= */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              gap-x-6
              gap-y-3
            "
          >
            {['Custom Development', 'Flexible Solutions', 'Clear Communication'].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  text-white/70
                  sm:text-sm
                "
              >
                <span
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-amber-400/10
                    text-[10px]
                    font-bold
                    text-amber-300
                    ring-1
                    ring-amber-300/20
                  "
                >
                  ✓
                </span>

                {item}
              </div>
            ))}
          </div>

          {/* ================= CTA ================= */}

          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
            "
          >
            <Link
              href="/contacts"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-amber-950
                bg-gradient-to-br
                from-blue-950
                via-blue-900
                to-blue-800
                px-7
                py-3.5
                text-sm
                font-extrabold
                text-amber-400
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:from-[#767675]
                hover:via-[#efc741]
                hover:to-[#904e0d]
                hover:text-blue-950
                hover:shadow-xl
              "
            >
              Discuss Your Project
              <span
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>

            <Link
              href="/projects"
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-white/15
                bg-white/[0.05]
                px-7
                py-3.5
                text-sm
                font-bold
                text-white/80
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-amber-300/30
                hover:bg-white/[0.1]
                hover:text-white
              "
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ACCENT ================= */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-full
          bg-gradient-to-r
          from-transparent
          via-amber-400/60
          to-transparent
        "
        aria-hidden="true"
      />
    </section>
  );
};

export default AboutBanner;
