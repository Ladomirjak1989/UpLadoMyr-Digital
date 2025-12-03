'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiUser, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import FloatingSocialButtons from '../FloatingSocialButtons/FloatingSocialButtons';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import ScrollProgressBar from '../ScrollProgressBar/ScrollProgressBar';
import { SERVICES } from '@/lib/services.config';

const navbarConfig = [
  { link: '/', text: 'HOME' },
  { link: '/services', text: 'SERVICES' },
  { link: '/projects', text: 'PROJECTS' },
  { link: '/about', text: 'ABOUT US' },
  { link: '/contacts', text: 'CONTACT' },
  { link: '/blog', text: 'BLOG' },
];

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

  // desktop dropdown
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  // mobile accordion
  const [isServicesOpenMobile, setIsServicesOpenMobile] = useState(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // закривати моб-меню та акордеон при зміні маршруту
  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpenMobile(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ?? e?.message ?? 'Failed to log out. Please try again.';
      toast.error(typeof msg === 'string' ? msg : 'Failed to log out.');
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-gradient-to-br from-[#f9f8f4] via-[#d9d6ce] to-[#beb7b2] backdrop-blur-md shadow-lg py-2'
          : 'bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] py-4',
      ].join(' ')}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex mt-3 justify-between items-center px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Logo & Text */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
            <Image
              src="/img/header/logo4.png"
              alt="UpLadoMyr Logo"
              fill
              className="object-contain rounded-full ring-2 ring-[#f5d03f] shadow-sm"
              sizes="(max-width: 768px) 40px, 64px"
              priority
            />
          </div>

          <div className="flex flex-col">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide text-gray-800 leading-tight">
              <span className="font-bold text-blue-950 font-dmserif">UpLadoMyr</span>{' '}
              <span className="text-yellow-700 font-bold font-dmserif">Digital</span>
            </p>

            {/* Stylish tagline */}
            <span
              className="
        mt-1 inline-flex items-center
        rounded-full bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] border-1 border-amber-950
        px-2.5 sm:px-3 py-0.5
        text-[9px] sm:text-[10px] md:text-xs
        font-semibold tracking-[0.2em] uppercase
        text-slate-900 shadow-sm
      "
            >
              Custom Web Solutions
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 font-semibold text-gray-800">
          {navbarConfig.map((item) => {
            const isServices = item.link === '/services';

            if (!isServices) {
              return (
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
              );
            }

            // SERVICES з дропдауном
            return (
              <div
                key={item.link}
                className="relative group "
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link
                  href={item.link}
                  onClick={() => setIsServicesOpen(false)} // 🔹 закриваємо при кліку по SERVICES
                  className={`relative inline-flex items-center gap-1 transition-all duration-200 ${
                    isActive(item.link)
                      ? 'text-[#1e3a8a] underline underline-offset-4'
                      : 'hover:text-[#1e3a8a]'
                  }`}
                >
                  {item.text}
                  <FiChevronDown
                    className={`text-xs transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                  />
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#1e3a8a] transition-all group-hover:w-full" />
                </Link>

                {/* DROPDOWN: тільки назви сервісів */}
                <div
                  className={`absolute mt-1 left-0 top-full w-60 rounded-2xl border border-slate-200
                bg-white shadow-xl shadow-slate-900/10 overflow-hidden
                transition-all duration-200 origin-top
                ${
                  isServicesOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-1 pointer-events-none'
                }`}
                >
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={service.link}
                      onClick={() => setIsServicesOpen(false)} // 🔹 закриваємо дропдаун після вибору
                      className="block px-4 py-2.5 text-sm
                   text-slate-800 hover:bg-amber-50 hover:text-blue-900"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

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
        className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Mobile Nav */}
      <nav
        className={`md:hidden fixed inset-y-0 right-0 z-50 w-[86%] max-w-[340px]
          transform transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Mobile navigation"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f7f4ea] via-[#efe8d9] to-[#e0d5bf]" />
        <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

        <div className="h-full flex flex-col rounded-l-2xl border-l border-[#e6dcc8] shadow-2xl px-6 pt-6 pb-6">
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#1e3a8a] text-3xl absolute top-4 right-4"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#ffcd00] bg-white">
              <Image
                src="/img/header/logo4.png"
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

          <ul className="flex flex-col gap-2 mt-2 text-[#1e3a8a] font-semibold">
            {navbarConfig.map((item) => {
              const isServices = item.link === '/services';

              if (!isServices) {
                return (
                  <li key={item.link}>
                    <Link
                      href={item.link}
                      onClick={() => setIsOpen(false)}
                      className={`group relative flex items-center justify-between rounded-lg px-3 py-3 transition-all ${
                        isActive(item.link)
                          ? 'bg-white/80 text-[#1e3a8a] shadow'
                          : 'hover:bg-white/70 hover:shadow'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-2 w-2 rounded-full bg-[#1e3a8a] transition-opacity ${
                            isActive(item.link)
                              ? 'opacity-100'
                              : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                        {item.text}
                      </span>

                      <FiChevronRight
                        className={`text-[#1e3a8a] transition-transform ${
                          isActive(item.link) ? '' : 'group-hover:translate-x-0.5'
                        }`}
                      />
                    </Link>
                  </li>
                );
              }

              // SERVICES на мобілці — акордеон
              return (
                <li key={item.link}>
                  <button
                    type="button"
                    onClick={() => setIsServicesOpenMobile((v) => !v)}
                    className={`group relative flex w-full items-center justify-between rounded-lg px-3 py-3 transition-all ${
                      isActive(item.link) || isServicesOpenMobile
                        ? 'bg-white/80 text-[#1e3a8a] shadow'
                        : 'hover:bg-white/70 hover:shadow'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 rounded-full bg-[#1e3a8a] transition-opacity ${
                          isActive(item.link) || isServicesOpenMobile
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                      {item.text}
                    </span>
                    <FiChevronDown
                      className={`text-[#1e3a8a] text-sm transition-transform ${
                        isServicesOpenMobile ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isServicesOpenMobile && (
                    <div className="mt-1 ml-6 space-y-1 border-l border-slate-200 pl-3 text-sm">
                      <Link
                        href="/services"
                        onClick={() => {
                          setIsOpen(false);
                          setIsServicesOpenMobile(false);
                        }}
                        className="block rounded-md px-2 py-1 text-slate-800 hover:bg-white/80"
                      ></Link>
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.link}
                          onClick={() => {
                            setIsOpen(false);
                            setIsServicesOpenMobile(false);
                          }}
                          className="block rounded-md px-2 py-1 text-slate-800 hover:bg-white/80"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}

            <li className="pt-3">
              <div className="rounded-xl border border-[#e7dcc9] bg-white/75 p-3 shadow">
                {isLoading ? (
                  <span className="block text-sm text-gray-500 text-center">Loading…</span>
                ) : user ? (
                  <AuthAction variant="logout" full onClick={handleLogout} />
                ) : (
                  <AuthAction variant="login" full />
                )}
              </div>
            </li>
          </ul>

          <div className="mt-auto pt-6 text-[11px] text-gray-500">
            © {new Date().getFullYear()} UpLadoMyr Digital
          </div>
        </div>
      </nav>

      <FloatingSocialButtons isMenuOpen={isOpen} />

      <ScrollProgressBar
        placement="header"
        height="4px"
        barClassName="bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6]/30 to-[#c99700]"
        zIndex={999}
        initialMin={0.03}
      />
    </header>
  );
};

export default Header;
