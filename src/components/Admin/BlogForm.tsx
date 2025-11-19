'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import TagInput from './TagInput';

// ✅ єдина парасолькова константа + типи
import { BLOG } from '@/lib/blog.constants';
import type { BlogCategory, BlogStatus } from '@/lib/blog.constants';

export type AdminPostFormValues = {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  longDescription?: string;
  coverImage?: string;
  category: BlogCategory;
  tags: string[];
  authorName?: string;
  authorAvatar?: string;
  sourceUrl?: string;
  canonicalUrl?: string;
  status?: BlogStatus;
  isFeatured?: boolean;
  readingTime?: number;
  views?: number;
  seoTitle?: string;
  seoDescription?: string;
  // ISO або 'YYYY-MM-DDTHH:mm' (для <input type="datetime-local">)
  publishedAt?: string;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function estimateReadingTime(text?: string) {
  if (!text) return 0;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(0, Math.round(words / 200)); // ~200 wpm
}

const fieldCls =
  'w-full rounded-xl border border-amber-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400';

export default function BlogForm({
  id, // ← ID у режимі edit
  initial,
  mode = 'create',
  onClose,
  onSaved,
}: {
  id?: number;
  initial?: Partial<AdminPostFormValues>;
  mode?: 'create' | 'edit';
  onClose?: () => void;
  onSaved?: () => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [loading, setLoading] = React.useState(mode === 'edit' && !initial);
  const [showContentPreview, setShowContentPreview] = React.useState(true);
  const [showLongPreview, setShowLongPreview] = React.useState(true);

  const [v, setV] = React.useState<AdminPostFormValues>({
    slug: initial?.slug ?? '',
    title: initial?.title ?? '',
    excerpt: initial?.excerpt ?? '',
    content: initial?.content ?? '',
    longDescription: initial?.longDescription ?? '',
    coverImage: initial?.coverImage ?? '',
    category: (initial?.category as BlogCategory) ?? BLOG.CATEGORY.STORAGE_VALUES[0],
    tags: initial?.tags ?? [],
    authorName: initial?.authorName ?? '',
    authorAvatar: initial?.authorAvatar ?? '',
    sourceUrl: initial?.sourceUrl ?? '',
    canonicalUrl: initial?.canonicalUrl ?? '',
    status: (initial?.status as BlogStatus) ?? BLOG.DEFAULTS.STATUS,
    isFeatured: initial?.isFeatured ?? false,
    readingTime: initial?.readingTime ?? estimateReadingTime(initial?.content),
    views: initial?.views ?? 0,
    seoTitle: initial?.seoTitle ?? '',
    seoDescription: initial?.seoDescription ?? '',
    publishedAt: initial?.publishedAt ?? '',
  });

  // якщо initial прийде зверху (наприклад, із обгортки) – оновити форму
  React.useEffect(() => {
    if (!initial) return;

    setV((prev) => ({
      ...prev,
      slug: initial.slug ?? '',
      title: initial.title ?? '',
      excerpt: initial.excerpt ?? '',
      content: initial.content ?? '',
      longDescription: initial.longDescription ?? '',
      coverImage: initial.coverImage ?? '',
      category: (initial.category as BlogCategory) ?? prev.category,
      tags: initial.tags ?? [],
      authorName: initial.authorName ?? '',
      authorAvatar: initial.authorAvatar ?? '',
      sourceUrl: initial.sourceUrl ?? '',
      canonicalUrl: initial.canonicalUrl ?? '',
      status: (initial.status as BlogStatus) ?? prev.status,
      isFeatured: initial.isFeatured ?? false,
      readingTime: initial.readingTime ?? estimateReadingTime(initial.content ?? prev.content),
      views: initial.views ?? 0,
      seoTitle: initial.seoTitle ?? '',
      seoDescription: initial.seoDescription ?? '',
      publishedAt: initial.publishedAt ?? '',
    }));
  }, [initial]);

  // коли редагуємо пост – підтягуємо дані з бекенду по id (якщо initial ще немає)
  React.useEffect(() => {
    if (mode !== 'edit' || !id) return;
    if (initial && initial.title) return; // якщо вже прийшло initial – не грузимо

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/blog/${id}`, {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Failed to load post');
        }
        const data = await res.json();

        setV({
          slug: data.slug ?? '',
          title: data.title ?? '',
          excerpt: data.excerpt ?? '',
          content: data.content ?? '',
          longDescription: data.longDescription ?? '',
          coverImage: data.coverImage ?? '',
          category: (data.category as BlogCategory) ?? BLOG.CATEGORY.STORAGE_VALUES[0],
          tags: Array.isArray(data.tags) ? data.tags : [],
          authorName: data.authorName ?? '',
          authorAvatar: data.authorAvatar ?? '',
          sourceUrl: data.sourceUrl ?? '',
          canonicalUrl: data.canonicalUrl ?? '',
          status: (data.status as BlogStatus) ?? BLOG.DEFAULTS.STATUS,
          isFeatured: !!data.isFeatured,
          readingTime:
            typeof data.readingTime === 'number'
              ? data.readingTime
              : estimateReadingTime(data.content),
          views: typeof data.views === 'number' ? data.views : 0,
          seoTitle: data.seoTitle ?? '',
          seoDescription: data.seoDescription ?? '',
          // Date → 'YYYY-MM-DDTHH:mm' для <input type="datetime-local">
          publishedAt: data.publishedAt
            ? new Date(data.publishedAt).toISOString().slice(0, 16)
            : '',
        });
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message ?? 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [mode, id, initial]);

  // авто-генерація slug від title (тільки в режимі create)
  const lastAuto = React.useRef<string>('');
  React.useEffect(() => {
    if (mode === 'edit') return; // не чіпаємо slug при редагуванні
    if (!v.title) return;

    const auto = slugify(v.title);
    if (!v.slug || v.slug === lastAuto.current) {
      setV((p) => ({ ...p, slug: auto }));
      lastAuto.current = auto;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v.title, mode]);

  // авто-обчислення readingTime
  React.useEffect(() => {
    setV((p) => ({ ...p, readingTime: estimateReadingTime(p.content) }));
  }, [v.content]);

  const onChange = (k: keyof AdminPostFormValues, val: any) => setV((p) => ({ ...p, [k]: val }));

  const URL_OR_PATH_RE = /^(https?:\/\/[^\s]+|\/[^\s]+)$/i;

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!v.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v.slug))
      errs.push('Slug must be lowercase and dash-separated (a-z, 0-9, -).');
    if (!v.title?.trim()) errs.push('Title is required.');
    if (!BLOG.CATEGORY.STORAGE_VALUES.includes(v.category)) errs.push('Category is invalid.');
    if (v.coverImage && !URL_OR_PATH_RE.test(v.coverImage))
      errs.push('Cover image must be http(s) URL or root-relative path.');
    if (v.authorAvatar && !URL_OR_PATH_RE.test(v.authorAvatar))
      errs.push('Author avatar must be http(s) URL or root-relative path.');
    if (v.sourceUrl && !/^https?:\/\/[^\s]+$/i.test(v.sourceUrl))
      errs.push('Source URL must be a valid http(s) URL.');
    if (v.canonicalUrl && !/^https?:\/\/[^\s]+$/i.test(v.canonicalUrl))
      errs.push('Canonical URL must be a valid http(s) URL.');
    if (v.publishedAt && isNaN(Date.parse(v.publishedAt)))
      errs.push('PublishedAt must be a valid ISO date/time.');
    if (typeof v.readingTime === 'number' && v.readingTime < 0)
      errs.push('Reading time cannot be negative.');
    if (typeof v.views === 'number' && v.views < 0) errs.push('Views cannot be negative.');
    if (mode === 'edit' && (id == null || Number.isNaN(id)))
      errs.push('Internal error: missing post ID for edit.');
    if (v.status && !BLOG.STATUS.VALUES.includes(v.status)) errs.push('Status is invalid.');
    return errs;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (errs.length) {
      errs.forEach((m) => toast.error(m));
      return;
    }

    setSubmitting(true);
    try {
      // edit → PATCH /api/blog/:id, create → POST /api/blog
      const isEdit = mode === 'edit' && typeof id === 'number';
      const url = isEdit ? `/api/blog/${id}` : '/api/blog';
      const method = isEdit ? 'PATCH' : 'POST';

      // helper: "" -> undefined
      const clean = (s?: string) => (s && s.trim() !== '' ? s.trim() : undefined);

      const payload: Omit<AdminPostFormValues, 'publishedAt'> & { publishedAt?: string } = {
        ...v,
        excerpt: clean(v.excerpt),
        content: clean(v.content),
        longDescription: clean(v.longDescription),
        coverImage: clean(v.coverImage),
        authorName: clean(v.authorName),
        authorAvatar: clean(v.authorAvatar),
        sourceUrl: clean(v.sourceUrl),
        canonicalUrl: clean(v.canonicalUrl),
        seoTitle: clean(v.seoTitle),
        seoDescription: clean(v.seoDescription),
        tags: Array.isArray(v.tags) ? v.tags.filter(Boolean) : [],
        // datetime-local -> ISO або undefined
        publishedAt: v.publishedAt ? new Date(v.publishedAt).toISOString() : undefined,
      };

      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Request failed');
      }

      toast.success(isEdit ? 'Post updated' : 'Post created');

      if (onSaved) onSaved();
      else {
        router.push('/admin/blog');
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  if (mode === 'edit' && loading) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600">
          Loading post…
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      {/* Хедер форми */}
      <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-gradient-to-br from-[#fdfdfb] via-[#f6f2e3] to-[#c4bdb7] p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {mode === 'create' ? 'Create Blog Post' : 'Edit Blog Post'}
        </h1>
        <p className="text-slate-700 mt-1">
          Fill in the fields below. Required:{' '}
          <span className="font-medium">title, slug, category</span>.
        </p>
      </div>

      {/* Основні поля */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Title</label>
            <input
              className={fieldCls}
              value={v.title}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="Post title"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Slug</label>
              <input
                className={fieldCls}
                value={v.slug}
                onChange={(e) => onChange('slug', slugify(e.target.value))}
                placeholder="my-post-slug"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Lowercase, numbers and dashes only.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <select
                className={fieldCls}
                value={v.category}
                onChange={(e) => onChange('category', e.target.value as BlogCategory)}
              >
                {BLOG.CATEGORY.STORAGE_VALUES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Excerpt</label>
            <textarea
              className={fieldCls}
              rows={3}
              value={v.excerpt ?? ''}
              onChange={(e) => onChange('excerpt', e.target.value)}
              placeholder="Short summary for lists and cards"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">
                Content (Markdown/HTML)
              </label>

              <button
                type="button"
                onClick={() => setShowContentPreview((v) => !v)}
                className="text-xs rounded-full border border-amber-300 px-3 py-1
                 bg-white/70 hover:bg-amber-50 text-slate-800
                 transition shadow-sm"
              >
                {showContentPreview ? 'Hide preview' : 'Show preview'}
              </button>
            </div>

            <textarea
              className={fieldCls}
              rows={12}
              value={v.content ?? ''}
              onChange={(e) => onChange('content', e.target.value)}
              placeholder="Write your article content here…"
            />

            <p className="text-xs text-slate-500 mt-1">
              Estimated reading time: <b>{v.readingTime ?? 0} min</b>
            </p>

            {/* LIVE PREVIEW для контенту */}
            {showContentPreview && v.content && v.content.trim() !== '' && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Content preview
                </div>
                <article
                  className="prose prose-sm sm:prose-base prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: v.content }}
                />
              </div>
            )}
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">
                Long Description (Markdown/HTML)
              </label>

              <button
                type="button"
                onClick={() => setShowLongPreview((v) => !v)}
                className="text-xs rounded-full border border-amber-300 px-3 py-1
                 bg-white/70 hover:bg-amber-50 text-slate-800
                 transition shadow-sm"
              >
                {showLongPreview ? 'Hide preview' : 'Show preview'}
              </button>
            </div>

            <textarea
              className={fieldCls}
              rows={6}
              value={v.longDescription ?? ''}
              onChange={(e) => onChange('longDescription', e.target.value)}
              placeholder="Longer description for SEO or social previews"
            />

            {/* LIVE PREVIEW для longDescription */}
            {showLongPreview && v.longDescription && v.longDescription.trim() !== '' && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Long description preview
                </div>
                <article
                  className="prose prose-sm sm:prose-base prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: v.longDescription }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Tags</label>
            <TagInput
              value={v.tags}
              onChange={(tags) => onChange('tags', tags)}
              placeholder="e.g. nextjs, seo, performance"
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="font-semibold mb-3">Media</h3>
            <label className="block text-sm font-medium text-slate-700">Cover Image</label>
            <input
              className={fieldCls}
              value={v.coverImage ?? ''}
              onChange={(e) => onChange('coverImage', e.target.value)}
              placeholder="https://... or /img/cover.jpg"
            />
            <p className="text-xs text-slate-500 mt-1">
              http(s) URL or root-relative path (/img/...).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="font-semibold mb-3">Author</h3>
            <label className="block text-sm font-medium text-slate-700">Author Name</label>
            <input
              className={fieldCls}
              value={v.authorName ?? ''}
              onChange={(e) => onChange('authorName', e.target.value)}
              placeholder="Full name"
            />
            <label className="block text-sm font-medium text-slate-700 mt-3">Author Avatar</label>
            <input
              className={fieldCls}
              value={v.authorAvatar ?? ''}
              onChange={(e) => onChange('authorAvatar', e.target.value)}
              placeholder="https://... or /img/avatars/jane.jpg"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="font-semibold mb-3">Links</h3>
            <label className="block text-sm font-medium text-slate-700">Source URL</label>
            <input
              className={fieldCls}
              value={v.sourceUrl ?? ''}
              onChange={(e) => onChange('sourceUrl', e.target.value)}
              placeholder="https://original-article.com/post"
            />
            <label className="block text-sm font-medium text-slate-700 mt-3">Canonical URL</label>
            <input
              className={fieldCls}
              value={v.canonicalUrl ?? ''}
              onChange={(e) => onChange('canonicalUrl', e.target.value)}
              placeholder="https://your-domain.com/blog/slug"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="font-semibold mb-3">Publishing</h3>

            <label className="block text-sm font-medium text-slate-700">Status</label>
            <select
              className={fieldCls}
              value={v.status ?? BLOG.DEFAULTS.STATUS}
              onChange={(e) => onChange('status', e.target.value as BlogStatus)}
            >
              {BLOG.STATUS.VALUES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="mt-3 flex items-center gap-2">
              <input
                id="isFeatured"
                type="checkbox"
                checked={!!v.isFeatured}
                onChange={(e) => onChange('isFeatured', e.target.checked)}
                className="accent-amber-500 h-4 w-4"
              />
              <label htmlFor="isFeatured" className="text-sm text-slate-700">
                Featured
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700 mt-3">Published At</label>
            <input
              type="datetime-local"
              className={fieldCls}
              value={v.publishedAt ?? ''}
              onChange={(e) => onChange('publishedAt', e.target.value)}
            />

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Reading Time (min)
                </label>
                <input
                  type="number"
                  min={0}
                  className={fieldCls}
                  value={v.readingTime ?? 0}
                  onChange={(e) => onChange('readingTime', Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700">Views</label>
                <input
                  type="number"
                  min={0}
                  className={fieldCls}
                  value={v.views ?? 0}
                  onChange={(e) => onChange('views', Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="font-semibold mb-3">SEO</h3>
            <label className="block text-sm font-medium text-slate-700">SEO Title</label>
            <input
              className={fieldCls}
              value={v.seoTitle ?? ''}
              onChange={(e) => onChange('seoTitle', e.target.value)}
              maxLength={120}
              placeholder="Custom title for SEO"
            />
            <label className="block text-sm font-medium text-slate-700 mt-3">SEO Description</label>
            <textarea
              className={fieldCls}
              rows={4}
              value={v.seoDescription ?? ''}
              onChange={(e) => onChange('seoDescription', e.target.value)}
              placeholder="Meta description"
            />
          </div>
        </aside>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            if (onClose) onClose();
            else {
              router.push('/admin/blog');
              router.refresh();
            }
          }}
          className="group inline-flex items-center gap-2 rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 px-5 py-2.5 text-slate-900 shadow-sm hover:from-amber-200 hover:via-orange-200 hover:to-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-5 py-2.5 text-white shadow-md ring-1 ring-black/10 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 transition disabled:opacity-60"
        >
          {submitting ? 'Saving…' : mode === 'create' ? 'Create Post' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
