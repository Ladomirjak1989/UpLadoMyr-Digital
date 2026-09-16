'use client';

import React from 'react';
import {
  FiBriefcase,
  FiShoppingBag,
  FiMap,
  FiHeart,
  FiHome,
  FiBookOpen,
  FiTruck,
  FiLayers,
  FiKey,
  FiArrowRight,
} from 'react-icons/fi';

import Link from 'next/link';

type Industry = {
  title: string;
  description: string;
  examples: string[];
  icon: React.ReactNode;
};

const industries: Industry[] = [
  {
    title: 'Small Business & Professional Services',
    description:
      'Professional websites and digital solutions for entrepreneurs, freelancers, consultants and service-based businesses.',
    examples: ['Business websites', 'Landing pages', 'Lead generation forms'],
    icon: <FiBriefcase />,
  },

  {
    title: 'E-commerce & Retail',
    description:
      'Custom e-commerce websites that help businesses sell products online and manage customers, orders and payments.',
    examples: ['Online stores', 'Product catalogs', 'Payment integrations'],
    icon: <FiShoppingBag />,
  },

  {
    title: 'Travel & Hospitality',
    description:
      'Web platforms for travel companies, accommodation providers and tourism businesses with booking and customer functionality.',
    examples: ['Booking platforms', 'Travel websites', 'Customer accounts'],
    icon: <FiMap />,
  },

  {
    title: 'Beauty & Wellness',
    description:
      'Modern websites and booking solutions for salons, beauty professionals, wellness specialists and personal service businesses.',
    examples: ['Service websites', 'Online booking', 'Service catalogs'],
    icon: <FiHeart />,
  },

  {
    title: 'Construction & Home Services',
    description:
      'Professional websites for construction companies, contractors, installation specialists and local service providers.',
    examples: ['Company websites', 'Project portfolios', 'Quote request forms'],
    icon: <FiHome />,
  },

  {
    title: 'Real Estate',
    description:
      'Custom property websites and web applications for real estate professionals, agencies and property businesses.',
    examples: ['Property listings', 'Advanced search', 'Lead management'],
    icon: <FiKey />,
  },

  {
    title: 'Education & Online Courses',
    description:
      'Digital platforms for educators, trainers and businesses that sell courses or provide online learning services.',
    examples: ['Course websites', 'Student accounts', 'Online payments'],
    icon: <FiBookOpen />,
  },

  {
    title: 'Automotive & Transportation',
    description:
      'Custom websites and booking systems for transportation, vehicle rental and automotive service businesses.',
    examples: ['Rental platforms', 'Transfer booking', 'Order management'],
    icon: <FiTruck />,
  },

  {
    title: 'Custom Business Systems',
    description:
      'Custom web applications that automate business processes, centralize data and improve day-to-day operations.',
    examples: ['CRM systems', 'Admin dashboards', 'Workflow automation'],
    icon: <FiLayers />,
  },
];

function IndustrySolutions() {
  return (
    <section
      className="
        relative overflow-hidden
        bg-white
        py-20 lg:py-24
      "
    >
      {/* subtle background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-0
          h-[400px] w-[800px]
          -translate-x-1/2
          rounded-full
          bg-amber-100/30
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
        {/* HEADER */}
        <div className="mx-auto max-w-4xl text-center" data-aos="fade-up">
          <p
            className="
              text-sm font-bold uppercase
              tracking-[0.16em]
              text-amber-700
            "
          >
            Industries We Serve
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-900
              sm:text-4xl
              md:text-5xl
            "
          >
            Custom Web Development Solutions
            <span className="block text-blue-950">for Different Industries</span>
          </h2>

          <p
            className="
              mx-auto mt-5
              max-w-3xl
              text-base
              leading-relaxed
              text-slate-600
              sm:text-lg
            "
          >
            We build custom websites, web applications and business systems for companies across
            different industries — from local service businesses and e-commerce to travel platforms,
            booking systems and custom CRM solutions.
          </p>
        </div>

        {/* INDUSTRIES */}
        <div
          className="
            mt-14
            grid grid-cols-1
            gap-x-8 gap-y-8
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {industries.map((industry, index) => (
            <article
              key={industry.title}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 80}
              className="
                group
                relative
                rounded-3xl
                border border-slate-200
                bg-white
                p-6 sm:p-7
                shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-amber-300
                hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
              "
            >
              {/* ICON */}
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  border border-amber-200
                  bg-gradient-to-br
                  from-amber-50
                  via-white
                  to-blue-50
                  text-2xl
                  text-blue-950
                  shadow-sm
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
                aria-hidden="true"
              >
                {industry.icon}
              </div>

              {/* TITLE */}
              <h3
                className="
                  mt-5
                  text-xl
                  font-extrabold
                  leading-snug
                  text-blue-950
                "
              >
                {industry.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-3
                  text-sm sm:text-base
                  leading-relaxed
                  text-slate-600
                "
              >
                {industry.description}
              </p>

              {/* EXAMPLES */}
              <div className="mt-5 flex flex-wrap gap-2">
                {industry.examples.map((example) => (
                  <span
                    key={example}
                    className="
                      rounded-full
                      border border-slate-200
                      bg-slate-50
                      px-3 py-1.5
                      text-xs
                      font-semibold
                      text-slate-700
                    "
                  >
                    {example}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div
          className="
            mt-14
            rounded-3xl
            border border-slate-200
            bg-gradient-to-br
            from-slate-50
            via-white
            to-amber-50
            px-6 py-8
            text-center
            shadow-sm
            sm:px-10
          "
          data-aos="fade-up"
        >
          <h3
            className="
              text-2xl
              font-extrabold
              text-slate-900
              sm:text-3xl
            "
          >
            Don&apos;t see your industry?
          </h3>

          <p
            className="
              mx-auto mt-3
              max-w-2xl
              text-sm sm:text-base
              leading-relaxed
              text-slate-600
            "
          >
            Every business works differently. Tell us what you need and we&apos;ll discuss a custom
            website, web application or business system built around your requirements.
          </p>

          <Link
            href="/contacts"
            className="
              mt-6
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-950
              px-6 py-3
              text-sm
              font-bold
              text-amber-400
              shadow-md
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-amber-500
              hover:text-blue-950
              hover:shadow-lg
            "
          >
            Discuss Your Project
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default IndustrySolutions;
