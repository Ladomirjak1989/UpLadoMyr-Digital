import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';

function FounderBanner() {
  return (
    <section
      className="py-16 sm:py-20"
      style={{
        backgroundColor: '#0b1433',
        backgroundImage: `
          radial-gradient(900px circle at 20% 25%, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 60%),
          radial-gradient(750px circle at 85% 30%, rgba(168,85,247,0.16) 0%, rgba(168,85,247,0) 55%),
          radial-gradient(800px circle at 55% 95%, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0) 60%),
          linear-gradient(135deg, #0b1433 0%, #1d2a6a 45%, #082142 100%)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
        {/* LEFT: Photo */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15">
              <Image
                src="/img/bannerfounder/Bettina.jpg"
                alt="Bettina — Founder of UpLadoMyr Digital"
                fill
                priority
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 440px"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="text-center lg:text-left">
          {/* Name + role at the very top */}
          <div className="mb-6 text-center lg:text-left">
            {/* Name (stronger gradient) */}
            <p
              className="text-lg sm:text-xl font-semibold tracking-wide
               bg-gradient-to-br from-[#efc741] via-[#d89b2a] to-[#904e0d]
               bg-clip-text text-transparent
               drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
            >
              Bettina Ladomirjak
            </p>

            {/* Role (softer / more premium) */}
            <p
              className="mt-1 text-sm sm:text-base font-medium
               bg-gradient-to-br from-white/70 via-amber-200/70 to-white/60
               bg-clip-text text-transparent
               opacity-90"
            >
              Full-Stack Developer & Founder of UpLadoMyr Digital
            </p>

            {/* Premium divider line */}
            <span
              className="mt-4 block h-px w-44 sm:w-56 mx-auto lg:mx-0
               bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"
              aria-hidden="true"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
            I build digital products that help businesses grow — from idea to launch, with clarity
            and purpose.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Clean code, smart design, and solutions that actually work. From websites to full web
            applications, I help businesses turn ideas into results.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center lg:items-start gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/contacts"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full
                           bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500
                           text-slate-900 font-semibold shadow-lg
                           hover:brightness-110 transition active:scale-95"
                aria-label="Work with me - go to contact page"
              >
                Work with me
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              <a
                href="tel:+31619388895"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full
                           bg-white/10 backdrop-blur border border-white/15
                           text-white/90 shadow-sm
                           hover:bg-white/14 hover:border-white/25 transition active:scale-[0.99]"
                aria-label="Call +31 6 19 38 88 95"
              >
                <PhoneCall className="h-4 w-4 text-white/85" aria-hidden="true" />
                <span className="text-sm sm:text-[15px] font-semibold tracking-wide">
                  +31 6 19 38 88 95
                </span>
              </a>
            </div>

            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2
                         bg-white/8 backdrop-blur border border-white/12
                         text-white/80 text-xs sm:text-sm"
            >
              <span className="font-medium">Free quick call</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">No obligation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderBanner;
