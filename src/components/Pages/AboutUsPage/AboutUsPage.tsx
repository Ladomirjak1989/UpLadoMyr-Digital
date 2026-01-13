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
      <section className="grid md:grid-cols-2 gap-10 items-center mb-16 mt-10">
        <div data-aos="fade-right">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
            Modern Websites Tailored to Your Business.
          </h1>
          <p className="text-lg text-gray-700">
            We are a web development company creating sleek, high-performance websites for
            freelancers (ZZP) and small businesses. Depending on your goals and budget, we customize
            high-quality templates or build from scratch — always with clean code, fast loading, and
            mobile-first design.
          </p>

          <Link
            href="/contacts"
            className=" mt-4 group relative inline-flex items-center gap-2 px-9 py-4 border-4 border-transparent text-base font-semibold rounded-full text-white bg-blue-900 shadow-[0_0_0_2px_#c7a23f] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-xl hover:shadow-[0_0_0_12px_transparent] hover:text-neutral-900 active:scale-95"
          >
            {/* Circle animation */}
            <span className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#c7a23f] rounded-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transform -translate-x-1/2 -translate-y-1/2" />

            {/* Text */}
            <span className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3">
              Let’s Work Together
            </span>

            {/* Arrow out */}
            <svg
              className="absolute right-4 w-6 z-10 fill-[#c7a23f] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:right-[-25%] group-hover:fill-neutral-900"
              viewBox="0 0 24 24"
            >
              <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>

            {/* Arrow in */}
            <svg
              className="absolute left-[-25%] w-6 z-10 fill-[#c7a23f] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:left-4 group-hover:fill-neutral-900"
              viewBox="0 0 24 24"
            >
              <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
          </Link>
        </div>
        <div data-aos="fade-left">
          <Image
            src="/img/bannerabout/about-img.avif"
            alt="Hero image"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
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
      <section className="mt-20 rounded-2xl p-8 shadow-lg max-w-7xl mx-auto" data-aos="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image + steps under it */}
          <div data-aos="zoom-in">
            <Image
              src="/img/bannerabout/aboutpage-prototip.jpg"
              alt="Website design process"
              width={1000}
              height={600}
              className="rounded-2xl shadow-md w-full object-contain mb-4"
            />

            {/* Steps */}
            <div className="flex justify-between text-sm text-gray-800 font-semibold px-2">
              <span>Sketch</span>
              <span>Wireframe</span>
              <span>Prototype</span>
              <span>Development</span>
            </div>
            <div className="mt-2 h-1 bg-gradient-to-r from-gray-400 via-blue-400 to-green-500 rounded-full" />
          </div>

          {/* Text content */}
          <div data-aos="fade-left" data-aos-delay="200">
            <h2 className="text-3xl font-tangerine font-bold text-yellow-600 mb-4">
              Mission & Vision
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is to empower freelancers and small businesses with high-quality,
              handcrafted websites that are fast, responsive, and designed to convert.
              <br />
              <br />
              We envision a web where custom code brings your brand’s identity to life without
              compromise.
            </p>
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
      <section className="mt-20 max-w-7xl mx-auto px-4 relative" data-aos="fade-up">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Зображення зліва */}
          <div data-aos="zoom-in">
            <Image
              src="/img/bannerabout/web-design.avif"
              alt="Web design process"
              width={600}
              height={400}
              className="rounded-xl shadow-md w-full object-cover"
            />
          </div>

          {/* Текст + іконка */}
          <div data-aos="fade-left" className="flex flex-col justify-center relative">
            {/* Декоративна іконка */}
            <div className="text-4xl text-yellow-600 mb-2 text-center md:text-left">
              <FaLightbulb />
            </div>

            <h2 className="text-3xl font-tangerine font-bold text-yellow-600 mb-4 text-center md:text-left">
              Our Approach
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
              Every line of code our company writes is tailored to your business. We care deeply
              about performance, mobile-first design, and crafting unique experiences that truly
              reflect your brand — never relying on generic templates.
            </p>
          </div>
        </div>

        {/* Розділювач - хвиля */}
        <div className="absolute bottom-[-1px] left-0 w-full hidden sm:block">
          <svg viewBox="0 0 1440 100" className="w-full h-[70px]" preserveAspectRatio="none">
            <path fill="#f3f4f6" d="M0,0 C360,100 1080,0 1440,100 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
