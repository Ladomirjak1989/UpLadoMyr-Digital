// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FiMenu, FiX, FiUser } from 'react-icons/fi';
// import { usePathname } from 'next/navigation';
// import FloatingSocialButtons from '../FloatingSocialButtons/FloatingSocialButtons';
// import { useAuth } from '@/context/AuthContext';

// const navbarConfig = [
//   { link: '/', text: 'HOME' },
//   { link: '/projects', text: 'PROJECTS' },
//   { link: '/about', text: 'ABOUT US' },
//   { link: '/contacts', text: 'CONTACT' },
// ];

// const Header: React.FC = () => {
//   const pathname = usePathname() ?? '';
//   const { user, logout, isLoading } = useAuth();

//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const isActive = (path: string) => pathname === path;

//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logout(); // бек зніме HttpOnly cookie, контекст очистить юзера і зробить redirect на /signin
//       setIsOpen(false);
//     } catch {
//       // опціонально: показати toast/error
//     }
//   };

//   return (
//     <header
//       className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled
//         ? 'bg-gradient-to-br from-[#f9f8f4] via-[#d9d6ce] to-[#beb7b2] backdrop-blur-md shadow-lg py-2'
//         : 'bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] py-4'
//         }`}
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
//               priority
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
//         <nav className="hidden md:flex items-center space-x-6 font-semibold text-gray-800">
//           {navbarConfig.map((item) => (
//             <Link
//               key={item.link}
//               href={`${item.link}`}
//               className={`relative group transition-all duration-200 ${isActive(`${item.link}`)
//                 ? 'text-[#1e3a8a] underline underline-offset-4'
//                 : 'hover:text-[#1e3a8a]'
//                 }`}
//             >
//               {item.text}
//               <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#1e3a8a] transition-all group-hover:w-full" />
//             </Link>
//           ))}

//           {/* Auth actions */}
//           {isLoading ? (
//             <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-gray-500">
//               Loading…
//             </span>
//           ) : user ? (
//             // LOGOUT — Темно-синій, білий текст
//             <button
//               onClick={handleLogout}
//               className="
//       relative flex items-center gap-1.5 sm:gap-2
//       px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5
//       rounded-md border text-xs sm:text-sm md:text-base font-semibold
//       text-white border-[#0a1c33]
//       [background-image:linear-gradient(#d8dde6,#8ea0b8_48%,#1e3a5f_48%,#0a1c33)]
//       shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_1px_0_rgba(255,255,255,.5),0_2px_4px_rgba(0,0,0,.35)]
//       transition-all
//       before:content-[''] before:absolute before:inset-0 before:rounded-md
//       before:pointer-events-none before:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.25)_70%,rgba(255,255,255,0)_100%)]
//       before:opacity-0 hover:before:opacity-100
//       before:transition-opacity before:duration-300
//       hover:brightness-105
//       active:translate-y-px active:shadow-[inset_0_2px_6px_rgba(0,0,0,.45)]
//     "
//             >
//               <FiUser className="text-sm sm:text-base md:text-lg" />
//               Logout
//             </button>
//           ) : (
//             // LOGIN — Золотий, чорний текст
//             <Link
//               href="/signin"
//               className="
//       relative flex items-center gap-1.5 sm:gap-2
//       px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5
//       rounded-md border text-xs sm:text-sm md:text-base font-semibold
//       text-black border-[#7a5a00]
//       [background-image:linear-gradient(#fff7e0,#f0d27a_48%,#c99700_48%,#7a5a00)]
//       shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_1px_0_rgba(255,255,255,.5),0_2px_4px_rgba(0,0,0,.35)]
//       transition-all
//       before:content-[''] before:absolute before:inset-0 before:rounded-md
//       before:pointer-events-none before:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.25)_70%,rgba(255,255,255,0)_100%)]
//       before:opacity-0 hover:before:opacity-100
//       before:transition-opacity before:duration-300
//       hover:brightness-105
//       active:translate-y-px active:shadow-[inset_0_2px_6px_rgba(0,0,0,.45)]
//     "
//             >
//               <FiUser className="text-sm sm:text-base md:text-lg" />
//               Login
//             </Link>
//           )}

//         </nav>

//         <div className="country-selector hidden sm:block" />

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsOpen((v) => !v)}
//             className="text-[#1e3a8a] text-xl sm:text-2xl p-2 rounded-md border border-gray-300 hover:bg-[#f7f4ea] transition"
//             aria-label="Toggle navigation"
//             aria-expanded={isOpen}
//           >
//             {isOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//           }`}
//         onClick={() => setIsOpen(false)}
//         aria-hidden={!isOpen}
//       />

//       {/* Mobile Nav */}
//       <nav
//         className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-[280px] bg-[#f7f4ea] shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
//           } transition-transform duration-300 z-50 p-5 sm:p-6`}
//         aria-label="Mobile navigation"
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
//                 href={`${item.link}`}
//                 className={`block transition ${isActive(`${item.link}`)
//                   ? 'text-[#374151] font-bold'
//                   : 'hover:text-[#374151]'
//                   }`}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.text}
//               </Link>
//             </li>
//           ))}

//           <li>
//             {isLoading ? (
//               <span className="px-4 py-2 text-sm text-gray-500">Loading…</span>
//             ) : user ? (
//               <button
//                 onClick={() => {
//                   setIsOpen(false);
//                   handleLogout();
//                 }}
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg border w-full transition-all duration-200 text-sm font-semibold bg-blue-700 text-white hover:bg-blue-00"
//               >
//                 <FiUser className="text-lg" />
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 href="/signin"
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg border w-full transition-all duration-200 text-sm font-semibold bg-white text-[#1e3a8a] hover:bg-gray-100 border-gray-300"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <FiUser className="text-lg" />
//                 Login
//               </Link>
//             )}
//           </li>
//         </ul>
//       </nav>

//       <FloatingSocialButtons isMenuOpen={isOpen} />
//     </header>
//   );
// };

// export default Header;

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiUser, FiChevronRight } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import FloatingSocialButtons from '../FloatingSocialButtons/FloatingSocialButtons';
import { useAuth } from '@/context/AuthContext';

const navbarConfig = [
  { link: '/', text: 'HOME' },
  { link: '/projects', text: 'PROJECTS' },
  { link: '/about', text: 'ABOUT US' },
  { link: '/contacts', text: 'CONTACT' },
];

/** ---------- Спільний стиль для кнопок ---------- */
const btnBase = `relative inline-flex items-center justify-center gap-2
   px-4 py-2 md:px-5 md:py-2.5 rounded-md font-semibold text-sm md:text-base
   shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_1px_0_rgba(255,255,255,.5),0_2px_4px_rgba(0,0,0,.35)]
   transition-all duration-300 select-none
   before:content-[''] before:absolute before:inset-0 before:rounded-md before:pointer-events-none
   before:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.25)_70%,rgba(255,255,255,0)_100%)]
   before:opacity-0 hover:before:opacity-100 hover:brightness-105 active:translate-y-[1px]`;

const btnLogin = `${btnBase} text-black border border-[#7a5a00]
   [background-image:linear-gradient(#fff7e0,#f0d27a_48%,#c99700_48%,#7a5a00)]`;

const btnLogout = `${btnBase} text-white border border-[#0a1c33]
   [background-image:linear-gradient(#d8dde6,#8ea0b8_48%,#1e3a5f_48%,#0a1c33)]`;

/** Кнопка авторизації з однаковим стилем для desktop & mobile */
function AuthAction({
  variant,
  full = false,
  onClick,
}: {
  variant: 'login' | 'logout';
  full?: boolean;
  onClick?: () => void;
}) {
  const className = `${variant === 'login' ? btnLogin : btnLogout} ${full ? 'w-full' : ''}`;
  if (variant === 'login') {
    return (
      <Link href="/signin" className={className}>
        <FiUser className="text-base md:text-lg" />
        Login
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={className}>
      <FiUser className="text-base md:text-lg" />
      Logout
    </button>
  );
}

const Header: React.FC = () => {
  const pathname = usePathname() ?? '';
  const { user, logout, isLoading } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch {
      /* no-op */
    }
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
              priority
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
        <nav className="hidden md:flex items-center space-x-6 font-semibold text-gray-800">
          {navbarConfig.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className={`relative group transition-all duration-200 ${
                isActive(item.link)
                  ? 'text-[#1e3a8a] underline underline-offset-4'
                  : 'hover:text-[#1e3a8a]'
              }`}
            >
              {item.text}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#1e3a8a] transition-all group-hover:w-full" />
            </Link>
          ))}

          {/* Auth actions */}
          {isLoading ? (
            <span className="px-3 py-2 text-sm text-gray-500">Loading…</span>
          ) : user ? (
            <AuthAction variant="logout" onClick={handleLogout} />
          ) : (
            <AuthAction variant="login" />
          )}
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="text-[#1e3a8a] text-2xl p-2 rounded-md border border-yellow-700 hover:bg-[#f7f4ea] transition"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Mobile Nav
      <nav
        className={`md:hidden fixed top-0 right-0 h-full w-[82%] max-w-[320px]
          bg-[#f7f4ea] shadow-2xl transform
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          transition-transform duration-300 z-50 p-6`}
        aria-label="Mobile navigation"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="text-[#1e3a8a] text-3xl absolute top-4 right-4"
          aria-label="Close menu"
        >
          <FiX />
        </button>

        <ul className="flex flex-col gap-5 mt-14 text-lg font-semibold text-[#1e3a8a]">
          {navbarConfig.map((item) => (
            <li key={item.link} className="border-b border-gray-300 pb-3">
              <Link
                href={item.link}
                className={`block transition ${isActive(item.link) ? 'text-[#374151] font-bold' : 'hover:text-[#374151]'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </Link>
            </li>
          ))}

          <li className="pt-2">
            {isLoading ? (
              <span className="px-4 py-2 text-sm text-gray-500">Loading…</span>
            ) : user ? (
              <AuthAction variant="logout" full onClick={() => { setIsOpen(false); handleLogout(); }} />
            ) : (
              <AuthAction variant="login" full />
            )}
          </li>
        </ul>
      </nav> */}

      {/* Mobile Nav */}
      <nav
        className={`md:hidden fixed inset-y-0 right-0 z-50
    w-[86%] max-w-[340px]
    transform transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Mobile navigation"
      >
        {/* background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f7f4ea] via-[#efe8d9] to-[#e0d5bf]" />
        <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

        <div className="h-full flex flex-col rounded-l-2xl border-l border-[#e6dcc8] shadow-2xl px-6 pt-6 pb-6">
          {/* Close */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#1e3a8a] text-3xl absolute top-4 right-4"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          {/* Brand / user hint */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#ffcd00] bg-white">
              <Image
                src="/img/header/logo1.jpg"
                alt="Logo"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-950 leading-tight">
                UpLadoMyr <span className="text-yellow-700">Digital</span>
              </p>
              <p className="text-[11px] text-gray-500 truncate">
                {user ? `Signed in as ${user.email}` : 'Welcome!'}
              </p>
            </div>
          </div>

          {/* Links */}
          <ul className="flex flex-col gap-2 mt-2 text-[#1e3a8a] font-semibold">
            {navbarConfig.map((item) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex items-center justify-between rounded-lg px-3 py-3
              transition-all
              ${
                isActive(item.link)
                  ? 'bg-white/80 text-[#1e3a8a] shadow'
                  : 'hover:bg-white/70 hover:shadow'
              }`}
                >
                  <span className="flex items-center gap-3">
                    {/* маленький маркер */}
                    <span
                      className={`h-2 w-2 rounded-full bg-[#1e3a8a] transition-opacity
                ${isActive(item.link) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    />
                    {item.text}
                  </span>

                  <FiChevronRight
                    className={`text-[#1e3a8a] transition-transform
                ${isActive(item.link) ? '' : 'group-hover:translate-x-0.5'}`}
                  />

                  {/* лівий індикатор на hover */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r
                bg-[#1e3a8a] transition-opacity
                ${isActive(item.link) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  />
                </Link>
              </li>
            ))}

            {/* Auth card */}
            <li className="pt-3">
              <div className="rounded-xl border border-[#e7dcc9] bg-white/75 p-3 shadow">
                {isLoading ? (
                  <span className="block text-sm text-gray-500 text-center">Loading…</span>
                ) : user ? (
                  <AuthAction
                    variant="logout"
                    full
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                  />
                ) : (
                  <AuthAction variant="login" full />
                )}
              </div>
            </li>
          </ul>

          {/* Footer note */}
          <div className="mt-auto pt-6 text-[11px] text-gray-500">
            © {new Date().getFullYear()} UpLadoMyr Digital
          </div>
        </div>
      </nav>

      <FloatingSocialButtons isMenuOpen={isOpen} />
    </header>
  );
};

export default Header;
