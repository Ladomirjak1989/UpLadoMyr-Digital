'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from 'next/link';
import axiosInstance from '@/lib/axios';
import axios from 'axios'; // для axios.isCancel, типізація помилок

type ProjectCategory =
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

type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  websiteUrl?: string | null;
  category: ProjectCategory;
  isFeatured: boolean;
  status: 'draft' | 'published';
  techStack: string[];
  orderIndex: number;
};

interface ProjectListProps {
  searchTerm: string;
}

const CATEGORIES: Array<'All' | ProjectCategory> = [
  'All',
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

const ITEMS_PER_PAGE = 3;

const ProjectList: React.FC<ProjectListProps> = ({ searchTerm }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  // початкові значення з URL (?cat=..., ?page=...)
  const initialCat = (searchParams.get('cat') as ProjectCategory | null) ?? 'All';
  const initialPage = Number(searchParams.get('page') ?? '1');
  const initialPageSafe = Number.isFinite(initialPage) && initialPage > 0 ? initialPage : 1;

  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>(
    initialCat as any
  );
  const [currentPage, setCurrentPage] = useState<number>(initialPageSafe);

  const [rows, setRows] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce для пошуку (на випадок якщо зверху не дебаунсять)
  const [qDebounced, setQDebounced] = useState(searchTerm);
  useEffect(() => {
    const t = setTimeout(() => setQDebounced(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Серверні параметри
  const params = useMemo(() => {
    const p: Record<string, any> = {
      q: qDebounced?.trim() || undefined,
      status: 'published',
      take: ITEMS_PER_PAGE,
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
    };
    if (selectedCategory !== 'All') p.category = selectedCategory;
    return p;
  }, [qDebounced, selectedCategory, currentPage]);

  // Завантаження з API + скасування запиту (залежність — ОБ'ЄКТ params)
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axiosInstance.get<{ items: Project[]; total: number }>('/projects', {
          params,
          signal: controller.signal,
        });
        setRows(data.items);
        setTotal(data.total);
      } catch (e: unknown) {
        if (axios.isCancel(e)) return;
        const err = e as { response?: { data?: { message?: string } }; message?: string };
        setError(err?.response?.data?.message ?? err?.message ?? 'Failed to load projects');
        setRows([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [params]);

  // Повертаємо на 1 сторінку при зміні фільтрів
  useEffect(() => {
    setCurrentPage(1);
  }, [qDebounced, selectedCategory]);

  // Синк категорії/сторінки з URL (?cat=..., ?page=...); зберігаємо ?q
  useEffect(() => {
    const paramsUrl = new URLSearchParams(searchParams.toString());
    if (selectedCategory !== 'All') {
      paramsUrl.set('cat', selectedCategory);
    } else {
      paramsUrl.delete('cat');
    }
    if (currentPage > 1) {
      paramsUrl.set('page', String(currentPage));
    } else {
      paramsUrl.delete('page');
    }
    router.replace(`?${paramsUrl.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, currentPage]);

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <>
      <div className="py-5 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-7xl mx-auto">
        <div>
          <h2 className="text-center text-gray-800 mb-8" data-aos="fade-down">
            <span className="font-bold text-4xl sm:text-5xl">100% Custom Design.</span>
            <div>
              <span className="font-tangerine text-2xl sm:text-xl text-yellow-800 sm:text-yellow-600 italic">
                We never use pre-made templates.
              </span>
            </div>
          </h2>

          <div className="flex flex-wrap justify-center gap-2 mb-10" data-aos="fade-up">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full border shadow-md backdrop-blur-md text-sm font-medium transition
                  ${
                    selectedCategory === cat
                      ? 'bg-[#c7a23f] text-white border-yellow-500'
                      : 'bg-white text-black border-yellow-300 hover:bg-[#c7a23f] hover:text-white'
                  }`}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* помилка */}
        {error && (
          <div
            className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* лоадер / контент */}
        <div
          className="grid grid-cols-1 gap-6"
          aria-busy={loading}
          aria-live="polite"
          role="status"
        >
          {loading ? (
            [...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <div
                key={i}
                className="h-[400px] animate-pulse rounded-xl bg-gray-100 shadow"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              />
            ))
          ) : rows.length === 0 ? (
            <div className="text-center text-slate-600">No projects found.</div>
          ) : (
            rows.map((proj, i) => (
              <div
                key={proj.id}
                className="group relative rounded-xl bg-gray-50 shadow hover:shadow-lg transition overflow-hidden"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className="relative group overflow-hidden rounded-t-lg">
                  <div className="w-full h-[250px] sm:h-[400px] relative overflow-hidden">
                    <Image
                      src={
                        proj.imageUrl ??
                        'https://res.cloudinary.com/placeholder/image/upload/v1700000000/placeholder.jpg'
                      }
                      alt={`${proj.title} preview image`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1000px"
                      className="object-cover transition duration-300 group-hover:brightness-50"
                    />
                  </div>

                  {proj.websiteUrl && (
                    <a
                      href={proj.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="animate-pulse absolute bottom-2 left-1/2 transform -translate-x-1/2 sm:bottom-0 sm:left-36 sm:translate-x-0 z-10 group/button"
                    >
                      <div className="shadow-md bg-gradient-to-br from-amber-200 to-yellow-600 cursor-pointer rounded-full transition-all duration-300 px-3 py-3 flex items-center group-hover/button:px-6 group-hover/button:py-3 group-hover/button:gap-2">
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          height="20px"
                          width="20px"
                          className="fill-zinc-900"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            d="M15.4306 7.70172C7.55045 7.99826 3.43929 15.232 2.17021 19.3956C2.07701 19.7014 2.31139 20 2.63107 20C2.82491 20 3.0008 19.8828 3.08334 19.7074C6.04179 13.4211 12.7066 12.3152 15.514 12.5639C15.7583 12.5856 15.9333 12.7956 15.9333 13.0409V15.1247C15.9333 15.5667 16.4648 15.7913 16.7818 15.4833L20.6976 11.6784C20.8723 11.5087 20.8993 11.2378 20.7615 11.037L16.8456 5.32965C16.5677 4.92457 15.9333 5.12126 15.9333 5.61253V7.19231C15.9333 7.46845 15.7065 7.69133 15.4306 7.70172Z"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-zinc-800 hidden group-hover/button:inline-block">
                          Visit Our Website
                        </span>
                      </div>
                    </a>
                  )}
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-tangerine font-semibold text-blue-950 mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{proj.description}</p>

                  <Link href={`/projects/${proj.slug}`} prefetch>
                    <button className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group">
                      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-amber-600 rounded-full group-hover:w-56 group-hover:h-56"></span>
                      <span className="absolute bottom-0 left-0 h-full -ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-auto h-full opacity-100 object-stretch"
                          viewBox="0 0 487 487"
                        >
                          <path
                            fillOpacity=".1"
                            fillRule="nonzero"
                            fill="#FFF"
                            d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                          ></path>
                        </svg>
                      </span>
                      <span className="absolute top-0 right-0 w-12 h-full -mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="object-cover w-full h-full"
                          viewBox="0 0 487 487"
                        >
                          <path
                            fillOpacity=".1"
                            fillRule="nonzero"
                            fill="#FFF"
                            d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                          ></path>
                        </svg>
                      </span>
                      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"></span>
                      <span className="relative text-base font-semibold">Show more</span>
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap items-center">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1 || loading}
              className={`px-4 py-1 rounded border text-sm font-medium transition ${
                currentPage === 1 || loading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
              aria-label="Previous page"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                disabled={loading}
                className={`px-3 py-1 rounded border text-sm font-medium transition ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                }`}
                aria-current={currentPage === i + 1 ? 'page' : undefined}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || loading}
              className={`px-4 py-1 rounded border text-sm font-medium transition ${
                currentPage === totalPages || loading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectList;
