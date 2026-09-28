import ServicePricingCarousel from '@/components/Swiper/Swiper';

function ServicePricing() {
  return (
    <section
      id="prices"
      aria-labelledby="pricing-heading"
      className="
        scroll-mt-32
        bg-gradient-to-br
        from-white
        via-gray-50
        to-gray-100
        mt-1
        rounded-sm
        px-4
        py-16
        sm:px-8
        md:px-16
        lg:px-20
        lg:py-24
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto mb-12 max-w-4xl text-center lg:mb-16" data-aos="fade-up">
          <p
            className="
              mb-3
              text-sm
              font-bold
              uppercase
              tracking-[0.18em]
              text-amber-700
            "
          >
            Transparent Pricing
          </p>

          <h2
            id="pricing-heading"
            className="
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-900
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            Website & Web App
            <span className="block text-amber-700">Development Pricing</span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-base
              leading-relaxed
              text-slate-600
              sm:text-lg
              md:text-xl
            "
          >
            Clear starting prices for professional websites, e-commerce solutions and custom web
            applications. Choose the package closest to your project or request a custom quote for
            more advanced requirements.
          </p>
        </div>

        {/* TRUST / VALUE POINTS */}
        <div
          className="
            mx-auto
            mb-10
            grid
            max-w-5xl
            grid-cols-2
            gap-4
            md:grid-cols-4
          "
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white/80
              px-4
              py-5
              text-center
              shadow-sm
              backdrop-blur
            "
          >
            <p className="text-sm font-bold text-slate-900">Clear Scope</p>

            <p className="mt-1 text-xs text-slate-500">Before development</p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white/80
              px-4
              py-5
              text-center
              shadow-sm
              backdrop-blur
            "
          >
            <p className="text-sm font-bold text-slate-900">Responsive</p>

            <p className="mt-1 text-xs text-slate-500">Mobile-first development</p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white/80
              px-4
              py-5
              text-center
              shadow-sm
              backdrop-blur
            "
          >
            <p className="text-sm font-bold text-slate-900">SEO-Ready</p>

            <p className="mt-1 text-xs text-slate-500">Technical foundation</p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white/80
              px-4
              py-5
              text-center
              shadow-sm
              backdrop-blur
            "
          >
            <p className="text-sm font-bold text-slate-900">Production Ready</p>

            <p className="mt-1 text-xs text-slate-500">Testing & deployment</p>
          </div>
        </div>

        {/* PRICING CAROUSEL */}
        <div data-aos="fade-up" data-aos-delay="150">
          <ServicePricingCarousel />
        </div>

        {/* PRICING DISCLAIMER */}
        <div
          className="
            mx-auto
            mt-10
            max-w-4xl
            rounded-2xl
            border
            border-slate-200
            bg-white/70
            px-6
            py-5
            text-center
            shadow-sm
            backdrop-blur
          "
        >
          <p
            className="
              text-sm
              leading-relaxed
              text-slate-500
              sm:text-base
            "
          >
            <strong className="font-semibold text-slate-800">
              All prices are starting prices in USD.
            </strong>{' '}
            Your final quote is based on project scope, functionality, design requirements, content,
            integrations and technical complexity. You will receive a clear project scope and price
            before development begins.
          </p>
        </div>

        {/* CUSTOM PROJECT */}
        <div
          className="
            mx-auto
            mt-8
            max-w-4xl
            text-center
          "
        >
          <p className="text-sm text-slate-600 sm:text-base">
            Need something more advanced than the packages above?{' '}
            <a
              href="/contacts"
              className="
                font-bold
                text-amber-700
                underline
                decoration-amber-300
                decoration-2
                underline-offset-4
                transition-colors
                hover:text-amber-800
              "
            >
              Request a custom project estimate
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export default ServicePricing;
