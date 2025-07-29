'use client';

import React, { useEffect, useState, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectList from '../../ProjectList/ProjectList';

// ✅ debounce з типізацією тільки під string
function debounce(func: (arg: string) => void, delay: number): (arg: string) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (arg: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(arg), delay);
  };
}

const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // ✅ мемоізований debounce-хендлер
  const handleSearch = useMemo(
    () =>
      debounce((val: string): void => {
        setDebouncedSearchTerm(val);
      }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <>
      <div className="w-full flex justify-end mt-4">
        <div className="relative w-60 sm:w-64 md:w-80 lg:w-[400px] sm:mr-6 lg:mr-12">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search project by name..."
            value={searchTerm}
            onChange={handleChange}
            className="my-6 w-full border border-yellow-400 rounded px-4 py-2 text-sm pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>

      <ProjectList searchTerm={debouncedSearchTerm} />
    </>
  );
};

export default ProjectsPage;
