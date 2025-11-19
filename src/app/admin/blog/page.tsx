'use client';

import { useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import BlogForm from '@/components/Admin/BlogForm';
import { BLOG } from '@/lib/blog.constants';
import type { BlogStatus } from '@/lib/blog.constants';

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  status: BlogStatus;
  publishedAt: string | null;
  isFeatured: boolean;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
};

export default function AdminBlogsPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);

  const [q, setQ] = useState('');
  const [status, setStatus] = useState<BlogStatus | 'all'>('all');
  const [category, setCategory] = useState('');

  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [openForm, setOpenForm] = useState(false);

  // для модального підтвердження видалення
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const query = useMemo(
    () => ({ q, status, category, page, limit }),
    [q, status, category, page, limit]
  );

  const load = async () => {
    setLoading(true);
    try {
      // бекенд: GET /api/blog
      const { data } = await axios.get('/blog', { params: query });
      setItems(data.items ?? []);
      setTotal(Number(data.total ?? 0));
    } catch {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    load();
  }, [query]);

  const onCreate = () => {
    setEditingId(null);
    setOpenForm(true);
  };

  const onEdit = (id: number) => {
    setEditingId(id);
    setOpenForm(true);
  };

  // відкриваємо модалку з підтвердженням
  const askRemove = (post: BlogPost) => {
    setPostToDelete(post);
  };

  const cancelRemove = () => {
    setPostToDelete(null);
  };

  const confirmRemove = async () => {
    if (!postToDelete) return;
    const id = postToDelete.id;

    try {
      // бекенд: DELETE /api/blog/:id
      await axios.delete(`/blog/${id}`);
      toast.success(`Post "${postToDelete.title}" deleted`);
      setPostToDelete(null);
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title…"
          className="border rounded px-3 py-2 w-64"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as BlogStatus | 'all')}
          className="border rounded px-3 py-2"
        >
          <option value="all">All statuses</option>
          {BLOG.STATUS.VALUES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="border rounded px-3 py-2 w-48"
        />
        <button
          onClick={onCreate}
          className="ml-auto rounded-xl bg-blue-900 text-white px-4 py-2 shadow hover:bg-blue-800"
        >
          + New Post
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Reading</th>
              <th className="px-4 py-2">Published</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No posts
                </td>
              </tr>
            ) : (
              items.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-slate-500">{p.slug}</div>
                  </td>
                  <td className="px-4 py-2 text-center">{p.category}</td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={
                        p.status === 'published'
                          ? 'rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5'
                          : 'rounded-full bg-slate-100 text-slate-800 px-2 py-0.5'
                      }
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">{p.readingTime} min</td>
                  <td className="px-4 py-2 text-center">
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => onEdit(p.id)} className="mr-2 underline">
                      Edit
                    </button>
                    <button onClick={() => askRemove(p)} className="text-red-600 underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="mt-4 flex items-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-slate-600">Page {page}</span>
          <button
            disabled={page * limit >= total}
            onClick={() => setPage((p) => p + 1)}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
          <span className="ml-auto text-xs text-slate-500">{total} total</span>
        </div>
      )}

      {/* Modal form */}
      {openForm && (
        <BlogForm
          id={editingId ?? undefined}
          mode={editingId != null ? 'edit' : 'create'}
          onClose={() => {
            setOpenForm(false);
            setEditingId(null);
          }}
          onSaved={() => {
            setOpenForm(false);
            setEditingId(null);
            load();
          }}
        />
      )}

      {/* Modal підтвердження видалення */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Delete post?</h2>
            <p className="text-sm text-slate-700 mb-4">
              Are you sure you want to delete{' '}
              <span className="font-semibold">“{postToDelete.title}”</span>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelRemove}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRemove}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white shadow hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
