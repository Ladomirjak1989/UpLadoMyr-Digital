// src/components/Blog/BlogList.tsx
import Link from 'next/link';
import Image from 'next/image';

export type BlogListPost = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  category: string;
  tags: string[];
  publishedAt?: string | null;
  isFeatured: boolean;
};

type Props = {
  items: BlogListPost[];
};

export default function BlogList({ items }: Props) {
  if (!items.length) {
    return <div className="col-span-full text-center text-slate-500 py-16">No posts yet.</div>;
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {items.map((p) => (
        <article
          key={p.id}
          className="group rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white hover:shadow-md transition"
        >
          <Link href={`/blog/${p.slug}`} className="block">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={p.coverImage || '/img/placeholder/cover-16x9.jpg'}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-125"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <div className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
                {p.category}
              </div>
              <h2 className="mt-1 text-lg font-semibold">{p.title}</h2>
              {p.excerpt && <p className="mt-2 text-sm text-slate-600">{p.excerpt}</p>}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
