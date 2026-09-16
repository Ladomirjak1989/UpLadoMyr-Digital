// src/lib/services.config.ts

export type ServiceSlug = 'visit-card' | 'landing' | 'business' | 'ecommerce' | 'crm';

export type ServiceConfig = {
  slug: ServiceSlug;

  /**
   * Short category displayed at the top of the pricing card.
   */
  label: string;

  /**
   * Main service/package name.
   */
  title: string;

  /**
   * Short explanation of who this package is best suited for.
   */
  idealFor: string;

  /**
   * Estimated development time.
   */
  duration: string;

  /**
   * Main features included in the starting package.
   */
  includes: string[];

  /**
   * Starting price.
   */
  price: string;

  /**
   * Card icon.
   */
  icon: string;

  /**
   * Detailed service page.
   */
  link: string;

  seoTitle?: string;
  seoDescription?: string;
};

export const SERVICES: ServiceConfig[] = [
  {
    slug: 'visit-card',

    label: 'Starter Website',

    title: 'Template-Based Website',

    idealFor: 'For freelancers, self-employed professionals and small local businesses.',

    duration: '5–7 days',

    includes: [
      '1-page website',
      '3–4 content sections',
      'Professional template customization',
      'Responsive mobile & tablet layout',
      'Contact form',
      'Social media & messenger links',
      'Basic SEO setup',
      'Deployment & launch',
    ],

    price: '€299',

    icon: '/img/servicespricing/one-page-site.avif',

    link: '/services/visit-card',

    seoTitle: 'Template-Based Website Development | UpLadoMyr Digital',

    seoDescription:
      'Affordable template-based website development for freelancers, self-employed professionals and small businesses with responsive design, contact forms and basic SEO setup.',
  },

  {
    slug: 'landing',

    label: 'Landing Page',

    title: 'Custom Landing Page',

    idealFor: 'For services, advertising campaigns, product launches and lead generation.',

    duration: '7–12 days',

    includes: [
      '1 custom-coded landing page',
      '4-6 content sections',
      'Custom responsive design',
      'Mobile & tablet optimization',
      'Contact or lead generation form',
      'Call-to-action sections',
      'Social media integration',
      'SEO-ready page structure',
      'Basic technical SEO setup',
      'Performance optimization',
      'Deployment & launch',
    ],

    price: '€650',

    icon: '/img/servicespricing/landing-page.avif',

    link: '/services/landing',

    seoTitle: 'Custom Landing Page Development | UpLadoMyr Digital',

    seoDescription:
      'Custom landing page development for businesses, services and advertising campaigns with responsive design, lead generation forms, SEO-ready structure and performance optimization.',
  },

  {
    slug: 'business',

    label: 'Business Website',

    title: 'Professional Business Website',

    idealFor:
      'For companies and professional service businesses that need a strong online presence.',

    duration: '10–14 days',

    includes: [
      '4-8 pages',
      'Custom responsive design',
      'Mobile & tablet optimization',
      'Contact & lead generation forms',
      'Clear navigation & page structure',
      'Social media integration',
      'Google Maps integration',
      'SEO-ready website structure',
      'Basic technical SEO setup',
      'Performance optimization',
      'Deployment & launch',
    ],

    price: '€2,300',

    icon: '/img/servicespricing/business-page.avif',

    link: '/services/business',

    seoTitle: 'Professional Business Website Development | UpLadoMyr Digital',

    seoDescription:
      'Professional business website development with custom responsive design, lead generation forms, SEO-ready structure, performance optimization and deployment.',
  },

  {
    slug: 'ecommerce',

    label: 'E-commerce',

    title: 'Online Store',

    idealFor: 'For businesses that want to sell products or services online.',

    duration: '20–25 days',

    includes: [
      'Product catalog',
      'Product detail pages',
      'Shopping cart',
      'Checkout functionality',
      'Online payment integration',
      'Order management',
      'Customer account functionality',
      'Responsive mobile & tablet design',
      'SEO-ready store structure',
      'Basic technical SEO setup',
      'Admin management tools',
      'Testing, deployment & launch',
    ],

    price: '€3,200',

    icon: '/img/servicespricing/mobile-shopping.avif',

    link: '/services/ecommerce',

    seoTitle: 'E-commerce Website Development | UpLadoMyr Digital',

    seoDescription:
      'Custom e-commerce website development with product catalog, shopping cart, checkout, online payment integration, order management and responsive design.',
  },

  {
    slug: 'crm',

    label: 'Custom Web App',

    title: 'CRM & Business System',

    idealFor:
      'For businesses that need custom workflows, internal tools, automation or data management.',

    duration: '30–40+ days',

    includes: [
      'Custom business logic',
      'Secure user authentication',
      'User roles & permissions',
      'Admin dashboard',
      'Database development',
      'Customer & data management',
      'API & third-party integrations',
      'Business workflow automation',
      'Responsive user interface',
      'Testing & quality assurance',
      'Deployment & technical setup',
      'Technical documentation',
    ],

    price: '€7,500',

    icon: '/img/servicespricing/crm.avif',

    link: '/services/crm',

    seoTitle: 'Custom CRM & Business System Development | UpLadoMyr Digital',

    seoDescription:
      'Custom CRM and business web application development with secure authentication, dashboards, databases, workflow automation and API integrations.',
  },
];

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
