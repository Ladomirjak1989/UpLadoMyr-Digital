'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  FaArrowRight,
  FaLaptopCode,
  FaCode,
  FaPalette,
  FaNetworkWired,
  FaBug,
  FaWrench,
  FaPlus,
  FaMinus,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaTelegramPlane,
} from 'react-icons/fa';
import { FiFileText, FiMessageCircle, FiCheckSquare, FiMonitor, FiStar } from 'react-icons/fi';

import { SiViber } from 'react-icons/si';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { track } from '@/lib/pixel';

// якщо є — лишай. Якщо нема — заміниш на свій масив.А
import LandingBanner from '@/components/Banner/LandingBanner';
import IndustrySolutions from '@/components/IndustrySolutions/IndustrySolutions';
import ServicePricing from '../../ServicesPricing/ServicesPricing';

interface ServiceItem {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  description: string;
  footer: string;
}

interface TechBlock {
  title: string;
  tech: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

type LogoItem = {
  name: string;
  tagline?: string;
};

type ContactItem = {
  icon: React.ReactNode;
  label: string;
  info: string;
  href: string;
  targetBlank?: boolean;
};

type Testimonial = {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number; // 1..5
};

const services: ServiceItem[] = [
  {
    icon: <FaPalette className="text-orange-500 text-3xl" />,
    title: 'Website Design & UX/UI',
    subtitle: 'Professional website design focused on users, leads and conversions',
    description:
      'We create responsive, mobile-first website designs and intuitive UX/UI for business websites, landing pages and custom web applications. Every interface is built to improve usability, credibility and conversion rates.',
    footer: 'Responsive Web Design | UX/UI Design | Mobile-First | Conversion-Focused',
  },
  {
    icon: <FaNetworkWired className="text-pink-500 text-3xl" />,
    title: 'Web Application Architecture',
    subtitle: 'Scalable architecture for custom web applications and SaaS platforms',
    description:
      'We plan scalable web application architecture for growing businesses, SaaS products and custom digital platforms, with performance, security and future development in mind.',
    footer: 'Web App Architecture | SaaS Development | Scalability | Security',
  },
  {
    icon: <FaCode className="text-blue-500 text-3xl" />,
    title: 'Full-Stack Web Development',
    subtitle: 'Custom frontend and backend development for modern businesses',
    description:
      'Full-stack web development using Next.js, React, TypeScript, Node.js, NestJS, APIs and databases. We build custom business websites and web applications that are fast, scalable and maintainable.',
    footer: 'Next.js Development | React Development | Node.js | Full-Stack Development',
  },
  {
    icon: <FaLaptopCode className="text-purple-500 text-3xl" />,
    title: 'API Integration & Automation',
    subtitle: 'Custom API integrations and business process automation',
    description:
      'We connect websites and web applications with third-party APIs, payment systems, CRM tools and external services while automating repetitive business processes and data flows.',
    footer: 'API Integration | REST API | Payment Integration | Business Automation',
  },
  {
    icon: <FaBug className="text-red-500 text-3xl" />,
    title: 'Website Performance & QA Testing',
    subtitle: 'Fast, responsive and reliable websites across browsers and devices',
    description:
      'We test website speed, responsive layouts, functionality, accessibility and cross-browser compatibility to deliver reliable websites and web applications with strong technical performance.',
    footer: 'Website Speed | Core Web Vitals | QA Testing | Cross-Browser Testing',
  },
  {
    icon: <FaWrench className="text-green-500 text-3xl" />,
    title: 'Website Maintenance & Support',
    subtitle: 'Ongoing website maintenance, updates and technical support',
    description:
      'Keep your business website or web application secure, fast and reliable with ongoing website maintenance, bug fixes, updates, monitoring and post-launch development support.',
    footer: 'Website Maintenance | Technical Support | Updates | Performance Monitoring',
  },
];

const blocks: TechBlock[] = [
  {
    title: 'LANGUAGES / FRAMEWORKS',
    tech: 'JavaScript, TypeScript, Node.js, Express, MERN, REST APIs',
  },
  { title: 'FRONTEND', tech: 'Next.js, React, Tailwind CSS, Redux Toolkit, HTML, CSS' },
  { title: 'DATABASES', tech: 'PostgreSQL, MongoDB, MySQL' },
  { title: 'VERSION CONTROL', tech: 'GitHub, GitLab, CI/CD-ready workflows' },
];

const faqData: FAQItem[] = [
  {
    question: 'What web development services do you offer?',
    answer:
      'Full-cycle delivery: UX/UI, development, API integrations, deployment, SEO-ready structure, plus ongoing maintenance and support.',
  },
  {
    question: 'Do you build mobile-first websites?',
    answer:
      'Yes — mobile-first by default, tested across real breakpoints and devices. The goal is zero mobile surprises.',
  },
  {
    question: 'Can you build SaaS-style platforms?',
    answer:
      'Yes. We build scalable web platforms with authentication, dashboards, roles, APIs, and clean architecture that’s easy to extend.',
  },
  {
    question: 'What stack do you use?',
    answer:
      'Next.js + TypeScript + Tailwind on the frontend, Node/NestJS on the backend, PostgreSQL or MongoDB depending on the project.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Most builds take 4–12 weeks depending on scope and feedback speed. We structure milestones so you always see progress.',
  },
  {
    question: 'How much does custom website development cost?',
    answer:
      'The cost of custom website development depends on the number of pages, design requirements, functionality and integrations. After reviewing your requirements, we provide a clear project scope, estimated price and development timeline.',
  },
  {
    question: 'Do you build websites for small businesses and entrepreneurs?',
    answer:
      'Yes. We build professional business websites for entrepreneurs, freelancers, SMEs and growing companies that need a strong online presence, lead generation and an SEO-ready website that can grow with the business.',
  },
  {
    question: 'Do you develop custom web applications?',
    answer:
      'Yes. Our custom web application development can include dashboards, customer portals, booking systems, authentication, user roles, databases, APIs, payment integrations and other business-specific functionality.',
  },
  {
    question: 'Do you build SEO-friendly websites?',
    answer:
      'Yes. We build SEO-ready websites with semantic HTML, logical heading structure, crawlable content, responsive design, optimized images, fast loading and metadata support.',
  },
  {
    question: 'Can you redesign or improve an existing website?',
    answer:
      'Yes. We can redesign an existing business website and improve its UX/UI, responsiveness, speed, technical SEO foundation or outdated functionality using modern web technologies.',
  },
  {
    question: 'Can you integrate payment systems, booking systems or third-party APIs?',
    answer:
      'Yes. We can integrate payment providers, booking systems, CRM tools, third-party services and REST APIs into websites and custom web applications. Integrations are selected and implemented according to your business requirements.',
  },
  {
    question: 'Do you provide website maintenance and support after launch?',
    answer:
      'Yes. We provide post-launch website maintenance and technical support, including updates, bug fixes, performance improvements and further development as your business grows.',
  },
];

const clientLogos: LogoItem[] = [
  { name: 'Skripton', tagline: 'Web Platform' },
  { name: 'Laderate', tagline: 'SaaS UI' },
  { name: 'EnerGator', tagline: 'Landing + SEO' },
  { name: 'ArtTomorrow', tagline: 'Portfolio Build' },
  { name: '3Ternet', tagline: 'Business Site' },
  { name: 'Nordic Renovation Group', tagline: 'Lead Gen' },
  { name: 'DutchCare Clinic', tagline: 'Booking System' },
  { name: 'Aalten Logistics', tagline: 'Internal Tooling' },
  { name: 'BlueHarbor Realty', tagline: 'Listing Platform' },
  { name: 'Craft & Co Interiors', tagline: 'Brand Website' },
];

const statItems = [
  { value: 5, suffix: '+', label: 'Years of\nExperience' },
  { value: 30, suffix: '+', label: 'Satisfied\nClients' },
  { value: 50, suffix: '+', label: 'Completed\nProjects' },
  { value: 1, suffix: ':1', label: 'Direct\nCommunication' },
];

const testimonials: Testimonial[] = [
  {
    name: 'Sophie van Dijk',
    role: 'Founder',
    company: 'BlueHarbor Realty',
    text: 'We finally have a site that looks premium and loads fast. The structure is clean, and updates are easy. The result feels like a real brand.',
    rating: 5,
  },
  {
    name: 'Mark Jansen',
    role: 'Owner',
    company: 'Nordic Renovation Group',
    text: 'Clear communication, clear milestones, and no surprises. We launched on time and started getting leads immediately.',
    rating: 5,
  },
  {
    name: 'Olivia Kramer',
    role: 'Product Manager',
    company: 'Skripton',
    text: 'The platform foundation is solid. Performance and UX are on point. We can scale features without rewriting everything.',
    rating: 5,
  },
  {
    name: 'Daan Vermeer',
    role: 'Director',
    company: 'EnerGator',
    text: 'Our landing page conversion improved noticeably. The design is clean and the SEO setup was done properly — not just “keywords everywhere”.',
    rating: 5,
  },
  {
    name: 'Emma de Boer',
    role: 'Clinic Administrator',
    company: 'DutchCare Clinic',
    text: 'Booking flow is smooth and mobile works perfectly. Support after launch is quick and professional.',
    rating: 5,
  },
  {
    name: 'Noah Peters',
    role: 'Operations',
    company: 'Aalten Logistics',
    text: 'We needed an internal tool fast. Delivery was structured and stable. Everything works the way it should.',
    rating: 5,
  },
  {
    name: 'Lotte Smit',
    role: 'Creative Director',
    company: 'ArtTomorrow',
    text: 'Beautiful presentation and solid technical foundation. Finally a portfolio site that feels premium.',
    rating: 5,
  },
];

function Stars({ value }: { value: number }) {
  const arr = Array.from({ length: 5 }, (_, i) => i < value);
  return (
    <div className="flex items-center gap-1">
      {arr.map((on, i) => (
        <span
          key={i}
          className={`inline-block h-2.5 w-2.5 rounded-full ${on ? 'bg-amber-500' : 'bg-slate-300'}`}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{value} out of 5</span>
    </div>
  );
}

function SectionCTA({ contacts }: { contacts: Record<string, string> }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link
        href={contacts.phoneHref}
        // ✅ ADDED
        onClick={() => track('Contact', { channel: 'phone', source: 'landing_cta' })}
        className="rounded-full bg-slate-900 text-white px-5 py-3 font-extrabold shadow hover:shadow-lg hover:-translate-y-[1px] transition inline-flex items-center gap-2"
      >
        <FaPhone /> Call me
      </Link>

      <Link
        href={contacts.whatsappHref}
        target="_blank"
        // ✅ ADDED
        onClick={() => track('Contact', { channel: 'whatsapp', source: 'landing_cta' })}
        className="rounded-full bg-green-600 text-white px-5 py-3 font-extrabold shadow hover:shadow-lg hover:-translate-y-[1px] transition inline-flex items-center gap-2"
      >
        <FaWhatsapp /> WhatsApp
      </Link>

      <Link
        href={contacts.telegramHref}
        target="_blank"
        // ✅ ADDED
        onClick={() => track('Contact', { channel: 'telegram', source: 'landing_cta' })}
        className="rounded-full bg-sky-500 text-white px-5 py-3 font-extrabold shadow hover:shadow-lg hover:-translate-y-[1px] transition inline-flex items-center gap-2"
      >
        <FaTelegramPlane /> Telegram
      </Link>
    </div>
  );
}

function CountUpNumber({
  value,
  suffix = '',
  durationMs = 4500,
  triggerKey,
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
  triggerKey: number; // змінюється => перезапуск
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    setDisplay(0);

    const start = performance.now();
    const omega = 10; // "пружина"
    const damping = 8; // "затухання"
    const from = 0;
    const to = value;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);

      // spring-ish easing (пружинка без бібліотек)
      // формула: 1 - e^(-d*t) * (cos(w*t) + (d/w)*sin(w*t))
      const w = Math.sqrt(Math.max(0.0001, omega * omega - damping * damping));
      const exp = Math.exp(-damping * t);
      const spring = 1 - exp * (Math.cos(w * t) + (damping / w) * Math.sin(w * t));

      const next = Math.round(from + (to - from) * spring);
      setDisplay(Math.min(to, Math.max(0, next)));

      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, durationMs, triggerKey]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function StatCard({
  item,
  triggerKey,
}: {
  item: { value: number; suffix?: string; label: string };
  triggerKey: number;
}) {
  return (
    <div className="text-left">
      <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-indigo-900 tracking-tight">
        <CountUpNumber value={item.value} suffix={item.suffix ?? ''} triggerKey={triggerKey} />
      </div>

      <div className="mt-3 text-base sm:text-lg text-blue-800 whitespace-pre-line font-medium leading-snug">
        {item.label}
      </div>
    </div>
  );
}

function StatsGrid({
  statItems,
}: {
  statItems: { value: number; suffix?: string; label: string }[];
}) {
  const [triggerKey, setTriggerKey] = useState(0);

  return (
    <motion.div
      onViewportEnter={() => setTriggerKey((k) => k + 1)}
      viewport={{ once: false, amount: 0.35 }}
      className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
    >
      {statItems.map((item, idx) => (
        <motion.div
          key={`${idx}-${triggerKey}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <StatCard item={item} triggerKey={triggerKey} />
        </motion.div>
      ))}
    </motion.div>
  );
}

const LandingPage: React.FC = () => {
  const firedLandingView = useRef(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const toggleItem = (index: number) => setOpenIndex((prev) => (prev === index ? null : index));

  const contacts = useMemo(
    () => ({
      phoneHref: 'tel:+31619388895',
      emailHref: 'mailto:info@upladomyr.com',
      whatsappHref: 'https://wa.me/31619388895',
      telegramHref: 'https://t.me/bettinaladomirjak',
      viberHref: 'viber://chat?number=%2B31619388895',
      websiteHref: 'https://upladomyr.com',
    }),
    []
  );

  const contactList: ContactItem[] = useMemo(
    () => [
      {
        icon: <FaPhone size={18} />,
        label: 'Phone',
        info: '+31 619 38 88 95',
        href: contacts.phoneHref,
      },
      {
        icon: <FaEnvelope size={18} />,
        label: 'Email',
        info: 'info@upladomyr.com',
        href: contacts.emailHref,
      },
      {
        icon: <FaWhatsapp size={18} />,
        label: 'WhatsApp',
        info: 'Chat on WhatsApp',
        href: contacts.whatsappHref,
        targetBlank: true,
      },
      {
        icon: <FaTelegramPlane size={18} />,
        label: 'Telegram',
        info: '@bettinaladomirjak',
        href: contacts.telegramHref,
        targetBlank: true,
      },
      { icon: <SiViber size={18} />, label: 'Viber', info: 'Viber Chat', href: contacts.viberHref },
      {
        icon: <FaCode size={18} />,
        label: 'Website',
        info: 'upladomyr.com',
        href: contacts.websiteHref,
        targetBlank: true,
      },
    ],
    [contacts]
  );

  // ✅ ADDED START: Pixel event for landing view
  useEffect(() => {
    if (firedLandingView.current) return;
    firedLandingView.current = true;

    track('ViewContent', {
      content_name: 'LandingPage',
      content_category: 'Landing',
      content_type: 'page',
    });
  }, []);

  return (
    <>
      <LandingBanner />

      {/* ===== HERO (with integrated designer background) ===== */}
      <section className="relative overflow-hidden py-16 sm:py-20 bg-white">
        {/* Soft ring for premium “card” feel (optional) */}
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-black/5"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16" data-aos="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Custom Web Development for Entrepreneurs, SMEs & Growing Businesses
              </p>

              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
                Custom Website &{' '}
                <span className="bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] bg-clip-text text-transparent">
                  Web Application Development
                </span>{' '}
                for Businesses
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
                Professional web development services for businesses that need more than a basic
                website. We build fast, responsive and SEO-ready business websites, landing pages,
                custom web applications and scalable SaaS platforms using modern full-stack
                technologies.
              </p>

              <ul className="mt-6 space-y-2 text-slate-800">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                  SEO-ready structure (speed, semantics, metadata)
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                  Mobile-first responsiveness (iOS + Android)
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                  Conversion-focused design + clear CTAs
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                  Clean codebase you can maintain
                </li>
              </ul>

              <SectionCTA contacts={contacts} />
            </div>

            {/* Quote card */}
            <div className="relative" data-aos="fade-left">
              <div className="rounded-3xl bg-white/70 border border-amber-100 shadow-xl p-8 overflow-hidden backdrop-blur-sm">
                <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-amber-200/60 via-yellow-200/40 to-transparent blur-2xl" />
                <h3 className="text-sm font-semibold text-slate-700">Business mindset</h3>

                <h3 className="mt-4 text-xl sm:text-2xl font-semibold leading-relaxed text-slate-900">
                  “If your business is not on the internet, then your business will be out of
                  business.”
                </h3>
                <p className="mt-2 text-sm font-semibold text-slate-600">— Bill Gates</p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-2xl font-extrabold text-slate-900">Fast</p>
                    <p className="text-sm text-slate-600 mt-1">Performance-first builds</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-2xl font-extrabold text-slate-900">Clean</p>
                    <p className="text-sm text-slate-600 mt-1">Maintainable codebase</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-2xl font-extrabold text-slate-900">SEO</p>
                    <p className="text-sm text-slate-600 mt-1">Structure Google loves</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-2xl font-extrabold text-slate-900">UX</p>
                    <p className="text-sm text-slate-600 mt-1">Conversion-oriented UI</p>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#5a5a5a] via-[#ffd659] to-[#8c4a12] p-[1px]">
                  <div className="rounded-2xl bg-white p-5">
                    <p className="font-semibold text-slate-900">Straight talk:</p>
                    <h2 className="text-slate-700 mt-2 leading-relaxed">
                      A cheap website is expensive later. We build the kind of foundation you won’t
                      regret when your traffic, content, and features grow.
                    </h2>
                  </div>
                </div>

                {/* Quick Contacts list */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contactList.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      target={c.targetBlank ? '_blank' : undefined}
                      onClick={() =>
                        track('Contact', {
                          channel: c.label.toLowerCase(),
                          source: 'landing_contact_list',
                        })
                      }
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:shadow transition flex items-center gap-3"
                    >
                      <span className="text-slate-700">{c.icon}</span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold text-slate-500">
                          {c.label}
                        </span>
                        <span className="block text-sm font-bold text-slate-900 truncate">
                          {c.info}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT / FOUNDER ===== */}
      <section
        className="py-16 sm:py-20"
        style={{
          backgroundColor: '#0b1433',
          backgroundImage: `
            radial-gradient(900px circle at 20% 25%, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 60%),
            radial-gradient(750px circle at 85% 30%, rgba(168,85,247,0.16) 0%, rgba(168,85,247,0) 55%),
            radial-gradient(800px circle at 55% 95%, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0) 60%),
            linear-gradient(135deg, #0b1433 0%, #1d2a6a 45%, #082142 100%)
          `,
        }}
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* LEFT: Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15">
                <Image
                  src="/img/bannerfounder/Bettina.jpg"
                  alt="Bettina — Founder of UpLadoMyr Digital"
                  fill
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 440px"
                  className="object-cover object-center"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <h2
                className="text-lg sm:text-xl font-semibold tracking-wide
                bg-gradient-to-br from-[#efc741] via-[#d89b2a] to-[#904e0d]
                bg-clip-text text-transparent
                drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
              >
                Bettina Ladomirjak
              </h2>

              <p
                className="mt-1 text-sm sm:text-base font-medium
                bg-gradient-to-br from-white/70 via-amber-200/70 to-white/60
                bg-clip-text text-transparent opacity-90"
              >
                Full-Stack Web Developer & Founder of UpLadoMyr Digital
              </p>

              <span
                className="mt-4 block h-px w-44 sm:w-56 mx-auto lg:mx-0
                bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"
                aria-hidden="true"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
              I build digital products that help businesses grow — from idea to launch, with clarity
              and purpose.
            </h2>

            <h2 className="mt-5 text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Clean code, smart design, and solutions that actually work. From websites to full web
              applications, I help businesses turn ideas into results.
            </h2>

            <div className="mt-8 flex flex-col items-center lg:items-start gap-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contacts"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full
                  bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500
                  text-slate-900 font-extrabold shadow-lg
                  hover:brightness-110 transition active:scale-95"
                >
                  Work with me
                  <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <a
                  href={contacts.phoneHref}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full
                  bg-white/10 backdrop-blur border border-white/15
                  text-white/90 shadow-sm
                  hover:bg-white/14 hover:border-white/25 transition active:scale-[0.99]"
                >
                  <FaPhone className="h-4 w-4 text-white/85" />
                  <span className="text-sm sm:text-[15px] font-semibold tracking-wide">
                    +31 6 19 38 88 95
                  </span>
                </a>
              </div>

              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2
                bg-white/8 backdrop-blur border border-white/12
                text-white/80 text-xs sm:text-sm"
              >
                <span className="font-medium">Free quick call</span>
                <span className="text-white/40">•</span>
                <span className="text-white/70">No obligation</span>
              </div>

              <div className="mt-2">
                <SectionCTA contacts={contacts} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AUTUMN WEB DEVELOPMENT OFFER ===== */}
      <section className="relative overflow-hidden mt-8 py-16 sm:py-20 bg-white" data-aos="fade-up">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-emerald-50/40 to-amber-50/40 p-8 sm:p-10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-extrabold text-slate-800 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Autumn Web Development Offer
                </div>

                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                  Autumn Special Offer:{' '}
                  <span className="bg-gradient-to-br from-emerald-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                    10% OFF
                  </span>{' '}
                  your website or web application build
                </h2>

                <p className="mt-4 text-slate-700 text-base sm:text-lg leading-relaxed">
                  Order a website or web application project and receive a{' '}
                  <span className="font-extrabold">10% discount</span>. Perfect time to launch
                  properly — fast, clean, and SEO-ready.
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700">
                    ✅ Applies to: business websites / landing pages / web application
                  </span>

                  <span className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700">
                    ✅ Delivered with clear milestones
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-[420px]">
                <div className="rounded-3xl bg-slate-900 p-7 shadow-xl">
                  <p className="text-white/80 text-sm font-semibold">Quick start</p>
                  <h2 className="mt-2 text-white text-xl font-extrabold leading-snug">
                    Want the 10% discount?
                  </h2>
                  <h3 className="mt-2 text-white/80 text-sm leading-relaxed">
                    Send your idea + deadline and We’ll reply with a clear plan and estimate. No
                    obligation.
                  </h3>

                  <div className="mt-5 flex flex-col gap-3">
                    <Link
                      href="/contacts"
                      className="inline-flex items-center justify-center gap-2 rounded-full
                      bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500
                      px-6 py-3 font-extrabold text-slate-900 shadow-lg
                      hover:brightness-110 transition active:scale-[0.99]"
                    >
                      Start Your Web Development Project <FaArrowRight className="h-4 w-4" />
                    </Link>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={contacts.phoneHref}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2
                        text-white/90 font-bold hover:bg-white/15 transition"
                      >
                        <FaPhone /> Call
                      </Link>

                      <Link
                        href={contacts.whatsappHref}
                        target="_blank"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-2
                        text-white font-bold hover:opacity-95 transition"
                      >
                        <FaWhatsapp /> WhatsApp
                      </Link>
                    </div>

                    <h2 className="text-xs text-white/60">
                      *Discount applies for website orders from €2000.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Data-Driven Success,
            <br />
            Quantified
          </h2>
          <div className="mt-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }} // 🔥 перезапуск при кожному вході в viewport
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {/* цей "trigger" змінюється щоразу при show -> перезапуск CountUp */}
              <motion.div
                variants={{ hidden: { opacity: 1 }, show: { opacity: 1 } }}
                onViewportEnter={() => {}}
              >
                {/*
            Простий трюк: робимо ключ залежним від часу.
            Коли секція входить у viewport — ререндеримо і перезапускаємо CountUp.
          */}
                <StatsGrid statItems={statItems} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-slate-900 mb-3"
            data-aos="fade-down"
          >
            Custom Web Development Services for Businesses
          </h2>

          <h2
            className="text-center text-base sm:text-lg text-slate-600 mb-10 max-w-3xl mx-auto"
            data-aos="fade-down"
          >
            Complete web development services — from professional business websites and
            high-converting landing pages to custom web applications, SaaS platforms, API
            integrations and ongoing website maintenance.
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
            {services.map((service, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="hover:shadow-xl transition-all duration-300 group hover:scale-[1.02] border border-gray-200 rounded-2xl shadow-sm p-6 bg-white"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-11 h-11 flex items-center justify-center bg-orange-100 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 underline underline-offset-2">
                    {service.title}
                  </h3>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 leading-snug">
                  {service.subtitle}
                </h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                <div className="text-xs bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] p-2 rounded-xl">
                  {service.footer}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 p-8"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-extrabold text-slate-900">
              SEO-ready by structure, not by luck
            </h2>
            <h2 className="mt-3 text-slate-700 leading-relaxed max-w-4xl">
              Semantic HTML, clean headings, fast loading, accessibility, and correct metadata. The
              “boring” foundation that still wins.
            </h2>

            <SectionCTA contacts={contacts} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
              Custom Digital Solutions
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
              Websites & Web Applications We Build
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              From professional business websites to complex custom web applications, we develop
              digital solutions around your business goals, workflows and customers.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Business Websites',
                text: 'Professional business website development for companies, entrepreneurs and SMEs that need credibility, Google visibility and a strong online presence.',
              },
              {
                title: 'Landing Pages',
                text: 'High-converting landing page development for services, advertising campaigns, product launches and lead generation.',
              },
              {
                title: 'Custom Web Applications',
                text: 'Custom web application development for businesses that need functionality beyond a standard website.',
              },
              {
                title: 'SaaS Platforms',
                text: 'Scalable SaaS development with authentication, user accounts, dashboards, subscriptions, payments and custom business logic.',
              },
              {
                title: 'Booking & Reservation Systems',
                text: 'Custom online booking and reservation systems with availability, customer management, payments and automated workflows.',
              },
              {
                title: 'Customer Portals & Dashboards',
                text: 'Secure customer portals, admin dashboards and internal business tools with user roles, databases and API integrations.',
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-extrabold text-slate-900">{item.title}</h3>

                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
              From Idea to Launch
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
              Our Website & Web Application Development Process
            </h2>

            <p className="mt-4 text-slate-700 text-base sm:text-lg leading-relaxed">
              A clear development process keeps your project predictable from the first conversation
              to launch and post-launch support.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                number: '01',
                title: 'Discovery',
                text: 'We discuss your business, goals, target audience, required functionality and project requirements.',
              },
              {
                number: '02',
                title: 'Planning',
                text: 'We define the website structure, features, technology stack, development scope and milestones.',
              },
              {
                number: '03',
                title: 'Design & Development',
                text: 'We create the responsive interface and develop the frontend, backend, APIs and database functionality.',
              },
              {
                number: '04',
                title: 'Testing & Optimization',
                text: 'We test functionality, responsive design, website performance, usability and technical quality.',
              },
              {
                number: '05',
                title: 'Launch & Support',
                text: 'Your website or web application is deployed and can continue with maintenance, updates and future development.',
              },
            ].map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="text-sm font-extrabold text-amber-700">{step.number}</span>

                <h3 className="mt-3 text-lg font-extrabold text-slate-900">{step.title}</h3>

                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY WEBSITE MATTERS ===== */}
      <section className="bg-slate-50 py-16 sm:py-20" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-800 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Websites & Web Applications for Entrepreneurs and SMEs
              </p>

              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Why Your Business Needs a Professional Website or Custom Web Application
              </h2>

              <h2 className="mt-4 text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl">
                Social media is rented land. Algorithms change, accounts get restricted, ads get
                expensive. A website or web application is your permanent base — where trust, SEO
                traffic, and conversions compound over time.
              </h2>

              <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="font-extrabold text-slate-900">Old-school truth:</p>
                <h2 className="mt-2 text-slate-700 leading-relaxed">
                  Customers still Google you before they pay. If they can’t find a professional
                  website or web application, they assume you’re not serious.
                </h2>
              </div>

              <div className="mt-4">
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 font-extrabold text-amber-800 underline underline-offset-4 hover:text-amber-900 transition"
                >
                  Get in touch for a website plan <FaArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <h2 className="text-sm font-extrabold text-slate-900">Trust & credibility</h2>
                <h3 className="mt-2 text-sm text-slate-700 leading-relaxed">
                  A clean website or web application instantly builds trust and elevates your brand
                  — for clients worldwide and B2B decision-makers.
                </h3>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <h2 className="text-sm font-extrabold text-slate-900">SEO = free traffic</h2>
                <h3 className="mt-2 text-sm text-slate-700 leading-relaxed">
                  A proper structure + speed + metadata brings steady traffic without paying per
                  click forever.
                </h3>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <h2 className="text-sm font-extrabold text-slate-900">Leads 24/7</h2>
                <h3 className="mt-2 text-sm text-slate-700 leading-relaxed">
                  Contact forms, WhatsApp, booking — your website or web application works while you
                  sleep.
                </h3>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <h2 className="text-sm font-extrabold text-slate-900">Control & ownership</h2>
                <h3 className="mt-2 text-sm text-slate-700 leading-relaxed">
                  You own your content, your design, your funnel — not a platform that can change
                  rules tomorrow.
                </h3>
              </div>

              <div className="sm:col-span-2 rounded-3xl p-[1px] bg-gradient-to-br from-[#5a5a5a] via-[#ffd659] to-[#8c4a12]">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h2 className="font-extrabold text-slate-900">Result:</h2>
                  <h3 className="mt-2 text-slate-700 leading-relaxed">
                    A website or a web application is a business asset — it increases trust,
                    generates leads, and supports growth without constant manual work.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section
        className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#fdfdfb] via-[#f6f2e3] to-[#c4bdb7] text-gray-950 mt-6"
        data-aos="fade-up"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                Why{' '}
                <span className="bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] bg-clip-text text-transparent">
                  choose
                </span>{' '}
                us
                <br />
                for Your Web Development Project?
              </h2>

              <h2 className="mt-5 text-base sm:text-lg md:text-xl text-slate-800 leading-relaxed max-w-2xl">
                You get one responsible person, a clean delivery process, and a product that stays
                stable after launch. No handovers. No chaos. No “we’ll fix it later”.
              </h2>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="h-14 w-14 rounded-2xl ring-1 ring-white/10 bg-gradient-to-br from-violet-300/25 via-fuchsia-300/25 to-cyan-300/25 backdrop-blur-sm flex items-center justify-center">
                      <FiFileText className="h-7 w-7 text-violet-300" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Clear scope & deliverables</h2>
                    <h3 className="mt-2 text-slate-800 italic">
                      Defined milestones, timeline, and what you get — before work starts.
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="h-14 w-14 rounded-2xl ring-1 ring-white/10 bg-gradient-to-br from-cyan-300/25 via-sky-300/25 to-teal-300/25 backdrop-blur-sm flex items-center justify-center">
                      <FiMessageCircle className="h-7 w-7 text-cyan-300" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Communication that works</h2>
                    <h3 className="mt-2 text-slate-800 italic">
                      Short feedback loops, fast replies, one place for all updates.
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="h-14 w-14 rounded-2xl ring-1 ring-white/10 bg-gradient-to-br from-amber-300/25 via-orange-300/25 to-rose-300/25 backdrop-blur-sm flex items-center justify-center">
                      <FiCheckSquare className="h-7 w-7 text-amber-300" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Full visibility of progress</h2>
                    <h3 className="mt-2 text-slate-800 italic">
                      You always know what’s done, what’s next, and what’s shipping.
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="h-14 w-14 rounded-2xl ring-1 ring-white/10 bg-gradient-to-br from-indigo-300/25 via-blue-300/25 to-cyan-300/25 backdrop-blur-sm flex items-center justify-center">
                      <FiMonitor className="h-7 w-7 text-blue-300" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Post-launch support</h2>
                    <h3 className="mt-2 text-slate-800 italic">
                      Fixes and improvements so your website stays fast and stable.
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="h-14 w-14 rounded-2xl ring-1 ring-white/10 bg-gradient-to-br from-emerald-300/25 via-teal-300/25 to-cyan-300/25 backdrop-blur-sm flex items-center justify-center">
                      <FiStar className="h-7 w-7 text-emerald-300" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">Fast launch, premium result</h2>
                    <h3 className="mt-2 text-slate-800 italic">
                      Templates for speed + custom polish for uniqueness — you get both, done
                      properly.
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="h-14 w-14 rounded-2xl ring-1 ring-white/10 bg-gradient-to-br from-fuchsia-300/25 via-pink-300/25 to-rose-300/25 backdrop-blur-sm flex items-center justify-center">
                      <FaLaptopCode className="h-7 w-7 text-rose-300" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Clean build quality</h2>
                    <h3 className="mt-2 text-slate-800 italic">
                      Maintainable code, SEO structure, performance-first delivery.
                    </h3>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="mt-3">
                  <Link
                    href="/contacts"
                    className="inline-flex items-center gap-2 font-extrabold text-amber-800 underline underline-offset-4 hover:text-amber-900 transition"
                  >
                    Need details? Go to Contact page <FaArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="relative inline-block max-w-xl">
                <div className="relative rounded-3xl px-6 py-5 italic text-[17px] leading-relaxed text-black/90 shadow-lg ring-1 ring-black/10 bg-gradient-to-br from-[#5a5a5a] via-[#ffd659] to-[#8c4a12]">
                  We are not selling “hours”. We are delivering an outcome. You get a stable
                  product, clear structure, and the kind of quality that still works months after
                  launch — not only on day one.
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-3 left-10 h-6 w-6 rotate-45 bg-gradient-to-br from-[#5a5a5a] via-[#ffd659] to-[#8c4a12] shadow-lg ring-1 ring-black/10 rounded-sm"
                  />
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm">
                <p className="font-extrabold text-slate-900">Start Your Web Development Project</p>
                <h2 className="mt-2 text-slate-700 text-sm leading-relaxed">
                  Send your idea + deadline + examples you like. We’ll reply with a clear plan and
                  next steps.
                </h2>

                <div className="mt-4">
                  <SectionCTA contacts={contacts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING / SERVICES CAROUSEL ===== */}
      <section className="bg-slate-50 mt-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-slate-900"
            data-aos="fade-down"
          >
            Website & Web Application Development Packages
          </h2>
          <h3 className="mt-4 text-center text-slate-700 max-w-3xl mx-auto" data-aos="fade-in">
            Choose a clear package, get predictable delivery. No chaos, no vague promises.
          </h3>

          <div className="mt-10" data-aos="fade-up">
            <ServicePricing />
          </div>
        </div>
      </section>

      <IndustrySolutions />

      {/* ===== TECH EXPERTISE ===== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
            data-aos="fade-down"
          >
            Web Development Technologies We Use
          </h2>
          <h3 className="text-slate-700 max-w-4xl mx-auto mb-12" data-aos="fade-in">
            Modern stack, traditional discipline: clean structure and predictable logic.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {blocks.map((block, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="relative bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 group"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-l-2xl" />
                <div className="relative z-10">
                  <h3 className="font-extrabold text-slate-900 mb-2 underline group-hover:text-blue-800 transition">
                    {block.title}
                  </h3>
                  <h4 className="text-gray-800 text-sm leading-relaxed">{block.tech}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SWIPER ===== */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-slate-900"
            data-aos="fade-down"
          >
            Client Reviews for Our Web Development Projects
          </h2>
          <h3 className="mt-4 text-center text-slate-700 max-w-3xl mx-auto" data-aos="fade-in">
            Real feedback from real projects. Consistency, speed, and structure — that’s what
            clients pay for.
          </h3>

          <div className="mt-10" data-aos="fade-up">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop
              pagination={{ clickable: true }}
              spaceBetween={18}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-10"
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={`${t.name}-${idx}`} className="h-auto">
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                    <Stars value={t.rating} />
                    <p className="mt-4 text-slate-800 leading-relaxed italic">“{t.text}”</p>
                    <div className="mt-6 border-t border-slate-200 pt-4">
                      <p className="font-extrabold text-slate-900">{t.name}</p>
                      <p className="text-sm text-slate-600">
                        {t.role} — <span className="font-semibold">{t.company}</span>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ===== FAQ (stable, no disappearing) ===== */}
      <section className="bg-gradient-to-t from-white to-gray-200 py-20" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 mb-12">
            Web Development Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <Image
                src="/img/bannerhome/img-faq.jpg"
                alt="FAQ visual"
                width={1200}
                height={800}
                className="rounded-3xl shadow-xl w-full h-auto"
              />
            </div>

            <div className="space-y-5">
              {faqData.slice(0, showAllFaqs ? faqData.length : 5).map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    className={[
                      'rounded-2xl border bg-white shadow-sm transition-all duration-300',
                      isOpen
                        ? 'border-amber-400 shadow-md'
                        : 'border-slate-200 hover:border-amber-200',
                    ].join(' ')}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      aria-expanded={isOpen}
                      className={[
                        // ✅ мобільна: компактніше + стабільна висота
                        'w-full text-left',
                        'px-4 py-4 sm:px-6 sm:py-5',
                        'flex items-center gap-3',
                      ].join(' ')}
                    >
                      {/* ✅ Ліва частина (номер + питання) */}
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        {/* номер — не стискається */}
                        <span className="shrink-0 text-sm font-bold text-slate-500 leading-none pt-1">
                          {idx + 1}.
                        </span>

                        {/* текст — дозволяємо нормально ламатися, але без “з’їдання” */}
                        <span className="min-w-0">
                          <span
                            className={[
                              'block font-semibold leading-snug transition-colors',
                              // ✅ мобільна типографіка
                              'text-[15px] sm:text-base',
                              isOpen ? 'text-amber-800' : 'text-slate-900',
                            ].join(' ')}
                            // якщо хочеш щоб не було 3-4 рядків на мобілці:
                            // className + "line-clamp-2"
                          >
                            {item.question}
                          </span>
                        </span>
                      </div>

                      {/* ✅ Права кнопка +/- — завжди однакова форма */}
                      <span
                        className={[
                          'shrink-0',
                          'grid place-items-center',
                          // ✅ фіксуємо розмір
                          'h-10 w-10 sm:h-11 sm:w-11',
                          'rounded-full border',
                          'transition',
                          isOpen
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'bg-white border-slate-200 text-slate-700',
                        ].join(' ')}
                        aria-hidden="true"
                      >
                        {/* ✅ іконки однакового розміру */}
                        {isOpen ? <FaMinus className="h-4 w-4" /> : <FaPlus className="h-4 w-4" />}
                      </span>
                    </button>

                    {/* ✅ Відкриття/закриття без “жування” */}
                    <div
                      className={[
                        'overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out',
                        isOpen ? 'max-h-[260px] opacity-100' : 'max-h-0 opacity-0',
                      ].join(' ')}
                    >
                      <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                        <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {faqData.length > 5 && (
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAllFaqs((prev) => !prev);

                      if (showAllFaqs && openIndex !== null && openIndex >= 5) {
                        setOpenIndex(null);
                      }
                    }}
                    aria-expanded={showAllFaqs}
                    className="
        inline-flex items-center justify-center gap-2
        rounded-full border border-slate-300 bg-white
        px-6 py-3
        text-sm sm:text-base font-bold text-slate-800
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-amber-400
        hover:bg-amber-50
        hover:text-amber-800
        hover:shadow-md
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-amber-500
        focus-visible:ring-offset-2
      "
                  >
                    {showAllFaqs ? (
                      <>
                        Show Fewer Questions
                        <FaMinus className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        Show More Questions
                        <FaPlus className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="mt-10">
                <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#5a5a5a] via-[#ffd659] to-[#8c4a12]">
                  <div className="rounded-3xl bg-white px-6 py-6 text-center shadow-md">
                    <p className="text-slate-700 text-sm">Still have questions?</p>

                    <Link
                      href="/contacts"
                      className="mt-3 inline-flex items-center gap-2 rounded-full
                      bg-slate-900 px-6 py-3 text-white font-extrabold
                      shadow-lg transition-all duration-300
                      hover:-translate-y-1 hover:shadow-xl
                      hover:bg-amber-600"
                    >
                      For more information — Contact us
                    </Link>

                    <p className="mt-3 text-xs text-slate-500">We respond within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Swiper */}
      <section className=" py-5">
        <div
          className="mt-14 rounded-3xl bg-white border border-slate-200 shadow-sm px-5 sm:px-8 py-6"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded bg-pink-400" aria-hidden="true" />
            <p className="font-bold text-slate-900 tracking-wide">OUR CLIENTS</p>
            <h3 className="text-sm text-slate-500">Selected collaborations & projects</h3>
          </div>

          <div className="mt-6">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 1800, disableOnInteraction: false }}
              loop
              slidesPerView={2}
              spaceBetween={14}
              breakpoints={{
                480: { slidesPerView: 3, spaceBetween: 16 },
                768: { slidesPerView: 4, spaceBetween: 18 },
                1024: { slidesPerView: 5, spaceBetween: 22 },
              }}
            >
              {clientLogos.map((logo, i) => (
                <SwiperSlide key={`${logo.name}-${i}`} className="h-auto">
                  <div
                    className={[
                      // ✅ однакова геометрія
                      'h-16 sm:h-18',
                      'rounded-2xl border border-slate-200',
                      'bg-gradient-to-br from-white to-slate-50',
                      'shadow-sm hover:shadow transition',
                      'px-3 py-2',
                      'flex items-center justify-center',
                    ].join(' ')}
                  >
                    <div className="min-w-0 text-center leading-tight">
                      <div className="text-slate-900 font-extrabold tracking-wide text-sm sm:text-base truncate">
                        {logo.name}
                      </div>

                      {logo.tagline ? (
                        <div className="text-[11px] sm:text-xs text-slate-500 truncate">
                          {logo.tagline}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
