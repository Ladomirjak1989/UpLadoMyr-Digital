// app/(site)/services/[slug]/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FRONTEND_BASE_URL } from '@/lib/api';
import { type ServiceSlug, SERVICES, getServiceBySlug } from '@/lib/services.config';
import ServiceFaq from '@/components/ServiceFaq/ServiceFaq';

// ───────────────────────── helpers ─────────────────────────

function isServiceSlug(slug: string): slug is ServiceSlug {
  return SERVICES.some((s) => s.slug === slug);
}

// Додатковий контент для кожного сервісу – текстові блоки
const SERVICE_DETAILS: Record<
  ServiceSlug,
  {
    heroSubtitle: string;
    intro: string;
    benefits: string[];
    deliverables: string[];
    idealFor: string[];
    process: { step: string; title: string; text: string }[];
  }
> = {
  'visit-card': {
    heroSubtitle: 'A fast, simple online presence built on a ready-made template.',
    intro:
      'Perfect if you need a clean, professional one-page website that introduces who you are, what you do, and how clients can contact you – without overcomplicating things.',
    benefits: [
      'Quick turnaround and budget-friendly pricing',
      'Works great on mobile, tablet, and desktop',
      'Simple structure focused on your key message',
      'Easy to extend later with extra sections or pages',
    ],
    deliverables: [
      '1-page business card website based on a modern template',
      'Branded colors, fonts, and basic layout adjustments',
      'Contact form or direct links to WhatsApp / email / socials',
      'Basic on-page SEO (titles, meta description, alt tags)',
    ],
    idealFor: [
      'Freelancers and ZZP professionals just starting out',
      'Local service businesses that need “Google-proof” presence',
      'Small budgets that still want something decent and trustworthy',
      'People who plan to upgrade to a custom website later',
    ],
    process: [
      {
        step: '01',
        title: 'Short briefing',
        text: 'We collect your logo, colors, services, contact details and any existing content.',
      },
      {
        step: '02',
        title: 'Template selection',
        text: 'You choose one of the proposed layouts that fits your business and style.',
      },
      {
        step: '03',
        title: 'Content & setup',
        text: 'We insert your texts and images, adjust colors and basic sections.',
      },
      {
        step: '04',
        title: 'Launch & support',
        text: 'We publish the site on your domain and help with small final tweaks.',
      },
    ],
  },
  landing: {
    heroSubtitle: 'A focused, conversion-oriented page built to sell one clear offer.',
    intro:
      'Landing pages are perfect for campaigns, lead generation, or one flagship service. The entire structure is built around one main action: call, book, or buy.',
    benefits: [
      'Conversion-focused UX, copy structure and layout',
      'Sections tailored to answer objections and build trust',
      'Optimised for mobile visitors and paid traffic',
      'Ready for analytics & tracking pixels',
    ],
    deliverables: [
      '1 high-converting landing page with up to 4 main blocks',
      'Custom layout on top of a solid design system',
      'Integration with forms, booking tools or email marketing',
      'Technical SEO setup and performance optimisation',
    ],
    idealFor: [
      'Service packages (coaching, consulting, renovations, etc.)',
      'Lead-gen campaigns on Google Ads, Meta, LinkedIn',
      'Special offers, events or product launches',
      'Businesses testing a new idea before investing in a full site',
    ],
    process: [
      {
        step: '01',
        title: 'Strategy & goal',
        text: 'We define the primary conversion goal and ideal visitor journey.',
      },
      {
        step: '02',
        title: 'Wireframe & copy structure',
        text: 'We map all key sections: hero, benefits, proof, FAQ, CTA and more.',
      },
      {
        step: '03',
        title: 'Design & build',
        text: 'We implement the design, connect forms and tracking tools.',
      },
      {
        step: '04',
        title: 'Launch & optimisation',
        text: 'We launch and can later help with A/B tests and improvements.',
      },
    ],
  },
  business: {
    heroSubtitle:
      'A solid multi-page website that presents your company, services, and proof of work.',
    intro:
      'A business website gives you space for clear service descriptions, case studies, FAQ and all the credibility pieces modern clients expect before they contact you.',
    benefits: [
      'Professional structure with clear navigation',
      'Room for services, portfolio, testimonials and blog',
      'Built with scalability in mind – easy to grow later',
      'Clean code, SEO-friendly and performance optimised',
    ],
    deliverables: [
      'Up to 4 custom-designed pages (Home, Services, About, Contact, etc.)',
      'Responsive design implemented without heavy builders',
      'Contact/quote forms, maps, and key integrations',
      'On-page SEO setup and basic analytics integration',
    ],
    idealFor: [
      'Established businesses that outgrew a simple one-pager',
      'Companies that need to showcase multiple services',
      'Entrepreneurs who want a “home base” for all marketing',
      'Teams planning to add blog, resources or projects later on',
    ],
    process: [
      {
        step: '01',
        title: 'Discovery workshop',
        text: 'We clarify your services, audience, and positioning.',
      },
      {
        step: '02',
        title: 'Information architecture',
        text: 'We map out pages, navigation and key user flows.',
      },
      {
        step: '03',
        title: 'Design & development',
        text: 'We create page designs and implement them in clean code.',
      },
      {
        step: '04',
        title: 'Launch & handover',
        text: 'We deploy, connect your domain and show you how to use everything.',
      },
    ],
  },
  ecommerce: {
    heroSubtitle: 'A modern online store with a clean product catalogue, cart and payment flow.',
    intro:
      'We help you launch an e-commerce presence that is fast, trustworthy and easy to manage – without overcomplicated features you don’t need on day one.',
    benefits: [
      'Clear catalogue and product detail pages',
      'Secure checkout and payment integration',
      'Mobile-first UX for shoppers on the go',
      'Built so you can manage products yourself later',
    ],
    deliverables: [
      'E-commerce-ready website with product listing and product pages',
      'Cart and checkout flow integrated with your chosen payment provider',
      'Basic email notifications for orders',
      'SEO-friendly product structure and clean URLs',
    ],
    idealFor: [
      'Small online shops starting with a focused product range',
      'Existing offline businesses bringing products online',
      'Entrepreneurs testing a niche without huge platform costs',
      'Brands that want more control than on marketplace-only setups',
    ],
    process: [
      {
        step: '01',
        title: 'Store concept',
        text: 'We define product structure, shipping zones and payment options.',
      },
      {
        step: '02',
        title: 'Design & UX',
        text: 'We design product listing, detail pages and cart flow.',
      },
      {
        step: '03',
        title: 'Implementation',
        text: 'We build the store, connect payments and configure taxes & shipping.',
      },
      {
        step: '04',
        title: 'Testing & launch',
        text: 'We test the entire flow and go live with you together.',
      },
    ],
  },
  crm: {
    heroSubtitle: 'Custom CRM and internal systems that match how your business really works.',
    intro:
      'Instead of forcing your team into generic tools, we help design and build workflows that support sales, operations and customer care the way you actually operate.',
    benefits: [
      'Tailored to your processes and data structure',
      'Integrations with tools your team already uses',
      'Focus on usability so people actually adopt the system',
      'Space to extend later with new modules and reports',
    ],
    deliverables: [
      'Requirements workshop and system architecture',
      'Custom CRM or internal tool UI, tailored to your workflows',
      'Integrations with email, calendar, or third-party services',
      'Handover documentation and post-launch support options',
    ],
    idealFor: [
      'Teams that outgrew spreadsheets and ad-hoc tools',
      'Businesses with complex pipelines or approval flows',
      'Service companies with recurring client relationships',
      'Founders who want data they can actually trust',
    ],
    process: [
      {
        step: '01',
        title: 'Process mapping',
        text: 'We document your current workflows and pain points.',
      },
      {
        step: '02',
        title: 'Solution design',
        text: 'We propose a pragmatic system that fits your team and budget.',
      },
      {
        step: '03',
        title: 'Development & integration',
        text: 'We build the CRM and connect it with your existing tools.',
      },
      {
        step: '04',
        title: 'Rollout & optimisation',
        text: 'We onboard your team and help fine-tune the system over time.',
      },
    ],
  },
};

// FAQ для кожного сервісу
const SERVICE_FAQ: Record<ServiceSlug, { question: string; answer: string }[]> = {
  'visit-card': [
    {
      question: 'How long does a template-based website really take?',
      answer:
        'Most visit card websites are ready within 5–7 working days after we receive your content (texts, logo, images). Small changes after launch are also included.',
    },
    {
      question: 'Can I update the content myself later?',
      answer:
        'Yes. We set things up so you can change basic texts, images and contact details yourself, or you can always ask us to update it for you.',
    },
    {
      question: 'Will this be enough to appear on Google?',
      answer:
        'For a starter presence – yes. We add basic on-page SEO (titles, meta description, alt tags). For active SEO campaigns you can upgrade later.',
    },
    {
      question: 'Can we reuse this website if I later want a bigger site?',
      answer:
        'Sure. We can extend the existing page with more sections or turn it into a multi-page site when your business grows.',
    },
    {
      question: 'What do you need from me before you start?',
      answer:
        'We need your logo (if you have one), brand colors, contact details, short description of your services and any photos you would like to use.',
    },
  ],
  landing: [
    {
      question: 'What is the main goal of a landing page?',
      answer:
        'A landing page is built around one main action: call, book a call, fill a form, or buy. Everything on the page supports that single conversion goal.',
    },
    {
      question: 'Can you connect my landing page to ads and tracking?',
      answer:
        'Yes. We prepare the page for Google Analytics, Meta Pixel, LinkedIn Insight Tag and can coordinate with your marketing partner.',
    },
    {
      question: 'Do you help with copywriting for the landing?',
      answer:
        'We provide a recommended section structure and can help you refine or lightly edit your copy so that it supports conversions.',
    },
    {
      question: 'Will the landing page work well on mobile?',
      answer:
        'Absolutely. We design mobile-first, since most paid traffic today lands on phones rather than desktops.',
    },
    {
      question: 'Can this landing later become part of a full website?',
      answer:
        'Yes. We can re-use the design and content as a base for a larger site if your campaign proves successful.',
    },
  ],
  business: [
    {
      question: 'How many pages are included in a business website?',
      answer:
        'The standard package includes up to 4 custom-designed pages – for example Home, Services, About, and Contact. We can always add more if needed.',
    },
    {
      question: 'Can we add a blog or case studies later?',
      answer:
        'Yes. We plan the structure with future growth in mind, so adding a blog, case studies or resources later is straightforward.',
    },
    {
      question: 'Is this website suitable for both Dutch and international clients?',
      answer:
        'Definitely. We can structure the content for multiple languages and later integrate a translation layer if you decide to go multilingual.',
    },
    {
      question: 'Do you integrate forms and basic automations?',
      answer:
        'We integrate contact and quote forms, and can connect them to email, CRM or simple automation tools depending on your stack.',
    },
    {
      question: 'What if I already have a website and want a redesign?',
      answer:
        'We can migrate relevant content from your current website, refine the structure, and launch your new design on the same domain with minimal downtime.',
    },
  ],
  ecommerce: [
    {
      question: 'Which payment providers can you integrate?',
      answer:
        'Typically we work with providers like Stripe, Mollie or PayPal, but we can discuss others as long as they offer a solid API and support for your country.',
    },
    {
      question: 'Can I manage products on my own?',
      answer:
        'Yes. We give you an admin interface where you can add, edit or hide products, change prices and update stock.',
    },
    {
      question: 'Is this solution good for a small product catalogue?',
      answer:
        'It is ideal for focused catalogues. You do not need hundreds of products to justify your own shop – starting with a small range is perfectly fine.',
    },
    {
      question: 'How do you handle shipping and taxes?',
      answer:
        'We configure shipping zones, basic tax rules and delivery options together with you so that they match your real-life operations.',
    },
    {
      question: 'What about performance and security?',
      answer:
        'We pay attention to performance, HTTPS, secure checkout and regular updates of the tech stack so your store stays fast and trustworthy.',
    },
  ],
  crm: [
    {
      question: 'Do you use an existing CRM or build everything from scratch?',
      answer:
        'It depends on your needs. Sometimes we extend existing tools; in other cases we build a lightweight custom solution where standard CRMs do not fit.',
    },
    {
      question: 'How long does a typical CRM project take?',
      answer:
        'Smaller tools can be done in a few weeks, while more complex systems with integrations and multiple roles can take several months.',
    },
    {
      question: 'Can you integrate with my current tools?',
      answer:
        'Yes. We look at tools you already use (email, calendar, accounting, project tools) and integrate where it makes sense and is technically possible.',
    },
    {
      question: 'Will my team get training on how to use the system?',
      answer:
        'We always include a handover and training session, plus short documentation or video walkthroughs so your team can onboard smoothly.',
    },
    {
      question: 'What happens if we need new features later?',
      answer:
        'We build with extension in mind. New modules or reports can be added later based on real usage and feedback from your team.',
    },
  ],
};

// ───────────────────── META ─────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!isServiceSlug(slug)) return {};

  const service = getServiceBySlug(slug);
  if (!service) return {};

  const baseUrl = FRONTEND_BASE_URL;
  const url = baseUrl ? `${baseUrl}${service.link}` : service.link;

  const title = service.seoTitle || `${service.title} | UpLadoMyr Digital`;
  const description =
    service.seoDescription ||
    SERVICE_DETAILS[slug].intro ||
    'Web development services for small businesses and self-employed professionals.';

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ───────────────────── PAGE ─────────────────────

async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!isServiceSlug(slug)) notFound();

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const details = SERVICE_DETAILS[slug];
  const faqItems = SERVICE_FAQ[slug];
  const otherServices = SERVICES.filter((s) => s.slug !== slug);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Breadcrumb */}
      <nav
        className="mb-6 flex flex-wrap items-center gap-1 text-sm text-slate-600"
        data-aos="fade-down"
      >
        <Link
          href="/"
          className="relative px-0.5 text-slate-600 hover:text-amber-700 transition
                     after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
                     after:origin-left after:scale-x-0 after:bg-amber-700
                     after:transition-transform after:duration-200 hover:after:scale-x-100"
        >
          Home
        </Link>
        <span className="text-slate-500">/</span>
        <span className="font-medium text-amber-700">{service.title}</span>
      </nav>

      {/* Hero */}
      <section
        className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-amber-50 p-6 sm:p-10 shadow-sm"
        data-aos="fade-up"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 font-semibold uppercase tracking-wide text-amber-300">
                {service.label}
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-slate-700">
                ⏱ Duration: {service.duration}
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-slate-700">
                💰 From {service.price}
              </span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              {service.title}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-700">{details.heroSubtitle}</p>
          </div>

          {/* Highlight card */}
          <div
            className="mt-4 w-full max-w-sm rounded-2xl bg-slate-900/95 px-5 py-6 text-slate-50 shadow-lg lg:mt-0"
            data-aos="zoom-in"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d]">
                <Image
                  src={service.icon}
                  alt={service.label}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-amber-200">Starting from</p>
                <p className="text-xl font-semibold text-amber-300">{service.price}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-slate-100/90">
              <p>Duration: {service.duration}</p>
              <p>{service.desc}</p>
            </div>

            <Link
              href="/contacts"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl
                         bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d]
                         px-4 py-2.5 text-sm font-semibold text-black shadow-lg
                         hover:scale-[1.03] hover:shadow-xl transition-transform"
            >
              Request a quote
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Intro + Benefits */}
      <section
        className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]"
        data-aos="fade-up"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            What this service gives you
          </h2>
          <p className="mt-3 text-slate-700">{details.intro}</p>

          <ul className="mt-4 space-y-2 text-sm sm:text-base text-slate-800">
            {details.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables card */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">What&apos;s included</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {details.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span className="mt-1 text-amber-500">✓</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ideal for */}
      <section
        className="mt-10 rounded-3xl bg-slate-50 border border-slate-200 px-6 py-8"
        data-aos="fade-up"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          When this service is the right fit
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {details.idealFor.map((i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-800">
              <span className="mt-1 text-blue-700">•</span>
              <span>{i}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mt-10" data-aos="fade-up" data-aos-delay="150">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          How we&apos;ll work together
        </h2>

        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {details.process.map((step) => (
            <div
              key={step.title}
              className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
              data-aos="fade-up"
              data-aos-delay={Number(step.step) * 80}
            >
              {/* вертикальна смужка зліва */}
              <div
                aria-hidden="true"
                className="mt-1 h-full w-[5px] rounded-full
                           bg-gradient-to-b from-[#06275f] via-[#438bd8] to-[#82c2f6]
                           shadow-[0_0_14px_rgba(47,123,255,0.55)]"
              />

              {/* контент карточки */}
              <div className="relative z-10 flex-1">
                <div className="absolute -top-6 -right-4 text-5xl font-black text-slate-100 select-none">
                  {step.step}
                </div>

                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                  Step {step.step}
                </p>
                <h3 className="mt-2 text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison + Pricing between services */}
      <section
        className="mt-12 rounded-3xl border border-slate-200 bg-white/80 px-6 py-8 shadow-sm"
        data-aos="fade-up"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Comparison table */}
          <div className="lg:w-2/3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Compare with other packages
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              See how this service sits next to other options in terms of duration and starting
              price.
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="py-1 pr-4">Service</th>
                    <th className="py-1 pr-4">Type</th>
                    <th className="py-1 pr-4">Duration</th>
                    <th className="py-1 pr-4">From</th>
                  </tr>
                </thead>
                <tbody>
                  {[service, ...otherServices].map((s) => (
                    <tr
                      key={s.slug}
                      className={`rounded-xl bg-slate-50/80 ${
                        s.slug === service.slug ? 'ring-1 ring-amber-300 bg-amber-50/60' : ''
                      }`}
                    >
                      <td className="py-2 pr-4 font-semibold text-slate-900">
                        {s.title}
                        {s.slug === service.slug && (
                          <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                            Current
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-4 text-slate-700">{s.label}</td>
                      <td className="py-2 pr-4 text-slate-700">{s.duration}</td>
                      <td className="py-2 pr-4 text-slate-900">{s.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing cards / quick links */}
          <div className="lg:w-1/3">
            <h3 className="text-lg font-semibold text-slate-900">Quick pricing overview</h3>
            <p className="mt-2 text-sm text-slate-700">
              Explore other packages if you need more or less than this service offers.
            </p>
            <div className="mt-4 space-y-3">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={s.link}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm hover:border-amber-400 hover:bg-amber-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{s.title}</p>
                    <p className="text-xs text-slate-600">
                      {s.duration} • From {s.price}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-amber-700">View →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="mt-12 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-300 via-blue-100 to-sky-800  px-6 py-8"
        data-aos="fade-up"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Frequently asked questions</h2>
        <p className="mt-2 text-sm text-slate-700">
          A few common questions clients ask before starting this type of project.
        </p>

        <ServiceFaq items={faqItems} />
      </section>

      {/* Final CTA */}
      <section
        className="mt-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#111827] px-6 py-8 sm:px-10 sm:py-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        data-aos="fade-up"
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Ready to talk about your {service.label.toLowerCase()}?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-200">
            Tell us a bit about your business and we&apos;ll come back with a clear, no-nonsense
            proposal and timeline.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center rounded-2xl
                       bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d]
                       px-6 py-2.5 text-sm font-semibold text-black shadow-lg
                       hover:scale-[1.03] hover:shadow-xl transition-transform"
          >
            Request a proposal
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-600
                       px-6 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-800 transition-colors"
          >
            View recent projects
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ServicePage;
