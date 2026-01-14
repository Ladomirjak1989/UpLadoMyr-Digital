// app/(site)/projects/[slug]/page.tsx
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import {
  Tag,
  UtensilsCrossed,
  FlaskConical,
  Hammer,
  MessagesSquare,
  Landmark,
  Cpu,
  Scale,
  Stethoscope,
  HeartHandshake,
  Package,
  Briefcase,
  Home,
  CircuitBoard,
  Plane,
  MapPin,
  Star,
} from 'lucide-react';

import Link from 'next/link';
import { Globe, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import BackButton from '@/components/Button/BackButton';
import { API_BASE } from '@/lib/api';
import GalleryPhotoSwipe from '@/components/GalleryPhotoSwipe/GalleryPhotoSwipe';

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription?: string | null;
  features: string[];
  services: string[];
  industry?: string | null;
  location?: string | null;
  gallery: string[];
  imageUrl?: string | null;
  websiteUrl?: string | null;
  category: string;
  status: 'draft' | 'published';
  isFeatured: boolean;
  techStack: string[];
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
};

// ──────────────────────────────────────────────────────────────────────────────
// Backend base
// ──────────────────────────────────────────────────────────────────────────────
async function getProject(slug: string): Promise<Project | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/api/projects/slug/${slug}`, {
      next: { revalidate: 60 },
      cache: 'force-cache',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// ✅ LUXURY (PRO): Cloudinary optimizer + smart media fit
// ──────────────────────────────────────────────────────────────────────────────
const cloudinaryOptimize = (url: string, mode: 'cover' | 'gallery' | 'og' = 'cover') => {
  if (!url) return url;
  if (!url.includes('res.cloudinary.com')) return url;

  if (mode === 'cover') {
    // big hero image but optimized (format/quality + DPR)
    return url.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_2200,dpr_auto/');
  }

  if (mode === 'gallery') {
    // smaller tiles
    return url.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_900,dpr_auto/');
  }

  // stable OG image size
  return url.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_1200,h_630,c_fill,g_auto/');
};

// ✅ LUXURY: heuristic — decide if we should use contain (screenshots) or cover (photos)
// Works well in real portfolios without adding new DB fields.
const shouldContainCover = (url: string) => {
  const u = (url || '').toLowerCase();

  // If you store screenshots with these keywords (common), we never crop
  const looksLikeScreenshot =
    u.includes('screenshot') ||
    u.includes('screen') ||
    u.includes('preview') ||
    u.includes('mockup') ||
    u.includes('portfolio') ||
    u.includes('case') ||
    u.includes('high_quality') ||
    u.includes('serenity') ||
    u.includes('renovatie') ||
    u.includes('werk');

  // PNG screenshots are often UI — better to show full frame
  const isPng = u.endsWith('.png') || u.includes('.png?') || u.includes('/png');

  // If it's from Cloudinary and name suggests UI, contain
  return looksLikeScreenshot || isPng;
};

// ✅ LUXURY: returns Tailwind classes for <Image /> and wrapper background
const getCoverPresentation = (coverRaw: string) => {
  const contain = shouldContainCover(coverRaw);

  return {
    wrapperClass: contain
      ? // clean letterbox for screenshots
        'bg-white'
      : // subtle background for photos; still safe
        'bg-slate-100',
    imageClass: contain
      ? // no cropping
        'object-contain'
      : // photos: fill the frame nicely
        'object-cover object-center',
  };
};

// ──────────────────────────────────────────────────────────────────────────────
// UI helpers
// ──────────────────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-gray-50 p-0 shadow-sm ring-1 ring-slate-200 overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-sky-700 to-sky-500" />
      <div className="p-6">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">{title}</h2>
        <div className="prose prose-slate max-w-none">{children}</div>
      </div>
    </section>
  );
}

function HighlightBrand({ text, brand }: { text: string; brand: string }) {
  const re = new RegExp(brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const parts = text.split(re);
  const matches = text.match(re) ?? [];
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < matches.length && <span className="text-amber-600 font-semibold">{matches[i]}</span>}
        </span>
      ))}
    </>
  );
}

function splitOverview(text?: string | null) {
  if (!text) return { intro: '', howTitle: '', ordered: [] as string[], bullets: [] as string[] };

  const howRe = /(how\s+(?:the\s+)?[^\n]*?\swork[s]?\s*\?)/i;
  const m = text.match(howRe);

  let intro = text.trim();
  let after = '';
  let howTitle = '';

  if (m && m.index !== undefined) {
    intro = text.slice(0, m.index).trim();
    howTitle = m[0].trim();
    after = text.slice(m.index + m[0].length).trim();
  } else {
    after = text.trim();
  }

  const ordered: string[] = [];
  const orderedGlobal = after.matchAll(/\b(\d+)[.)-]\s+([^;]+?)(?=(?:\s*;|\s+\d+[.)-]|$))/g);
  for (const mm of orderedGlobal) {
    const item = (mm[2] || '').replace(/^\s*[-–—•]\s*/, '').trim();
    if (item) ordered.push(item);
  }

  const bullets: string[] = [];
  if (ordered.length === 0) {
    const lines = after.split(/\r?\n/);
    const bulletLineRe = /^\s*(?:[-–—•])\s+(.*\S)\s*$/;
    for (const raw of lines) {
      const mm = raw.match(bulletLineRe);
      if (mm) bullets.push(mm[1].trim());
    }
    if (bullets.length === 0) {
      const alt = after
        .split(/\s+(?:[-–—•])\s+/g)
        .map((s) => s.trim())
        .filter(Boolean);
      if (alt.length > 1) bullets.push(...alt);
    }
  }

  return { intro, howTitle, ordered, bullets };
}

// Category → icon map
const categoryIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Hospitality: UtensilsCrossed,
  'Bio Tech': FlaskConical,
  Construction: Hammer,
  Consulting: MessagesSquare,
  'Financial Services': Landmark,
  IT: Cpu,
  Legal: Scale,
  Medical: Stethoscope,
  Nonprofit: HeartHandshake,
  Product: Package,
  'Professional Services': Briefcase,
  'Real Estate': Home,
  Technology: CircuitBoard,
  'Tourism Agency': Plane,
};

function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = categoryIcon[name] ?? Tag;
  return <Icon className={className} />;
}

function Badge({
  children,
  variant = 'default',
  icon,
}: {
  children: ReactNode;
  variant?: 'default' | 'soft' | 'warn' | 'outline';
  icon?: ReactNode;
}) {
  const base = 'inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm';
  const cls =
    variant === 'outline'
      ? 'border border-slate-900/60 bg-white'
      : variant === 'soft'
        ? 'bg-slate-100 text-slate-900'
        : variant === 'warn'
          ? 'bg-amber-50 ring-1 ring-amber-300 text-amber-900'
          : 'bg-white border border-slate-200';

  return (
    <span className={`${base} ${cls}`}>
      {icon && <span className="shrink-0 text-slate-700">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

// URL фронта (canonical/OG/JSON-LD)
const SITE = (process.env.NEXT_PUBLIC_FRONTEND_LOCALHOST_URL || '').replace(/\/$/, '');

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return {};

  const url = SITE ? `${SITE}/projects/${p.slug}` : undefined;
  const title = `${p.title} — Case Study`;
  const desc = p.longDescription || p.description || '';

  // ✅ LUXURY: optimized OG image
  const imgRaw = p.imageUrl || p.gallery?.[0] || (SITE ? `${SITE}/og-default.jpg` : undefined);
  const img = imgRaw ? cloudinaryOptimize(imgRaw, 'og') : undefined;

  return {
    title,
    description: desc,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description: desc,
      url,
      type: 'article',
      images: img ? [{ url: img }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: img ? [img] : undefined,
    },
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────────────
async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p || p.status !== 'published') notFound();

  const coverRaw = p.imageUrl || p.gallery?.[0] || '/placeholder.png';
  const cover = cloudinaryOptimize(coverRaw, 'cover');

  // ✅ LUXURY: decide contain vs cover automatically
  const coverPresentation = getCoverPresentation(coverRaw);

  const BRAND = p.title;
  const { intro, howTitle, ordered, bullets } = splitOverview(p.longDescription || p.description);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    about: p.description,
    description: p.longDescription || p.description,
    url: p.websiteUrl || (SITE ? `${SITE}/projects/${p.slug}` : undefined),
    image: [coverRaw, ...(p.gallery || [])].filter(Boolean),
    genre: p.category,
    keywords: [...(p.techStack || []), ...(p.features || [])].join(', '),
    locationCreated: p.location || undefined,
    industry: p.industry || undefined,
    dateCreated: p.createdAt || undefined,
    dateModified: p.updatedAt || undefined,
  };

  return (
    <>
      <div className="mt-24 ml-7">
        <BackButton />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 md:py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mb-6 flex items-center justify-between">
          <nav
            aria-label="Breadcrumb"
            className="mb-1 flex flex-wrap items-center gap-1 text-sm text-slate-600"
          >
            <Link
              href="/"
              className="relative px-0.5 text-slate-600 hover:text-amber-700 transition
               after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
               after:origin-left after:scale-x-0 after:bg-amber-700 after:transition-transform
               after:duration-200 hover:after:scale-x-100"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/projects"
              className="relative px-0.5 text-slate-600 hover:text-amber-700 transition
               after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
               after:origin-left after:scale-x-0 after:bg-amber-700 after:transition-transform
               after:duration-200 hover:after:scale-x-100"
            >
              Projects
            </Link>
            <span className="text-slate-600">/</span>
            <span className="font-medium text-amber-700 line-clamp-1">{p.title}</span>
          </nav>
        </div>

        <div className="mb-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              {p.title}
            </span>
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <Badge variant="outline" icon={<CategoryIcon name={p.category} className="h-4 w-4" />}>
              {p.category}
            </Badge>

            {p.industry && (
              <Badge variant="soft" icon={<Briefcase className="h-4 w-4" />}>
                {p.industry}
              </Badge>
            )}

            {p.location && (
              <Badge variant="soft" icon={<MapPin className="h-4 w-4" />}>
                {p.location}
              </Badge>
            )}

            {p.isFeatured && (
              <Badge variant="warn" icon={<Star className="h-4 w-4" />}>
                Featured
              </Badge>
            )}

            {p.websiteUrl && (
              <Link
                href={p.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open project website: ${p.websiteUrl}`}
                title="Open website (opens in a new tab)"
                className="group inline-flex items-center justify-center gap-2
  rounded-2xl px-5 py-2.5 text-sm font-semibold
  text-slate-900
  bg-gradient-to-r from-[#f6d365] via-[#efc741] to-[#c58a1b]
  shadow-md ring-1 ring-amber-900/15
  hover:from-[#ffd777] hover:via-[#f3cf55] hover:to-[#d79a2b]
  hover:shadow-lg hover:-translate-y-[1px]
  active:translate-y-0 active:shadow-sm
  focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70
  transition-all duration-200"
              >
                <Globe className="h-4 w-4 opacity-95" />
                <span className="font-medium">Visit website</span>
                <ArrowUpRight className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* ✅ LUXURY Cover: auto contain for screenshots / cover for photos */}
        <div
          className={`relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow ${coverPresentation.wrapperClass}`}
        >
          <Image
            src={cover}
            alt={`${p.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
            className={coverPresentation.imageClass}
            priority
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Section title="Overview">
              {intro && (
                <p className="text-lg leading-relaxed text-slate-900/90 font-medium">
                  <HighlightBrand text={intro} brand={BRAND} />
                </p>
              )}

              {howTitle && (
                <h3 className="mt-5 text-lg font-semibold text-slate-900 tracking-tight">
                  <HighlightBrand text={howTitle} brand={BRAND} />
                </h3>
              )}

              {!!ordered.length && (
                <ol className="mt-3 list-decimal pl-6 space-y-2 text-slate-700">
                  {ordered.map((line, i) => (
                    <li key={i}>
                      <HighlightBrand text={line} brand={BRAND} />
                    </li>
                  ))}
                </ol>
              )}

              {!ordered.length && !!bullets.length && (
                <ul className="mt-3 space-y-2">
                  {bullets.map((line, i) => (
                    <li
                      key={i}
                      className="relative pl-6 text-slate-700 before:absolute before:left-0 before:top-0.5 before:content-['•'] before:text-slate-500"
                    >
                      <HighlightBrand text={line} brand={BRAND} />
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            {!!p.features?.length && (
              <Section title="Key features">
                <ul className="space-y-2">
                  {p.features.map((f, i) => (
                    <li
                      key={i}
                      className="relative pl-6 text-slate-700 before:absolute before:left-0 before:top-0.5 before:content-['•'] before:text-slate-400"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {!!p.services?.length && (
              <Section title="Services provided">
                <div className="flex flex-wrap gap-2">
                  {p.services.map((s, i) => (
                    <span key={i} className="rounded-full bg-slate-200 px-3 py-1 text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {!!p.gallery?.length && (
              <Section title="Gallery">
                <GalleryPhotoSwipe title={p.title} images={p.gallery} />
              </Section>
            )}
          </div>

          <aside className="space-y-6">
            <Section title="Tech stack">
              {p.techStack?.length ? (
                <ul className="flex flex-wrap gap-2">
                  {p.techStack.map((t, i) => (
                    <li key={i} className="rounded-full border px-3 py-1 text-sm bg-white">
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">—</p>
              )}
            </Section>

            <Section title="Project meta">
              <dl className="grid grid-cols-3 gap-2 text-sm">
                <dt className="col-span-1 text-slate-500">Category</dt>
                <dd className="col-span-2">{p.category}</dd>
                {p.industry && (
                  <>
                    <dt className="col-span-1 text-slate-500">Industry</dt>
                    <dd className="col-span-2">{p.industry}</dd>
                  </>
                )}
                {p.location && (
                  <>
                    <dt className="col-span-1 text-slate-500">Location</dt>
                    <dd className="col-span-2">{p.location}</dd>
                  </>
                )}
                {p.websiteUrl && (
                  <>
                    <dt className="col-span-1 text-slate-500">Website</dt>
                    <dd className="col-span-2">
                      <a
                        href={p.websiteUrl}
                        className="text-slate-900 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {p.websiteUrl}
                      </a>
                    </dd>
                  </>
                )}
              </dl>
            </Section>

            {p.isFeatured && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                ⭐ Featured case — highlighted on the homepage
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

export default ProjectDetailsPage;
