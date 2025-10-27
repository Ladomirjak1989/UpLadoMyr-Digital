'use client';

import React, { useEffect, useMemo, useCallback, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectList from '../../ProjectList/ProjectList';

// універсальний debounce (але нижче використовуємо як string→void)
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let t: ReturnType<typeof setTimeout>;
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
  // допоміжне — щоб можна було вручну зачистити при unmount
  debounced.cancel = () => clearTimeout(t);
  return debounced as T & { cancel: () => void };
}

const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // ініціалізація AOS один раз
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // стабільний debounced setter
  const debouncedSet = useMemo(
    () => debounce((val: string) => setDebouncedSearchTerm(val), 300),
    []
  );

  // зачистка таймера при анмаунті
  useEffect(() => {
    return () => debouncedSet.cancel?.();
  }, [debouncedSet]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSet(value);
    },
    [debouncedSet]
  );

  return (
    <>
      <div className="w-full flex justify-end mt-4">
        <div className="relative w-60 sm:w-64 md:w-80 lg:w-[400px] sm:mr-6 lg:mr-12">
          <label htmlFor="project-search" className="sr-only">
            Search project
          </label>
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </span>
          <input
            id="project-search"
            type="text"
            placeholder="Search project by name…"
            value={searchTerm}
            onChange={handleChange}
            className="my-6 w-full border border-yellow-400 rounded px-4 py-2 text-sm pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            autoComplete="off"
          />
        </div>
      </div>

      {/* ProjectList ходить у /api/projects і приймає searchTerm */}
      <ProjectList searchTerm={debouncedSearchTerm} />
    </>
  );
};

export default ProjectsPage;
