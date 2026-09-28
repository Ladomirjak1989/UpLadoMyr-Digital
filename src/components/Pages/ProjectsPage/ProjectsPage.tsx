'use client';

import React, { useEffect, useMemo, useCallback, useState } from 'react';
import Image from 'next/image';
import ProjectList from '../../ProjectList/ProjectList';
import { FiTrendingUp, FiClock, FiShoppingCart } from 'react-icons/fi';
import BackButton from '@/components/Button/BackButton';

// універсальний debounce (але нижче використовуємо як string→void)
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let t: ReturnType<typeof setTimeout>;
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
  // допоміжне — щоб можна було вручну зачистити при unmount
  (debounced as any).cancel = () => clearTimeout(t);
  return debounced as T & { cancel: () => void };
}

const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // стабільний debounced setter
  const debouncedSet = useMemo(
    () => debounce((val: string) => setDebouncedSearchTerm(val), 300),
    []
  );

  // зачистка таймера при анмаунті
  useEffect(() => {
    return () => (debouncedSet as any).cancel?.();
  }, [debouncedSet]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSet(value);
    },
    [debouncedSet]
  );

  return (
    <>
      {/* ====== Toolbar ====== */}
      <div className="w-full mt-4 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {/* маленька кругла кнопка — НЕ розтягується завдяки shrink-0 */}
          <BackButton />

          {/* Search */}
          <div className="relative w-full sm:w-64 md:w-80 lg:w-[400px] sm:ml-auto">
            <label htmlFor="project-search" className="sr-only">
              Search project
            </label>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </span>
            <input
              id="project-search"
              type="text"
              placeholder="Search project by name…"
              value={searchTerm}
              onChange={handleChange}
              className="my-3 w-full border border-yellow-400 rounded px-4 py-2 text-sm pl-10 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {/* ProjectList ходить у /api/projects і приймає searchTerm */}
      <ProjectList searchTerm={debouncedSearchTerm} />

      {/* ====== HERO (англійський текст + плашки + зображення справа) ====== */}
      <section
        className="
    mb-1
    mt-6
    relative
    w-full
    overflow-hidden
    rounded-[32px]
    border
    border-blue-100
    bg-gradient-to-br
    from-slate-50
    via-blue-50
    to-amber-50
    shadow-[0_20px_60px_rgba(15,23,42,0.08)]
  "
        data-aos="fade-up"
      >
        {/* Decorative background */}
        <div
          className="
      pointer-events-none
      absolute
      -top-40
      -left-40
      h-96
      w-96
      rounded-full
      bg-blue-300/20
      blur-3xl
    "
          aria-hidden="true"
        />

        <div
          className="
      pointer-events-none
      absolute
      -bottom-40
      right-0
      h-96
      w-96
      rounded-full
      bg-amber-300/20
      blur-3xl
    "
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div
            className="
        grid
        grid-cols-1
        lg:grid-cols-[1.05fr_0.95fr]
        gap-10
        lg:gap-16
        items-center
        py-12
        md:py-16
        lg:py-20
      "
          >
            {/* ================= LEFT CONTENT ================= */}
            <div className="order-2 lg:order-1" data-aos="fade-right">
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
                  Landing Page Development
                </p>
              </div>

              {/* Heading */}
              <h2
                className="
            max-w-3xl
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-bold
            leading-[1.1]
            tracking-tight
            text-blue-950
          "
              >
                Turn More Visitors Into{' '}
                <span
                  className="
              bg-gradient-to-r
              from-[#d89b2a]
              via-[#efc741]
              to-[#904e0d]
              bg-clip-text
              text-transparent
            "
                >
                  Real Opportunities
                </span>
              </h2>

              {/* Main copy */}
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
                A strong landing page gives every visitor a clear reason to stay, understand your
                offer, and take the next step. We create focused pages for services, advertising
                campaigns, product launches, and lead generation.
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
                Clear messaging, intuitive page structure, responsive layouts, and strategically
                placed calls to action work together to guide potential customers from first
                impression to enquiry.
              </p>

              {/* Benefits */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div
                  className="
              rounded-2xl
              border
              border-blue-100
              bg-white/75
              p-5
              shadow-sm
              backdrop-blur-sm
            "
                >
                  <span
                    className="
                text-xs
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-amber-700
              "
                  >
                    Focus
                  </span>

                  <h3 className="mt-2 text-base font-bold text-blue-950">One Clear Goal</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Each page is structured around a specific action — enquiry, consultation,
                    registration, purchase, or campaign response.
                  </p>
                </div>

                <div
                  className="
              rounded-2xl
              border
              border-amber-200
              bg-white/75
              p-5
              shadow-sm
              backdrop-blur-sm
            "
                >
                  <span
                    className="
                text-xs
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-amber-700
              "
                  >
                    Experience
                  </span>

                  <h3 className="mt-2 text-base font-bold text-blue-950">
                    Designed for Real Users
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Content, navigation, visual hierarchy, and mobile usability are planned to make
                    the next step simple and obvious.
                  </p>
                </div>
              </div>

              {/* Bottom note */}
              <div
                className="
            mt-6
            flex
            flex-wrap
            gap-x-5
            gap-y-2
            text-sm
            font-semibold
            text-slate-700
          "
              >
                {[
                  'Campaign-ready',
                  'Mobile-friendly',
                  'SEO-conscious structure',
                  'Clear calls to action',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span
                      className="
                  h-2
                  w-2
                  rounded-full
                  bg-amber-500
                "
                    />

                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ================= RIGHT IMAGE ================= */}
            <div className="order-1 lg:order-2 relative" data-aos="zoom-in" data-aos-delay="150">
              {/* Glow */}
              <div
                className="
            pointer-events-none
            absolute
            -inset-5
            rounded-[34px]
            bg-gradient-to-br
            from-blue-300/25
            via-transparent
            to-amber-300/25
            blur-2xl
          "
                aria-hidden="true"
              />

              {/* Image frame */}
              <div
                className="
            relative
            mx-auto
            w-full
            max-w-[580px]
            lg:max-w-none
            rounded-[28px]
            border
            border-white
            bg-white
            p-2
            shadow-[0_25px_70px_rgba(15,23,42,0.16)]
          "
              >
                <Image
                  src="/img/project/screenshot-203004.avif"
                  alt="Professional landing page design and development project"
                  width={1200}
                  height={850}
                  priority
                  className="
              w-full
              rounded-[22px]
              object-cover
            "
                />
              </div>

              {/* Floating card */}
              <div
                className="
            absolute
            -bottom-5
            left-5
            sm:left-8
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
              text-[10px]
              sm:text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-amber-700
            "
                >
                  Built with purpose
                </p>

                <p
                  className="
              mt-1
              text-sm
              font-bold
              text-blue-950
            "
                >
                  From first click to final action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== NEW SECTION: Why do you need a landing page? ====== */}
      <section
        className="mb-1 relative w-full rounded-3xl text-black
             bg-gradient-to-br from-[#fdfdfb] via-[#f6f2e3] to-[#c4bdb7]"
        data-aos="fade-up"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d]
             bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
          >
            Custom Website & Web Application Development
            <br />
            <span className="font-bolt text-black">for Your Business?</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* 1. Increase Sales */}
            <div className="flex items-start gap-5" data-aos="fade-up" data-aos-delay="50">
              {/* icon */}
              <div className="shrink-0">
                <div
                  className="h-16 w-16 rounded-2xl
                          bg-gradient-to-br from-violet-300/25 via-fuchsia-300/25 to-cyan-300/25
                          ring-1 ring-white/10 backdrop-blur-sm
                          flex items-center justify-center"
                >
                  <FiTrendingUp className="h-8 w-8 text-violet-300" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Increase sales</h3>
                <h4 className="mt-3 text-slate-800 italic">
                  A focused landing page persuades visitors to act. We craft conversion-driven pages
                  with modern design and solid marketing fundamentals.
                </h4>
              </div>
            </div>

            {/* 2. Optimize Costs */}
            <div className="flex items-start gap-5" data-aos="fade-up" data-aos-delay="100">
              <div className="shrink-0">
                <div
                  className="h-16 w-16 rounded-2xl
                          bg-gradient-to-br from-cyan-300/25 via-sky-300/25 to-teal-300/25
                          ring-1 ring-white/10 backdrop-blur-sm
                          flex items-center justify-center"
                >
                  <FiClock className="h-8 w-8 text-cyan-300" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Optimize costs</h3>
                <h4 className="mt-3 text-slate-800 italic">
                  A one-page site is faster to build, easier to maintain, and laser-focused on what
                  your customers actually need — without waste.
                </h4>
              </div>
            </div>

            {/* 3. Attract Customers */}
            <div className="flex items-start gap-5" data-aos="fade-up" data-aos-delay="150">
              <div className="shrink-0">
                <div
                  className="h-16 w-16 rounded-2xl
                          bg-gradient-to-br from-rose-600/25 via-pink-900/25 to-amber-300/25
                          ring-1 ring-white/10 backdrop-blur-sm
                          flex items-center justify-center"
                >
                  <FiShoppingCart className="h-8 w-8 text-rose-800" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Attract customers</h3>
                <h4 className="mt-3 text-slate-800 italic">
                  Catch attention and turn it into loyalty with clear copy, striking visuals, and a
                  frictionless journey tailored to your audience.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
