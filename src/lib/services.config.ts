export type ServiceSlug = 'visit-card' | 'landing' | 'business' | 'ecommerce' | 'crm';

export type ServiceConfig = {
  slug: ServiceSlug;

  /**
   * Short category displayed above the package title.
   */
  label: string;

  /**
   * Main package name.
   */
  title: string;

  /**
   * Short explanation of who this package is best for.
   */
  idealFor: string;

  /**
   * Estimated development timeline.
   */
  duration: string;

  /**
   * Main features included in the starting package.
   */
  includes: string[];

  /**
   * Starting price displayed on the pricing card.
   */
  price: string;

  /**
   * Optional price prefix.
   */
  pricePrefix?: string;

  /**
   * Card icon.
   */
  icon: string;

  /**
   * Detailed service page.
   */
  link: string;

  /**
   * CTA displayed on the pricing card.
   */
  cta: string;

  /**
   * Optional badge for highlighted packages.
   */
  badge?: string;

  /**
   * SEO metadata for the individual service page.
   */
  seoTitle?: string;
  seoDescription?: string;
};

export const SERVICES: ServiceConfig[] = [
  {
    slug: 'visit-card',

    label: 'Starter Website',

    title: 'Template-Based Website',

    idealFor:
      'For freelancers, consultants, self-employed professionals and small local businesses that need a professional online presence.',

    duration: '3–5 business days',

    includes: [
      '1-page professional website',
      '4-5 content sections',
      'Professional template customization',
      'Responsive mobile & tablet layout',
      'Contact or inquiry form',
      'Click-to-call & email links',
      'Social media integration',
      'Basic on-page SEO',
      'SEO title & meta description',
      'Performance optimization',
      'Deployment & launch',
    ],

    pricePrefix: 'Starting at',
    price: '$599',

    icon: '/img/servicespricing/one-page-site.avif',

    link: '/services/visit-card',

    cta: 'Get Started',

    seoTitle: 'Affordable Small Business Website Development | UpLadoMyr Digital',

    seoDescription:
      'Professional template-based website development for freelancers, consultants and small businesses. Responsive design, contact forms, SEO setup and launch included. Starting at $599.',
  },

  {
    slug: 'landing',

    label: 'Landing Page',

    title: 'Custom Landing Page',

    idealFor:
      'For advertising campaigns, service businesses, product launches and businesses focused on generating qualified leads.',

    duration: '5–8 business days',

    includes: [
      '1 custom-coded landing page',
      '6-8 content sections',
      'Custom responsive design',
      'Conversion-focused page structure',
      'Mobile & tablet optimization',
      'Lead generation or contact form',
      'Strategic call-to-action sections',
      'Social media integration',
      'SEO-friendly page structure',
      'Basic technical SEO',
      'Performance optimization',
      'Analytics-ready setup',
      'Deployment & launch',
    ],

    pricePrefix: 'Starting at',
    price: '$1,200',

    icon: '/img/servicespricing/landing-page.avif',

    link: '/services/landing',

    cta: 'Build My Landing Page',

    seoTitle: 'Custom Landing Page Development for Businesses | UpLadoMyr Digital',

    seoDescription:
      'Custom landing page development for advertising campaigns, services and lead generation. Conversion-focused responsive development, SEO-ready structure and performance optimization. Starting at $1,200.',
  },

  {
    slug: 'business',

    label: 'Business Website',

    title: 'Professional Business Website',

    idealFor:
      'For established businesses, contractors, professional services and growing companies that need a credible and scalable online presence.',

    duration: '1–2 weeks',

    includes: [
      '8-10 website pages',
      'Custom UI design',
      'Custom responsive development',
      'Mobile & tablet optimization',
      'Contact & lead generation forms',
      'Conversion-focused page structure',
      'Clear navigation & user experience',
      'Social media integration',
      'Google Maps integration',
      'SEO-friendly website architecture',
      'Basic on-page SEO',
      'Technical SEO foundation',
      'Performance optimization',
      'Analytics-ready setup',
      'Testing across modern browsers',
      'Deployment & launch',
    ],

    pricePrefix: 'Starting at',
    price: '$3,500',

    icon: '/img/servicespricing/business-page.avif',

    link: '/services/business',

    cta: 'Start My Website',

    badge: 'Most Popular',

    seoTitle: 'Custom Business Website Development | UpLadoMyr Digital',

    seoDescription:
      'Professional custom business website development for companies and service businesses. Responsive design, lead generation, SEO-ready architecture and performance optimization. Starting at $3,500.',
  },

  {
    slug: 'ecommerce',

    label: 'E-commerce',

    title: 'Custom Online Store',

    idealFor:
      'For businesses that want to sell products or services online with a professional, scalable and user-friendly storefront.',

    duration: '2–4 weeks',

    includes: [
      'Custom e-commerce storefront',
      'Product catalog',
      'Product detail pages',
      'Product categories',
      'Shopping cart',
      'Secure checkout',
      'Online payment integration',
      'Order management',
      'Customer account functionality',
      'Responsive mobile & tablet experience',
      'SEO-friendly store architecture',
      'Basic technical SEO',
      'Admin management tools',
      'Transactional email setup',
      'Performance optimization',
      'Checkout & payment testing',
      'Deployment & launch',
    ],

    pricePrefix: 'Starting at',
    price: '$5,500',

    icon: '/img/servicespricing/mobile-shopping.avif',

    link: '/services/ecommerce',

    cta: 'Build My Online Store',

    seoTitle: 'Custom E-commerce Website Development | UpLadoMyr Digital',

    seoDescription:
      'Custom e-commerce website development with product management, secure checkout, payment integration, customer accounts and responsive design. Starting at $5,500.',
  },

  {
    slug: 'crm',

    label: 'Custom Web Application',

    title: 'Web App, CRM & Business System',

    idealFor:
      'For businesses that need custom software, dashboards, customer portals, workflow automation, integrations or advanced data management.',

    duration: '5–12+ weeks',

    includes: [
      'Project architecture & technical planning',
      'Custom business logic',
      'Custom frontend development',
      'Backend & API development',
      'Secure user authentication',
      'User roles & permissions',
      'Admin dashboard',
      'Database architecture & development',
      'Customer & data management',
      'API & third-party integrations',
      'Business workflow automation',
      'Responsive application interface',
      'Security best practices',
      'Testing & quality assurance',
      'Production deployment',
      'Technical setup',
      'Technical documentation',
    ],

    pricePrefix: 'Starting at',
    price: '$12,000',

    icon: '/img/servicespricing/crm.avif',

    link: '/services/crm',

    cta: 'Discuss My Project',

    seoTitle: 'Custom Web Application & CRM Development | UpLadoMyr Digital',

    seoDescription:
      'Custom web application, CRM and business software development with secure authentication, dashboards, databases, APIs, integrations and workflow automation. Starting at $12,000.',
  },
];

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
