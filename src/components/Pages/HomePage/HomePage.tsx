'use client';

import React, { useState } from 'react';
import {
  FaLightbulb,
  FaClipboardList,
  FaComments,
  FaUserCog,
  FaClipboardCheck,
  FaLaptopCode,
  FaICursor,
} from 'react-icons/fa';
import {
  FaCogs,
  FaCode,
  FaPalette,
  FaNetworkWired,
  FaBug,
  FaWrench,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';

import {
  FiFileText, // Transparent terms
  FiMessageCircle, // Ongoing feedback
  FiCheckSquare, // Stage reporting
  FiMonitor, // Tech support
  FiStar, // Individual approach
} from 'react-icons/fi';

import Image from 'next/image';
import PaymentSteps from '../../PaymentSteps/PaymentSteps';
import ServicePricing from '../../ServicesPricing/ServicesPricing';
import Testimonials from '../../Testimonials/Testimonials';
import IndustrySolutions from '../../IndustrySolutions/IndustrySolutions';

interface Services {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  description: string;
  footer: string;
}

type MethodStep = {
  icon: React.ReactNode;
  title: string;
  color: string;
};

interface TechBlock {
  title: string;
  tech: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BenefitItem {
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  featured?: boolean;
}

const services: Services[] = [
  {
    icon: <FaPalette className="text-orange-500 text-3xl" />,
    title: 'Experience Design',
    subtitle: 'Designing Intuitive, Engaging User Experiences',
    description:
      'Crafting seamless, intuitive user journeys with ADA-compliant designs for faster task completion and higher engagement.',
    footer: 'ADA/WCAG Compliant | Mobile-responsive | Optimized for user engagement',
  },
  {
    icon: <FaNetworkWired className="text-pink-500 text-3xl" />,
    title: 'Architecture & Scalability',
    subtitle: 'Building Robust, Scalable System Architectures',
    description:
      'Developing scalable, cloud-native architectures with microservices and APIs for future-proof, high-performance digital solutions.',
    footer: 'Flexible & scalable infrastructure | Optimized for performance and security',
  },
  {
    icon: <FaCode className="text-blue-500 text-3xl" />,
    title: 'Full Stack Development',
    subtitle: 'Turning Ideas into High-Impact Digital Solutions',
    description:
      'Full-stack development using both front-end and back-end technologies for responsive, secure, and scalable applications.',
    footer: 'High-performing, cross-platform apps | Continuous delivery',
  },
  {
    icon: <FaCogs className="text-purple-500 text-3xl" />,
    title: 'API Integration & Automation',
    subtitle: 'Streamlining Systems for Seamless Operations',
    description:
      'Connect APIs for real-time data sync and optimized workflows across platforms for efficient data flow.',
    footer:
      'Real-time data synchronization | Increased workflow efficiency | Seamless integration with existing systems',
  },
  {
    icon: <FaBug className="text-red-500 text-3xl" />,
    title: 'QA & Performance Testing',
    subtitle: 'Ensuring High-Quality, Reliable Applications',
    description:
      'Rigorous automated and manual testing to ensure flawless performance, security, and cross-browser compatibility every time.',
    footer:
      'Error-free experience | Mobile and cross-browser optimization | Enhanced security and load performance',
  },
  {
    icon: <FaWrench className="text-green-500 text-3xl" />,
    title: 'Maintenance & Support',
    subtitle: 'Ensuring Ongoing Performance and Security',
    description:
      'Support from 9:00–18:00 CET, including bug fixes and performance optimization for long-term reliability.',
    footer: 'Proactive system health checks | Fast response times | Minimized downtime',
  },
];

const steps: MethodStep[] = [
  {
    title: 'Project Initiation',
    icon: <FaLightbulb className="text-4xl text-indigo-600" />,
    color: 'text-indigo-400',
  },
  {
    title: 'Project Planning',
    icon: <FaClipboardList className="text-4xl text-yellow-500" />,
    color: 'text-yellow-500',
  },
  {
    title: 'Project Communication',
    icon: <FaComments className="text-4xl text-cyan-500" />,
    color: 'text-cyan-500',
  },
  {
    title: 'Project Development',
    icon: <FaLaptopCode className="text-4xl text-pink-600" />,
    color: 'text-pink-600',
  },
  {
    title: 'Monitoring & Control',
    icon: <FaUserCog className="text-4xl text-teal-600" />,
    color: 'text-teal-600',
  },
  {
    title: 'Implementation Review',
    icon: <FaClipboardCheck className="text-4xl text-rose-500" />,
    color: 'text-rose-500',
  },
];

const blocks: TechBlock[] = [
  {
    title: 'LANGUAGE/FRAMEWORKS',
    tech: 'JavaScript, TypeScript, MERN, Express Js, Node Js',
  },
  {
    title: 'FRONTEND',
    tech: 'HTML, CSS, Tailwind CSS, Bootstrap, React Js, Redux-toolkit, Next Js',
  },
  {
    title: 'DATABASES',
    tech: 'MongoDB, MySQL, PostgreSQL',
  },
  {
    title: 'VERSION CONTROL',
    tech: 'GitLab, GitHub',
  },
];

const faqData: FAQItem[] = [
  {
    question: 'What web development services does UpLadoMyr Digital offer?',
    answer:
      'We offer full-cycle web development: design, frontend, backend, maintenance, deployment using modern tech, as well as customizable website templates tailored for small businesses and local services.',
  },
  {
    question: 'How do you ensure mobile responsiveness in development?',
    answer:
      'All projects follow mobile-first design with responsive layouts tested on multiple screen sizes and devices.',
  },
  {
    question: 'Can you build custom web applications for niche industries?',
    answer:
      'Yes, we specialize in tailored digital solutions for unique business needs. We can build fully custom applications from scratch or adapt our professional templates to fit your niche.',
  },
  {
    question: 'What technologies do you use for web development?',
    answer: 'We use Next.js, TypeScript, Tailwind CSS, React, Node.js, MongoDB, and more.',
  },
  {
    question: 'How does your QA & testing process work?',
    answer:
      'We apply both manual and automated testing across devices and browsers to ensure flawless functionality.',
  },
  {
    question: 'Do you offer ongoing website maintenance services?',
    answer:
      'Yes. We provide continuous maintenance, security updates, performance monitoring, and content support.',
  },
  {
    question: 'How do you approach user experience design in web projects?',
    answer:
      'We follow UX best practices with user flow mapping, wireframes, prototyping, and iterative feedback sessions.',
  },
  {
    question: 'What industries have you served with web development solutions?',
    answer:
      'We’ve served travel, real estate, construction, healthcare, retail, and startup industries with tailored solutions.',
  },
  {
    question: 'How long does a typical web development project take?',
    answer:
      'Most custom projects take between 4 to 12 weeks, depending on scope, complexity, and feedback cycles.',
  },
  {
    question: 'Can you migrate my existing site to a new platform?',
    answer:
      'Absolutely. We handle full-site migrations with URL structure preservation, SEO settings, and zero-downtime strategies.',
  },
  {
    question: 'What security measures do you implement in web development?',
    answer:
      'We use HTTPS, content security policies, input validation, secure authentication, and regular audits.',
  },
  {
    question: 'Do you provide dedicated solution architects for projects?',
    answer:
      'Yes. For large or technical builds, we assign dedicated architects to ensure scalable and efficient architecture.',
  },
  {
    question: 'How do you optimize websites for SEO during development?',
    answer:
      'We implement semantic HTML, performance optimization, meta tags, schema, accessibility, and mobile-first design.',
  },
  {
    question: "What's included in your web maintenance and support plans?",
    answer:
      'Plans include uptime monitoring, backups, bug fixes, performance audits, and regular CMS/security updates.',
  },
  {
    question: 'How do you price custom web development projects?',
    answer:
      'Pricing depends on project size, complexity, timeline, and technologies. We offer fixed-price or hourly models.',
  },
];

const benefits: BenefitItem[] = [
  {
    label: 'Smart Investment',
    title: 'Competitive & Transparent Pricing',
    description:
      'Pricing is based on the actual scope of your project. You know what is included and what you are paying for, with no unnecessary agency overhead or surprise extras.',
    icon: <span className="text-xl font-bold">$</span>,
    featured: true,
  },
  {
    label: 'Planning',
    title: 'Clear Scope From the Start',
    description:
      'Requirements, functionality, priorities, deliverables, and key milestones are defined before development moves forward.',
    icon: <FiFileText className="h-5 w-5" />,
  },
  {
    label: 'Communication',
    title: 'Direct & Clear Communication',
    description:
      'Questions, feedback, priorities, and important decisions stay organized so you always know where your project stands.',
    icon: <FiMessageCircle className="h-5 w-5" />,
  },
  {
    label: 'Transparency',
    title: 'Progress You Can Follow',
    description:
      'Development is divided into understandable stages, giving you visibility into completed work, current priorities, and what comes next.',
    icon: <FiCheckSquare className="h-5 w-5" />,
  },
  {
    label: 'Quality',
    title: 'Built for Real-World Use',
    description:
      'Responsive layouts, clean development, usability, performance, and careful testing are considered before your product reaches real users.',
    icon: <FiStar className="h-5 w-5" />,
  },
  {
    label: 'Individual Approach',
    title: 'Built Around Your Requirements',
    description:
      'Technology and functionality are selected according to the needs of the project rather than forcing your business into a rigid, predefined package.',
    icon: <FaICursor className="h-5 w-5" />,
  },
  {
    label: 'Handover',
    title: 'Clear & Organized Delivery',
    description:
      'Your finished project is delivered in an organized way, with the information and guidance needed to manage and use it confidently.',
    icon: <FiMonitor className="h-5 w-5" />,
  },
  {
    label: 'After Launch',
    title: 'Continued Technical Support',
    description:
      'Maintenance, technical updates, improvements, and further development can continue after launch as your needs evolve.',
    icon: <FaWrench className="h-5 w-5" />,
  },
];

const whyChooseHighlights = [
  'Transparent Pricing',
  'Direct Communication',
  'Quality-Focused Development',
  'Support After Launch',
];

const projectTrustPoints = [
  'Transparent & competitive pricing',
  'Direct project communication',
  'Clear scope and deliverables',
  'Responsive development',
  'Testing before launch',
  'Post-launch support available',
];

const HomePage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Message + Quote (ONE SECTION) */}
      <section className="bg-gradient-to-r from-white via-amber-50 to-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
          <div className="relative">
            {/* Main SEO content */}
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.16em] text-amber-700">
                Custom Web Development for Businesses Worldwide
              </p>

              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
                Build a Website or Web Application That Supports Your Business Growth
              </h2>

              <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed">
                Digital infrastructure is a strategic investment in your business. We design and
                develop custom websites, web applications, SaaS platforms, MVPs, e-commerce
                solutions, and business systems built around your goals, operations, and customers.
              </p>

              <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed">
                From professional business websites to complex custom web platforms, we focus on
                performance, scalability, user experience, and reliable architecture to create
                digital solutions that deliver long-term value.
              </p>

              <p className="mt-5 text-base sm:text-lg md:text-xl font-semibold text-slate-900 leading-relaxed">
                We work with startups, entrepreneurs, and businesses worldwide — regardless of where
                you are located.
              </p>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Your business can be based in the United States, Europe, or anywhere else in the
                world. Our development process is designed for efficient remote collaboration from
                initial planning to launch and ongoing support.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-10 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xl lg:max-w-lg text-center lg:text-right">
                <span
                  className="hidden lg:block absolute -right-4 top-1 bottom-1 w-[3px] rounded-full
              bg-gradient-to-b from-amber-700 to-amber-500"
                  aria-hidden="true"
                />

                <div className="lg:pr-6">
                  <p
                    className="text-base sm:text-lg md:text-xl font-medium italic leading-relaxed
                bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d]
                bg-clip-text text-transparent
                drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
                  >
                    “Whoever sows generously will also reap generously.”
                  </p>

                  <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600">
                    — 2 Corinthians 9:6
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-deep mb-2"
            data-aos="fade-down"
          >
            All-in-One Web Development for Entrepreneurs
          </h1>
          <h2
            className="font-tangerine text-center text-2xl sm:text-xl text-yellow-800 sm:text-yellow-600 italic mb-12"
            data-aos="fade-down"
          >
            Design <span className="text-blue-700">|</span> Develop{' '}
            <span className="text-blue-700">|</span> Deliver
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
            {services.map((service, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="hover:shadow-xl transition-all duration-300 group hover:scale-[1.02] border border-gray-200 rounded-xl shadow-sm p-6 bg-white"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 underline underline-offset-2">
                    {service.title}
                  </h3>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 leading-snug">
                  {service.subtitle}
                </h4>
                <h4 className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </h4>
                <div className="text-xs bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] p-2 rounded-md">
                  {service.footer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <IndustrySolutions />

      {/* ===== Why choose us ===== */}
      <section
        className="
    relative
    mt-1
    w-full
    overflow-hidden
    border
    border-slate-200/80
    bg-gradient-to-br
    from-white
    via-[#f8f6ef]
    to-[#eee9df]
    shadow-[0_20px_60px_rgba(15,23,42,0.07)]
  "
        data-aos="fade-up"
      >
        {/* Background decoration */}
        <div
          className="
      pointer-events-none
      absolute
      -top-40
      -right-40
      h-96
      w-96
      rounded-full
      bg-amber-300/15
      blur-3xl
    "
          aria-hidden="true"
        />

        <div
          className="
      pointer-events-none
      absolute
      -bottom-40
      -left-40
      h-96
      w-96
      rounded-full
      bg-blue-900/10
      blur-3xl
    "
          aria-hidden="true"
        />

        <div
          className="
      relative
      z-10
      mx-auto
      max-w-7xl
      px-5
      sm:px-8
      lg:px-12
      py-14
      md:py-16
      lg:py-20
    "
        >
          {/* ================= HEADER ================= */}
          <div className="max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-amber-500" />

              <p
                className="
            text-xs
            sm:text-sm
            font-bold
            uppercase
            tracking-[0.18em]
            text-amber-700
          "
              >
                Why UpLadoMyr Digital
              </p>
            </div>

            <h2
              className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-[3.4rem]
          font-bold
          leading-[1.08]
          tracking-tight
          text-blue-950
        "
            >
              Professional Web Development With{' '}
              <span
                className="
            bg-gradient-to-r
            from-[#b87517]
            via-[#dcae35]
            to-[#8d4e13]
            bg-clip-text
            text-transparent
          "
              >
                Transparent & Competitive Pricing
              </span>
            </h2>

            <p
              className="
          mt-6
          max-w-3xl
          text-base
          sm:text-lg
          leading-8
          text-slate-700
        "
            >
              Choosing the right web development partner means finding the right balance between
              technical quality, communication, reliability, and cost. UpLadoMyr Digital provides
              professional website and web application development with transparent, competitive
              pricing and a clear process from the first discussion to launch.
            </p>

            <p
              className="
          mt-4
          max-w-3xl
          text-base
          leading-7
          text-slate-600
        "
            >
              Every project is planned around your actual requirements, so you invest in the design,
              functionality, and technology your business needs — with a clear understanding of the
              scope, development process, and costs involved.
            </p>
          </div>

          {/* ================= QUICK HIGHLIGHTS ================= */}
          <div
            className="
        mt-9
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white/70
        shadow-sm
        backdrop-blur-sm
      "
          >
            {whyChooseHighlights.map((item, index) => (
              <div
                key={item}
                className="
            border-b
            border-slate-200
            px-5
            py-5
            last:border-b-0
            sm:border-b
            lg:border-b-0
            lg:border-r
            lg:last:border-r-0
          "
              >
                <p
                  className="
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.16em]
              text-amber-700
            "
                >
                  {String(index + 1).padStart(2, '0')}
                </p>

                <p className="mt-1 text-sm font-bold text-blue-950">{item}</p>
              </div>
            ))}
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div
            className="
        mt-10
        grid
        grid-cols-1
        lg:grid-cols-[1.55fr_0.75fr]
        gap-10
        lg:gap-14
        items-start
      "
          >
            {/* ================= BENEFIT CARDS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`
              group
              rounded-2xl
              border
              p-6
              shadow-sm
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg

              ${
                benefit.featured
                  ? `
                    border-amber-200
                    bg-gradient-to-br
                    from-amber-50/80
                    via-white
                    to-white
                    hover:border-amber-400
                  `
                  : `
                    border-slate-200
                    bg-white/80
                    hover:border-amber-300/70
                  `
              }
            `}
                  data-aos="fade-up"
                  data-aos-delay={50 + index * 50}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-amber-300/30
                  bg-blue-950
                  text-amber-400
                  shadow-sm
                "
                    >
                      {benefit.icon}
                    </div>

                    <div>
                      <p
                        className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-amber-700
                  "
                      >
                        {benefit.label}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-blue-950">{benefit.title}</h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="lg:sticky lg:top-28" data-aos="fade-left">
              <div
                className="
            relative
            overflow-hidden
            rounded-[28px]
            bg-gradient-to-br
            from-blue-950
            via-blue-900
            to-[#102a56]
            p-7
            sm:p-8
            text-white
            shadow-[0_24px_60px_rgba(15,23,42,0.20)]
          "
              >
                {/* Glow */}
                <div
                  className="
              pointer-events-none
              absolute
              -top-20
              -right-20
              h-52
              w-52
              rounded-full
              bg-amber-400/15
              blur-3xl
            "
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <p
                    className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-amber-300
              "
                  >
                    More Value. Less Complexity.
                  </p>

                  <h3
                    className="
                mt-4
                text-2xl
                sm:text-3xl
                font-bold
                leading-tight
              "
                  >
                    Professional Development With Personal Attention
                  </h3>

                  <p
                    className="
                mt-5
                text-sm
                sm:text-base
                leading-7
                text-white/70
              "
                  >
                    You are not passed between multiple departments or left wondering who is
                    responsible for the next step. Communication stays direct, decisions stay clear,
                    and your project receives focused attention throughout development.
                  </p>

                  {/* Pricing box */}
                  <div
                    className="
                mt-6
                rounded-2xl
                border
                border-amber-300/20
                bg-amber-400/[0.08]
                px-5
                py-5
              "
                  >
                    <p
                      className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-amber-300
                "
                    >
                      Better Value for Your Budget
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Professional web development can combine high-quality work with fair and
                      transparent pricing. You receive a solution tailored to your requirements,
                      with transparent pricing and a clear understanding of where your budget is
                      being invested.
                    </p>
                  </div>

                  <div className="my-7 h-px bg-white/10" />

                  <p
                    className="
                text-sm
                sm:text-base
                leading-7
                text-white/80
              "
                  >
                    The priority is to deliver a product that is well structured, carefully tested,
                    practical to maintain, and ready to support real business operations.
                  </p>

                  {/* Trust points */}
                  <div className="mt-7 space-y-3">
                    {projectTrustPoints.map((item) => (
                      <div
                        key={item}
                        className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    font-medium
                    text-white/80
                  "
                      >
                        <span
                          className="
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-amber-400/15
                      text-[10px]
                      font-bold
                      text-amber-300
                      ring-1
                      ring-amber-300/20
                    "
                        >
                          ✓
                        </span>

                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Professional collaboration */}
                  <div
                    className="
                mt-7
                border-t
                border-white/10
                pt-6
              "
                  >
                    <p
                      className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-white/45
                "
                    >
                      Professional Collaboration
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/65">
                      Your project information, business ideas, and technical requirements are
                      handled professionally throughout the collaboration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom note */}
              <div
                className="
            mt-5
            rounded-2xl
            border
            border-slate-200
            bg-white/60
            px-5
            py-4
          "
              >
                <p className="text-sm leading-6 text-slate-600">
                  <span className="font-bold text-blue-950">From first discussion to launch:</span>{' '}
                  you know what is included, what is happening, what comes next, and what you are
                  paying for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PaymentSteps />

      <section id="prices" className="scroll-mt-28">
        <ServicePricing />
      </section>

      {/* Методологія */}
      <div className="relative w-full py-20 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full text-brand-light"
          viewBox="0 0 1440 100"
          fill="currentColor"
        >
          <path d="M0,100 C360,0 1080,0 1440,100 L1440,0 L0,0 Z" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 bg-gradient-to-t from-gray-100 to-gray-200">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl  font-bold text-center text-deep mb-6"
            data-aos="fade-down"
          >
            Web Development Methodology
          </h2>
          <h3
            className="font-tangerine text-center text-2xl sm:text-xl text-yellow-800 sm:text-yellow-600 italic mb-12 max-w-3xl mx-auto"
            data-aos="fade-in"
          >
            We focus on transparent processes and a structured approach...
          </h3>

          <div className="flex flex-wrap justify-center items-start gap-10 sm:gap-12 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
              >
                <div
                  className={`hexagon w-full h-72 border-[6px] ${step.color}
        flex items-center justify-center
        p-2 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa]
        shadow-lg hover:shadow-2xl transition-all duration-300 group`}
                  style={{
                    clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)',
                  }}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div
                    className="w-[90%] h-[90%] bg-white flex flex-col justify-center items-center text-center px-4 py-6 shadow-lg"
                    style={{
                      clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)',
                    }}
                  >
                    <div className="text-4xl transition-transform duration-300 transform group-hover:scale-110">
                      {step.icon}
                    </div>
                    <h3 className="mt-4 text-sm sm:text-base font-semibold text-gray-700">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Стрілки: вниз на моб, справа на десктопі */}
                {index < steps.length - 1 && (
                  <>
                    {/* Down arrow (мобілки) */}
                    <div className="block sm:hidden mt-4">
                      <svg
                        className="text-deep w-5 h-5 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Right arrow (десктоп) */}
                    <div className="hidden sm:block">
                      <svg
                        data-aos="zoom-in"
                        data-aos-delay={index * 100}
                        className="absolute left-[calc(100%+12px)] top-1/2 transform -translate-y-1/2 text-deep w-6 h-6 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full text-brand-light"
          viewBox="0 0 1440 100"
          fill="currentColor"
        >
          <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* Expertise */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-deep mb-6"
            data-aos="fade-down"
          >
            Technical Expertise
          </h2>
          <h3
            className="font-tangerine text-2xl sm:text-xl text-yellow-800 sm:text-yellow-600 italic max-w-4xl mx-auto mb-12"
            data-aos="fade-in"
          >
            We help businesses grow by delivering...
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {blocks.map((block, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="relative bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:drop-shadow-xl hover:-translate-y-1 group"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-l-lg"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-deep mb-2 underline group-hover:text-accent transition duration-300">
                    {block.title}
                  </h3>
                  <h4 className="text-gray-700 text-sm leading-relaxed transition duration-300 group-hover:text-gray-900">
                    {block.tech}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-t from-white to-gray-300 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center text-black mb-10"
            data-aos="fade-down"
          >
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div data-aos="fade-right">
              <Image
                src="/img/bannerhome/img-faq.jpg"
                alt="FAQ visual"
                layout="responsive"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>

            <div className="space-y-6">
              {faqData.slice(0, visibleCount).map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`border-b pb-4 transition-all duration-300 ${isOpen ? 'border-yellow-600 bg-yellow-50/20' : 'border-gray-300'} hover:text-yellow-700`}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                  >
                    <button
                      onClick={() => toggleItem(idx)}
                      className={`flex justify-between items-center w-full text-left font-semibold transition-transform hover:scale-[1.02] cursor-pointer ${isOpen ? 'text-yellow-700' : 'text-gray-800'}`}
                    >
                      <span className="flex gap-2">
                        <span className="text-gray-900">{idx + 1}.</span>
                        <span className={isOpen ? 'text-yellow-700 font-semibold' : ''}>
                          {item.question}
                        </span>
                      </span>
                      <span className="ml-2">
                        {isOpen ? (
                          <FaMinus className="text-yellow-700" />
                        ) : (
                          <FaPlus className="text-gray-600 hover:text-yellow-700" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <p className="mt-2 text-sm text-gray-700" data-aos="fade-in">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}

              <div className="text-center mt-6" data-aos="zoom-in">
                <button
                  onClick={() => setVisibleCount((prev) => (prev === 5 ? faqData.length : 5))}
                  className="group relative font-bold text-sm text-stone-800 bg-stone-800 rounded-full transform -translate-x-1 -translate-y-1 shadow-[0.5px_0.5px_0_0_#292524,1px_1px_0_0_#292524,1.5px_1.5px_0_0_#292524,2px_2px_0_0_#292524,2.5px_2.5px_0_0_#292524,3px_3px_0_0_#292524,0_0_0_2px_#fafaf9,0.5px_0.5px_0_2px_#fafaf9,1px_1px_0_2px_#fafaf9,1.5px_1.5px_0_2px_#fafaf9,2px_2px_0_2px_#fafaf9,2.5px_2.5px_0_2px_#fafaf9,3px_3px_0_2px_#fafaf9,3.5px_3.5px_0_2px_#fafaf9,4px_4px_0_2px_#fafaf9] hover:translate-x-0 hover:translate-y-0 hover:shadow-[0_0_0_2px_#fafaf9] outline-offset-[5px] outline-2 focus-visible:outline-yellow-400 focus-visible:outline-dashed transition-all duration-150 ease-in-out"
                >
                  <div className="relative rounded-full bg-yellow-500 border-2 border-white/30 before:content-[''] before:absolute before:inset-0 before:rounded-full before:opacity-50 before:bg-[radial-gradient(rgb(255_255_255_/_0.8)_20%,transparent_20%),radial-gradient(rgb(255_255_255)_20%,transparent_20%)] before:bg-[0_0,4px_4px] before:bg-[8px_8px] before:animate-[dots_0.5s_linear_infinite] before:mix-blend-hard-light">
                    <span className="relative flex items-center justify-center px-6 py-3 gap-1 text-stone-800 filter drop-shadow-[0_-1px_0_rgba(255,255,255,0.25)] active:translate-y-[2px]">
                      {visibleCount === 5 ? 'Show More' : 'Show Less'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Testimonials />
    </>
  );
};

export default HomePage;
