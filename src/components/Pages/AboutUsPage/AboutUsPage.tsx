'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaLightbulb,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiPostgresql,
} from 'react-icons/si';
import Link from 'next/link';
import FounderBanner from '@/components/Banner/FounderBanner';

/* ✅✅✅ ADDED START */
import { track } from '@/lib/pixel';
/* ✅✅✅ ADDED END */

const techItems = [
  { icon: <FaHtml5 size={40} color="#E44D26" />, name: 'HTML' },
  { icon: <FaCss3Alt size={40} color="#1572B6" />, name: 'CSS' },
  { icon: <SiJavascript size={40} color="#F7DF1E" />, name: 'JavaScript' },
  { icon: <SiTypescript size={40} color="#3178C6" />, name: 'TypeScript' },
  { icon: <FaReact size={40} color="#61DAFB" />, name: 'React' },
  { icon: <SiRedux size={40} color="#764ABC" />, name: 'Redux Toolkit' },
  { icon: <SiTailwindcss size={40} color="#38BDF8" />, name: 'Tailwind CSS' },
  { icon: <FaNodeJs size={40} color="#68A063" />, name: 'Node.js' },
  { icon: <SiMongodb size={40} color="#47A248" />, name: 'MongoDB' },
  { icon: <SiMysql size={40} color="#00758F" />, name: 'MySQL' },
  { icon: <SiPostgresql size={40} color="#336791" />, name: 'PostgreSQL' },
  { icon: <FaGitAlt size={40} color="#F05032" />, name: 'GitLab' },
  { icon: <FaGithub size={40} color="#181717" />, name: 'GitHub' },
];

const AboutPage: React.FC = () => {
  return (
    <div className=" text-gray-800 px-4 py-10 max-w-6xl mx-auto">
      <FounderBanner />

      {/* Hero Section */}
      <section
        className="
    relative
    overflow-hidden
    mt-1
    mb-16
    rounded-[12px]
    border
    border-amber-200/60
    bg-gradient-to-br
    from-white
    via-blue-50/60
    to-amber-50
    px-5
    sm:px-8
    lg:px-12
    py-10
    sm:py-14
    lg:py-16
    shadow-[0_20px_60px_rgba(15,23,42,0.08)]
  "
      >
        {/* Decorative background */}
        <div
          className="
      pointer-events-none
      absolute
      -top-32
      -right-32
      h-80
      w-80
      rounded-full
      bg-amber-300/20
      blur-3xl
    "
          aria-hidden="true"
        />

        <div
          className="
      pointer-events-none
      absolute
      -bottom-32
      -left-32
      h-80
      w-80
      rounded-full
      bg-blue-900/10
      blur-3xl
    "
          aria-hidden="true"
        />

        <div className="relative z-10 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <div data-aos="fade-right">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-9 bg-amber-500" />

              <p
                className="
            text-xs
            sm:text-sm
            font-bold
            uppercase
            tracking-[0.18em]
            text-amber-700
          "
              >
                Custom Web Development
              </p>
            </div>

            {/* Main H1 */}
            <h1
              className="
          max-w-3xl
          text-3xl
          sm:text-4xl
          lg:text-5xl
          xl:text-[3.4rem]
          font-bold
          leading-[1.08]
          tracking-tight
          text-blue-950
        "
            >
              Modern Websites & Web Applications Built for Your Business
            </h1>

            {/* Main description */}
            <p
              className="
          mt-6
          max-w-2xl
          text-base
          sm:text-lg
          leading-8
          text-slate-700
        "
            >
              UpLadoMyr Digital designs and develops modern websites, custom web applications,
              e-commerce solutions, SaaS platforms, MVPs, and digital business systems for companies
              that need more than just an online presence.
            </p>

            <p
              className="
          mt-4
          max-w-2xl
          text-base
          leading-7
          text-slate-600
        "
            >
              We combine thoughtful design with reliable development to create fast, secure,
              responsive, and scalable digital solutions tailored to your business goals, customers,
              and day-to-day operations.
            </p>

            {/* Worldwide */}
            <div
              className="
          mt-7
          flex
          items-start
          gap-4
          rounded-2xl
          border
          border-amber-200
          bg-white/70
          px-5
          py-4
          shadow-sm
          backdrop-blur-sm
        "
            >
              <div
                className="
            mt-0.5
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-blue-950
            text-amber-400
          "
                aria-hidden="true"
              >
                🌍
              </div>

              <div>
                <h2 className="text-sm sm:text-base font-bold text-blue-950">
                  Working with clients worldwide
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We collaborate remotely with startups, entrepreneurs, small businesses, and
                  established companies across the United States, Europe, and worldwide.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div
              className="
          mt-7
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-x-7
          gap-y-3
        "
            >
              {[
                'Custom-built solutions',
                'Responsive & mobile-first',
                'Performance & security',
                'Scalable architecture',
              ].map((item) => (
                <div
                  key={item}
                  className="
              flex
              items-center
              gap-3
              text-sm
              font-semibold
              text-slate-700
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
                bg-blue-950
                text-[10px]
                font-bold
                text-amber-400
              "
                  >
                    ✓
                  </span>

                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/contacts"
              onClick={() =>
                track('Contact', {
                  source: 'about_page',
                  cta: 'lets_work_together',
                  page: 'About',
                })
              }
              className="
          mt-8
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
          shadow-[0_0_0_2px_#c7a23f]
          overflow-hidden
          transition-all
          duration-700
          ease-[cubic-bezier(0.23,1,0.32,1)]
          hover:rounded-xl
          hover:shadow-[0_0_0_12px_transparent]
          hover:text-neutral-900
          active:scale-95
        "
            >
              {/* Circle animation */}
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
            group-hover:w-[240px]
            group-hover:h-[240px]
            group-hover:opacity-100
            transform
            -translate-x-1/2
            -translate-y-1/2
          "
              />

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
                Let’s Work Together
              </span>

              {/* Arrow out */}
              <svg
                className="
            absolute
            right-4
            w-6
            z-10
            fill-[#c7a23f]
            transition-all
            duration-700
            ease-[cubic-bezier(0.23,1,0.32,1)]
            group-hover:right-[-25%]
            group-hover:fill-neutral-900
          "
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>

              {/* Arrow in */}
              <svg
                className="
            absolute
            left-[-25%]
            w-6
            z-10
            fill-[#c7a23f]
            transition-all
            duration-700
            ease-[cubic-bezier(0.23,1,0.32,1)]
            group-hover:left-4
            group-hover:fill-neutral-900
          "
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </Link>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div data-aos="fade-left" className="relative">
            {/* Image glow */}
            <div
              className="
          absolute
          -inset-4
          rounded-[32px]
          bg-gradient-to-br
          from-amber-300/30
          via-transparent
          to-blue-900/20
          blur-2xl
        "
              aria-hidden="true"
            />

            <div
              className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-amber-200/70
          bg-white
          p-2
          shadow-[0_24px_60px_rgba(15,23,42,0.16)]
        "
            >
              <Image
                src="/img/bannerabout/about-img.avif"
                alt="Custom website and web application development by UpLadoMyr Digital"
                width={700}
                height={560}
                priority
                className="
            w-full
            min-h-[360px]
            lg:min-h-[480px]
            object-cover
            rounded-[22px]
          "
              />
            </div>

            {/* Small floating card */}
            <div
              className="
          absolute
          -bottom-5
          left-5
          sm:left-8
          max-w-[280px]
          rounded-2xl
          border
          border-amber-200
          bg-white/95
          px-5
          py-4
          shadow-xl
          backdrop-blur-md
        "
            >
              <p
                className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-amber-700
          "
              >
                Built for growth
              </p>

              <p className="mt-1 text-sm font-bold leading-5 text-blue-950">
                Digital solutions designed around your business — not the other way around.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 rounded-2xl shadow-sm  bg-gradient-to-br from-[#93b7e6] via-[#dcdedf] to-[#797a7c]  text-white">
        <h2
          className="text-center text-3xl font-tangerine font-bold text-yellow-600 mb-8"
          data-aos="fade-up"
        >
          Tech Stack
        </h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          spaceBetween={20}
          loop={true}
          slidesPerView={2}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="px-6"
        >
          {techItems.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div
                data-aos="fade-left"
                data-aos-duration="1200"
                data-aos-easing="ease-in-out"
                className="flex flex-col items-center justify-center bg-[#444] rounded-md p-6 h-32 w-full hover:bg-[#666] transition"
              >
                <div className="mb-2">{item.icon}</div>
                <p className="text-sm">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/*Mission & Vision*/}
      <section
        className="
    relative
    mt-16
    max-w-7xl
    mx-auto
    overflow-hidden
    rounded-[12px]
    border
    border-blue-100
    bg-gradient-to-br
    from-blue-50
    via-white
    to-amber-50
    px-5
    sm:px-8
    lg:px-12
    py-10
    sm:py-14
    lg:py-16
    shadow-[0_20px_60px_rgba(15,23,42,0.08)]
  "
        data-aos="fade-up"
      >
        {/* Decorative background */}
        <div
          className="
      pointer-events-none
      absolute
      -top-28
      -left-28
      h-72
      w-72
      rounded-full
      bg-blue-900/10
      blur-3xl
    "
          aria-hidden="true"
        />

        <div
          className="
      pointer-events-none
      absolute
      -bottom-28
      -right-28
      h-72
      w-72
      rounded-full
      bg-amber-300/20
      blur-3xl
    "
          aria-hidden="true"
        />

        <div
          className="
      relative
      z-10
      grid
      grid-cols-1
      md:grid-cols-2
      gap-10
      lg:gap-16
      items-center
    "
        >
          {/* ================= IMAGE + PROCESS ================= */}
          <div data-aos="zoom-in">
            <div
              className="
          relative
          overflow-hidden
          rounded-[26px]
          border
          border-amber-200/70
          bg-white
          p-2
          shadow-[0_20px_50px_rgba(15,23,42,0.12)]
        "
            >
              <Image
                src="/img/bannerabout/aboutpage-prototip.jpg"
                alt="Website and web application design and development process"
                width={1000}
                height={600}
                className="
            w-full
            rounded-[20px]
            object-cover
          "
              />
            </div>

            {/* PROCESS */}
            <div className="mt-7">
              <p
                className="
            mb-4
            text-xs
            font-bold
            uppercase
            tracking-[0.16em]
            text-amber-700
          "
              >
                From Idea to Launch
              </p>

              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {[
                  ['01', 'Discovery'],
                  ['02', 'Strategy'],
                  ['03', 'Design'],
                  ['04', 'Development'],
                ].map(([number, label]) => (
                  <div key={number} className="relative text-center">
                    <div
                      className="
                  mx-auto
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-blue-950
                  via-blue-900
                  to-blue-800
                  text-[11px]
                  font-bold
                  text-amber-400
                  shadow-md
                "
                    >
                      {number}
                    </div>

                    <p
                      className="
                  mt-2
                  text-[11px]
                  sm:text-sm
                  font-semibold
                  text-slate-700
                "
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Progress line */}
              <div
                className="
            mt-4
            h-[3px]
            w-full
            rounded-full
            bg-gradient-to-r
            from-blue-950
            via-amber-400
            to-amber-700
          "
              />
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div data-aos="fade-left" data-aos-delay="200">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-9 bg-amber-500" />

              <p
                className="
            text-xs
            sm:text-sm
            font-bold
            uppercase
            tracking-[0.18em]
            text-amber-700
          "
              >
                Mission & Vision
              </p>
            </div>

            <h2
              className="
          text-2xl
          sm:text-3xl
          lg:text-4xl
          font-bold
          leading-tight
          tracking-tight
          text-blue-950
        "
            >
              Turning Business Ideas Into Reliable Digital Solutions
            </h2>

            <p
              className="
          mt-5
          text-base
          sm:text-lg
          leading-8
          text-slate-700
        "
            >
              Our mission is to help startups, entrepreneurs, small businesses, and established
              companies transform their ideas into professional digital products that solve real
              business challenges and create long-term value.
            </p>

            <p
              className="
          mt-4
          text-base
          leading-7
          text-slate-600
        "
            >
              We develop custom websites, web applications, e-commerce solutions, SaaS platforms,
              MVPs, and business systems with a strong focus on performance, security, usability,
              responsive design, and scalable architecture.
            </p>

            {/* Mission / Vision cards */}
            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              {/* Mission */}
              <div
                className="
            rounded-2xl
            border
            border-amber-200
            bg-white/80
            p-5
            shadow-sm
            backdrop-blur-sm
          "
              >
                <div
                  className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-amber-50
              text-sm
              font-extrabold
              text-amber-700
              border
              border-amber-200
            "
                >
                  01
                </div>

                <h3 className="mt-4 text-base font-bold text-blue-950">Our Mission</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Build dependable digital solutions tailored to each client’s goals, customers, and
                  business requirements.
                </p>
              </div>

              {/* Vision */}
              <div
                className="
            rounded-2xl
            border
            border-blue-100
            bg-white/80
            p-5
            shadow-sm
            backdrop-blur-sm
          "
              >
                <div
                  className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-blue-950
              text-sm
              font-extrabold
              text-amber-400
            "
                >
                  02
                </div>

                <h3 className="mt-4 text-base font-bold text-blue-950">Our Vision</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Create digital products that can evolve with the business instead of becoming a
                  limitation as the company grows.
                </p>
              </div>
            </div>

            {/* Worldwide */}
            <div
              className="
          mt-6
          border-l-4
          border-amber-500
          rounded-r-xl
          bg-gradient-to-r
          from-amber-50
          via-white/70
          to-transparent
          px-5
          py-4
        "
            >
              <p className="text-sm sm:text-base font-semibold leading-7 text-slate-800">
                We work remotely with clients worldwide, combining clear communication, structured
                development, and flexible collaboration regardless of location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mt-16" data-aos="fade-up ">
        <h2 className="text-3xl font-tangerine font-bold text-yellow-600 mb-4 text-center">
          Core Values
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
          {[
            'Quality Code',
            'Transparency',
            'Client Focus',
            'Innovation',
            'Simplicity',
            'Collaboration',
          ].map((value, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border-b-2 border-blue-900 bg-blue-50 shadow-md hover:shadow-lg hover:scale-[1.02] transition"
            >
              <p className="font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section
        className=" 
    mt-20
    max-w-7xl
    mx-auto
    px-4
    sm:px-8
    lg:px-12
    pt-12
    sm:pt-16
    lg:pt-20
    relative
    overflow-hidden
    rounded-[12px]
    border
    border-amber-200/60
    bg-gradient-to-br
    from-white
    via-blue-50/70
    to-amber-50
    shadow-[0_20px_60px_rgba(15,23,42,0.08)]
    pb-[84px]
    sm:pb-[96px]
    md:pb-[110px]
  "
        data-aos="fade-up"
      >
        {/* CONTENT */}
        <div className="relative z-10 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* IMAGE */}
          <div className="relative" data-aos="zoom-in">
            <div
              className="
          absolute
          -inset-3
          rounded-2xl
          bg-gradient-to-br
          from-amber-200/40
          via-transparent
          to-blue-950/10
          blur-xl
        "
              aria-hidden="true"
            />

            <div
              className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-amber-200/60
          shadow-xl
        "
            >
              <Image
                src="/img/bannerabout/web-design.avif"
                alt="Custom website and web application development process at UpLadoMyr Digital"
                width={600}
                height={400}
                className="
            w-full
            object-cover
            transition-transform
            duration-700
            hover:scale-[1.03]
          "
              />
            </div>
          </div>

          {/* CONTENT */}
          <div data-aos="fade-left" className="flex flex-col justify-center">
            {/* EYEBROW */}
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div
                className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-amber-300
            bg-amber-50
            text-xl
            text-amber-700
            shadow-sm
          "
              >
                <FaLightbulb />
              </div>

              <p
                className="
            text-xs
            sm:text-sm
            font-bold
            uppercase
            tracking-[0.18em]
            text-amber-700
          "
              >
                Our Development Approach
              </p>
            </div>

            {/* SEO HEADING */}
            <h2
              className="
          text-2xl
          sm:text-3xl
          lg:text-4xl
          font-bold
          leading-tight
          tracking-tight
          text-blue-950
          text-center
          md:text-left
        "
            >
              Custom Web Development Built Around Your Business
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
          mt-5
          text-base
          sm:text-lg
          leading-8
          text-slate-700
          text-center
          md:text-left
        "
            >
              Every website and web application we develop starts with your business goals, target
              audience, and technical requirements. Instead of forcing your project into a
              one-size-fits-all solution, we choose the right development approach for your specific
              needs.
            </p>

            <p
              className="
          mt-4
          text-base
          leading-7
          text-slate-600
          text-center
          md:text-left
        "
            >
              From custom business websites and e-commerce solutions to SaaS platforms, MVPs, and
              complex web applications, we focus on clean architecture, responsive design,
              performance, usability, and long-term scalability.
            </p>

            {/* HIGHLIGHTS */}
            <div
              className="
          mt-7
          grid
          sm:grid-cols-2
          gap-x-6
          gap-y-3
        "
            >
              {[
                'Business-focused development',
                'Mobile-first experience',
                'Performance & scalability',
                'Custom functionality',
              ].map((item) => (
                <div
                  key={item}
                  className="
              flex
              items-center
              gap-3
              text-sm
              font-semibold
              text-slate-700
            "
                >
                  <span
                    className="
                h-2
                w-2
                shrink-0
                rounded-full
                bg-amber-500
              "
                  />

                  {item}
                </div>
              ))}
            </div>

            {/* FINAL MESSAGE */}
            <div
              className="
          mt-7
          border-l-4
          border-amber-500
          bg-gradient-to-r
          from-amber-50
          to-transparent
          px-5
          py-4
          rounded-r-xl
        "
            >
              <p className="text-sm sm:text-base leading-7 font-medium text-slate-800">
                The result is a digital product designed not only to look professional, but to
                support your business today and remain ready for future growth.
              </p>
            </div>
          </div>
        </div>

        {/* WAVE */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden sm:block">
          <svg
            viewBox="0 0 1440 100"
            className="w-full h-[56px] md:h-[70px]"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path fill="#f3f4f6" d="M0,0 C360,100 1080,0 1440,100 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
