import ServicePricingCarousel from '@/components/Swiper/Swiper';

function ServicePricing() {
  return (
    <section className="py-12 px-4 sm:px-8 md:px-16 lg:px-20 bg-gradient-to-br from-white to-gray-100">
      <h2
        className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800"
        data-aos="fade-up"
      >
        Our Services
      </h2>

      <ServicePricingCarousel />
    </section>
  );
}

export default ServicePricing;
