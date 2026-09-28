import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Globe2, PhoneCall } from 'lucide-react';

function FounderBanner() {
  const highlights = [
    'Custom websites & web applications',
    'SaaS & MVP development',
    'E-commerce & business systems',
    'Worldwide remote collaboration',
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        py-16
        sm:py-20
        lg:py-24
      "
      style={{
        backgroundColor: '#081b33',
        backgroundImage: `
          radial-gradient(
            900px circle at 15% 20%,
            rgba(30,58,138,0.55) 0%,
            rgba(30,58,138,0) 60%
          ),
          radial-gradient(
            750px circle at 90% 20%,
            rgba(214,166,79,0.15) 0%,
            rgba(214,166,79,0) 58%
          ),
          radial-gradient(
            850px circle at 60% 100%,
            rgba(37,99,235,0.16) 0%,
            rgba(37,99,235,0) 60%
          ),
          linear-gradient(
            135deg,
            #081b33 0%,
            #102a56 48%,
            #071426 100%
          )
        `,
      }}
    >
      {/* Decorative glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -right-40
          h-96
          w-96
          rounded-full
          bg-amber-400/10
          blur-3xl
        "
        aria-hidden="true"
      />

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          grid
          grid-cols-1
          lg:grid-cols-[0.85fr_1.15fr]
          gap-12
          lg:gap-16
          items-center
        "
      >
        {/* ================= PHOTO ================= */}
        <div className="flex justify-center lg:justify-start">
          <div
            className="
              relative
              w-full
              max-w-[340px]
              sm:max-w-[390px]
              lg:max-w-[440px]
            "
          >
            {/* Gold glow behind image */}
            <div
              className="
                absolute
                -inset-4
                rounded-[34px]
                bg-gradient-to-br
                from-amber-300/25
                via-transparent
                to-blue-400/20
                blur-2xl
              "
              aria-hidden="true"
            />

            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                rounded-[30px]
                border
                border-amber-300/30
                bg-white/5
                p-[5px]
                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
              "
            >
              <div className="relative h-full w-full overflow-hidden rounded-[25px]">
                <Image
                  src="/img/bannerfounder/Bettina.jpg"
                  alt="Bettina Ladomirjak, Full-Stack Developer and Founder of UpLadoMyr Digital"
                  fill
                  priority
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 390px, 440px"
                  className="object-cover object-center"
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#081b33]/45
                    via-transparent
                    to-transparent
                  "
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Floating experience card */}
            <div
              className="
                absolute
                -bottom-5
                left-1/2
                w-[88%]
                -translate-x-1/2
                rounded-2xl
                border
                border-white/10
                bg-[#0b1e38]/90
                px-5
                py-4
                shadow-2xl
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-amber-300/30
                    bg-amber-400/10
                    text-amber-300
                  "
                >
                  <Globe2 className="h-5 w-5" />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      sm:text-xs
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-amber-300
                    "
                  >
                    Worldwide
                  </p>

                  <p className="mt-0.5 text-xs sm:text-sm font-medium text-white/80">
                    Working with clients across borders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="pt-4 text-center lg:text-left">
          {/* Founder label */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <span
              className="
                hidden
                sm:block
                h-px
                w-8
                bg-amber-400
              "
            />

            <p
              className="
                text-xs
                sm:text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-amber-300
              "
            >
              Meet the Founder
            </p>
          </div>

          {/* Name */}
          <p
            className="
              mt-5
              text-lg
              sm:text-xl
              font-bold
              bg-gradient-to-r
              from-[#efc741]
              via-[#d89b2a]
              to-[#b86d18]
              bg-clip-text
              text-transparent
            "
          >
            Bettina Ladomirjak
          </p>

          <p
            className="
              mt-1
              text-sm
              sm:text-base
              font-medium
              text-white/65
            "
          >
            Full-Stack Developer & Founder of UpLadoMyr Digital
          </p>

          {/* H2 */}
          <h2
            className="
              mt-6
              max-w-3xl
              text-2xl
              sm:text-3xl
              lg:text-4xl
              xl:text-[2.75rem]
              font-bold
              leading-[1.12]
              tracking-tight
              text-white
              mx-auto
              lg:mx-0
            "
          >
            Building Digital Products That Turn Business Ideas Into Real Solutions
          </h2>

          {/* Description */}
          <p
            className="
              mt-6
              max-w-2xl
              mx-auto
              lg:mx-0
              text-base
              sm:text-lg
              leading-8
              text-white/75
            "
          >
            I help entrepreneurs, startups, small businesses, and established companies transform
            ideas into professional digital products — from modern business websites and e-commerce
            solutions to custom web applications, SaaS platforms, MVPs, and internal business
            systems.
          </p>

          <p
            className="
              mt-4
              max-w-2xl
              mx-auto
              lg:mx-0
              text-sm
              sm:text-base
              leading-7
              text-white/60
            "
          >
            Every project combines thoughtful design, clean development, performance, security, and
            scalable architecture. The goal is not simply to launch a website or application, but to
            build a solution that supports your business now and can continue evolving as it grows.
          </p>

          {/* Highlights */}
          <div
            className="
              mt-7
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-x-7
              gap-y-3
              max-w-2xl
              mx-auto
              lg:mx-0
            "
          >
            {highlights.map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  justify-center
                  lg:justify-start
                  gap-3
                  text-sm
                  font-medium
                  text-white/80
                "
              >
                <span
                  className="
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-amber-400/15
                    text-amber-300
                    ring-1
                    ring-amber-300/25
                  "
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>

                {item}
              </div>
            ))}
          </div>

          {/* Worldwide message */}
          <div
            className="
              mt-7
              max-w-2xl
              mx-auto
              lg:mx-0
              rounded-2xl
              border
              border-white/10
              bg-white/[0.06]
              px-5
              py-4
              backdrop-blur-sm
            "
          >
            <p className="text-sm sm:text-base leading-7 text-white/75">
              <span className="font-semibold text-amber-300">
                Your location is not a limitation.
              </span>{' '}
              UpLadoMyr Digital works remotely with clients worldwide, with a structured process for
              communication, development, feedback, and project delivery.
            </p>
          </div>

          {/* ================= CTAs ================= */}
          <div
            className="
              mt-8
              flex
              flex-col
              items-center
              lg:items-start
              gap-4
            "
          >
            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                gap-3
              "
            >
              {/* Primary CTA */}
              <Link
                href="/contacts"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-amber-950
                  bg-gradient-to-br
                  from-[#767675]
                  via-[#efc741]
                  to-[#904e0d]
                  px-7
                  py-3.5
                  text-sm
                  font-extrabold
                  text-blue-950
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:brightness-110
                  hover:shadow-xl
                  active:scale-[0.98]
                "
                aria-label="Start a project with UpLadoMyr Digital"
              >
                Start Your Project
                <ArrowRight
                  className="
                    h-5
                    w-5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  aria-hidden="true"
                />
              </Link>

              {/* Phone */}
              <a
                href="tel:+31619388895"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-amber-300/25
                  bg-white/[0.07]
                  px-6
                  py-3.5
                  text-white
                  shadow-sm
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-amber-300/50
                  hover:bg-white/[0.12]
                  active:scale-[0.98]
                "
                aria-label="Call UpLadoMyr Digital at +31 6 19 38 88 95"
              >
                <PhoneCall className="h-4 w-4 text-amber-300" aria-hidden="true" />

                <span className="text-sm font-semibold tracking-wide">+31 6 19 38 88 95</span>
              </a>
            </div>

            {/* Call note */}
            <div
              className="
                inline-flex
                flex-wrap
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.05]
                px-4
                py-2
                text-xs
                sm:text-sm
                text-white/65
              "
            >
              <span className="font-semibold text-white/80">Free quick call</span>

              <span className="text-amber-300/60">•</span>

              <span>No obligation</span>

              <span className="text-amber-300/60">•</span>

              <span>Worldwide projects welcome</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderBanner;
