'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { SERVICES } from '@/lib/services.config';

function ServicePricingCarousel() {
  const router = useRouter();

  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Navigation]}
        navigation={{
          prevEl: '.service-swiper-prev',
          nextEl: '.service-swiper-next',
        }}
        resistanceRatio={0}
        longSwipes={false}
        className="pb-12"
      >
        {SERVICES.map((service) => (
          <SwiperSlide key={service.slug}>
            {/* WHOLE CARD CLICKABLE */}
            <motion.div
              role="button"
              tabIndex={0}
              data-aos="zoom-in"
              whileHover={{ scale: 1.03 }}
              className="group swiper-no-swiping relative flex h-full cursor-pointer flex-col justify-between
                         overflow-hidden rounded-2xl border border-gray-300
                         bg-gradient-to-br from-gray-100 to-gray-200
                         p-6 shadow-xl focus:outline-none"
              style={{ touchAction: 'manipulation' }}
              onClick={() => router.push(service.link)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(service.link);
                }
              }}
            >
              {/* TOP CONTENT */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-full border border-gray-300 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] p-2">
                    <Image
                      src={service.icon}
                      alt={service.label}
                      width={40}
                      height={40}
                      draggable={false}
                    />
                  </div>

                  <span className="inline-block rounded-full border border-gray-300 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] px-3 py-1 text-sm font-semibold">
                    {service.label}
                  </span>
                </div>

                <h3 className="mb-2 font-tangerine text-xl font-semibold text-blue-900">
                  {service.title}
                </h3>

                <p className="mb-1 text-sm text-gray-700">Duration: {service.duration}</p>

                <p className="mb-4 text-sm text-gray-600">{service.desc}</p>
              </div>

              {/* PRICE + CTA */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-base text-blue-900">
                  From <span className="text-yellow-700">{service.price}</span>
                </p>

                {/* MOBILE HINT */}
                <div className="flex items-center gap-1 text-sm text-blue-700 sm:hidden opacity-90">
                  <span>View details</span>
                  <span aria-hidden className="inline-block animate-bounce">
                    →
                  </span>
                </div>

                {/* DESKTOP CTA */}
                <span
                  className="
      pointer-events-none hidden
      sm:inline-flex sm:items-center sm:justify-center
      sm:rounded-lg sm:border sm:border-white
      sm:bg-blue-900 sm:px-4 sm:py-2
      sm:text-sm sm:text-yellow-500

      sm:transition-colors sm:duration-300
      sm:group-hover:bg-[#c7a23f]
      sm:group-hover:text-blue-900
    "
                >
                  Learn more
                </span>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* NAVIGATION */}
      <button
        type="button"
        className="service-swiper-prev absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2
                   items-center justify-center rounded-full border border-slate-300 bg-white/95
                   text-slate-400 shadow-md transition hover:text-slate-700"
        aria-label="Previous service"
      >
        <FiChevronLeft />
      </button>

      <button
        type="button"
        className="service-swiper-next absolute right-0 top-1/2 z-20 flex h-10 w-10 translate-x-1/2 -translate-y-1/2
                   items-center justify-center rounded-full border border-slate-300 bg-white/95
                   text-slate-400 shadow-md transition hover:text-slate-700"
        aria-label="Next service"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}

export default ServicePricingCarousel;
