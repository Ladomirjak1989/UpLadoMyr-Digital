// src/lib/services.config.ts
export type ServiceSlug = 'visit-card' | 'landing' | 'business' | 'ecommerce' | 'crm';

export type ServiceConfig = {
  slug: ServiceSlug;
  label: string;
  title: string;
  duration: string;
  desc: string;
  price: string;
  icon: string;
  link: string;
  seoTitle?: string;
  seoDescription?: string;
};

export const SERVICES: ServiceConfig[] = [
  {
    slug: 'visit-card',
    label: 'Business Card Website',
    title: 'Template-based website',
    duration: '5–7 days',
    desc: '1 page, 3–4 blocks',
    price: '€150',
    icon: '/img/servicespricing/one-page-site.avif',
    link: '/services/visit-card',
    seoTitle: 'Template-based Business Card Website | UpLadoMyr Digital',
    seoDescription:
      'A simple, template-based business card website for freelancers and small businesses — mobile-friendly and budget-conscious.',
  },
  {
    slug: 'landing',
    label: 'Landing',
    title: 'Landing Page',
    duration: '20–30 days',
    desc: '1 page, up to 4 blocks',
    price: '€500',
    icon: '/img/servicespricing/landing-page.avif',
    link: '/services/landing',
  },
  {
    slug: 'business',
    label: 'Business site',
    title: 'Business Website',
    duration: '30–40 days',
    desc: 'Up to 4 pages',
    price: '€2.300',
    icon: '/img/servicespricing/business-page.avif',
    link: '/services/business',
  },
  {
    slug: 'ecommerce',
    label: 'E-commerce',
    title: 'Online Store',
    duration: '30–50 days',
    desc: 'Catalog, cart, payment, delivery',
    price: '€3.300',
    icon: '/img/servicespricing/mobile-shopping.avif',
    link: '/services/ecommerce',
  },
  {
    slug: 'crm',
    label: 'CRM systems',
    title: 'CRM Systems',
    duration: '40–60 days',
    desc: 'Custom approach, service integration',
    price: '€7.500',
    icon: '/img/servicespricing/crm.avif',
    link: '/services/crm',
  },
];

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
