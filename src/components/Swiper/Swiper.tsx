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
//       >
//         {SERVICES.map((service) => (
//           <SwiperSlide key={service.slug}>
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               data-aos="zoom-in"
//               className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-2xl shadow-xl p-6 relative overflow-hidden h-full flex flex-col justify-between"
//             >
//               <div>
//                 {/* Icon + label */}
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="border border-gray-300 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] rounded-full p-2">
//                     <Image src={service.icon} alt={service.label} width={40} height={40} />
//                   </div>
//                   <span className="inline-block border border-gray-300 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] text-sm font-semibold px-3 py-1 rounded-full">
//                     {service.label}
//                   </span>
//                 </div>

//                 <h3 className="text-xl sm:text-xl text-blue-900 font-semibold mb-2 font-tangerine">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-700 mb-1 text-sm sm:text-base">
//                   Duration: {service.duration}
//                 </p>
//                 <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
//               </div>

//               <div className="flex items-center justify-between">
//                 <p className="text-base sm:text-lg text-blue-900">
//                   From <span className="text-yellow-700">{service.price}</span>
//                 </p>

//                 <Link href={service.link}>
//                   <span className="px-4 py-2 rounded-lg border border-white transition-colors duration-300 cursor-pointer text-yellow-500 bg-blue-900 hover:bg-[#c7a23f] hover:text-blue-900 text-sm">
//                     Learn More
//                   </span>
//                 </Link>
//               </div>
//             </motion.div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* LEFT ARROW – центр по висоті, наполовину назовні контейнера */}
//       <button
//         className="service-swiper-prev group absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
//                    z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center
//                    rounded-full border border-slate-300 bg-white/95
//                    shadow-[0_4px_20px_rgba(15,23,42,0.12)]
//                    text-slate-400 hover:text-slate-700
//                    hover:border-slate-400 hover:bg-white
//                    transition-all duration-200"
//         aria-label="Previous service"
//       >
//         <FiChevronLeft className="h-5 w-5" />
//       </button>

//       {/* RIGHT ARROW – симетрично справа */}
//       <button
//         className="service-swiper-next group absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
//                    z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center
//                    rounded-full border border-slate-300 bg-white/95
//                    shadow-[0_4px_20px_rgba(15,23,42,0.12)]
//                    text-slate-400 hover:text-slate-700
//                    hover:border-slate-400 hover:bg-white
//                    transition-all duration-200"
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
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { SERVICES } from '@/lib/services.config';

function ServicePricingCarousel() {
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
        // ✅ CHANGED (PRO): не “вбиваємо” кліки на моб
        preventClicks={false}
        preventClicksPropagation={false}
        // ✅ CHANGED (PRO): щоб мікро-рух пальцем не вважався свайпом
        threshold={12}
        // ✅ CHANGED (PRO): не блокуємо default для тача
        touchStartPreventDefault={false}
      >
        {SERVICES.map((service) => (
          <SwiperSlide key={service.slug}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              data-aos="zoom-in"
              className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-2xl shadow-xl p-6 relative overflow-hidden h-full flex flex-col justify-between"
            >
              <div>
                {/* Icon + label */}
                <div className="flex items-center justify-between mb-4">
                  <div className="border border-gray-300 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] rounded-full p-2">
                    <Image src={service.icon} alt={service.label} width={40} height={40} />
                  </div>

                  <span className="inline-block border border-gray-300 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] text-sm font-semibold px-3 py-1 rounded-full">
                    {service.label}
                  </span>
                </div>

                <h3 className="text-xl sm:text-xl text-blue-900 font-semibold mb-2 font-tangerine">
                  {service.title}
                </h3>

                <p className="text-gray-700 mb-1 text-sm sm:text-base">
                  Duration: {service.duration}
                </p>

                <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-base sm:text-lg text-blue-900">
                  From <span className="text-yellow-700">{service.price}</span>
                </p>

                {/* ✅ CHANGED (PRO): Link як справжня кнопка + ізоляція від свайпу */}
                <Link
                  href={service.link}
                  className="px-4 py-2 rounded-lg border border-white transition-colors duration-300
                             text-yellow-500 bg-blue-900 hover:bg-[#c7a23f] hover:text-blue-900 text-sm
                             inline-flex items-center justify-center"
                  // ✅ CHANGED: блокуємо Swiper від перехоплення тачу на кнопці
                  onPointerDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* LEFT ARROW */}
      <button
        className="service-swiper-prev group absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                   z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center
                   rounded-full border border-slate-300 bg-white/95
                   shadow-[0_4px_20px_rgba(15,23,42,0.12)]
                   text-slate-400 hover:text-slate-700
                   hover:border-slate-400 hover:bg-white
                   transition-all duration-200"
        aria-label="Previous service"
        // ✅ CHANGED: щоб кнопка-стрілка теж завжди клікабельна
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <FiChevronLeft className="h-5 w-5" />
      </button>

      {/* RIGHT ARROW */}
      <button
        className="service-swiper-next group absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                   z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center
                   rounded-full border border-slate-300 bg-white/95
                   shadow-[0_4px_20px_rgba(15,23,42,0.12)]
                   text-slate-400 hover:text-slate-700
                   hover:border-slate-400 hover:bg-white
                   transition-all duration-200"
        aria-label="Next service"
        // ✅ CHANGED
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <FiChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ServicePricingCarousel;
