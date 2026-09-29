// app/(site)/services/[slug]/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { FiArrowRight, FiCheck, FiClock, FiDollarSign, FiLayers } from 'react-icons/fi';

import { FRONTEND_BASE_URL } from '@/lib/api';

import { type ServiceSlug, SERVICES, getServiceBySlug } from '@/lib/services.config';

import ServiceFaq from '@/components/ServiceFaq/ServiceFaq';
import TrackedLink from '@/components/TrackedLink/TrackedLink';

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function isServiceSlug(slug: string): slug is ServiceSlug {
  return SERVICES.some((service) => service.slug === slug);
}

// ─────────────────────────────────────────────────────────────
// SERVICE DETAILS
// ─────────────────────────────────────────────────────────────

type ServiceDetails = {
  eyebrow: string;
  heroSubtitle: string;
  intro: string;

  benefits: {
    title: string;
    text: string;
  }[];

  idealFor: string[];

  process: {
    step: string;
    title: string;
    text: string;
  }[];

  projectNote: string;
};

const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetails> = {
  'template-website': {
    eyebrow: 'Professional Starter Website',

    heroSubtitle:
      'Launch a professional online presence quickly with a polished, responsive website built around your business.',

    intro:
      'A template-based website is a practical starting point for businesses that need a professional website without the cost or timeline of a fully custom build. We customize the layout, branding, content and essential functionality so your business has a credible online presence from day one.',

    benefits: [
      {
        title: 'Professional first impression',
        text: 'Present your services, expertise and contact information through a clean and trustworthy website.',
      },
      {
        title: 'Fast launch',
        text: 'A streamlined development process allows your website to go live quickly without unnecessary complexity.',
      },
      {
        title: 'Responsive experience',
        text: 'Your website is optimized for desktop, tablet and mobile visitors.',
      },
      {
        title: 'SEO foundation',
        text: 'The website includes essential on-page and technical SEO setup to give search engines a clear structure to understand.',
      },
    ],

    idealFor: [
      'Freelancers and independent professionals',
      'Consultants and local service providers',
      'New businesses establishing an online presence',
      'Small businesses that do not yet need a multi-page website',
    ],

    process: [
      {
        step: '01',
        title: 'Project Brief',
        text: 'We review your business, services, target audience, branding and the content you want to present.',
      },
      {
        step: '02',
        title: 'Template & Structure',
        text: 'We select an appropriate professional layout and define the sections needed for your website.',
      },
      {
        step: '03',
        title: 'Customization & Build',
        text: 'We customize the design, add your content, configure forms and optimize the responsive layout.',
      },
      {
        step: '04',
        title: 'Testing & Launch',
        text: 'We test the website across modern devices and browsers, connect your domain and launch the project.',
      },
    ],

    projectNote:
      'Additional sections, integrations, multilingual functionality or custom features can be added based on your requirements.',
  },

  landing: {
    eyebrow: 'Conversion-Focused Development',

    heroSubtitle:
      'A custom landing page designed around one clear goal: turning visitors into leads, inquiries or customers.',

    intro:
      'A landing page gives your advertising campaign or service offer a focused destination. Instead of sending paid traffic to a general website, the page is structured around a specific audience, message and conversion goal.',

    benefits: [
      {
        title: 'Conversion-focused structure',
        text: 'Every section supports the primary action you want visitors to take.',
      },
      {
        title: 'Built for paid traffic',
        text: 'The page structure is suitable for Google Ads, social campaigns and other targeted marketing traffic.',
      },
      {
        title: 'Custom responsive design',
        text: 'The landing page is designed specifically for your offer rather than relying on a generic page layout.',
      },
      {
        title: 'Performance & tracking ready',
        text: 'The technical foundation is optimized for speed and prepared for analytics and advertising tracking.',
      },
    ],

    idealFor: [
      'Google Ads and paid advertising campaigns',
      'Professional service businesses',
      'Product or service launches',
      'Lead generation campaigns',
      'Special offers and promotions',
      'Businesses validating a new service or market',
    ],

    process: [
      {
        step: '01',
        title: 'Strategy & Conversion Goal',
        text: 'We define the target audience, offer and primary action visitors should take.',
      },
      {
        step: '02',
        title: 'Page Architecture',
        text: 'We structure the page around your value proposition, benefits, trust elements, objections and calls to action.',
      },
      {
        step: '03',
        title: 'Design & Development',
        text: 'We create the responsive interface, build the page and connect required forms or integrations.',
      },
      {
        step: '04',
        title: 'Testing & Launch',
        text: 'We test responsiveness, performance and functionality before deploying the landing page.',
      },
    ],

    projectNote:
      'Advanced integrations, custom calculators, booking systems, complex animations or additional campaign pages can be quoted separately.',
  },

  business: {
    eyebrow: 'Custom Business Website',

    heroSubtitle:
      'A professional multi-page website designed to build credibility, explain your services and generate new business opportunities.',

    intro:
      'Your website should do more than simply show that your company exists. A professional business website creates a clear digital foundation for your brand, services, marketing and lead generation. We build a scalable website structure that can grow together with your business.',

    benefits: [
      {
        title: 'Professional positioning',
        text: 'Present your company with a polished digital experience that builds trust with potential customers.',
      },
      {
        title: 'Clear service architecture',
        text: 'Organize your services and content so visitors can quickly understand what you offer and how to contact you.',
      },
      {
        title: 'Built for growth',
        text: 'The website architecture can later expand with additional services, case studies, blog content or integrations.',
      },
      {
        title: 'SEO-ready foundation',
        text: 'Clean structure, metadata, performance optimization and search-friendly page architecture are included from the start.',
      },
    ],

    idealFor: [
      'Established small and medium-sized businesses',
      'Professional service companies',
      'Construction and contractor businesses',
      'Consulting and B2B companies',
      'Businesses replacing an outdated website',
      'Companies preparing to invest in SEO or Google Ads',
    ],

    process: [
      {
        step: '01',
        title: 'Discovery & Strategy',
        text: 'We review your business, target audience, competitors, services and project goals.',
      },
      {
        step: '02',
        title: 'Website Architecture',
        text: 'We define the page structure, navigation, content hierarchy and important user journeys.',
      },
      {
        step: '03',
        title: 'Design & Development',
        text: 'We design and build the responsive website, forms, integrations and required functionality.',
      },
      {
        step: '04',
        title: 'QA & Launch',
        text: 'We test the website across devices and browsers, optimize performance and deploy it to production.',
      },
    ],

    projectNote:
      'The starting package includes up to 8 pages. Additional pages, advanced integrations, multilingual functionality and custom features can be added to the project scope.',
  },

  ecommerce: {
    eyebrow: 'Custom E-commerce Development',

    heroSubtitle:
      'A professional online store designed around your products, customers and purchasing experience.',

    intro:
      'A successful online store requires more than product pages and a checkout button. We create a complete shopping experience that helps customers discover products, understand what they are buying and complete purchases with confidence.',

    benefits: [
      {
        title: 'Professional storefront',
        text: 'Present products through a clean, responsive shopping experience designed around your brand.',
      },
      {
        title: 'Secure checkout',
        text: 'Connect trusted payment providers and create a clear purchasing flow for your customers.',
      },
      {
        title: 'Store management',
        text: 'Manage products, orders and customer information through practical administration tools.',
      },
      {
        title: 'Scalable architecture',
        text: 'The store can evolve with additional products, categories, integrations and functionality as your business grows.',
      },
    ],

    idealFor: [
      'Product-based businesses',
      'Retail businesses moving online',
      'Growing direct-to-consumer brands',
      'Businesses replacing a limited existing store',
      'Companies that need custom integrations',
      'Businesses selling products or services online',
    ],

    process: [
      {
        step: '01',
        title: 'Store Planning',
        text: 'We define products, categories, payments, shipping requirements and the required customer journey.',
      },
      {
        step: '02',
        title: 'UX & Architecture',
        text: 'We plan product discovery, product pages, cart, checkout and account functionality.',
      },
      {
        step: '03',
        title: 'Development & Integration',
        text: 'We build the storefront, administration tools and required payment or third-party integrations.',
      },
      {
        step: '04',
        title: 'Testing & Launch',
        text: 'We test the complete purchasing flow, payments, responsive experience and core store functionality before launch.',
      },
    ],

    projectNote:
      'Final pricing depends on catalog size, product variations, payment providers, shipping logic, integrations and custom functionality.',
  },

  'web-application-development': {
    eyebrow: 'Custom Software Development',

    heroSubtitle:
      'Custom web applications, CRM platforms and internal business systems designed around the way your company actually works.',

    intro:
      'When spreadsheets and generic software start limiting your operations, a custom web application can bring your processes, users and business data into one system. We design and develop software around your workflows instead of forcing your workflows into a generic product.',

    benefits: [
      {
        title: 'Built around your workflows',
        text: 'Business logic and user journeys are designed specifically around your operational requirements.',
      },
      {
        title: 'Centralized business data',
        text: 'Bring customers, operations, workflows and important business information into one structured system.',
      },
      {
        title: 'Automation & integrations',
        text: 'Connect APIs and external services to reduce repetitive manual work and improve operational efficiency.',
      },
      {
        title: 'Scalable architecture',
        text: 'The system can evolve with new modules, roles, reports and integrations as your business grows.',
      },
    ],

    idealFor: [
      'Businesses replacing spreadsheets and manual workflows',
      'Companies that need a custom CRM',
      'Customer or partner portals',
      'Internal dashboards and administration systems',
      'Workflow and process automation',
      'Businesses requiring API integrations',
      'Companies with specialized operational processes',
    ],

    process: [
      {
        step: '01',
        title: 'Discovery & Requirements',
        text: 'We document your workflows, users, requirements, integrations and business goals.',
      },
      {
        step: '02',
        title: 'System Architecture',
        text: 'We define application architecture, database structure, roles, permissions and core user flows.',
      },
      {
        step: '03',
        title: 'Development & QA',
        text: 'We develop the application in structured stages and test functionality throughout the implementation.',
      },
      {
        step: '04',
        title: 'Deployment & Evolution',
        text: 'We deploy the system, provide documentation and can continue development as new requirements emerge.',
      },
    ],

    projectNote:
      'Custom software pricing depends on system complexity, user roles, integrations, data requirements and automation. Larger projects are typically divided into clearly defined development phases.',
  },
};

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────

const SERVICE_FAQ: Record<ServiceSlug, { question: string; answer: string }[]> = {
  'template-website': [
    {
      question: 'How long does a starter website take?',
      answer:
        'Most starter websites can be completed within 3–5 business days once we have received the required content, branding and project information.',
    },
    {
      question: 'Is hosting and domain registration included?',
      answer:
        'Hosting and domain costs are normally separate because they remain registered for your business. We can help you choose the appropriate setup and connect everything during launch.',
    },
    {
      question: 'Will the website work on mobile devices?',
      answer: 'Yes. Responsive development for desktop, tablet and mobile devices is included.',
    },
    {
      question: 'Is SEO included?',
      answer:
        'The package includes a basic SEO foundation such as page metadata, semantic structure and image optimization. Ongoing SEO campaigns and content marketing are separate services.',
    },
    {
      question: 'Can the website grow later?',
      answer:
        'Yes. Additional sections, pages and functionality can be added later as your business grows.',
    },
  ],

  landing: [
    {
      question: 'What is included in the landing page package?',
      answer:
        'The starting package includes one custom-coded landing page with up to 6 content sections, responsive design, lead generation functionality, SEO-ready structure, performance optimization and deployment.',
    },
    {
      question: 'Can I use the page for Google Ads?',
      answer:
        'Yes. The page can be structured specifically for paid advertising campaigns and prepared for analytics and conversion tracking.',
    },
    {
      question: 'Do you write the content?',
      answer:
        'We help structure the messaging and can refine supplied content. Full professional copywriting can be added separately when required.',
    },
    {
      question: 'Can you integrate forms or booking systems?',
      answer:
        'Yes. Standard contact and lead forms are included. More advanced booking systems, CRM integrations or automation can be added depending on the project.',
    },
    {
      question: 'Can the landing page become part of a larger website?',
      answer:
        'Yes. The design and content can later be incorporated into a larger business website.',
    },
  ],

  business: [
    {
      question: 'How many pages are included?',
      answer:
        'The starting Business Website package includes up to 8 pages. The exact structure is defined during project planning.',
    },
    {
      question: 'Can you redesign my existing website?',
      answer:
        'Yes. We can redesign an existing website, restructure its content and migrate useful material to the new website.',
    },
    {
      question: 'Can you add more pages later?',
      answer:
        'Yes. The website is built with future growth in mind, so additional services, landing pages, case studies, blog content and other sections can be added later.',
    },
    {
      question: 'Is the website optimized for SEO?',
      answer:
        'We provide an SEO-ready technical foundation including semantic structure, metadata, performance considerations and search-friendly page architecture. Ongoing SEO campaigns are separate.',
    },
    {
      question: 'Can you build a multilingual website?',
      answer:
        'Yes. Multilingual functionality can be added depending on your target markets and preferred translation workflow.',
    },
  ],

  ecommerce: [
    {
      question: 'Which payment providers can you integrate?',
      answer:
        'Payment options depend on your country and business requirements. Common integrations include providers such as Stripe, PayPal and Mollie where appropriate.',
    },
    {
      question: 'Can I manage products myself?',
      answer:
        'Yes. The store includes administration functionality for managing products and core store information.',
    },
    {
      question: 'Are shipping and taxes included?',
      answer:
        'Standard shipping and tax configuration can be included. Complex international tax, fulfillment or shipping logic may require additional development.',
    },
    {
      question: 'Can customers create accounts?',
      answer:
        'Yes. Customer account functionality can be included so users can manage their information and relevant order data.',
    },
    {
      question: 'What affects the final price?',
      answer:
        'The final cost depends on catalog size, product variations, payment providers, shipping requirements, integrations and custom store functionality.',
    },
  ],

  'web-application-development': [
    {
      question: 'What types of web applications do you build?',
      answer:
        'Projects can include custom CRM systems, customer portals, internal dashboards, administration platforms, workflow systems and other business applications.',
    },
    {
      question: 'How much does custom software development cost?',
      answer:
        'Custom web application projects start at the listed package price. The final quote depends on functionality, integrations, user roles, data requirements and overall system complexity.',
    },
    {
      question: 'Can you integrate existing business tools?',
      answer:
        'Yes. We can integrate third-party platforms and APIs when they provide the necessary technical access and documentation.',
    },
    {
      question: 'Will different users have different permissions?',
      answer:
        'Yes. Custom applications can include secure authentication together with role-based permissions and access control.',
    },
    {
      question: 'Can the application be expanded later?',
      answer:
        'Yes. We design the architecture with future modules, integrations and functionality in mind.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!isServiceSlug(slug)) {
    return {};
  }

  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  const baseUrl = FRONTEND_BASE_URL;

  const url = baseUrl ? `${baseUrl}${service.link}` : service.link;

  const title = service.seoTitle || `${service.title} | UpLadoMyr Digital`;

  const description = service.seoDescription || SERVICE_DETAILS[slug].intro;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'UpLadoMyr Digital',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!isServiceSlug(slug)) {
    notFound();
  }

  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const details = SERVICE_DETAILS[slug];
  const faqItems = SERVICE_FAQ[slug];

  const otherServices = SERVICES.filter((item) => item.slug !== slug);

  return (
    <main className="overflow-hidden bg-white">
      {/* BREADCRUMB */}

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-slate-500
          "
        >
          <Link
            href="/"
            className="
              transition-colors
              hover:text-amber-700
            "
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/#prices"
            className="
              transition-colors
              hover:text-amber-700
            "
          >
            Services
          </Link>

          <span>/</span>

          <span className="font-medium text-slate-900">{service.title}</span>
        </nav>
      </div>

      {/* HERO */}

      <section
        className="
          relative
          border-b
          border-slate-200
          bg-gradient-to-br
          from-white
          via-slate-50
          to-amber-50
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-12
            px-4
            py-16
            sm:px-6
            lg:grid-cols-[1.35fr_0.65fr]
            lg:items-center
            lg:px-8
            lg:py-24
          "
        >
          {/* HERO CONTENT */}

          <div>
            <p
              className="
                text-sm
                font-extrabold
                uppercase
                tracking-[0.18em]
                text-amber-700
              "
            >
              {details.eyebrow}
            </p>

            <h1
              className="
                mt-4
                max-w-4xl
                text-4xl
                font-extrabold
                tracking-tight
                text-blue-950
                sm:text-5xl
                lg:text-6xl
              "
            >
              {service.title}
            </h1>

            <p
              className="
                mt-6
                max-w-3xl
                text-lg
                leading-relaxed
                text-slate-600
                sm:text-xl
              "
            >
              {details.heroSubtitle}
            </p>

            {/* HERO INFO */}

            <div className="mt-8 flex flex-wrap gap-3">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                "
              >
                <FiClock className="text-amber-600" />

                {service.duration}
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                "
              >
                <FiDollarSign className="text-amber-600" />
                Starting at {service.price} USD
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                "
              >
                <FiLayers className="text-amber-600" />

                {service.label}
              </div>
            </div>

            {/* HERO CTA */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/contacts"
                eventName="Contact"
                payload={{
                  source: 'service_hero',
                  cta: 'start_project',
                  service_slug: slug,
                  service_label: service.label,
                  service_title: service.title,
                  destination: '/contacts',
                }}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-950
                  px-6
                  py-3.5
                  text-sm
                  font-extrabold
                  text-amber-400
                  shadow-lg
                  transition-all
                  duration-300
                  hover:bg-amber-500
                  hover:text-blue-950
                "
              >
                {service.cta ?? 'Discuss Your Project'}

                <FiArrowRight />
              </TrackedLink>

              <Link
                href="/projects"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-blue-950
                  transition-all
                  hover:border-blue-950
                  hover:bg-slate-50
                "
              >
                View Our Work
              </Link>
            </div>
          </div>

          {/* PRICING CARD */}

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-blue-950
              p-7
              text-white
              shadow-2xl
              sm:p-8
            "
          >
            <div
              className="
                absolute
                -right-16
                -top-16
                h-48
                w-48
                rounded-full
                bg-amber-400/10
                blur-3xl
              "
            />

            {service.badge && (
              <span
                className="
                  mb-6
                  inline-flex
                  rounded-full
                  bg-amber-400
                  px-3
                  py-1.5
                  text-xs
                  font-extrabold
                  uppercase
                  tracking-wider
                  text-blue-950
                "
              >
                {service.badge}
              </span>
            )}

            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/10
                "
              >
                <Image src={service.icon} alt="" width={44} height={44} />
              </div>

              <div>
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-slate-400
                  "
                >
                  {service.pricePrefix ?? 'Starting at'}
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <p
                    className="
                      text-4xl
                      font-extrabold
                      tracking-tight
                      text-white
                    "
                  >
                    {service.price}
                  </p>

                  <span className="mb-1 text-sm text-slate-400">USD</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-300">
              Your final quote is based on project scope, functionality, integrations and technical
              requirements.
            </p>

            <div className="my-6 h-px bg-white/10" />

            <ul className="space-y-3">
              {service.includes.slice(0, 6).map((item) => (
                <li
                  key={item}
                  className="
                    flex
                    items-start
                    gap-3
                    text-sm
                    text-slate-200
                  "
                >
                  <span
                    className="
                      mt-0.5
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-amber-400
                      text-blue-950
                    "
                  >
                    <FiCheck className="h-3 w-3" />
                  </span>

                  {item}
                </li>
              ))}
            </ul>

            <TrackedLink
              href="/contacts"
              eventName="Contact"
              payload={{
                source: 'service_pricing_card',
                cta: 'request_quote',
                service_slug: slug,
                service_title: service.title,
                destination: '/contacts',
              }}
              className="
                mt-8
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-amber-400
                px-5
                py-3.5
                text-sm
                font-extrabold
                text-blue-950
                transition-all
                hover:bg-amber-500
              "
            >
              Request a Project Quote
              <FiArrowRight />
            </TrackedLink>

            <p className="mt-3 text-center text-xs text-slate-400">
              Clear scope and pricing before development begins.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO / BENEFITS */}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p
              className="
                text-sm
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-amber-700
              "
            >
              Why This Service
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                tracking-tight
                text-blue-950
                sm:text-4xl
              "
            >
              Built around your business goals
            </h2>

            <p
              className="
                mt-5
                text-base
                leading-8
                text-slate-600
              "
            >
              {details.intro}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {details.benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-emerald-600
                  "
                >
                  <FiCheck />
                </div>

                <h3
                  className="
                    mt-4
                    text-lg
                    font-bold
                    text-blue-950
                  "
                >
                  {benefit.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-slate-600
                  "
                >
                  {benefit.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EVERYTHING INCLUDED */}

      <section className="bg-slate-50">
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-20
            sm:px-6
            lg:px-8
          "
        >
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="
                text-sm
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-amber-700
              "
            >
              Package Details
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                text-blue-950
                sm:text-4xl
              "
            >
              What&apos;s included
            </h2>

            <p className="mt-4 text-slate-600">
              The starting package includes the essential functionality needed to launch a
              professional, production-ready solution.
            </p>
          </div>

          <div
            className="
              mx-auto
              mt-10
              grid
              max-w-5xl
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {service.includes.map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-emerald-600
                  "
                >
                  <FiCheck className="h-4 w-4" />
                </span>

                <span
                  className="
                    text-sm
                    font-medium
                    leading-relaxed
                    text-slate-700
                  "
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-center
              text-sm
              leading-relaxed
              text-slate-500
            "
          >
            {details.projectNote}
          </p>
        </div>
      </section>

      {/* IDEAL FOR */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-4
          py-20
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-gradient-to-br
            from-white
            to-amber-50
            p-7
            sm:p-10
          "
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p
                className="
                  text-sm
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-amber-700
                "
              >
                Best Fit
              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-extrabold
                  text-blue-950
                "
              >
                Is this the right solution for you?
              </h2>

              <p
                className="
                  mt-4
                  max-w-xl
                  leading-relaxed
                  text-slate-600
                "
              >
                This package is a strong starting point for businesses with requirements similar to
                the following.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {details.idealFor.map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                  "
                >
                  <FiCheck
                    className="
                      mt-0.5
                      shrink-0
                      text-amber-600
                    "
                  />

                  <span
                    className="
                      text-sm
                      font-medium
                      leading-relaxed
                      text-slate-700
                    "
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}

      <section className="bg-blue-950">
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-20
            sm:px-6
            lg:px-8
          "
        >
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="
                text-sm
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-amber-400
              "
            >
              Our Process
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                text-white
                sm:text-4xl
              "
            >
              From idea to launch
            </h2>

            <p className="mt-4 text-slate-300">
              A clear development process keeps the project structured, transparent and focused on
              the final business outcome.
            </p>
          </div>

          <div
            className="
              mt-12
              grid
              gap-5
              md:grid-cols-2
              xl:grid-cols-4
            "
          >
            {details.process.map((step) => (
              <article
                key={step.step}
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                "
              >
                <span
                  className="
                    absolute
                    -right-2
                    -top-6
                    text-8xl
                    font-black
                    text-white/[0.04]
                  "
                >
                  {step.step}
                </span>

                <p
                  className="
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-[0.15em]
                    text-amber-400
                  "
                >
                  Step {step.step}
                </p>

                <h3
                  className="
                    mt-4
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-relaxed
                    text-slate-300
                  "
                >
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-4
          py-20
          sm:px-6
          lg:px-8
        "
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="
                text-sm
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-amber-700
              "
            >
              Compare Options
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                text-blue-950
              "
            >
              Explore other development packages
            </h2>
          </div>

          <Link
            href="/#prices"
            className="
              text-sm
              font-bold
              text-amber-700
              hover:text-amber-800
            "
          >
            View all pricing →
          </Link>
        </div>

        <div
          className="
            mt-8
            grid
            gap-4
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {otherServices.map((item) => (
            <TrackedLink
              key={item.slug}
              href={item.link}
              eventName="ViewContent"
              payload={{
                source: 'service_other_services',
                action: 'open_other_service',
                from_service_slug: slug,
                to_service_slug: item.slug,
                to_service_title: item.title,
                destination: item.link,
              }}
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-amber-300
                hover:shadow-lg
              "
            >
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-amber-700
                "
              >
                {item.label}
              </p>

              <h3
                className="
                  mt-2
                  text-lg
                  font-extrabold
                  text-blue-950
                "
              >
                {item.title}
              </h3>

              <div
                className="
                  mt-5
                  flex
                  items-end
                  justify-between
                  gap-3
                "
              >
                <div>
                  <p className="text-xs text-slate-500">Starting at</p>

                  <p
                    className="
                      text-xl
                      font-extrabold
                      text-blue-950
                    "
                  >
                    {item.price}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">{item.duration}</p>
                </div>

                <span
                  className="
                    text-sm
                    font-bold
                    text-amber-700
                    transition-transform
                    group-hover:translate-x-1
                  "
                >
                  View →
                </span>
              </div>
            </TrackedLink>
          ))}
        </div>
      </section>

      {/* FAQ */}

      <section className="bg-slate-50">
        <div
          className="
            mx-auto
            max-w-5xl
            px-4
            py-20
            sm:px-6
            lg:px-8
          "
        >
          <div className="text-center">
            <p
              className="
                text-sm
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-amber-700
              "
            >
              FAQ
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                text-blue-950
                sm:text-4xl
              "
            >
              Frequently asked questions
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-slate-600
              "
            >
              Common questions about scope, pricing and the development process.
            </p>
          </div>

          <div className="mt-10">
            <ServiceFaq items={faqItems} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-4
          py-20
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-blue-950
            px-6
            py-12
            text-center
            sm:px-10
            lg:px-16
            lg:py-16
          "
        >
          <div
            className="
              absolute
              -left-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-amber-400/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-24
              -right-20
              h-64
              w-64
              rounded-full
              bg-blue-400/10
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-3xl">
            <p
              className="
                text-sm
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-amber-400
              "
            >
              Start Your Project
            </p>

            <h2
              className="
                mt-4
                text-3xl
                font-extrabold
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              Have a project in mind?
            </h2>

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-base
                leading-relaxed
                text-slate-300
                sm:text-lg
              "
            >
              Tell us what you&apos;re building, what your business needs and what you want to
              achieve. We&apos;ll review your requirements and prepare a clear project scope,
              timeline and quote.
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                justify-center
                gap-3
                sm:flex-row
              "
            >
              <TrackedLink
                href="/contacts"
                eventName="Contact"
                payload={{
                  source: 'service_final_cta',
                  cta: 'discuss_project',
                  service_slug: slug,
                  service_label: service.label,
                  service_title: service.title,
                  destination: '/contacts',
                }}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-amber-400
                  px-7
                  py-3.5
                  text-sm
                  font-extrabold
                  text-blue-950
                  transition-all
                  hover:bg-amber-500
                "
              >
                Discuss Your Project
                <FiArrowRight />
              </TrackedLink>

              <TrackedLink
                href="/projects"
                eventName="ViewContent"
                payload={{
                  source: 'service_final_cta',
                  cta: 'view_projects',
                  service_slug: slug,
                  destination: '/projects',
                }}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/20
                  bg-white/5
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  transition-all
                  hover:bg-white/10
                "
              >
                View Recent Projects
              </TrackedLink>
            </div>

            <p className="mt-5 text-xs text-slate-400">
              No obligation. You&apos;ll receive a clear quote before development begins.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServicePage;
