'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

import Image from 'next/image';
import Link from 'next/link';

import { FiArrowRight, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
        className="!pb-16"
      >
        {SERVICES.map((service) => {
          const isPopular = Boolean(service.badge);

          return (
            <SwiperSlide key={service.slug} className="!h-auto py-3">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{
                  duration: 0.25,
                  ease: 'easeOut',
                }}
                className={`
                  relative
                  flex
                  h-full
                  min-h-[720px]
                  flex-col
                  overflow-hidden
                  rounded-3xl
                  border
                  bg-white
                  transition-all
                  duration-300

                  ${
                    isPopular
                      ? `
                        border-amber-400
                        shadow-[0_18px_55px_rgba(15,23,42,0.16)]
                      `
                      : `
                        border-slate-200
                        shadow-[0_12px_35px_rgba(15,23,42,0.08)]
                        hover:border-slate-300
                        hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]
                      `
                  }
                `}
              >
                {/* MOST POPULAR BADGE */}
                {service.badge && (
                  <div
                    className="
                      absolute
                      right-5
                      top-5
                      z-20
                      rounded-full
                      bg-amber-400
                      px-3
                      py-1.5
                      text-[11px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-blue-950
                      shadow-sm
                    "
                  >
                    {service.badge}
                  </div>
                )}

                {/* TOP ACCENT */}
                <div
                  className={`
                    h-1.5
                    w-full

                    ${
                      isPopular
                        ? 'bg-amber-400'
                        : `
                          bg-gradient-to-r
                          from-blue-950
                          via-amber-500
                          to-blue-950
                        `
                    }
                  `}
                />

                <div className="flex h-full flex-col p-6 sm:p-7">
                  {/* HEADER */}
                  <div>
                    <div
                      className={`
                        mb-5
                        flex
                        items-start
                        gap-4

                        ${service.badge ? 'pr-28' : 'justify-between'}
                      `}
                    >
                      {/* ICON */}
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-amber-200
                          bg-gradient-to-br
                          from-[#f7f4ea]
                          via-[#efe4c8]
                          to-[#d4bfaa]
                          shadow-sm
                        "
                      >
                        <Image
                          src={service.icon}
                          alt={`${service.title} development service`}
                          width={42}
                          height={42}
                          draggable={false}
                        />
                      </div>

                      {/* CATEGORY */}
                      {!service.badge && (
                        <span
                          className="
                            inline-flex
                            rounded-full
                            border
                            border-slate-200
                            bg-slate-50
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            text-slate-700
                          "
                        >
                          {service.label}
                        </span>
                      )}
                    </div>

                    {/* CATEGORY FOR POPULAR CARD */}
                    {service.badge && (
                      <p
                        className="
                          mb-2
                          text-xs
                          font-extrabold
                          uppercase
                          tracking-[0.14em]
                          text-amber-700
                        "
                      >
                        {service.label}
                      </p>
                    )}

                    {/* TITLE */}
                    <h3
                      className="
                        text-xl
                        font-extrabold
                        leading-tight
                        text-blue-950
                        sm:text-2xl
                      "
                    >
                      {service.title}
                    </h3>

                    {/* IDEAL FOR */}
                    <p
                      className="
                        mt-3
                        min-h-[86px]
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
                        flex
                        items-center
                        justify-between
                        gap-4
                        border-y
                        border-slate-200
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
                        Timeline
                      </span>

                      <span
                        className="
                          text-right
                          text-sm
                          font-bold
                          text-slate-900
                        "
                      >
                        {service.duration}
                      </span>
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
                            flex
                            items-start
                            gap-3
                            text-sm
                            leading-relaxed
                            text-slate-700
                          "
                        >
                          <span
                            className="
                              mt-[2px]
                              flex
                              h-5
                              w-5
                              shrink-0
                              items-center
                              justify-center
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

                  {/* PRICE & ACTIONS */}
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    {/* PRICE LABEL */}
                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-slate-500
                      "
                    >
                      {service.pricePrefix ?? 'Starting at'}
                    </p>

                    {/* PRICE */}
                    <div className="mt-1 flex items-end gap-2">
                      <p
                        className="
                          text-4xl
                          font-extrabold
                          tracking-tight
                          text-blue-950
                        "
                      >
                        {service.price}
                      </p>

                      <span
                        className="
                          mb-1
                          text-xs
                          font-medium
                          text-slate-500
                        "
                      >
                        USD
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">One-time project</p>

                    {/* PRIMARY CTA */}
                    <Link
                      href="/contacts"
                      className={`
                        mt-5
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        px-5
                        py-3.5
                        text-sm
                        font-extrabold
                        transition-all
                        duration-300

                        ${
                          isPopular
                            ? `
                              border-amber-400
                              bg-amber-400
                              text-blue-950
                              shadow-md
                              hover:border-amber-500
                              hover:bg-amber-500
                            `
                            : `
                              border-blue-950
                              bg-blue-950
                              text-amber-400
                              shadow-sm
                              hover:border-amber-500
                              hover:bg-amber-500
                              hover:text-blue-950
                            `
                        }
                      `}
                    >
                      {service.cta ?? 'Get a Quote'}

                      <FiArrowRight className="h-4 w-4" />
                    </Link>

                    {/* SECONDARY CTA */}
                    <Link
                      href={service.link}
                      className="
                        mt-3
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-blue-950
                        transition-all
                        duration-300
                        hover:border-blue-950
                        hover:bg-blue-50
                      "
                    >
                      View Package Details
                      <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            </SwiperSlide>
          );
        })}
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
          flex
          h-11
          w-11
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-slate-300
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
        aria-label="Previous pricing package"
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
          flex
          h-11
          w-11
          translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-slate-300
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
        aria-label="Next pricing package"
      >
        <FiChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ServicePricingCarousel;
