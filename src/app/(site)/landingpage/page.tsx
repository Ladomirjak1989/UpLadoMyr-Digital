import type { Metadata } from 'next';
import LandingPage from '@/components/Pages/LandingPage/LandingPage';

const SITE_URL = 'https://upladomyr.com';
const PAGE_URL = `${SITE_URL}/landingpage`;

export const metadata: Metadata = {
  title: 'Custom Web Development & Web Applications',

  description:
    'Custom web development services for businesses, entrepreneurs and SMEs. Professional websites, web applications, SaaS platforms, Next.js, React, full-stack development and API integrations.',

  keywords: [
    'custom web development',
    'custom website development',
    'website development',
    'web development services',
    'web application development',
    'custom web application development',
    'professional website development',
    'business website development',
    'small business website development',
    'website development for small business',
    'web development company',
    'web development agency',
    'web developer',
    'website developer',
    'full stack web development',
    'full stack developer',
    'frontend development',
    'backend development',
    'Next.js development',
    'Next.js developer',
    'React development',
    'React developer',
    'Node.js development',
    'SaaS development',
    'SaaS web application development',
    'API development',
    'API integration services',
    'REST API development',
    'responsive website development',
    'responsive web design',
    'SEO friendly website development',
    'landing page development',
    'business website design',
    'website maintenance',
    'website maintenance services',
    'website performance optimization',
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'UpLadoMyr Digital',
    locale: 'en_US',

    title: 'Custom Website & Web Application Development | UpLadoMyr Digital',

    description:
      'Professional custom web development for businesses. Business websites, web applications, SaaS platforms, Next.js, React, APIs and full-stack development.',

    images: [
      {
        url: '/img/metaimage/meta-img1.avif',
        width: 1200,
        height: 630,
        alt: 'UpLadoMyr Digital custom website and web application development',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Custom Website & Web Application Development | UpLadoMyr Digital',

    description:
      'Custom web development services for businesses, entrepreneurs and SMEs. Websites, web applications, SaaS platforms and full-stack development.',

    images: ['/img/metaimage/meta-img1.avif'],
  },

  category: 'Web Development',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'UpLadoMyr Digital',
      inLanguage: 'en',
    },

    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: 'UpLadoMyr Digital',
      url: SITE_URL,

      description:
        'Custom web development company providing professional website development, web application development, full-stack development, SaaS development, API integrations and website maintenance services.',

      email: 'info@upladomyr.com',
      telephone: '+31619388895',

      areaServed: [
        {
          '@type': 'Country',
          name: 'Netherlands',
        },
        {
          '@type': 'Country',
          name: 'Belgium',
        },
        {
          '@type': 'Country',
          name: 'Germany',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Europe',
        },
      ],

      knowsAbout: [
        'Custom Web Development',
        'Website Development',
        'Web Application Development',
        'Business Website Development',
        'Full-Stack Web Development',
        'Frontend Development',
        'Backend Development',
        'Next.js Development',
        'React Development',
        'TypeScript Development',
        'Node.js Development',
        'NestJS Development',
        'SaaS Development',
        'REST API Development',
        'API Integration',
        'Responsive Web Design',
        'SEO-Friendly Website Development',
        'Website Performance Optimization',
        'Website Maintenance',
      ],
    },

    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}/#webpage`,
      url: PAGE_URL,

      name: 'Custom Website & Web Application Development | UpLadoMyr Digital',

      description:
        'Custom website and web application development services for businesses, entrepreneurs and SMEs.',

      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },

      about: {
        '@id': `${SITE_URL}/#business`,
      },

      inLanguage: 'en',
    },

    {
      '@type': 'Service',
      '@id': `${PAGE_URL}/#service`,

      name: 'Custom Website & Web Application Development',

      serviceType: [
        'Custom Website Development',
        'Web Application Development',
        'Business Website Development',
        'Full-Stack Web Development',
        'SaaS Development',
        'API Integration',
      ],

      provider: {
        '@id': `${SITE_URL}/#business`,
      },

      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Europe',
      },

      description:
        'Professional custom website and web application development including business websites, landing pages, SaaS platforms, frontend development, backend development, API integrations and databases.',
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}/#breadcrumb`,

      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Web Development Services',
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <LandingPage />
    </>
  );
}
