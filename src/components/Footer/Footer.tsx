'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaBriefcase,
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaTelegramPlane,
  FaYoutube,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contacts', label: 'CONTACT' },
  ];

  return (
    <>
      <div
        className="relative bg-cover bg-center text-white py-16 px-4 sm:px-8 lg:py-24"
        style={{ backgroundImage: "url('/img/bannerhome/imgfooter.jpg')" }}
      >
        {/* Контент по центру */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-dmserif text-xl sm:text-2xl md:text-3xl font-bold mb-6 leading-snug">
            Want a high-converting landing page or a sleek small website for your business?
          </h2>
          <Link
            href="/contacts"
            className="inline-block bg-[#c7a23f] text-white font-bold hover:bg-yellow-500 text-sm sm:text-base py-3 px-6 rounded-full 
  transition-all duration-300 shadow-md transform hover:scale-105"
          >
            GET A FREE CONSULTATION NOW
          </Link>
        </div>
      </div>

      <div className="relative -mb-1 z-10 pointer-events-none">
        <svg
          className="block w-full h-20 md:h-28 animate-wave-shine"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#f7f4ea" />
            </linearGradient>
          </defs>
          <path fill="url(#bottomGradient)" d="M0,96 C360,256 1080,0 1440,128L1440,320L0,320Z" />
        </svg>
      </div>

      <div className="bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] text-white pt-16 pb-8 px-6 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pb-2">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/img/header/logo1.jpg"
                  alt="UpLadoMyr Logo"
                  fill
                  className="object-contain rounded-full ring-2 ring-yellow-400 bg-white"
                />
              </div>
              <p className="text-sm sm:text-base font-medium tracking-wide text-gray-300">
                <span className="font-bold text-blue-950 font-dmserif ">UpLadoMyr</span>{' '}
                <span className="text-yellow-500 font-dmserif">Digital</span>{' '}
                <span className="font-tangerine hidden sm:inline italic text-gray-500">
                  — driving digital success
                </span>
              </p>
            </div>
            <ul className="space-y-2 mt-2 text-sm">
              <li className="mt-3 text-black flex items-center gap-2 font-bold text-accent">
                <FaPhone
                  className=" bg-white rounded-full p-3 w-10 h-10 shadow-md 
           border border-yellow-500 hover:shadow-lg transition-transform duration-300 hover:scale-110"
                />
                <a href="tel:+310619388895" className="hover:underline cursor-pointer">
                  +31 (06) 19 - 38 - 88 - 95
                </a>
              </li>
              <li className="flex items-center space-x-2 font-bold text-black">
                <FaBriefcase
                  className="text-accent bg-white rounded-full p-3 w-10 h-10 shadow-md 
           border border-yellow-500 hover:shadow-lg transition-transform duration-300 hover:scale-110"
                />
                <a href="mailto:info@upladomyr.com" className="hover:underline cursor-pointer">
                  info@upladomyr.com
                </a>
              </li>
            </ul>
          </div>

          {/* Sitemap with active page */}
          <div className="border-t md:border-t-0 md:border-l border-gray-400 pt-6 md:pt-0 md:pl-8 flex justify-center md:justify-start">
            <nav className="w-full md:w-auto">
              <h4 className="text-lg font-semibold mb-4 text-blue-950 text-center md:text-left">
                SITEMAP
              </h4>
              <ul className="space-y-3 text-gray-800 flex flex-col items-center md:items-start">
                {navItems.map(item => (
                  <li key={item.href} className="w-fit flex items-center gap-2 group">
                    <FaChevronRight
                      className={`text-xs transition-transform duration-300 group-hover:translate-x-1 ${
                        isActive(item.href) ? 'text-[#1e3a8a]' : 'text-gray-500'
                      }`}
                    />
                    <Link
                      href={item.href}
                      className={`relative transition-all duration-200 font-bold text-sm sm:text-base ${
                        isActive(item.href)
                          ? 'text-[#1e3a8a] underline underline-offset-4'
                          : 'hover:text-[#1e3a8a]'
                      }`}
                    >
                      {item.label}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#1e3a8a] transition-all group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: Email Signup */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-blue-950">
              WANT INSIGHTS IN YOUR INBOX?
            </h4>
            <p className="font-tangerine text-sm text-gray-500 mb-4 leading-relaxed">
              Looking to grow your business online? Leave your email — we’ll support you with expert
              tips and practical solutions.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 group w-full justify-center md:justify-start">
              <input
                type="email"
                placeholder="Your E-mail"
                className="w-full sm:max-w-[220px] px-4 py-2 rounded-md bg-white text-gray-900 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-[#c7a23f] text-white font-bold hover:bg-yellow-500 transition-all duration-300 shadow-md group-hover:scale-105"
              >
                <span>SEND</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7-7l7 7-7 7"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-400 mt-8 pt-4 px-4 md:px-16 flex flex-col md:flex-row justify-between items-center text-xs text-gray-700 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
            <p>
              &copy; 2025{' '}
              <Link
                href="https://www.upladomyr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-950 font-semibold font-dmserif hover:underline"
              >
                UpLadoMyr Digital
              </Link>
              . All rights reserved.
            </p>
            <span className="hidden md:inline">/</span>
            <Link href="/privacy" className="underline hover:text-blue-500">
              Privacy
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex gap-4 justify-center">
            {[FaFacebookF, FaInstagram, FaTelegramPlane, FaYoutube].map((Icon, i) => (
              <div
                key={i}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#042d5d] border border-yellow-500 hover:bg-yellow-100 transition hover:scale-110"
              >
                <Icon size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
