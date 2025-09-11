'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import emailjs from '@emailjs/browser';
import {
  FaBriefcase,
  FaChevronRight,
  // FaFacebookF,
  // FaInstagram,
  FaPhone,
  // FaTelegramPlane,
  // FaYoutube,
} from 'react-icons/fa';
import { useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
// зверху файлу
import CookieSettingsButton from '@/components/CookieConsent/CookieSettingsButton';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [formData, setFormData] = useState({
    email: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const time = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const templateReplyId = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_KEY;

    if (!serviceId || !templateId || !userId || !templateReplyId) {
      setSuccessMessage('❌ Configuration error. Please contact support.');
      return;
    }

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          email: formData.email,
          name: formData.email, // <- тут і використовується в шаблоні як {{name}}
          time: time,
        },

        userId
      );

      await emailjs.send(
        serviceId,
        templateReplyId,
        {
          email: formData.email,
          name: formData.email,
          reply_to: process.env.EMAIL_USER,
          time: time,
        },
        userId
      );

      if (response.status === 200) {
        setSuccessMessage('✅ Your message has been sent successfully!');
        setFormData({ email: '' });
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setSuccessMessage('❌ Something went wrong. Please try again.');
    }
  };

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contacts', label: 'CONTACT' },
  ];

  return (
    <>
      {/* Hero footer block */}
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
            className="group relative inline-flex items-center gap-2 px-9 py-4 border-4 border-transparent text-base font-semibold rounded-full text-white bg-blue-900 shadow-[0_0_0_2px_#c7a23f] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-xl hover:shadow-[0_0_0_12px_transparent] hover:text-neutral-900 active:scale-95"
          >
            {/* Circle animation */}
            <span className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#c7a23f] rounded-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transform -translate-x-1/2 -translate-y-1/2" />

            {/* Text */}
            <span className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3">
              FREE CONSULTATION
            </span>

            {/* Arrow out */}
            <svg
              className="absolute right-4 w-6 z-10 fill-[#c7a23f] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:right-[-25%] group-hover:fill-neutral-900"
              viewBox="0 0 24 24"
            >
              <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>

            {/* Arrow in */}
            <svg
              className="absolute left-[-25%] w-6 z-10 fill-[#c7a23f] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:left-4 group-hover:fill-neutral-900"
              viewBox="0 0 24 24"
            >
              <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
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
              <p className="text-2xl sm:text-lg font-medium tracking-wide text-gray-300">
                <span className="font-bold text-blue-950 font-dmserif">UpLadoMyr</span>{' '}
                <span className="text-yellow-700 font-dmserif">Digital</span>{' '}
                <span className="font-tangerine italic text-gray-500 hidden sm:inline">
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
                {navItems.map((item) => (
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
            <p className="font-tangerine text-lg sm:text-sm text-gray-800 sm:text-gray-500 mb-4 leading-relaxed">
              Looking to grow your business online? Leave your email — we’ll support you with expert
              tips and practical solutions.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full justify-center md:justify-start"
            >
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e-mail"
                required
                className="w-full sm:max-w-[220px] px-4 py-2 rounded-md bg-white text-gray-900 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              />

              <button
                type="submit"
                className="relative overflow-hidden border border-[#c7a23f] text-[#c7a23f] inline-block text-[15px] leading-[15px] py-[18px] px-[24px] bg-white cursor-pointer select-none transition duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)] group"
              >
                {/* Visible Text */}
                <span className="relative z-10 transition-colors duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)]">
                  SEND
                </span>

                {/* Hover Reveal Text */}
                <span className="absolute bottom-0 left-1/2 text-white text-[13px] leading-[13px] h-[14px] opacity-0 top-1/2 transform -translate-x-1/2 translate-y-[225%] transition-all duration-[900ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:translate-y-[-50%] group-hover:opacity-100 z-[100]">
                  THANKS!
                </span>

                {/* Background animation */}
                <span className="absolute bottom-[-50%] left-0 w-full h-full bg-[#c7a23f] transform skew-y-[9.3deg] scale-y-0 origin-bottom transition-transform duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:scale-y-200 z-[50]" />
              </button>

              {successMessage && (
                <p
                  className={`text-center font-medium ${successMessage.includes('✅') ? 'text-green-700' : 'text-red-600'}`}
                >
                  {successMessage}
                </p>
              )}
            </form>

            {/* 🔐 Info-callout: need to sign in */}
            <div className="relative mt-8 w-full max-w-xl">
              <div className="flex items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900 shadow-sm">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 font-semibold">
                  i
                </span>

                {/* робимо рядок «токенами», що можуть переноситись між собою,
       але окремі фрази тримаємо нерозривно */}
                <p className="leading-6 flex flex-wrap items-center gap-x-1">
                  <span>To send us an email, please</span>

                  <span className="whitespace-nowrap">
                    <Link href="/signin" className="underline font-semibold hover:text-yellow-700">
                      sign in
                    </Link>
                  </span>

                  <span>or</span>

                  {/* фраза + стрілка тримаються разом */}
                  <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
                    <Link href="/signup" className="underline font-semibold hover:text-yellow-700">
                      create an account
                    </Link>
                    <span>.</span>
                    <FiArrowUp
                      className="text-yellow-600 text-sm sm:text-base translate-y-[-1px] motion-safe:animate-ping"
                      aria-hidden
                      title="Login is at the top"
                    />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-400 mt-2 pt-6 px-4 md:px-16 flex flex-col md:flex-row justify-between items-center text-xs text-gray-800 gap-4">
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
            <span className="hidden md:inline">/</span>
            <Link href="/terms" className="underline hover:text-blue-500">
              Terms and Conditions
            </Link>
            {/* ⬇️ нове кнопка cookie settings (без перезавантаження) */}
            <span className="hidden md:inline">/</span>
            <CookieSettingsButton />
          </div>

          {/* Right: Icons */}
          {/* <div className="flex gap-4 justify-center">
            {[FaFacebookF, FaInstagram, FaTelegramPlane, FaYoutube].map((Icon, i) => (
              <div
                key={i}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#042d5d] border border-yellow-500 hover:bg-yellow-100 transition hover:scale-110"
              >
                <Icon size={14} />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
