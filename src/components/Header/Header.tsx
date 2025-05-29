// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FiMenu, FiX } from 'react-icons/fi';
// import { usePathname } from 'next/navigation';
// import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

// const navbarConfig = [
//   { link: '/', text: 'HOME' },
//   { link: '/projects', text: 'PROJECTS' },
//   { link: '/about', text: 'ABOUT' },
//   { link: '/contacts', text: 'CONTACT' },
// ];

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();
//   const [isScrolled, setIsScrolled] = useState(false);

//   const isActive = (path: string) => pathname === path;

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header
//       className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
//           : 'bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] py-4'
//       }`}
//     >
//       <div className="flex justify-between items-center px-4 lg:px-16">
//         {/* Logo & Text */}
//         <div className="flex items-center space-x-4">
//           <div className="relative w-12 h-12 sm:w-16 sm:h-16">
//             <Image
//               src="/img/header/logo1.jpg"
//               alt="UpLadoMyr Logo"
//               fill
//               className="object-contain rounded-full ring-2 ring-[#ffcd00] bg-white"
//             />
//           </div>
//           <p className="text-sm sm:text-base md:text-lg font-medium tracking-wide text-gray-800">
//             <span className="font-bold text-blue-950 font-dmserif">UpLadoMyr</span>{' '}
//             <span className="text-[#deb40a] font-dmserif">Digital</span>{' '}
//             <span className="font-tangerine hidden sm:inline italic text-gray-500">
//               — where ideas come to life in code
//             </span>
//           </p>
//         </div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-6 font-semibold text-gray-800">
//           {navbarConfig.map((item) => (
//             <Link
//               key={item.link}
//               href={item.link}
//               className={`relative group transition-all duration-200 ${
//                 isActive(item.link)
//                   ? 'text-[#1e3a8a] underline underline-offset-4'
//                   : 'hover:text-[#1e3a8a]'
//               }`}
//             >
//               {item.text}
//               <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#1e3a8a] transition-all group-hover:w-full"></span>
//             </Link>
//           ))}
//         </nav>

//         <div>
//           <LanguageSwitcher />
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-[#1e3a8a] text-2xl p-2 rounded-md border border-gray-300 hover:bg-[#f7f4ea] transition"
//           >
//             {isOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-40 md:hidden transition-opacity ${
//           isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//         }`}
//         onClick={() => setIsOpen(false)}
//       ></div>

//       {/* Mobile Nav */}
//       <nav
//         className={`md:hidden fixed top-0 right-0 h-full w-2/3 max-w-[280px] bg-[#f7f4ea] shadow-lg transform ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         } transition-transform duration-300 ease-in-out z-50 p-6`}
//       >
//         <button
//           onClick={() => setIsOpen(false)}
//           className="text-[#1e3a8a] text-3xl absolute top-5 right-5"
//         >
//           <FiX />
//         </button>

//         <ul className="flex flex-col space-y-6 mt-12 text-lg font-semibold text-[#1e3a8a]">
//           {navbarConfig.map((item) => (
//             <li key={item.link} className="border-b border-gray-300 pb-2">
//               <Link
//                 href={item.link}
//                 className={`block transition ${
//                   isActive(item.link) ? 'text-[#374151] font-bold' : 'hover:text-[#374151]'
//                 }`}
//               >
//                 {item.text}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

const navbarConfig = [
  { link: '/', text: 'HOME' },
  { link: '/projects', text: 'PROJECTS' },
  { link: '/about', text: 'ABOUT' },
  { link: '/contacts', text: 'CONTACT' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const supportedLangs = ['en', 'nl', 'uk', 'hu'];
  const currentLang = pathname.split('/')[1];
  const langPrefix = supportedLangs.includes(currentLang) ? `/${currentLang}` : '';

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
          : 'bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] py-4'
      }`}
    >
      <div className="flex justify-between items-center px-4 lg:px-16">
        {/* Logo & Text */}
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16">
            <Image
              src="/img/header/logo1.jpg"
              alt="UpLadoMyr Logo"
              fill
              className="object-contain rounded-full ring-2 ring-[#ffcd00] bg-white"
            />
          </div>
          <p className="text-sm sm:text-base md:text-lg font-medium tracking-wide text-gray-800">
            <span className="font-bold text-blue-950 font-dmserif">UpLadoMyr</span>{' '}
            <span className="text-[#deb40a] font-dmserif">Digital</span>{' '}
            <span className="font-tangerine hidden sm:inline italic text-gray-500">
              — where ideas come to life in code
            </span>
          </p>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-semibold text-gray-800">
          {navbarConfig.map((item) => (
            <Link
              key={item.link}
              href={`${langPrefix}${item.link}`}
              className={`relative group transition-all duration-200 ${
                isActive(`${langPrefix}${item.link}`)
                  ? 'text-[#1e3a8a] underline underline-offset-4'
                  : 'hover:text-[#1e3a8a]'
              }`}
            >
              {item.text}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#1e3a8a] transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="country-selector" />

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#1e3a8a] text-2xl p-2 rounded-md border border-gray-300 hover:bg-[#f7f4ea] transition"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 md:hidden transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Nav */}
      <nav
        className={`md:hidden fixed top-0 right-0 h-full w-2/3 max-w-[280px] bg-[#f7f4ea] shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 p-6`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="text-[#1e3a8a] text-3xl absolute top-5 right-5"
        >
          <FiX />
        </button>

        <ul className="flex flex-col space-y-6 mt-12 text-lg font-semibold text-[#1e3a8a]">
          {navbarConfig.map((item) => (
            <li key={item.link} className="border-b border-gray-300 pb-2">
              <Link
                href={`${langPrefix}${item.link}`}
                className={`block transition ${
                  isActive(`${langPrefix}${item.link}`)
                    ? 'text-[#374151] font-bold'
                    : 'hover:text-[#374151]'
                }`}
                onClick={() => setIsOpen(false)}
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
