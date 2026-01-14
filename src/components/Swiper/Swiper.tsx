// 'use client';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import { Pagination, Navigation } from 'swiper/modules';
// import { motion } from 'framer-motion';

// import Image from 'next/image';
// import Link from 'next/link';

// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import { SERVICES } from '@/lib/services.config';

// function ServicePricingCarousel() {
//   return (
//     <div className="relative">
//       <Swiper
//         slidesPerView={1}
//         spaceBetween={30}
//         pagination={{ clickable: true }}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//         }}
//         modules={[Pagination, Navigation]}
//         navigation={{
//           prevEl: '.service-swiper-prev',
//           nextEl: '.service-swiper-next',
//         }}
//         className="pb-12"
//         // ✅ LUX: keep clicks working on mobile
//         preventClicks={false}
//         preventClicksPropagation={false}
//         // ✅ LUX: avoid "micro-drag" cancelling taps (Android)
//         threshold={12}
//         // ✅ LUX: don't block default touch behavior
//         touchStartPreventDefault={false}
//         // ✅ LUX: Swiper must NOT hijack taps on buttons/links (Android fix)
//         noSwiping
//         noSwipingClass="swiper-no-swiping"
//         // ✅ LUX: reduce accidental long-swipe behavior
//         longSwipes={false}
//         longSwipesRatio={0.25}
//       >
//         {SERVICES.map((service) => (
//           <SwiperSlide key={service.slug}>
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               data-aos="zoom-in"
//               className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 p-6 shadow-xl"
//             >
//               <div>
//                 {/* Icon + label */}
//                 <div className="mb-4 flex items-center justify-between">
//                   <div className="rounded-full border border-gray-300 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] p-2">
//                     <Image
//                       src={service.icon}
//                       alt={service.label}
//                       width={40}
//                       height={40}
//                       // ✅ LUX: avoid accidental draggable behavior on mobile
//                       draggable={false}
//                     />
//                   </div>

//                   <span className="inline-block rounded-full border border-gray-300 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] px-3 py-1 text-sm font-semibold">
//                     {service.label}
//                   </span>
//                 </div>

//                 <h3 className="mb-2 font-tangerine text-xl font-semibold text-blue-900 sm:text-xl">
//                   {service.title}
//                 </h3>

//                 <p className="mb-1 text-sm text-gray-700 sm:text-base">
//                   Duration: {service.duration}
//                 </p>

//                 <p className="mb-4 text-sm text-gray-600">{service.desc}</p>
//               </div>

//               <div className="flex items-center justify-between gap-4">
//                 <p className="text-base text-blue-900 sm:text-lg">
//                   From <span className="text-yellow-700">{service.price}</span>
//                 </p>

//                 {/* ✅ LUX: real clickable Link + Swiper no-swipe zone (Android-safe) */}
//                 <Link
//                   href={service.link}
//                   className="swiper-no-swiping inline-flex items-center justify-center rounded-lg border border-white bg-blue-900 px-4 py-2 text-sm text-yellow-500
//                              transition-colors duration-300 hover:bg-[#c7a23f] hover:text-blue-900"
//                   // ✅ LUX: stop gesture bubbling (extra safety)
//                   onPointerDown={(e) => e.stopPropagation()}
//                   onTouchStart={(e) => e.stopPropagation()}
//                 >
//                   Learn More
//                 </Link>
//               </div>
//             </motion.div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* LEFT ARROW */}
//       <button
//         className="service-swiper-prev group absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center
//                    rounded-full border border-slate-300 bg-white/95 text-slate-400
//                    shadow-[0_4px_20px_rgba(15,23,42,0.12)]
//                    transition-all duration-200 hover:border-slate-400 hover:bg-white hover:text-slate-700 sm:h-12 sm:w-12"
//         aria-label="Previous service"
//       >
//         <FiChevronLeft className="h-5 w-5" />
//       </button>

//       {/* RIGHT ARROW */}
//       <button
//         className="service-swiper-next group absolute right-0 top-1/2 z-20 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center
//                    rounded-full border border-slate-300 bg-white/95 text-slate-400
//                    shadow-[0_4px_20px_rgba(15,23,42,0.12)]
//                    transition-all duration-200 hover:border-slate-400 hover:bg-white hover:text-slate-700 sm:h-12 sm:w-12"
//         aria-label="Next service"
//       >
//         <FiChevronRight className="h-5 w-5" />
//       </button>
//     </div>
//   );
// }

// export default ServicePricingCarousel;

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
        className="pb-12"
        resistanceRatio={0}
        longSwipes={false}
      >
        {SERVICES.map((service) => (
          <SwiperSlide key={service.slug}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              data-aos="zoom-in"
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 p-6 shadow-xl"
            >
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

              <div className="flex items-center justify-between gap-4">
                <p className="text-base text-blue-900">
                  From <span className="text-yellow-700">{service.price}</span>
                </p>

                {/* ✅ ANDROID-SAFE CTA */}
                <button
                  type="button"
                  className="swiper-no-swiping inline-flex items-center justify-center rounded-lg border border-white bg-blue-900 px-4 py-2 text-sm text-yellow-500
                             transition-colors duration-300 hover:bg-[#c7a23f] hover:text-blue-900"
                  style={{ touchAction: 'manipulation' }}
                  onClick={() => router.push(service.link)}
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <button
        className="service-swiper-prev group absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center
                   rounded-full border border-slate-300 bg-white/95 text-slate-400
                   shadow-[0_4px_20px_rgba(15,23,42,0.12)]
                   transition-all duration-200 hover:border-slate-400 hover:bg-white hover:text-slate-700 sm:h-12 sm:w-12"
        aria-label="Previous service"
        type="button"
      >
        <FiChevronLeft className="h-5 w-5" />
      </button>

      <button
        className="service-swiper-next group absolute right-0 top-1/2 z-20 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center
                   rounded-full border border-slate-300 bg-white/95 text-slate-400
                   shadow-[0_4px_20px_rgba(15,23,42,0.12)]
                   transition-all duration-200 hover:border-slate-400 hover:bg-white hover:text-slate-700 sm:h-12 sm:w-12"
        aria-label="Next service"
        type="button"
      >
        <FiChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ServicePricingCarousel;
