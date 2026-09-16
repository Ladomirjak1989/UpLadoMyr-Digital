import ServicePricingCarousel from '@/components/Swiper/Swiper';

function ServicePricing() {
  return (
    <section
      id="prices"
      className="
        scroll-mt-32
        bg-gradient-to-br from-white to-gray-100
        px-4 py-16
        sm:px-8
        md:px-16
        lg:px-20
        lg:py-20
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADING */}
        <div className="mx-auto mb-12 max-w-3xl text-center" data-aos="fade-up">
          <p
            className="
              mb-3
              text-sm
              font-bold
              uppercase
              tracking-[0.16em]
              text-amber-700
            "
          >
            Development Packages
          </p>

          <h2
            className="
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-900
              sm:text-4xl
              md:text-5xl
            "
          >
            Website & Web Development Prices
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-relaxed
              text-slate-600
              sm:text-lg
            "
          >
            Choose a starting package that matches your project, or request a custom estimate for
            more complex website and web application development.
          </p>
        </div>

        {/* PRICING CAROUSEL */}
        <ServicePricingCarousel />

        {/* PRICING NOTE */}
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <p className="text-sm leading-relaxed text-slate-500">
            <strong className="font-semibold text-slate-700">
              Prices shown are starting prices.
            </strong>{' '}
            Final project cost depends on functionality, design requirements, integrations and
            overall project complexity. You will receive a clear project quote before development
            begins.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ServicePricing;
