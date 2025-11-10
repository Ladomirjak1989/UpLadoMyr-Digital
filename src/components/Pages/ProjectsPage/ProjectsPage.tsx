'use client';

import React, { useEffect, useMemo, useCallback, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

  // ініціалізація AOS один раз
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

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
              className="my-3 w-full border border-yellow-400 rounded px-4 py-2 text-sm pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {/* ProjectList ходить у /api/projects і приймає searchTerm */}
      <ProjectList searchTerm={debouncedSearchTerm} />

      {/* ====== HERO (англійський текст + плашки + зображення справа) ====== */}
      <section
        className="mb-7 relative w-full overflow-hidden rounded-3xl bg-[#b6b6c4] text-white mt-2"
        data-aos="fade-up"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center py-12 md:py-16 lg:py-20">
            {/* Left: Headline + copy */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Development of</span>
                <span className="box-decoration-clone bg-blue-300 text-black rounded px-2 py-1 inline-block mt-2">
                  effective
                </span>{' '}
                <span className="block mt-2">
                  <span className="box-decoration-clone bg-cyan-200 text-black rounded px-2 py-1 inline-block">
                    landing pages
                  </span>{' '}
                  <span className="box-decoration-clone bg-violet-300 text-black rounded px-2 py-1 inline-block">
                    turnkey
                  </span>
                </span>
              </h1>

              <p className="mt-6 text-slate-800 italic max-w-2xl">
                Imagine a landing page that actually attracts new clients and looks sharp. We build
                adaptive solutions that help your business hit goals and stand out from competitors.
              </p>
            </div>

            {/* Right: Image (imgP.jpg) */}
            <div className="order-1 lg:order-2 relative">
              <div
                className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <Image
                  src="/img/homeprojects/imgP.jpg"
                  alt="Project showcase mockup"
                  width={1200}
                  height={850}
                  priority
                  className="rounded-3xl shadow-2xl ring-1 ring-white/10 object-cover"
                />
                <div className="absolute -inset-4 -z-10 bg-violet-400/20 blur-2xl rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== NEW SECTION: Why do you need a landing page? ====== */}
      <section
        className="mb-7 relative w-full rounded-3xl text-black
             bg-gradient-to-br from-[#fdfdfb] via-[#f6f2e3] to-[#c4bdb7]"
        data-aos="fade-up"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Why do you need a
            <br />
            <span
              className="bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d]
             bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
            >
              WEBSITE
            </span>
            ?
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
                <p className="mt-3 text-slate-800 italic">
                  A focused landing page persuades visitors to act. We craft conversion-driven pages
                  with modern design and solid marketing fundamentals.
                </p>
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
                <p className="mt-3 text-slate-800 italic">
                  A one-page site is faster to build, easier to maintain, and laser-focused on what
                  your customers actually need — without waste.
                </p>
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
                <p className="mt-3 text-slate-800 italic">
                  Catch attention and turn it into loyalty with clear copy, striking visuals, and a
                  frictionless journey tailored to your audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
