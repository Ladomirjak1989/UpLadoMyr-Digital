'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/api';

export type BlogSearchResult = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  category: string;
};

type Props = {
  initialQuery?: string;
};

const MIN_QUERY_LEN = 2;

const BlogSearch: React.FC<Props> = ({ initialQuery = '' }) => {
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<BlogSearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // live-пошук по всіх категоріях
  useEffect(() => {
    const q = query.trim();

    if (q.length < MIN_QUERY_LEN) {
      setResults([]);
      setOpen(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const sp = new URLSearchParams();
        sp.set('status', 'published');
        sp.set('limit', '5');
        sp.set('q', q);

        const res = await fetch(`${API_BASE}/api/blog?${sp.toString()}`);
        if (!res.ok) throw new Error('Search failed');

        const data = await res.json();
        if (!cancelled) {
          setResults(Array.isArray(data.items) ? data.items : []);
          setOpen(true);
        }
      } catch {
        if (!cancelled) {
          setResults([]);
          setOpen(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250); // простий debounce

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // сабміт форми – повна сторінка результатів /blog?q=...
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();

    const sp = new URLSearchParams();
    if (q) sp.set('q', q); // без category → шукаємо по ВСІХ категоріях

    router.push(sp.toString() ? `/blog?${sp.toString()}` : '/blog');
    setOpen(false);
  };

  const clear = () => {
    setQuery('');
    setResults([]);
    setOpen(false);
    router.push('/blog'); // скинути пошук
  };

  return (
    <div className="relative w-full sm:w-80">
      <form onSubmit={onSubmit} className="relative">
        <input
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search here..."
          className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 pr-20 text-sm shadow-sm
                     focus:outline-none focus:ring-1 focus:ring-amber-400"
        />

        {/* Х – показуємо тільки якщо є хоч одна літера */}
        {query.trim().length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-10 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center
                       rounded-full bg-slate-300 text-slate-900 text-xs
                       hover:bg-slate-400"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        {/* кнопка з лупою */}
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center
                     rounded-full bg-slate-900 text-white shadow hover:bg-slate-800
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Search"
        >
          <span className="text-sm">🔍</span>
        </button>
      </form>

      {/* дропдаун з результатами */}
      {open && results.length > 0 && (
        <div
          className="absolute left-0 right-0 z-20 mt-2 max-h-80 overflow-auto rounded-2xl
                        bg-white shadow-lg ring-1 ring-slate-200"
        >
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="flex gap-3 p-3 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                {p.coverImage && (
                  <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs text-slate-500">{p.category}</div>
                <div className="text-sm font-semibold text-slate-900 line-clamp-2">{p.title}</div>
                {p.excerpt && (
                  <div className="mt-0.5 text-xs text-slate-600 line-clamp-2">{p.excerpt}</div>
                )}
              </div>
            </Link>
          ))}

          {loading && <div className="px-4 py-2 text-xs text-slate-500">Searching…</div>}
        </div>
      )}
    </div>
  );
};

export default BlogSearch;
