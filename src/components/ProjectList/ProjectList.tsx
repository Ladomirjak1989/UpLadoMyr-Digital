'use client';

import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  title: string;
  renderLink: string;
  cloudinaryLink: string;
  description: string;
  category: string;
}

interface ProjectListProps {
  searchTerm: string;
}

const categories: string[] = [
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

const allProjects: Project[] = [
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
    title: 'Medical Cards',
    renderLink: 'https://medical-cards-kappa.vercel.app/',
    cloudinaryLink:
      'https://res.cloudinary.com/dq0fwucoj/image/upload/v1740677637/img4_krymz4_Sharpened_gebhg2.png',
    description:
      'The Medical Cards app is a secure digital platform that allows users to store, manage, and share their medical records effortlessly. With easy access to prescriptions, appointments, and health history, it ensures seamless communication between patients and healthcare providers. 🏥📄',
    category: 'Medical',
  },
  {
    title: 'Aleksander Klusbedrijf',
    renderLink: 'https://alexander-zhyhan.vercel.app/',
    cloudinaryLink:
      'https://res.cloudinary.com/dq0fwucoj/image/upload/v1744648462/img_f4p3gd_Sharpened_yqfqwq.png',
    description:
      'Aleksander Klusbedrijf is a professional construction and renovation company based in the Netherlands. We specialize in home improvements, interior and exterior renovations, tiling, painting, drywall installation, and general handyman services. Trusted for quality craftsmanship and timely delivery, we turn your ideas into solid results. 🧱🏡',
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

const ITEMS_PER_PAGE = 3;

const ProjectList: React.FC<ProjectListProps> = ({ searchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const filtered: Project[] = allProjects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages: number = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProjects: Project[] = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
            {categories.map((cat) => (
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
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {paginatedProjects.map((proj, i) => (
            <div
              key={i}
              className="group relative rounded-xl bg-gray-50  shadow hover:shadow-lg transition overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <div className="relative group overflow-hidden rounded-t-lg">
                <div className="w-full h-[250px] sm:h-[400px] relative overflow-hidden">
                  <Image
                    src={proj.cloudinaryLink}
                    alt={proj.title}
                    fill
                    className="object-cover transition duration-300 group-hover:brightness-50"
                  />
                </div>

                <a
                  href={proj.renderLink}
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
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-xl font-tangerine font-semibold text-blue-950 mb-2">
                  {proj.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {expandedIndex === i ? proj.description : `${proj.description.slice(0, 120)}...`}
                </p>
                <button
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  className="text-blue-950 text-sm hover:underline"
                >
                  {expandedIndex === i ? 'Show Less' : 'Show More...'}
                </button>
                <Link href="/projectdetails">
                  <button className="text-blue-700 hover:underline text-sm">Show Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap items-center">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-1 rounded border text-sm font-medium transition ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border text-sm font-medium transition ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-1 rounded border text-sm font-medium transition ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
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
