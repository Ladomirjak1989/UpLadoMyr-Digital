// 'use client';

// import React, { useEffect, useMemo, useState } from 'react';
// import axios from '@/lib/axios';
// import { useAuth } from '@/context/AuthContext';
// import { cn } from '@/lib/cn';

// // ==== Types (sync with backend) ====
// export type ProjectStatus = 'draft' | 'published';
// export type ProjectCategory =
//   | 'Hospitality'
//   | 'Bio Tech'
//   | 'Construction'
//   | 'Consulting'
//   | 'Financial Services'
//   | 'IT'
//   | 'Legal'
//   | 'Medical'
//   | 'Nonprofit'
//   | 'Product'
//   | 'Professional Services'
//   | 'Real Estate'
//   | 'Technology'
//   | 'Tourism Agency';

// export type ProjectRow = {
//   id: number;
//   slug: string;
//   title: string;
//   description: string;
//   longDescription?: string | null; // 🆕
//   features: string[]; // 🆕
//   services: string[]; // 🆕
//   industry?: string | null; // 🆕
//   location?: string | null; // 🆕
//   gallery: string[]; // 🆕
//   imageUrl?: string | null;
//   websiteUrl?: string | null;
//   category: ProjectCategory;
//   isFeatured: boolean;
//   status: ProjectStatus;
//   techStack: string[];
//   orderIndex: number;
//   createdAt?: string;
//   updatedAt?: string;
// };

// type NewProjectInput = Omit<ProjectRow, 'id' | 'createdAt' | 'updatedAt'>;
// type ApiList<T> = { items: T[]; total: number };

// // -------- demo projects ----------
// const SAMPLE: Array<{
//   title: string;
//   renderLink: string;
//   cloudinaryLink: string;
//   description: string;
//   category: ProjectCategory;
// }> = [
//   {
//     title: 'Dream Voyage',
//     renderLink: 'https://dream-voyage-front.vercel.app/en/',
//     cloudinaryLink:
//       'https://res.cloudinary.com/dq0fwucoj/image/upload/v1740570755/Title2_wa53fb_Sharpened_w1svu6.png',
//     description:
//       "The Dream Voyage Travel Agency specializes in crafting unforgettable travel experiences, offering personalized itineraries, luxury accommodations, and seamless travel planning. Whether it's an exotic getaway, cultural exploration, or adventure-filled journey, we ensure every trip is stress-free and tailored to your desires. ✈️🌍",
//     category: 'Tourism Agency',
//   },
//   {
//     title: 'Restaurant App',
//     renderLink: 'https://project2-bettina.vercel.app/',
//     cloudinaryLink:
//       'https://res.cloudinary.com/dq0fwucoj/image/upload/v1740573315/img12_elbj0p_Sharpened_obzo5q.png',
//     description:
//       'The Restaurant App is a modern platform that allows users to explore menus, make reservations, and order food online with a seamless experience. Designed for efficiency, it offers a user-friendly interface, real-time table availability, and secure payment options. 🍽️📱',
//     category: 'Hospitality',
//   },
//   {
//     title: 'Who wants to be a millionaire',
//     renderLink: 'https://who-wants-to-be-a-millionaire-one.vercel.app/',
//     cloudinaryLink:
//       'https://res.cloudinary.com/dq0fwucoj/image/upload/v1740574126/millionare_a1ubav_Sharpened_raxucj.png',
//     description:
//       'The Who Wants to Be a Millionaire app is an interactive trivia game that challenges players with a series of multiple-choice questions, increasing in difficulty as they progress. With lifelines, engaging animations, and a competitive leaderboard, it delivers an exciting quiz experience just like the classic TV show. 💰🎉',
//     category: 'Product',
//   },
//   {
//     title: 'Medical Service App',
//     renderLink: 'https://medical-cards-kappa.vercel.app/',
//     cloudinaryLink:
//       'https://res.cloudinary.com/dq0fwucoj/image/upload/v1740677637/img4_krymz4_Sharpened_gebhg2.png',
//     description:
//       'The Medical Service App is a secure digital platform that allows users to store, manage, and share their medical records effortlessly. With easy access to prescriptions, appointments, and health history, it ensures seamless communication between patients and healthcare providers. 🏥📄',
//     category: 'Medical',
//   },
//   {
//     title: 'Aleksandr Klusbedrijf',
//     renderLink: 'https://alexander-zhyhan.vercel.app/',
//     cloudinaryLink:
//       'https://res.cloudinary.com/dq0fwucoj/image/upload/v1744648462/img_f4p3gd_Sharpened_yqfqwq.png',
//     description:
//       'Aleksandr Klusbedrijf is a professional construction and renovation company based in the Netherlands. We specialize in home improvements, interior and exterior renovations, tiling, painting, drywall installation, and general handyman services. Trusted for quality craftsmanship and timely delivery, we turn your ideas into solid results. 🧱🏡',
//     category: 'Construction',
//   },
//   {
//     title: 'Vlagyimir Gyikovec',
//     renderLink: 'https://vlagyimir-gyikovec.vercel.app/',
//     cloudinaryLink:
//       'https://res.cloudinary.com/dq0fwucoj/image/upload/v1744648641/img1_mr0hg9_Sharpened_xpiuwf.png',
//     description:
//       'Vlagyimir Gyikovec is a skilled construction specialist offering a wide range of renovation and repair services across residential and commercial properties. From structural improvements to fine interior finishes, every project is completed with precision, reliability, and attention to detail. Build smart — build with Vlagyimir. 🏗️🔨',
//     category: 'Construction',
//   },
// ];

// // helpers
// const slugify = (s: string) =>
//   s
//     .toLowerCase()
//     .normalize('NFKD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/(^-|-$)+/g, '');

// const categories: ProjectCategory[] = [
//   'Hospitality',
//   'Bio Tech',
//   'Construction',
//   'Consulting',
//   'Financial Services',
//   'IT',
//   'Legal',
//   'Medical',
//   'Nonprofit',
//   'Product',
//   'Professional Services',
//   'Real Estate',
//   'Technology',
//   'Tourism Agency',
// ];

// // ──────────────────────────────
// // ChipsInput (inline, без зовнішніх залежностей)
// // ──────────────────────────────
// function ChipsInput({
//   label,
//   value,
//   onChange,
//   placeholder,
//   hint,
// }: {
//   label?: string;
//   value: string[];
//   onChange: (next: string[]) => void;
//   placeholder?: string;
//   hint?: string;
// }) {
//   const [draft, setDraft] = useState('');

//   const add = () => {
//     const v = draft.trim();
//     if (!v) return;
//     if (!value.includes(v)) onChange([...value, v]);
//     setDraft('');
//   };
//   const remove = (chip: string) => onChange(value.filter((x) => x !== chip));

//   const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       add();
//     }
//     if (e.key === 'Backspace' && !draft && value.length) {
//       remove(value[value.length - 1]);
//     }
//   };

//   return (
//     <div className="sm:col-span-2">
//       {label && <label className="mb-1 block text-sm font-medium">{label}</label>}
//       <div className="rounded-lg border p-2">
//         {/* Рядок/ряди з чіпами */}
//         <div className="flex flex-wrap gap-2">
//           {value.map((chip) => (
//             <span
//               key={chip}
//               title={chip}
//               className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm
//                          whitespace-nowrap overflow-hidden text-ellipsis"
//             >
//               <span className="min-w-0">{chip}</span>
//               <button
//                 type="button"
//                 className="rounded bg-black/10 px-1 text-xs"
//                 onClick={() => remove(chip)}
//                 aria-label={`Remove ${chip}`}
//               >
//                 ✕
//               </button>
//             </span>
//           ))}
//         </div>

//         {/* Інпут — завжди новий блок, повна ширина */}
//         <div className="mt-2">
//           <input
//             value={draft}
//             onChange={(e) => setDraft(e.target.value)}
//             onKeyDown={onKeyDown}
//             onBlur={add}
//             placeholder={placeholder ?? 'Type and press Enter'}
//             className="w-full outline-none placeholder:text-slate-400"
//           />
//         </div>
//       </div>
//       {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
//     </div>
//   );
// }

// // Значення за замовчуванням (повний shape)
// const defaultNew: NewProjectInput = {
//   slug: '',
//   title: '',
//   description: '',
//   longDescription: '', // 🆕
//   features: [], // 🆕
//   services: [], // 🆕
//   industry: '', // 🆕
//   location: '', // 🆕
//   gallery: [], // 🆕
//   imageUrl: '',
//   websiteUrl: '',
//   category: 'Technology',
//   isFeatured: false,
//   status: 'published', // дефолтом видимий
//   techStack: [],
//   orderIndex: 0,
// };

// // забираємо зайві ключі, які не проходять DTO
// function sanitizeForDto<T extends Record<string, any>>(obj: T) {
//   const { id, createdAt, updatedAt, ...dto } = obj ?? {};
//   return dto as Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
// }

// // нормалізація перед POST/PATCH
// function normalizeCreate<T extends Record<string, any>>(obj: T) {
//   const normStr = (x: any) => (x && String(x).trim()) || undefined;
//   const normArr = (x: any) =>
//     Array.isArray(x) ? x.map((s: string) => s.trim()).filter(Boolean) : [];

//   return {
//     ...obj,
//     websiteUrl: normStr(obj.websiteUrl),
//     imageUrl: normStr(obj.imageUrl),
//     industry: normStr(obj.industry),
//     location: normStr(obj.location),
//     longDescription: normStr(obj.longDescription),
//     techStack: normArr(obj.techStack),
//     features: normArr(obj.features),
//     services: normArr(obj.services),
//     gallery: normArr(obj.gallery),
//   };
// }

// // ──────────────────────────────
// // Tiny Toasts (no deps)
// // ──────────────────────────────
// type Toast = { id: number; message: string; type?: 'success' | 'error' };
// function Toasts({ list, onClose }: { list: Toast[]; onClose: (id: number) => void }) {
//   return (
//     <div className="fixed right-4 top-4 z-[1000] space-y-2">
//       {list.map((t) => (
//         <div
//           key={t.id}
//           className={cn(
//             'rounded-lg px-4 py-2 shadow text-sm text-white',
//             t.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'
//           )}
//           role="status"
//         >
//           <div className="flex items-center gap-3">
//             <span>{t.message}</span>
//             <button
//               onClick={() => onClose(t.id)}
//               className="ml-auto rounded bg-white/20 px-2 py-0.5 text-xs"
//               aria-label="Close"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// const AdminProjectsPage: React.FC = () => {
//   const { isLoading } = useAuth();

//   const [rows, setRows] = useState<ProjectRow[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [busyId, setBusyId] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // STATUS FILTER (All / Published / Draft)
//   const [statusFilter, setStatusFilter] = useState<'all' | ProjectStatus>('all');

//   // filters
//   const [q, setQ] = useState('');
//   const [cat, setCat] = useState<ProjectCategory | 'All'>('All');

//   // create/edit
//   const [openCreate, setOpenCreate] = useState(false);
//   const [createData, setCreateData] = useState<NewProjectInput>(defaultNew);

//   const [editId, setEditId] = useState<number | null>(null);
//   const [editData, setEditData] = useState<NewProjectInput>(defaultNew);

//   // Confirm Delete modal (with project title)
//   const [pendingDelete, setPendingDelete] = useState<{ id: number; title: string } | null>(null);

//   // toasts
//   const [toasts, setToasts] = useState<Toast[]>([]);
//   const pushToast = (message: string, type?: 'success' | 'error') => {
//     const id = Date.now() + Math.random();
//     setToasts((s) => [...s, { id, message, type }]);
//     setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 3500);
//   };

//   const isDisabled = useMemo(() => loading || busyId !== null, [loading, busyId]);

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // очікуємо { items, total }
//       const { data } = await axios.get<ApiList<ProjectRow>>('/projects', {
//         params: { take: 999, skip: 0 }, // or server-side pagination for admin
//       });
//       setRows(Array.isArray(data.items) ? data.items : []);
//     } catch (e: any) {
//       const msg = e?.response?.data?.message ?? e?.message ?? 'Failed to load projects';
//       setError(msg);
//       pushToast(msg, 'error');
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---- SEED DEMO ----
//   const seedDemo = async () => {
//     if (!confirm('Insert demo projects into database?')) return;
//     setBusyId(-1);
//     setError(null);
//     try {
//       for (let i = 0; i < SAMPLE.length; i++) {
//         const s = SAMPLE[i];
//         const body: NewProjectInput = {
//           slug: slugify(s.title),
//           title: s.title,
//           description: s.description,
//           longDescription: s.description, // просте дублювання для демо
//           features: [],
//           services: [],
//           industry: '',
//           location: '',
//           gallery: [s.cloudinaryLink],
//           imageUrl: s.cloudinaryLink,
//           websiteUrl: s.renderLink,
//           category: s.category,
//           isFeatured: i === 0,
//           status: 'published',
//           techStack: [],
//           orderIndex: i + 1,
//         };
//         try {
//           await axios.post('/projects', body);
//         } catch (err: any) {
//           const msg = err?.response?.data?.message ?? '';
//           if (typeof msg === 'string' && /unique|exists|duplicate/i.test(msg)) {
//             // skip duplicates silently
//           } else {
//             throw err;
//           }
//         }
//       }
//       await fetchData();
//       pushToast('Demo projects inserted', 'success');
//     } catch (e: any) {
//       const msg = e?.response?.data?.message ?? e?.message ?? 'Seed failed';
//       setError(msg);
//       pushToast(msg, 'error');
//     } finally {
//       setBusyId(null);
//     }
//   };

//   // ------ CRUD ------
//   const onCreate = async (ev: React.FormEvent) => {
//     ev.preventDefault();
//     setBusyId(-1);
//     setError(null);

//     try {
//       const body = sanitizeForDto(
//         normalizeCreate({
//           ...createData,
//           slug: createData.slug || slugify(createData.title),
//           orderIndex: Number(createData.orderIndex) || 0,
//         })
//       );

//       await axios.post('/projects', body);
//       setOpenCreate(false);
//       setCreateData(defaultNew);
//       await fetchData();
//       pushToast('Project created', 'success');
//     } catch (e: any) {
//       const msg = e?.response?.data?.message ?? e?.message ?? 'Create failed';
//       setError(msg);
//       pushToast(msg, 'error');
//     } finally {
//       setBusyId(null);
//     }
//   };

//   const startEdit = (p: ProjectRow) => {
//     const dto = sanitizeForDto(p);
//     // гарантуємо повний shape як у NewProjectInput
//     setEditId(p.id);
//     setEditData({
//       slug: dto.slug,
//       title: dto.title,
//       description: dto.description,
//       longDescription: dto.longDescription ?? '',
//       features: Array.isArray(dto.features) ? dto.features : [],
//       services: Array.isArray(dto.services) ? dto.services : [],
//       industry: dto.industry ?? '',
//       location: dto.location ?? '',
//       gallery: Array.isArray(dto.gallery) ? dto.gallery : [],
//       imageUrl: dto.imageUrl ?? '',
//       websiteUrl: dto.websiteUrl ?? '',
//       category: dto.category,
//       isFeatured: dto.isFeatured,
//       status: dto.status,
//       techStack: Array.isArray(dto.techStack) ? dto.techStack : [],
//       orderIndex: Number(dto.orderIndex) || 0,
//     });
//   };

//   const onUpdate = async (ev: React.FormEvent) => {
//     ev.preventDefault();
//     if (!editId) return;
//     setBusyId(editId);
//     setError(null);

//     try {
//       const body = sanitizeForDto(
//         normalizeCreate({
//           ...editData,
//           slug: editData.slug || slugify(editData.title),
//           orderIndex: Number(editData.orderIndex) || 0,
//         })
//       );

//       await axios.patch(`/projects/${editId}`, body);
//       setEditId(null);
//       await fetchData();
//       pushToast('Project updated', 'success');
//     } catch (e: any) {
//       const msg = e?.response?.data?.message ?? e?.message ?? 'Update failed';
//       setError(msg);
//       pushToast(msg, 'error');
//     } finally {
//       setBusyId(null);
//     }
//   };

//   const askDelete = (id: number, title: string) => {
//     setPendingDelete({ id, title });
//   };

//   const doDelete = async () => {
//     if (!pendingDelete) return;
//     const id = pendingDelete.id;
//     setBusyId(id);
//     setError(null);
//     try {
//       await axios.delete(`/projects/${id}`);
//       setPendingDelete(null);
//       await fetchData();
//       pushToast('Project deleted', 'success');
//     } catch (e: any) {
//       const msg = e?.response?.data?.message ?? e?.message ?? 'Delete failed';
//       setError(msg);
//       pushToast(msg, 'error');
//     } finally {
//       setBusyId(null);
//     }
//   };

//   // filters (rows гарантовано масив)
//   const filtered = rows.filter((p) => {
//     const okCat = cat === 'All' || p.category === cat;
//     const ql = q.trim().toLowerCase();
//     const okQ =
//       !ql ||
//       p.title.toLowerCase().includes(ql) ||
//       p.description.toLowerCase().includes(ql) ||
//       p.slug.toLowerCase().includes(ql);

//     const okStatus = statusFilter === 'all' ? true : p.status === statusFilter;

//     return okCat && okQ && okStatus;
//   });

//   if (isLoading) return <div className="p-8">Loading…</div>;

//   return (
//     <div className="mx-auto max-w-6xl p-4 sm:p-8">
//       {/* Toasts */}
//       <Toasts list={toasts} onClose={(id) => setToasts((s) => s.filter((t) => t.id !== id))} />

//       <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
//         <h1 className="text-2xl font-semibold text-slate-800">Projects</h1>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setOpenCreate(true)}
//             className="rounded-xl bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700 disabled:opacity-60"
//             disabled={isDisabled}
//           >
//             + Create
//           </button>
//           <button
//             onClick={seedDemo}
//             className="rounded-xl border border-amber-400 bg-yellow-50 px-4 py-2 text-amber-800 shadow hover:bg-yellow-100 disabled:opacity-60"
//             disabled={isDisabled}
//             title="Insert demo projects you provided"
//           >
//             Seed demo ({SAMPLE.length})
//           </button>
//         </div>
//       </div>

//       {/* filters */}
//       <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
//         <input
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//           placeholder="Search by title / slug / description…"
//           className="w-full rounded-lg border px-3 py-2 sm:max-w-sm"
//         />

//         <select
//           value={cat}
//           onChange={(e) => setCat(e.target.value as any)}
//           className="w-full rounded-lg border px-3 py-2 sm:w-56"
//         >
//           <option value="All">All categories</option>
//           {categories.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         {/* Status filter buttons */}
//         <div className="flex items-center gap-2">
//           <button
//             className={cn(
//               'rounded-lg border px-3 py-1 text-sm',
//               statusFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-white'
//             )}
//             onClick={() => setStatusFilter('all')}
//           >
//             All
//           </button>
//           <button
//             className={cn(
//               'rounded-lg border px-3 py-1 text-sm',
//               statusFilter === 'published' ? 'bg-slate-800 text-white' : 'bg-white'
//             )}
//             onClick={() => setStatusFilter('published')}
//           >
//             Published
//           </button>
//           <button
//             className={cn(
//               'rounded-lg border px-3 py-1 text-sm',
//               statusFilter === 'draft' ? 'bg-slate-800 text-white' : 'bg-white'
//             )}
//             onClick={() => setStatusFilter('draft')}
//           >
//             Draft
//           </button>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <div className="overflow-x-auto rounded-xl border">
//         <table className="min-w-full text-sm">
//           <thead className="bg-slate-50 text-left">
//             <tr>
//               <th className="px-4 py-3">ID</th>
//               <th className="px-4 py-3">Title</th>
//               <th className="px-4 py-3">Category</th>
//               <th className="px-4 py-3">Slug</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td className="px-4 py-6" colSpan={6}>
//                   Loading…
//                 </td>
//               </tr>
//             ) : filtered.length === 0 ? (
//               <tr>
//                 <td className="px-4 py-6" colSpan={6}>
//                   No projects.
//                 </td>
//               </tr>
//             ) : (
//               filtered.map((p) => (
//                 <tr key={p.id} className="border-t align-top">
//                   <td className="px-4 py-3 whitespace-nowrap">{p.id}</td>
//                   <td className="px-4 py-3">
//                     <div className="font-medium">{p.title}</div>
//                     <div className="text-xs text-slate-500 line-clamp-2">{p.description}</div>
//                   </td>
//                   <td className="px-4 py-3">{p.category}</td>
//                   <td className="px-4 py-3">{p.slug}</td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={cn(
//                         'rounded-full px-2 py-0.5 text-xs',
//                         p.status === 'published'
//                           ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
//                           : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
//                       )}
//                     >
//                       {p.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center justify-end gap-2">
//                       <button
//                         onClick={() => startEdit(p)}
//                         className="rounded-lg border px-3 py-1 hover:bg-slate-50 disabled:opacity-60"
//                         disabled={isDisabled}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => askDelete(p.id, p.title)}
//                         className={cn(
//                           'rounded-lg px-3 py-1 text-white',
//                           'bg-rose-600 hover:bg-rose-700 disabled:opacity-60'
//                         )}
//                         disabled={isDisabled}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Create modal */}
//       {openCreate && (
//         <div className="fixed inset-0 z-50 bg-black/40 p-4 overflow-y-auto overscroll-contain">
//           <form
//             onSubmit={onCreate}
//             className="mx-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl
//                max-h-[85vh] overflow-y-auto"
//           >
//             <h2 className="mb-4 text-lg font-semibold">Create project</h2>

//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <input
//                 value={createData.title}
//                 onChange={(e) =>
//                   setCreateData((s) => ({
//                     ...s,
//                     title: e.target.value,
//                     slug: slugify(e.target.value),
//                   }))
//                 }
//                 placeholder="Title"
//                 className="rounded-lg border px-3 py-2 sm:col-span-2"
//                 required
//               />
//               <input
//                 value={createData.slug}
//                 onChange={(e) => setCreateData((s) => ({ ...s, slug: e.target.value }))}
//                 placeholder="Slug"
//                 className="rounded-lg border px-3 py-2"
//                 required
//               />
//               <select
//                 value={createData.category}
//                 onChange={(e) =>
//                   setCreateData((s) => ({ ...s, category: e.target.value as ProjectCategory }))
//                 }
//                 className="rounded-lg border px-3 py-2"
//               >
//                 {categories.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 value={createData.websiteUrl ?? ''}
//                 onChange={(e) => setCreateData((s) => ({ ...s, websiteUrl: e.target.value }))}
//                 placeholder="Website URL"
//                 className="rounded-lg border px-3 py-2 sm:col-span-2"
//               />
//               <input
//                 value={createData.imageUrl ?? ''}
//                 onChange={(e) => setCreateData((s) => ({ ...s, imageUrl: e.target.value }))}
//                 placeholder="Image URL"
//                 className="rounded-lg border px-3 py-2 sm:col-span-2"
//               />
//               <textarea
//                 value={createData.description}
//                 onChange={(e) => setCreateData((s) => ({ ...s, description: e.target.value }))}
//                 placeholder="Description"
//                 className="min-h-[90px] rounded-lg border px-3 py-2 sm:col-span-2"
//                 required
//               />

//               {/* 🆕 Long description */}
//               <textarea
//                 value={createData.longDescription ?? ''}
//                 onChange={(e) => setCreateData((s) => ({ ...s, longDescription: e.target.value }))}
//                 placeholder="Long description (optional)"
//                 className="min-h-[120px] rounded-lg border px-3 py-2 sm:col-span-2"
//               />

//               {/* 🆕 Industry / Location */}
//               <input
//                 value={createData.industry ?? ''}
//                 onChange={(e) => setCreateData((s) => ({ ...s, industry: e.target.value }))}
//                 placeholder="Industry (optional)"
//                 className="rounded-lg border px-3 py-2"
//               />

//               <input
//                 value={createData.location ?? ''}
//                 onChange={(e) => setCreateData((s) => ({ ...s, location: e.target.value }))}
//                 placeholder="Location (optional)"
//                 className="rounded-lg border px-3 py-2"
//               />

//               {/* 🆕 Chips arrays */}
//               <ChipsInput
//                 label="Features"
//                 value={createData.features}
//                 onChange={(next) => setCreateData((s) => ({ ...s, features: next }))}
//                 hint="Press Enter to add a feature"
//               />

//               <ChipsInput
//                 label="Services"
//                 value={createData.services}
//                 onChange={(next) => setCreateData((s) => ({ ...s, services: next }))}
//                 hint="Press Enter to add a service"
//               />

//               <ChipsInput
//                 label="Tech stack"
//                 value={createData.techStack}
//                 onChange={(next) => setCreateData((s) => ({ ...s, techStack: next }))}
//                 hint="Press Enter to add a technology"
//               />

//               <ChipsInput
//                 label="Gallery (image URLs)"
//                 value={createData.gallery}
//                 onChange={(next) => setCreateData((s) => ({ ...s, gallery: next }))}
//                 hint="Paste a URL and press Enter"
//               />

//               <input
//                 type="number"
//                 value={createData.orderIndex}
//                 onChange={(e) =>
//                   setCreateData((s) => ({ ...s, orderIndex: Number(e.target.value) || 0 }))
//                 }
//                 placeholder="Order index"
//                 className="rounded-lg border px-3 py-2"
//               />
//               <select
//                 value={createData.status}
//                 onChange={(e) =>
//                   setCreateData((s) => ({ ...s, status: e.target.value as ProjectStatus }))
//                 }
//                 className="rounded-lg border px-3 py-2"
//                 title="Only 'published' projects appear on the public site"
//               >
//                 <option value="published">published</option>
//                 <option value="draft">draft</option>
//               </select>

//               <label className="flex items-center gap-2 sm:col-span-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={createData.isFeatured}
//                   onChange={(e) => setCreateData((s) => ({ ...s, isFeatured: e.target.checked }))}
//                 />
//                 <span>Featured</span>
//               </label>
//             </div>

//             <p className="mt-3 text-xs text-slate-500">
//               Only <b>published</b> projects appear on the public site.
//             </p>

//             <div className="mt-5 sticky bottom-0 bg-white pt-3 flex justify-end gap-2">
//               <button
//                 type="button"
//                 className="rounded-lg border px-4 py-2"
//                 onClick={() => setOpenCreate(false)}
//                 disabled={isDisabled}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-60"
//                 disabled={isDisabled}
//               >
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Edit modal */}
//       {editId && (
//         <div
//           className="fixed inset-0 z-50 bg-black/40 p-4
//                 overflow-y-auto overscroll-contain"
//         >
//           <form
//             onSubmit={onUpdate}
//             className="mx-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl
//                max-h-[85vh] overflow-y-auto"
//           >
//             <h2 className="mb-4 text-lg font-semibold">Edit project #{editId}</h2>

//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <input
//                 value={editData.title}
//                 onChange={(e) =>
//                   setEditData((s) => ({
//                     ...s,
//                     title: e.target.value,
//                     slug: s.slug || slugify(e.target.value),
//                   }))
//                 }
//                 placeholder="Title"
//                 className="rounded-lg border px-3 py-2 sm:col-span-2"
//                 required
//               />
//               <input
//                 value={editData.slug}
//                 onChange={(e) => setEditData((s) => ({ ...s, slug: e.target.value }))}
//                 placeholder="Slug"
//                 className="rounded-lg border px-3 py-2"
//                 required
//               />
//               <select
//                 value={editData.category}
//                 onChange={(e) =>
//                   setEditData((s) => ({ ...s, category: e.target.value as ProjectCategory }))
//                 }
//                 className="rounded-lg border px-3 py-2"
//               >
//                 {categories.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 value={editData.websiteUrl ?? ''}
//                 onChange={(e) => setEditData((s) => ({ ...s, websiteUrl: e.target.value }))}
//                 placeholder="Website URL"
//                 className="rounded-lg border px-3 py-2 sm:col-span-2"
//               />
//               <input
//                 value={editData.imageUrl ?? ''}
//                 onChange={(e) => setEditData((s) => ({ ...s, imageUrl: e.target.value }))}
//                 placeholder="Image URL"
//                 className="rounded-lg border px-3 py-2 sm:col-span-2"
//               />
//               <textarea
//                 value={editData.description}
//                 onChange={(e) => setEditData((s) => ({ ...s, description: e.target.value }))}
//                 placeholder="Description"
//                 className="min-h-[90px] rounded-lg border px-3 py-2 sm:col-span-2"
//                 required
//               />

//               {/* 🆕 Long description */}
//               <textarea
//                 value={editData.longDescription ?? ''}
//                 onChange={(e) => setEditData((s) => ({ ...s, longDescription: e.target.value }))}
//                 placeholder="Long description (optional)"
//                 className="min-h-[120px] rounded-lg border px-3 py-2 sm:col-span-2"
//               />

//               {/* 🆕 Industry / Location */}
//               <input
//                 value={editData.industry ?? ''}
//                 onChange={(e) => setEditData((s) => ({ ...s, industry: e.target.value }))}
//                 placeholder="Industry (optional)"
//                 className="rounded-lg border px-3 py-2"
//               />

//               <input
//                 value={editData.location ?? ''}
//                 onChange={(e) => setEditData((s) => ({ ...s, location: e.target.value }))}
//                 placeholder="Location (optional)"
//                 className="rounded-lg border px-3 py-2"
//               />

//               {/* 🆕 Chips arrays */}
//               <ChipsInput
//                 label="Features"
//                 value={editData.features}
//                 onChange={(next) => setEditData((s) => ({ ...s, features: next }))}
//                 hint="Press Enter to add a feature"
//               />

//               <ChipsInput
//                 label="Services"
//                 value={editData.services}
//                 onChange={(next) => setEditData((s) => ({ ...s, services: next }))}
//                 hint="Press Enter to add a service"
//               />

//               <ChipsInput
//                 label="Tech stack"
//                 value={editData.techStack}
//                 onChange={(next) => setEditData((s) => ({ ...s, techStack: next }))}
//                 hint="Press Enter to add a technology"
//               />

//               <ChipsInput
//                 label="Gallery (image URLs)"
//                 value={editData.gallery}
//                 onChange={(next) => setEditData((s) => ({ ...s, gallery: next }))}
//                 hint="Paste a URL and press Enter"
//               />

//               <input
//                 type="number"
//                 value={editData.orderIndex}
//                 onChange={(e) =>
//                   setEditData((s) => ({ ...s, orderIndex: Number(e.target.value) || 0 }))
//                 }
//                 placeholder="Order index"
//                 className="rounded-lg border px-3 py-2"
//               />
//               <select
//                 value={editData.status}
//                 onChange={(e) =>
//                   setEditData((s) => ({ ...s, status: e.target.value as ProjectStatus }))
//                 }
//                 className="rounded-lg border px-3 py-2"
//               >
//                 <option value="published">published</option>
//                 <option value="draft">draft</option>
//               </select>

//               <label className="flex items-center gap-2 sm:col-span-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={editData.isFeatured}
//                   onChange={(e) => setEditData((s) => ({ ...s, isFeatured: e.target.checked }))}
//                 />
//                 <span>Featured</span>
//               </label>
//             </div>

//             <div className="mt-5 sticky bottom-0 bg-white pt-3 flex justify-end gap-2">
//               <button
//                 type="button"
//                 className="rounded-lg border px-4 py-2"
//                 onClick={() => setEditId(null)}
//                 disabled={isDisabled}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
//                 disabled={isDisabled}
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Confirm Delete modal (EN) */}
//       {pendingDelete && (
//         <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h3 className="text-lg font-semibold text-slate-900">Confirm deletion</h3>
//             <p className="mt-3 text-slate-700">
//               Are you sure you want to delete project{' '}
//               <span className="font-semibold">“{pendingDelete.title}”</span>?
//             </p>

//             <div className="mt-6 flex justify-end gap-2">
//               <button
//                 className="rounded-lg border px-4 py-2"
//                 onClick={() => setPendingDelete(null)}
//                 disabled={busyId !== null}
//               >
//                 No
//               </button>
//               <button
//                 className="rounded-lg bg-rose-600 px-4 py-2 text-white hover:bg-rose-700 disabled:opacity-60"
//                 onClick={doDelete}
//                 disabled={busyId !== null}
//               >
//                 Yes, delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProjectsPage;

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/cn';
import toast from 'react-hot-toast';

// ==== Types (sync with backend) ====
export type ProjectStatus = 'draft' | 'published';
export type ProjectCategory =
  | 'Hospitality'
  | 'Bio Tech'
  | 'Construction'
  | 'Consulting'
  | 'Financial Services'
  | 'IT'
  | 'Legal'
  | 'Medical'
  | 'Nonprofit'
  | 'Product'
  | 'Professional Services'
  | 'Real Estate'
  | 'Technology'
  | 'Tourism Agency';

export type ProjectRow = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription?: string | null; // 🆕
  features: string[]; // 🆕
  services: string[]; // 🆕
  industry?: string | null; // 🆕
  location?: string | null; // 🆕
  gallery: string[]; // 🆕
  imageUrl?: string | null;
  websiteUrl?: string | null;
  category: ProjectCategory;
  isFeatured: boolean;
  status: ProjectStatus;
  techStack: string[];
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
};

type NewProjectInput = Omit<ProjectRow, 'id' | 'createdAt' | 'updatedAt'>;
type ApiList<T> = { items: T[]; total: number };

// -------- demo projects ----------
const SAMPLE: Array<{
  title: string;
  renderLink: string;
  cloudinaryLink: string;
  description: string;
  category: ProjectCategory;
}> = [
  {
    title: 'Dream Voyage',
    renderLink: 'https://dream-voyage-front.vercel.app/en/',
    cloudinaryLink:
      'https://res.cloudinary.com/dq0fwucoj/image/upload/v1740570755/Title2_wa53fb_Sharpened_w1svu6.png',
    description:
      "The Dream Voyage Travel Agency specializes in crafting unforgettable travel experiences, offering personalized itineraries, luxury accommodations, and seamless travel planning. Whether it's an exotic getaway, cultural exploration, or adventure-filled journey, we ensure every trip is stress-free and tailored to your desires. ✈️🌍",
    category: 'Tourism Agency',
  },
  {
    title: 'Restaurant App',
    renderLink: 'https://project2-bettina.vercel.app/',
    cloudinaryLink:
      'https://res.cloudinary.com/dq0fwucoj/image/upload/v1740573315/img12_elbj0p_Sharpened_obzo5q.png',
    description:
      'The Restaurant App is a modern platform that allows users to explore menus, make reservations, and order food online with a seamless experience. Designed for efficiency, it offers a user-friendly interface, real-time table availability, and secure payment options. 🍽️📱',
    category: 'Hospitality',
  },
  {
    title: 'Who wants to be a millionaire',
    renderLink: 'https://who-wants-to-be-a-millionaire-one.vercel.app/',
    cloudinaryLink:
      'https://res.cloudinary.com/dq0fwucoj/image/upload/v1740574126/millionare_a1ubav_Sharpened_raxucj.png',
    description:
      'The Who Wants to Be a Millionaire app is an interactive trivia game that challenges players with a series of multiple-choice questions, increasing in difficulty as they progress. With lifelines, engaging animations, and a competitive leaderboard, it delivers an exciting quiz experience just like the classic TV show. 💰🎉',
    category: 'Product',
  },
  {
    title: 'Medical Service App',
    renderLink: 'https://medical-cards-kappa.vercel.app/',
    cloudinaryLink:
      'https://res.cloudinary.com/dq0fwucoj/image/upload/v1740677637/img4_krymz4_Sharpened_gebhg2.png',
    description:
      'The Medical Service App is a secure digital platform that allows users to store, manage, and share their medical records effortlessly. With easy access to prescriptions, appointments, and health history, it ensures seamless communication between patients and healthcare providers. 🏥📄',
    category: 'Medical',
  },
  {
    title: 'Aleksandr Klusbedrijf',
    renderLink: 'https://alexander-zhyhan.vercel.app/',
    cloudinaryLink:
      'https://res.cloudinary.com/dq0fwucoj/image/upload/v1744648462/img_f4p3gd_Sharpened_yqfqwq.png',
    description:
      'Aleksandr Klusbedrijf is a professional construction and renovation company based in the Netherlands. We specialize in home improvements, interior and exterior renovations, tiling, painting, drywall installation, and general handyman services. Trusted for quality craftsmanship and timely delivery, we turn your ideas into solid results. 🧱🏡',
    category: 'Construction',
  },
  {
    title: 'Vlagyimir Gyikovec',
    renderLink: 'https://vlagyimir-gyikovec.vercel.app/',
    cloudinaryLink:
      'https://res.cloudinary.com/dq0fwucoj/image/upload/v1744648641/img1_mr0hg9_Sharpened_xpiuwf.png',
    description:
      'Vlagyimir Gyikovec is a skilled construction specialist offering a wide range of renovation and repair services across residential and commercial properties. From structural improvements to fine interior finishes, every project is completed with precision, reliability, and attention to detail. Build smart — build with Vlagyimir. 🏗️🔨',
    category: 'Construction',
  },
];

// helpers
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const categories: ProjectCategory[] = [
  'Hospitality',
  'Bio Tech',
  'Construction',
  'Consulting',
  'Financial Services',
  'IT',
  'Legal',
  'Medical',
  'Nonprofit',
  'Product',
  'Professional Services',
  'Real Estate',
  'Technology',
  'Tourism Agency',
];

// ──────────────────────────────
// ChipsInput (inline, без зовнішніх залежностей)
// ──────────────────────────────
function ChipsInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label?: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  hint?: string;
}) {
  const [draft, setDraft] = useState('');

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    if (!value.includes(v)) onChange([...value, v]);
    setDraft('');
  };
  const remove = (chip: string) => onChange(value.filter((x) => x !== chip));

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add();
    }
    if (e.key === 'Backspace' && !draft && value.length) {
      remove(value[value.length - 1]);
    }
  };

  return (
    <div className="sm:col-span-2">
      {label && <label className="mb-1 block text-sm font-medium">{label}</label>}
      <div className="rounded-lg border p-2">
        {/* Рядок/ряди з чіпами */}
        <div className="flex flex-wrap gap-2">
          {value.map((chip) => (
            <span
              key={chip}
              title={chip}
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm
                         whitespace-nowrap overflow-hidden text-ellipsis"
            >
              <span className="min-w-0">{chip}</span>
              <button
                type="button"
                className="rounded bg-black/10 px-1 text-xs"
                onClick={() => remove(chip)}
                aria-label={`Remove ${chip}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        {/* Інпут — завжди новий блок, повна ширина */}
        <div className="mt-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={add}
            placeholder={placeholder ?? 'Type and press Enter'}
            className="w-full outline-none placeholder:text-slate-400"
          />
        </div>
      </div>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

// Значення за замовчуванням (повний shape)
const defaultNew: NewProjectInput = {
  slug: '',
  title: '',
  description: '',
  longDescription: '', // 🆕
  features: [], // 🆕
  services: [], // 🆕
  industry: '', // 🆕
  location: '', // 🆕
  gallery: [], // 🆕
  imageUrl: '',
  websiteUrl: '',
  category: 'Technology',
  isFeatured: false,
  status: 'published', // дефолтом видимий
  techStack: [],
  orderIndex: 0,
};

// забираємо зайві ключі, які не проходять DTO
function sanitizeForDto<T extends Record<string, any>>(obj: T) {
  const { id, createdAt, updatedAt, ...dto } = obj ?? {};
  return dto as Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
}

// нормалізація перед POST/PATCH
function normalizeCreate<T extends Record<string, any>>(obj: T) {
  const normStr = (x: any) => (x && String(x).trim()) || undefined;
  const normArr = (x: any) =>
    Array.isArray(x) ? x.map((s: string) => s.trim()).filter(Boolean) : [];

  return {
    ...obj,
    websiteUrl: normStr(obj.websiteUrl),
    imageUrl: normStr(obj.imageUrl),
    industry: normStr(obj.industry),
    location: normStr(obj.location),
    longDescription: normStr(obj.longDescription),
    techStack: normArr(obj.techStack),
    features: normArr(obj.features),
    services: normArr(obj.services),
    gallery: normArr(obj.gallery),
  };
}

const AdminProjectsPage: React.FC = () => {
  const { isLoading } = useAuth();

  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // STATUS FILTER (All / Published / Draft)
  const [statusFilter, setStatusFilter] = useState<'all' | ProjectStatus>('all');

  // filters
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<ProjectCategory | 'All'>('All');

  // create/edit
  const [openCreate, setOpenCreate] = useState(false);
  const [createData, setCreateData] = useState<NewProjectInput>(defaultNew);

  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<NewProjectInput>(defaultNew);

  // Confirm Delete modal (with project title)
  const [pendingDelete, setPendingDelete] = useState<{ id: number; title: string } | null>(null);

  const isDisabled = useMemo(() => loading || busyId !== null, [loading, busyId]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // очікуємо { items, total }
      const { data } = await axios.get<ApiList<ProjectRow>>('/projects', {
        params: { take: 999, skip: 0 }, // or server-side pagination for admin
      });
      setRows(Array.isArray(data.items) ? data.items : []);
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? e?.message ?? 'Failed to load projects';
      setError(msg);
      toast.error(msg);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // ---- SEED DEMO ----
  const seedDemo = async () => {
    if (!confirm('Insert demo projects into database?')) return;
    setBusyId(-1);
    setError(null);
    try {
      for (let i = 0; i < SAMPLE.length; i++) {
        const s = SAMPLE[i];
        const body: NewProjectInput = {
          slug: slugify(s.title),
          title: s.title,
          description: s.description,
          longDescription: s.description, // просте дублювання для демо
          features: [],
          services: [],
          industry: '',
          location: '',
          gallery: [s.cloudinaryLink],
          imageUrl: s.cloudinaryLink,
          websiteUrl: s.renderLink,
          category: s.category,
          isFeatured: i === 0,
          status: 'published',
          techStack: [],
          orderIndex: i + 1,
        };
        try {
          await axios.post('/projects', body);
        } catch (err: any) {
          const msg = err?.response?.data?.message ?? '';
          if (typeof msg === 'string' && /unique|exists|duplicate/i.test(msg)) {
            // skip duplicates silently
          } else {
            throw err;
          }
        }
      }
      await fetchData();
      toast.success('Demo projects inserted');
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? e?.message ?? 'Seed failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setBusyId(null);
    }
  };

  // ------ CRUD ------
  const onCreate = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setBusyId(-1);
    setError(null);

    try {
      const body = sanitizeForDto(
        normalizeCreate({
          ...createData,
          slug: createData.slug || slugify(createData.title),
          orderIndex: Number(createData.orderIndex) || 0,
        })
      );

      await axios.post('/projects', body);
      setOpenCreate(false);
      setCreateData(defaultNew);
      await fetchData();
      toast.success('Project created');
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? e?.message ?? 'Create failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setBusyId(null);
    }
  };

  const startEdit = (p: ProjectRow) => {
    const dto = sanitizeForDto(p);
    // гарантуємо повний shape як у NewProjectInput
    setEditId(p.id);
    setEditData({
      slug: dto.slug,
      title: dto.title,
      description: dto.description,
      longDescription: dto.longDescription ?? '',
      features: Array.isArray(dto.features) ? dto.features : [],
      services: Array.isArray(dto.services) ? dto.services : [],
      industry: dto.industry ?? '',
      location: dto.location ?? '',
      gallery: Array.isArray(dto.gallery) ? dto.gallery : [],
      imageUrl: dto.imageUrl ?? '',
      websiteUrl: dto.websiteUrl ?? '',
      category: dto.category,
      isFeatured: dto.isFeatured,
      status: dto.status,
      techStack: Array.isArray(dto.techStack) ? dto.techStack : [],
      orderIndex: Number(dto.orderIndex) || 0,
    });
  };

  const onUpdate = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!editId) return;
    setBusyId(editId);
    setError(null);

    try {
      const body = sanitizeForDto(
        normalizeCreate({
          ...editData,
          slug: editData.slug || slugify(editData.title),
          orderIndex: Number(editData.orderIndex) || 0,
        })
      );

      await axios.patch(`/projects/${editId}`, body);
      setEditId(null);
      await fetchData();
      toast.success('Project updated');
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? e?.message ?? 'Update failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setBusyId(null);
    }
  };

  const askDelete = (id: number, title: string) => {
    setPendingDelete({ id, title });
  };

  const doDelete = async () => {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    setBusyId(id);
    setError(null);
    try {
      await axios.delete(`/projects/${id}`);
      setPendingDelete(null);
      await fetchData();
      toast.success('Project deleted');
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? e?.message ?? 'Delete failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setBusyId(null);
    }
  };

  // filters (rows гарантовано масив)
  const filtered = rows.filter((p) => {
    const okCat = cat === 'All' || p.category === cat;
    const ql = q.trim().toLowerCase();
    const okQ =
      !ql ||
      p.title.toLowerCase().includes(ql) ||
      p.description.toLowerCase().includes(ql) ||
      p.slug.toLowerCase().includes(ql);

    const okStatus = statusFilter === 'all' ? true : p.status === statusFilter;

    return okCat && okQ && okStatus;
  });

  if (isLoading) return <div className="p-8">Loading…</div>;

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-800">Projects</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setOpenCreate(true)}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700 disabled:opacity-60"
            disabled={isDisabled}
          >
            + Create
          </button>
          <button
            onClick={seedDemo}
            className="rounded-xl border border-amber-400 bg-yellow-50 px-4 py-2 text-amber-800 shadow hover:bg-yellow-100 disabled:opacity-60"
            disabled={isDisabled}
            title="Insert demo projects you provided"
          >
            Seed demo ({SAMPLE.length})
          </button>
        </div>
      </div>

      {/* filters */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title / slug / description…"
          className="w-full rounded-lg border px-3 py-2 sm:max-w-sm"
        />

        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as any)}
          className="w-full rounded-lg border px-3 py-2 sm:w-56"
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Status filter buttons */}
        <div className="flex items-center gap-2">
          <button
            className={cn(
              'rounded-lg border px-3 py-1 text-sm',
              statusFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-white'
            )}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            className={cn(
              'rounded-lg border px-3 py-1 text-sm',
              statusFilter === 'published' ? 'bg-slate-800 text-white' : 'bg-white'
            )}
            onClick={() => setStatusFilter('published')}
          >
            Published
          </button>
          <button
            className={cn(
              'rounded-lg border px-3 py-1 text-sm',
              statusFilter === 'draft' ? 'bg-slate-800 text-white' : 'bg-white'
            )}
            onClick={() => setStatusFilter('draft')}
          >
            Draft
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6" colSpan={6}>
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-6" colSpan={6}>
                  No projects.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-t align-top">
                  <td className="px-4 py-3 whitespace-nowrap">{p.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-2">{p.description}</div>
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.slug}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs',
                        p.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                          : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                      )}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="rounded-lg border px-3 py-1 hover:bg-slate-50 disabled:opacity-60"
                        disabled={isDisabled}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => askDelete(p.id, p.title)}
                        className={cn(
                          'rounded-lg px-3 py-1 text-white',
                          'bg-rose-600 hover:bg-rose-700 disabled:opacity-60'
                        )}
                        disabled={isDisabled}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create modal */}
      {openCreate && (
        <div className="fixed inset-0 z-50 bg-black/40 p-4 overflow-y-auto overscroll-contain">
          <form
            onSubmit={onCreate}
            className="mx-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl
               max-h-[85vh] overflow-y-auto"
          >
            <h2 className="mb-4 text-lg font-semibold">Create project</h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                value={createData.title}
                onChange={(e) =>
                  setCreateData((s) => ({
                    ...s,
                    title: e.target.value,
                    slug: slugify(e.target.value),
                  }))
                }
                placeholder="Title"
                className="rounded-lg border px-3 py-2 sm:col-span-2"
                required
              />
              <input
                value={createData.slug}
                onChange={(e) => setCreateData((s) => ({ ...s, slug: e.target.value }))}
                placeholder="Slug"
                className="rounded-lg border px-3 py-2"
                required
              />
              <select
                value={createData.category}
                onChange={(e) =>
                  setCreateData((s) => ({ ...s, category: e.target.value as ProjectCategory }))
                }
                className="rounded-lg border px-3 py-2"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                value={createData.websiteUrl ?? ''}
                onChange={(e) => setCreateData((s) => ({ ...s, websiteUrl: e.target.value }))}
                placeholder="Website URL"
                className="rounded-lg border px-3 py-2 sm:col-span-2"
              />
              <input
                value={createData.imageUrl ?? ''}
                onChange={(e) => setCreateData((s) => ({ ...s, imageUrl: e.target.value }))}
                placeholder="Image URL"
                className="rounded-lg border px-3 py-2 sm:col-span-2"
              />
              <textarea
                value={createData.description}
                onChange={(e) => setCreateData((s) => ({ ...s, description: e.target.value }))}
                placeholder="Description"
                className="min-h-[90px] rounded-lg border px-3 py-2 sm:col-span-2"
                required
              />

              {/* 🆕 Long description */}
              <textarea
                value={createData.longDescription ?? ''}
                onChange={(e) => setCreateData((s) => ({ ...s, longDescription: e.target.value }))}
                placeholder="Long description (optional)"
                className="min-h-[120px] rounded-lg border px-3 py-2 sm:col-span-2"
              />

              {/* 🆕 Industry / Location */}
              <input
                value={createData.industry ?? ''}
                onChange={(e) => setCreateData((s) => ({ ...s, industry: e.target.value }))}
                placeholder="Industry (optional)"
                className="rounded-lg border px-3 py-2"
              />

              <input
                value={createData.location ?? ''}
                onChange={(e) => setCreateData((s) => ({ ...s, location: e.target.value }))}
                placeholder="Location (optional)"
                className="rounded-lg border px-3 py-2"
              />

              {/* 🆕 Chips arrays */}
              <ChipsInput
                label="Features"
                value={createData.features}
                onChange={(next) => setCreateData((s) => ({ ...s, features: next }))}
                hint="Press Enter to add a feature"
              />

              <ChipsInput
                label="Services"
                value={createData.services}
                onChange={(next) => setCreateData((s) => ({ ...s, services: next }))}
                hint="Press Enter to add a service"
              />

              <ChipsInput
                label="Tech stack"
                value={createData.techStack}
                onChange={(next) => setCreateData((s) => ({ ...s, techStack: next }))}
                hint="Press Enter to add a technology"
              />

              <ChipsInput
                label="Gallery (image URLs)"
                value={createData.gallery}
                onChange={(next) => setCreateData((s) => ({ ...s, gallery: next }))}
                hint="Paste a URL and press Enter"
              />

              <input
                type="number"
                value={createData.orderIndex}
                onChange={(e) =>
                  setCreateData((s) => ({ ...s, orderIndex: Number(e.target.value) || 0 }))
                }
                placeholder="Order index"
                className="rounded-lg border px-3 py-2"
              />
              <select
                value={createData.status}
                onChange={(e) =>
                  setCreateData((s) => ({ ...s, status: e.target.value as ProjectStatus }))
                }
                className="rounded-lg border px-3 py-2"
                title="Only 'published' projects appear on the public site"
              >
                <option value="published">published</option>
                <option value="draft">draft</option>
              </select>

              <label className="flex items-center gap-2 sm:col-span-2 text-sm">
                <input
                  type="checkbox"
                  checked={createData.isFeatured}
                  onChange={(e) => setCreateData((s) => ({ ...s, isFeatured: e.target.checked }))}
                />
                <span>Featured</span>
              </label>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Only <b>published</b> projects appear on the public site.
            </p>

            <div className="mt-5 sticky bottom-0 bg-white pt-3 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border px-4 py-2"
                onClick={() => setOpenCreate(false)}
                disabled={isDisabled}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-60"
                disabled={isDisabled}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit modal */}
      {editId && (
        <div
          className="fixed inset-0 z-50 bg-black/40 p-4
                overflow-y-auto overscroll-contain"
        >
          <form
            onSubmit={onUpdate}
            className="mx-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl
               max-h-[85vh] overflow-y-auto"
          >
            <h2 className="mb-4 text-lg font-semibold">Edit project #{editId}</h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                value={editData.title}
                onChange={(e) =>
                  setEditData((s) => ({
                    ...s,
                    title: e.target.value,
                    slug: s.slug || slugify(e.target.value),
                  }))
                }
                placeholder="Title"
                className="rounded-lg border px-3 py-2 sm:col-span-2"
                required
              />
              <input
                value={editData.slug}
                onChange={(e) => setEditData((s) => ({ ...s, slug: e.target.value }))}
                placeholder="Slug"
                className="rounded-lg border px-3 py-2"
                required
              />
              <select
                value={editData.category}
                onChange={(e) =>
                  setEditData((s) => ({ ...s, category: e.target.value as ProjectCategory }))
                }
                className="rounded-lg border px-3 py-2"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                value={editData.websiteUrl ?? ''}
                onChange={(e) => setEditData((s) => ({ ...s, websiteUrl: e.target.value }))}
                placeholder="Website URL"
                className="rounded-lg border px-3 py-2 sm:col-span-2"
              />
              <input
                value={editData.imageUrl ?? ''}
                onChange={(e) => setEditData((s) => ({ ...s, imageUrl: e.target.value }))}
                placeholder="Image URL"
                className="rounded-lg border px-3 py-2 sm:col-span-2"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData((s) => ({ ...s, description: e.target.value }))}
                placeholder="Description"
                className="min-h-[90px] rounded-lg border px-3 py-2 sm:col-span-2"
                required
              />

              {/* 🆕 Long description */}
              <textarea
                value={editData.longDescription ?? ''}
                onChange={(e) => setEditData((s) => ({ ...s, longDescription: e.target.value }))}
                placeholder="Long description (optional)"
                className="min-h-[120px] rounded-lg border px-3 py-2 sm:col-span-2"
              />

              {/* 🆕 Industry / Location */}
              <input
                value={editData.industry ?? ''}
                onChange={(e) => setEditData((s) => ({ ...s, industry: e.target.value }))}
                placeholder="Industry (optional)"
                className="rounded-lg border px-3 py-2"
              />

              <input
                value={editData.location ?? ''}
                onChange={(e) => setEditData((s) => ({ ...s, location: e.target.value }))}
                placeholder="Location (optional)"
                className="rounded-lg border px-3 py-2"
              />

              {/* 🆕 Chips arrays */}
              <ChipsInput
                label="Features"
                value={editData.features}
                onChange={(next) => setEditData((s) => ({ ...s, features: next }))}
                hint="Press Enter to add a feature"
              />

              <ChipsInput
                label="Services"
                value={editData.services}
                onChange={(next) => setEditData((s) => ({ ...s, services: next }))}
                hint="Press Enter to add a service"
              />

              <ChipsInput
                label="Tech stack"
                value={editData.techStack}
                onChange={(next) => setEditData((s) => ({ ...s, techStack: next }))}
                hint="Press Enter to add a technology"
              />

              <ChipsInput
                label="Gallery (image URLs)"
                value={editData.gallery}
                onChange={(next) => setEditData((s) => ({ ...s, gallery: next }))}
                hint="Paste a URL and press Enter"
              />

              <input
                type="number"
                value={editData.orderIndex}
                onChange={(e) =>
                  setEditData((s) => ({ ...s, orderIndex: Number(e.target.value) || 0 }))
                }
                placeholder="Order index"
                className="rounded-lg border px-3 py-2"
              />
              <select
                value={editData.status}
                onChange={(e) =>
                  setEditData((s) => ({ ...s, status: e.target.value as ProjectStatus }))
                }
                className="rounded-lg border px-3 py-2"
              >
                <option value="published">published</option>
                <option value="draft">draft</option>
              </select>

              <label className="flex items-center gap-2 sm:col-span-2 text-sm">
                <input
                  type="checkbox"
                  checked={editData.isFeatured}
                  onChange={(e) => setEditData((s) => ({ ...s, isFeatured: e.target.checked }))}
                />
                <span>Featured</span>
              </label>
            </div>

            <div className="mt-5 sticky bottom-0 bg-white pt-3 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border px-4 py-2"
                onClick={() => setEditId(null)}
                disabled={isDisabled}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
                disabled={isDisabled}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirm Delete modal (EN) */}
      {pendingDelete && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Confirm deletion</h3>
            <p className="mt-3 text-slate-700">
              Are you sure you want to delete project{' '}
              <span className="font-semibold">“{pendingDelete.title}”</span>?
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                className="rounded-lg border px-4 py-2"
                onClick={() => setPendingDelete(null)}
                disabled={busyId !== null}
              >
                No
              </button>
              <button
                className="rounded-lg bg-rose-600 px-4 py-2 text-white hover:bg-rose-700 disabled:opacity-60"
                onClick={doDelete}
                disabled={busyId !== null}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectsPage;
