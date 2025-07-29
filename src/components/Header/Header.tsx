// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FiMenu, FiX } from 'react-icons/fi';
// import { usePathname } from 'next/navigation';
// import FloatingSocialButtons from '@/components/FloatingSocialButtons/FloatingSocialButtons';

// const navbarConfig = [
//   { link: '/', text: 'HOME' },
//   { link: '/projects', text: 'PROJECTS' },
//   { link: '/about', text: 'ABOUT US' },
//   { link: '/contacts', text: 'CONTACT' },
// ];

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const pathname = usePathname();

//   const supportedLangs = ['en', 'nl', 'uk', 'hu'];
//   const currentLang = pathname.split('/')[1];
//   const langPrefix = supportedLangs.includes(currentLang) ? `/${currentLang}` : '';

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
//           ? 'bg-gradient-to-br from-[#f9f8f4] via-[#d9d6ce] to-[#beb7b2] backdrop-blur-md shadow-lg py-2'
//           : 'bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] py-4'
//       }`}
//     >
//       <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-16">
//         {/* Logo & Text */}
//         <div className="flex items-center space-x-3 sm:space-x-4">
//           <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
//             <Image
//               src="/img/header/logo1.jpg"
//               alt="UpLadoMyr Logo"
//               fill
//               className="object-contain rounded-full ring-2 ring-[#ffcd00] bg-white"
//               sizes="(max-width: 768px) 40px, 64px"
//             />
//           </div>
//           <p className="text-xl sm:text-sm md:text-base lg:text-lg font-medium tracking-wide text-gray-800">
//             <span className="font-bold text-blue-950 font-dmserif">UpLadoMyr</span>{' '}
//             <span className="text-yellow-700 font-dmserif">Digital</span>{' '}
//             <span className="font-tangerine italic text-gray-500 hidden sm:inline">
//               — where ideas come to life in code
//             </span>
//           </p>
//         </div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-6 font-semibold text-gray-800">
//           {navbarConfig.map((item) => (
//             <Link
//               key={item.link}
//               href={`${langPrefix}${item.link}`}
//               className={`relative group transition-all duration-200 ${
//                 isActive(`${langPrefix}${item.link}`)
//                   ? 'text-[#1e3a8a] underline underline-offset-4'
//                   : 'hover:text-[#1e3a8a]'
//               }`}
//             >
//               {item.text}
//               <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#1e3a8a] transition-all group-hover:w-full"></span>
//             </Link>
//           ))}
//         </nav>

//         <div className="country-selector hidden sm:block" />

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-[#1e3a8a] text-xl sm:text-2xl p-2 rounded-md border border-gray-300 hover:bg-[#f7f4ea] transition"
//             aria-label="Toggle navigation"
//           >
//             {isOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-40 md:hidden transition-opacity duration-300 ease-in-out ${
//           isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//         }`}
//         onClick={() => setIsOpen(false)}
//         aria-hidden={!isOpen}
//       ></div>

//       {/* Mobile Nav */}
//       <nav
//         className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-[280px] bg-[#f7f4ea] shadow-lg transform ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         } transition-transform duration-300 ease-in-out z-50 p-5 sm:p-6`}
//       >
//         <button
//           onClick={() => setIsOpen(false)}
//           className="text-[#1e3a8a] text-2xl sm:text-3xl absolute top-4 right-4"
//           aria-label="Close menu"
//         >
//           <FiX />
//         </button>

//         <ul className="flex flex-col space-y-5 sm:space-y-6 mt-14 sm:mt-16 text-base sm:text-lg font-semibold text-[#1e3a8a]">
//           {navbarConfig.map((item) => (
//             <li key={item.link} className="border-b border-gray-300 pb-2">
//               <Link
//                 href={`${langPrefix}${item.link}`}
//                 className={`block transition ${
//                   isActive(`${langPrefix}${item.link}`)
//                     ? 'text-[#374151] font-bold'
//                     : 'hover:text-[#374151]'
//                 }`}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.text}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Floating Social Buttons */}
//       <FloatingSocialButtons isMenuOpen={isOpen} />
//     </header>
//   );
// };

// export default Header;

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import FloatingSocialButtons from '../FloatingSocialButtons/FloatingSocialButtons';
import { supabase } from '../../app/(site)/lib/supabaseClient';

const navbarConfig = [
  { link: '/', text: 'HOME' },
  { link: '/projects', text: 'PROJECTS' },
  { link: '/about', text: 'ABOUT US' },
  { link: '/contacts', text: 'CONTACT' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

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

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-br from-[#f9f8f4] via-[#d9d6ce] to-[#beb7b2] backdrop-blur-md shadow-lg py-2'
          : 'bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] py-4'
      }`}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Logo & Text */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
            <Image
              src="/img/header/logo1.jpg"
              alt="UpLadoMyr Logo"
              fill
              className="object-contain rounded-full ring-2 ring-[#ffcd00] bg-white"
              sizes="(max-width: 768px) 40px, 64px"
            />
          </div>
          <p className="text-xl sm:text-sm md:text-base lg:text-lg font-medium tracking-wide text-gray-800">
            <span className="font-bold text-blue-950 font-dmserif">UpLadoMyr</span>{' '}
            <span className="text-yellow-700 font-dmserif">Digital</span>{' '}
            <span className="font-tangerine italic text-gray-500 hidden sm:inline">
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

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-semibold bg-red-600 text-white hover:bg-red-700"
            >
              <FiUser className="text-lg" />
              Logout
            </button>
          ) : (
            <Link
              href="/signin"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-semibold bg-white text-[#1e3a8a] hover:bg-gray-100 border-gray-300"
            >
              <FiUser className="text-lg" />
              Login
            </Link>
          )}
        </nav>

        <div className="country-selector hidden sm:block" />

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#1e3a8a] text-xl sm:text-2xl p-2 rounded-md border border-gray-300 hover:bg-[#f7f4ea] transition"
            aria-label="Toggle navigation"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      ></div>

      {/* Mobile Nav */}
      <nav
        className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-[280px] bg-[#f7f4ea] shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 p-5 sm:p-6`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="text-[#1e3a8a] text-2xl sm:text-3xl absolute top-4 right-4"
          aria-label="Close menu"
        >
          <FiX />
        </button>

        <ul className="flex flex-col space-y-5 sm:space-y-6 mt-14 sm:mt-16 text-base sm:text-lg font-semibold text-[#1e3a8a]">
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

          <li>
            {user ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border w-full transition-all duration-200 text-sm font-semibold bg-red-600 text-white hover:bg-red-700"
              >
                <FiUser className="text-lg" />
                Logout
              </button>
            ) : (
              <Link
                href="/signin"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border w-full transition-all duration-200 text-sm font-semibold bg-white text-[#1e3a8a] hover:bg-gray-100 border-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <FiUser className="text-lg" />
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <FloatingSocialButtons isMenuOpen={isOpen} />
    </header>
  );
};

export default Header;
