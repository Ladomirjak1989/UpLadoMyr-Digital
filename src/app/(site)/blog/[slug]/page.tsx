// src/app/blog/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { API_BASE, FRONTEND_BASE_URL } from '@/lib/api';
import ShareButtons from '@/components/Button/ShareButtons';

type Post = {
  id: number;
  slug: string;
  title: string;
  content?: string | null;
  longDescription?: string | null;
  coverImage?: string | null;
  category: string;
  tags: string[];
  authorName?: string | null;
  authorAvatar?: string | null;
  sourceUrl?: string | null;
  canonicalUrl?: string | null;
  publishedAt?: string | null;
  readingTime?: number;
  isFeatured?: string | boolean | null;
  views?: number;
  seoTitle?: string;
  seoDescription?: string | null;
};

async function getPost(slug: string): Promise<Post | null> {
  if (!API_BASE) return null;

  const res = await fetch(`${API_BASE}/api/blog/slug/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

// ────────────────────── META ──────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};

  const baseUrl = FRONTEND_BASE_URL;
  const url = baseUrl ? `${baseUrl}/blog/${p.slug}` : `/blog/${p.slug}`;

  const img = p.coverImage || (baseUrl ? `${baseUrl}/og-default.jpg` : undefined);

  const title = p.seoTitle || p.title;
  const description =
    p.seoDescription || p.longDescription || (p.content ? p.content.slice(0, 220) : '');

  return {
    title,
    description,
    alternates: { canonical: p.canonicalUrl || url },
    openGraph: {
      title,
      description,
      url: baseUrl ? url : undefined,
      type: 'article',
      images: img ? [{ url: img }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: img ? [img] : undefined,
    },
  };
}

// ────────────────────── PAGE ──────────────────────

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();

  const featured =
    p.isFeatured === true ||
    p.isFeatured === 'true' ||
    p.isFeatured === '1' ||
    p.isFeatured === 'yes';

  const publishedDate = p.publishedAt ? new Date(p.publishedAt) : null;

  const baseUrl = FRONTEND_BASE_URL;
  const fullUrl = baseUrl ? `${baseUrl}/blog/${p.slug}` : '';

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-slate-600">
        <Link
          href="/"
          className="relative px-0.5 text-slate-600 hover:text-amber-700 transition
                     after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
                     after:origin-left after:scale-x-0 after:bg-amber-700
                     after:transition-transform after:duration-200 hover:after:scale-x-100"
        >
          Home
        </Link>
        <span className="text-slate-600">/</span>
        <Link
          href="/blog"
          className="relative px-0.5 text-slate-600 hover:text-amber-700 transition
                     after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
                     after:origin-left after:scale-x-0 after:bg-amber-700
                     after:transition-transform after:duration-200 hover:after:scale-x-100"
        >
          Blog
        </Link>
        <span className="text-slate-600">/</span>
        <span className="font-medium text-amber-700 line-clamp-1">{p.title}</span>
      </nav>

      {/* Header block */}
      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-200 via-slate-100 to-amber-200 p-6 sm:p-8 shadow-sm">
        {/* top badges row */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600">
          <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
            {p.category}
          </span>

          {featured && (
            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-800">
              ★ Featured
            </span>
          )}

          {typeof p.views === 'number' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-400/80 px-3 py-1 text-[11px] text-slate-900">
              👁 {p.views} views
            </span>
          )}
        </div>

        {/* title */}
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {p.title}
        </h1>

        {/* meta row + share */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-slate-600">
          {/* left meta: author, date, reading time, views duplicate not needed */}
          <div className="flex flex-wrap items-center gap-3">
            {p.authorName && (
              <div className="flex items-center gap-2">
                {p.authorAvatar && (
                  <Image
                    src={p.authorAvatar}
                    alt={p.authorName}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-amber-400/80"
                  />
                )}
                <span>
                  By <span className="font-medium text-slate-900">{p.authorName}</span>
                </span>
              </div>
            )}

            {publishedDate && (
              <div className="flex items-center gap-1">
                <span>📅</span>
                <span>
                  {publishedDate.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}

            {p.readingTime && (
              <div className="flex items-center gap-1">
                <span>⏱</span>
                <span>~{p.readingTime} min read</span>
              </div>
            )}
          </div>

          {/* 🔹 Share block – навпроти meta/views */}
          {fullUrl && (
            <div className="flex items-center gap-2">
              <ShareButtons url={fullUrl} title={p.title} />
            </div>
          )}
        </div>
      </header>

      {/* Cover image */}
      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
        <Image
          src={p.coverImage || '/img/placeholder/cover-16x9.jpg'}
          alt={p.title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 900px"
        />
      </div>

      {/* Long description intro */}
      {p.longDescription && (
        <section className="mt-8 prose prose-slate max-w-none">
          <div dangerouslySetInnerHTML={{ __html: p.longDescription }} />
        </section>
      )}

      {/* External source notice / local content */}
      {p.sourceUrl ? (
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 text-sm text-amber-900">
          <div className="mb-1 font-semibold">This article is published externally</div>
          <p className="mb-3">For the full content, continue on the original website.</p>
          <a
            href={p.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-amber-200 shadow hover:bg-slate-800"
          >
            Open original article →
          </a>
        </div>
      ) : (
        <>
          {p.content && (
            <article
              className="prose prose-slate mt-8 max-w-none prose-a:text-sky-700 prose-a:no-underline prose-a:hover:underline"
              dangerouslySetInnerHTML={{ __html: p.content }}
            />
          )}
        </>
      )}

      {/* Tags */}
      {!!p.tags?.length && (
        <section className="mt-10 border-t border-slate-200 pt-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100"
              >
                #{t}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SEO info block (canonical / source) */}
      {(p.canonicalUrl || p.sourceUrl) && (
        <section className="mt-8 text-xs text-slate-500">
          {p.canonicalUrl && (
            <div className="truncate">
              Canonical:{' '}
              <a
                href={p.canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 hover:underline"
              >
                {p.canonicalUrl}
              </a>
            </div>
          )}
          {p.sourceUrl && !p.canonicalUrl && (
            <div className="truncate">
              Source:{' '}
              <a
                href={p.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 hover:underline"
              >
                {p.sourceUrl}
              </a>
            </div>
          )}
        </section>
      )}

      {/* Back link */}
      <div className="mt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] border-1 border-amber-950 text-black shadow-lg hover:scale-110 transition-transform"
        >
          ← Back to blog
        </Link>
      </div>
    </div>
  );
}
