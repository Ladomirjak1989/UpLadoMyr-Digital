'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navbarConfig = [
  { link: '/', text: 'HOME' },
  { link: '/projects', text: 'PROJECTEN' },
  { link: '/about', text: 'OVER ONS' },
  { link: '/contacts', text: 'CONTACT' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full top-0 left-0 shadow-md z-50 bg-gradient-to-br from-green-50 via-green-100 to-emerald-200">
      <div className="flex justify-between items-center p-4 lg:px-16">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image
            src="/img/dalex-b.png"
            alt="Dalex Bouw Logo"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100px, (max-width: 1024px) 140px, 180px"
            className="w-20 sm:w-24 md:w-32 lg:w-40 h-auto rounded-2xl"
          />
        </div>
        <p className="mr-auto ml-9 underline hidden lg:block text-base text-gray-600 italic tracking-wide leading-relaxed font-medium">
          UpLadoMyr Digital
        </p>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-gray-900 font-bold">
          {navbarConfig.map(item => (
            <Link
              key={item.link}
              href={item.link}
              className={`relative group transition ${
                isActive(item.link)
                  ? 'text-green-900 underline underline-offset-4'
                  : 'text-gray-900'
              }`}
            >
              {item.text}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-700 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-900 text-2xl p-2 rounded-md border border-gray-300 hover:bg-gray-200 transition"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 md:hidden transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Nav */}
      <nav
        className={`md:hidden fixed top-0 right-0 h-full w-2/3 max-w-[280px] bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 p-6`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-900 text-3xl absolute top-5 right-5"
        >
          <FiX />
        </button>

        <ul className="flex flex-col space-y-6 mt-12 text-lg font-semibold text-gray-900">
          {navbarConfig.map(item => (
            <li key={item.link} className="border-b border-gray-300 pb-2">
              <Link
                href={item.link}
                className={`block transition ${
                  isActive(item.link) ? 'text-green-900 font-bold' : 'hover:text-green-900'
                }`}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
