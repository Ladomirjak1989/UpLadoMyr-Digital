'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

import Image from 'next/image';
import Link from 'next/link';

import { FiCheck, FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

import { SERVICES } from '@/lib/services.config';

function ServicePricingCarousel() {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 28,
          },
        }}
        modules={[Pagination, Navigation]}
        navigation={{
          prevEl: '.service-swiper-prev',
          nextEl: '.service-swiper-next',
        }}
        className="!pb-14"
      >
        {SERVICES.map((service) => (
          <SwiperSlide key={service.slug} className="!h-auto">
            <motion.article
              data-aos="zoom-in"
              whileHover={{ y: -5 }}
              transition={{
                duration: 0.25,
                ease: 'easeOut',
              }}
              className="
                relative
                flex h-full min-h-[680px] flex-col
                overflow-hidden
                rounded-3xl
                border border-slate-200
                bg-white
                shadow-[0_12px_35px_rgba(15,23,42,0.08)]
                transition-shadow duration-300
                hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]
              "
            >
              {/* TOP ACCENT */}
              <div
                className="
                  h-1.5 w-full
                  bg-gradient-to-r
                  from-blue-950
                  via-amber-500
                  to-blue-950
                "
              />

              <div className="flex h-full flex-col p-6 sm:p-7">
                {/* HEADER */}
                <div>
                  <div className="mb-5 flex items-start justify-between gap-4">
                    {/* ICON */}
                    <div
                      className="
                        flex h-14 w-14 shrink-0
                        items-center justify-center
                        rounded-2xl
                        border border-amber-200
                        bg-gradient-to-br
                        from-[#f7f4ea]
                        via-[#efe4c8]
                        to-[#d4bfaa]
                        shadow-sm
                      "
                    >
                      <Image
                        src={service.icon}
                        alt={`${service.title} web development service`}
                        width={42}
                        height={42}
                        draggable={false}
                      />
                    </div>

                    {/* LABEL */}
                    <span
                      className="
                        inline-flex
                        rounded-full
                        border border-slate-200
                        bg-slate-50
                        px-3 py-1.5
                        text-xs font-bold
                        text-slate-700
                      "
                    >
                      {service.label}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3
                    className="
                      text-xl sm:text-2xl
                      font-extrabold
                      leading-tight
                      text-blue-950
                    "
                  >
                    {service.title}
                  </h3>

                  {/* IDEAL FOR */}
                  <p
                    className="
                      mt-3 min-h-[66px]
                      text-sm
                      leading-relaxed
                      text-slate-600
                    "
                  >
                    {service.idealFor}
                  </p>

                  {/* DURATION */}
                  <div
                    className="
                      mt-5
                      flex items-center justify-between
                      border-y border-slate-200
                      py-3
                    "
                  >
                    <span
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-slate-500
                      "
                    >
                      Estimated timeline
                    </span>

                    <span className="text-sm font-bold text-slate-900">{service.duration}</span>
                  </div>
                </div>

                {/* WHAT'S INCLUDED */}
                <div className="mt-6 flex-1">
                  <p
                    className="
                      mb-4
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-[0.14em]
                      text-blue-950
                    "
                  >
                    What&apos;s included
                  </p>

                  <ul className="space-y-3">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="
                          flex items-start
                          gap-3
                          text-sm
                          leading-relaxed
                          text-slate-700
                        "
                      >
                        <span
                          className="
                            mt-[2px]
                            flex h-5 w-5
                            shrink-0
                            items-center justify-center
                            rounded-full
                            bg-emerald-50
                            text-emerald-600
                          "
                          aria-hidden="true"
                        >
                          <FiCheck className="h-3.5 w-3.5" />
                        </span>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PRICE */}
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-slate-500
                    "
                  >
                    Starting from
                  </p>

                  <p
                    className="
                      mt-1
                      text-3xl
                      font-extrabold
                      tracking-tight
                      text-blue-950
                    "
                  >
                    {service.price}
                  </p>

                  {/* ACTIONS */}
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* LEARN MORE */}
                    <Link
                      href={service.link}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border border-blue-950
                        bg-white
                        px-4 py-3
                        text-sm
                        font-bold
                        text-blue-950
                        transition-all
                        duration-300
                        hover:bg-blue-50
                      "
                    >
                      Learn More
                      <FiArrowRight className="h-4 w-4" />
                    </Link>

                    {/* GET A QUOTE */}
                    <Link
                      href="/contacts"
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border border-blue-950
                        bg-blue-950
                        px-4 py-3
                        text-sm
                        font-bold
                        text-amber-400
                        shadow-sm
                        transition-all
                        duration-300
                        hover:border-amber-500
                        hover:bg-amber-500
                        hover:text-blue-950
                      "
                    >
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* PREVIOUS */}
      <button
        type="button"
        className="
          service-swiper-prev
          absolute
          left-0
          top-1/2
          z-20
          flex h-11 w-11
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border border-slate-300
          bg-white
          text-slate-500
          shadow-lg
          transition-all
          duration-300
          hover:border-blue-900
          hover:bg-blue-950
          hover:text-white

          max-sm:left-2
          max-sm:translate-x-0
        "
        aria-label="Previous service"
      >
        <FiChevronLeft className="h-5 w-5" />
      </button>

      {/* NEXT */}
      <button
        type="button"
        className="
          service-swiper-next
          absolute
          right-0
          top-1/2
          z-20
          flex h-11 w-11
          translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border border-slate-300
          bg-white
          text-slate-500
          shadow-lg
          transition-all
          duration-300
          hover:border-blue-900
          hover:bg-blue-950
          hover:text-white

          max-sm:right-2
          max-sm:translate-x-0
        "
        aria-label="Next service"
      >
        <FiChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ServicePricingCarousel;
