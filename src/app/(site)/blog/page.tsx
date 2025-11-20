// src/app/blog/page.tsx
import Link from 'next/link';
import { API_BASE } from '@/lib/api';
import { BLOG } from '@/lib/blog.constants';
import BlogList, { type BlogListPost } from '@/components/BlogList/BlogList';
import BlogSearch from '@/components/BlogSearch/BlogSearch';
import BlogBanner from '@/components/Banner/BlogBanner';

type SearchParams = Record<string, string | string[] | undefined>;

type ListResponse = {
  items: BlogListPost[];
  total: number;
  page: number;
  pages: number;
};

/** Допоміжна: зчитати одне значення з searchParams */
function getParam(sp: SearchParams, key: string): string | undefined {
  const v = sp[key];
  return typeof v === 'string' ? v : undefined;
}

/** Будуємо query для списку постів */
function buildListQuery(spObj: SearchParams) {
  const sp = new URLSearchParams();

  const q = getParam(spObj, 'q');
  const category = getParam(spObj, 'category');
  const page = getParam(spObj, 'page') ?? '1';

  sp.set('status', 'published');
  sp.set('limit', '6');
  sp.set('page', page);

  if (q) sp.set('q', q);

  // 🔹 якщо шукаємо по q – ігноруємо category, шукаємо по всіх категоріях
  if (!q && category) sp.set('category', category);

  return sp;
}

/** Запит списку по поточним фільтрам */
async function fetchPosts(searchParams: SearchParams): Promise<ListResponse> {
  const sp = buildListQuery(searchParams);

  const res = await fetch(`${API_BASE}/api/blog?${sp.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return { items: [], total: 0, page: 1, pages: 1 };
  }

  return res.json();
}

/** Повертає total для вказаної категорії (або для всіх, якщо category не задано) */
async function fetchTotal(category?: string): Promise<number> {
  const sp = new URLSearchParams();
  sp.set('status', 'published');
  sp.set('limit', '1');
  if (category) sp.set('category', category);

  const res = await fetch(`${API_BASE}/api/blog?${sp.toString()}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) return 0;

  const data = await res.json();
  return typeof data.total === 'number' ? data.total : 0;
}

/** Лічильники по категоріях + загальний total */
async function fetchCategoryCounts() {
  const categories = BLOG.CATEGORY.STORAGE_VALUES;

  const [allTotal, ...categoryTotals] = await Promise.all([
    fetchTotal(undefined),
    ...categories.map((cat: string) => fetchTotal(cat)),
  ]);

  const counts: Record<string, number> = {};
  categories.forEach((cat: string, idx: number) => {
    counts[cat] = categoryTotals[idx] ?? 0;
  });

  return { allTotal, counts };
}

/** ⭐ NEW: окремий запит для "The best articles" – featured пости */
async function fetchBestArticles(): Promise<BlogListPost[]> {
  const sp = new URLSearchParams();
  sp.set('status', 'published');
  sp.set('limit', '3');
  sp.set('featured', 'true');

  const res = await fetch(`${API_BASE}/api/blog?${sp.toString()}`, {
    next: { revalidate: 120 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data.items) ? data.items : [];
}

/** Допоміжна: зібрати href з q + category + page */
function buildHref(params: { q?: string; category?: string; page?: number }) {
  const sp = new URLSearchParams();
  if (params.q) sp.set('q', params.q);
  if (params.category) sp.set('category', params.category);
  if (params.page && params.page > 1) sp.set('page', String(params.page));

  const qs = sp.toString();
  return qs ? `/blog?${qs}` : '/blog';
}

export default async function BlogPage({
  searchParams,
}: {
  // 🔹 у новому Next searchParams – це Promise
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const [listData, categoryData, bestArticles] = await Promise.all([
    fetchPosts(sp),
    fetchCategoryCounts(),
    fetchBestArticles(),
  ]);

  const { items, page, pages } = listData;
  const { allTotal, counts } = categoryData;

  const q = getParam(sp, 'q');
  // 🔹 коли є q – активної категорії немає (бо шукаємо по всіх)
  const activeCategory = q ? undefined : getParam(sp, 'category');

  const categories: string[] = [...BLOG.CATEGORY.STORAGE_VALUES];

  return (
    <>
      <div className="mt-10">
        <BlogBanner />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Ліва колонка – категорії з лічильниками */}
          <aside className="lg:w-64">
            {/* Breadcrumb: Home > Blog */}
            <div className="mb-4 flex items-center gap-1 text-sm">
              <Link
                href="/"
                className="relative px-0.5 text-slate-600 hover:text-amber-700 transition
               after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
               after:origin-left after:scale-x-0 after:bg-amber-700 after:transition-transform
               after:duration-200 hover:after:scale-x-100"
              >
                Home
              </Link>
              <span className="text-slate-400">&gt;</span>
              <span className="font-medium text-amber-700">Blog</span>
            </div>

            <ul className="space-y-2 text-sm">
              {/* All articles – повністю скидає і q, і category */}
              <li>
                <Link
                  href={buildHref({})}
                  className={`flex items-baseline gap-1 ${
                    !activeCategory && !q
                      ? 'font-semibold text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>All articles</span>
                  <span className="text-slate-400">/{allTotal}</span>
                </Link>
              </li>

              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    // категорія теж скидає q – окремий фільтр
                    href={buildHref({ category: cat })}
                    className={`flex items-baseline gap-1 ${
                      activeCategory === cat && !q
                        ? 'font-semibold text-slate-900'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-slate-400">/{counts[cat] ?? 0}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Subscribe to newsletter */}
            <section className="mt-10 rounded-2xl border border-gray-100 bg-gradient-to-b from-amber-50 via-amber-50 to-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Subscribe to newsletter</h3>
              <p className="mt-1 text-sm text-slate-600">
                Get new articles about growth tactics, business websites and tech straight to your
                inbox.
              </p>

              <form
                className="mt-4 flex flex-col gap-3"
                action="/api/newsletter" // TODO: підʼєднаєш свій endpoint, коли буде готовий
                method="post"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm
                   text-slate-900 shadow-sm placeholder:text-slate-400
                   focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold
                   bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] border-1 border-amber-950 text-black rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  Subscribe
                </button>
              </form>
            </section>

            {/* ⭐ NEW: The best articles */}
            {bestArticles.length > 0 && (
              <section className="mt-10 rounded-2xl bg-gradient-to-b from-blue-50 via-amber-50 border border-slate-200/70 p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">The best articles</h3>

                <div className="mt-4 space-y-5">
                  {bestArticles.map((post) => {
                    const dateLabel = post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : null;

                    return (
                      <div
                        key={post.id}
                        className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-300">
                          {post.category}
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-1 block text-sm font-semibold text-slate-900 hover:text-amber-800"
                        >
                          {post.title}
                        </Link>
                        {dateLabel && (
                          <div className="mt-1 text-xs text-slate-500">{dateLabel}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </aside>

          {/* Права частина – заголовок, пошук, список, пагінація */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Blog
              </h1>

              {/* Новий live-пошук */}
              <BlogSearch initialQuery={q ?? ''} />
            </div>

            {/* Список статей */}
            <BlogList items={items} />

            {/* Пагінація */}
            {pages > 1 && (
              <div className="mt-10 flex flex-wrap items-center gap-2">
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <Link
                    key={n}
                    href={buildHref({
                      q: q || undefined,
                      category: activeCategory || undefined,
                      page: n,
                    })}
                    className={`px-3 py-1 rounded-full text-sm ${
                      n === page
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {n}
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
