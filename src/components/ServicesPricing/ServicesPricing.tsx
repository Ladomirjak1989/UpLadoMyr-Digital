'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    label: 'Business Card Website',
    title: 'Template-based website',
    duration: '5–7 days',
    desc: '1 page, 3-4 blocks',
    price: '€150',
    link: '/services/visit-card',
    icon: '/img/servicespricing/one-page-site.png',
  },

  {
    label: 'Landing',
    title: 'Landing Page',
    duration: '20–30 days',
    desc: '1 page, up to 4 blocks',
    price: '€500',
    link: '/services/landing',
    icon: '/img/servicespricing/landing-page.png',
  },
  {
    label: 'Business site',
    title: 'Business Website',
    duration: '30–40 days',
    desc: 'Up to 4 pages',
    price: '€2.300',
    link: '/services/business',
    icon: '/img/servicespricing/business-page.png',
  },
  {
    label: 'E-commerce',
    title: 'Online Store',
    duration: '30–50 days',
    desc: 'Catalog, cart, payment, delivery',
    price: '€3.300',
    link: '/services/ecommerce',
    icon: '/img/servicespricing/mobile-shopping.png',
  },
  {
    label: 'CRM systems',
    title: 'CRM Systems',
    duration: '40–60 days',
    desc: 'Custom approach, service integration',
    price: '€7.500',
    link: '/services/crm',
    icon: '/img/servicespricing/crm.png',
  },
];

function ServicePricing() {
  return (
    <section className="py-12 px-4 sm:px-8 md:px-16 lg:px-20 bg-gradient-to-br from-white to-gray-100">
      <h2
        className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800"
        data-aos="fade-up"
      >
        Our Services
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination]}
        className="pb-12"
      >
        {services.map((service, i) => (
          <SwiperSlide key={i}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              data-aos="zoom-in"
              className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-2xl shadow-xl p-6 relative overflow-hidden h-full flex flex-col justify-between"
            >
              <div>
                {/* Icon + Label in a single row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="border border-gray-300 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] rounded-full p-2">
                    <Image src={service.icon} alt={service.label} width={40} height={40} />
                  </div>
                  <span className="inline-block border border-gray-300 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] text-sm font-semibold px-3 py-1 rounded-full">
                    {service.label}
                  </span>
                </div>

                {/* Content remains the same */}
                <h3 className="text-xl sm:text-2xl text-blue-900 font-semibold mb-2">
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
                <Link href="/projects">
                  <span className="px-4 py-2 rounded-lg border border-white transition-colors duration-300 cursor-pointer text-yellow-500 bg-blue-900 hover:bg-[#c7a23f] hover:text-blue-900 text-sm">
                    Learn More
                  </span>
                </Link>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ServicePricing;
