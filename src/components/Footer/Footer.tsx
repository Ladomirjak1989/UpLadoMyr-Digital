'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import {
  FaBriefcase,
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPhone,
} from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

import CookieSettingsButton from '@/components/CookieConsent/CookieSettingsButton';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import { track } from '@/lib/pixel';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => pathname === path;

  const [formData, setFormData] = useState({ email: '' });
  const [isSending, setIsSending] = useState(false);

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
    if (isSending) return;

    track('Contact', {
      source: 'footer_newsletter_form',
      action: 'click_send',
      content_name: 'FooterEmailSubscribe',
      destination: '/thank-you',
    });

    track('SubmitApplication', {
      source: 'footer_newsletter_form',
      action: 'submit',
      content_name: 'FooterEmailSubscribe',
    });

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const templateReplyId = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_KEY;

    if (!serviceId || !templateId || !userId || !templateReplyId) {
      console.error('Footer email configuration error');
      return;
    }

    try {
      setIsSending(true);

      const backendRes = await fetch('/api/footer-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
        }),
      });

      if (!backendRes.ok) {
        const errorText = await backendRes.text();
        throw new Error(`Backend request failed with status ${backendRes.status}: ${errorText}`);
      }

      const backendData: { success: boolean; ref: string } = await backendRes.json();

      if (!backendData?.ref) {
        throw new Error('Missing footer lead reference from backend');
      }

      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          email: formData.email,
          name: formData.email,
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
          reply_to: 'info@upladomyr.com',
          time: time,
        },
        userId
      );

      if (response.status === 200) {
        track('Lead', {
          source: 'footer_newsletter_form',
          method: 'email',
          content_name: 'FooterEmailSubscribe',
          email_domain: formData.email.split('@')[1] || undefined,
          destination: '/thank-you',
        });

        setFormData({ email: '' });
        router.push(`/thank-you?ref=${encodeURIComponent(backendData.ref)}`);
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error) {
      console.error('Email sending error:', error);

      track('Contact', {
        source: 'footer_newsletter_form',
        action: 'error',
        content_name: 'FooterEmailSubscribe',
      });
    } finally {
      setIsSending(false);
    }
  };

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/services', label: 'SERVICES' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/blog', label: 'BLOG' },
    { href: '/contacts', label: 'CONTACT' },
  ];

  const socialLinks = [
    {
      Icon: FaLinkedin,
      href: 'https://www.linkedin.com/company/upladomyr-digital/?viewAsMember=true',
      label: 'Linkedin – UpLadoMyr Digital',
    },
    {
      Icon: FaFacebookF,
      href: 'https://www.facebook.com/profile.php?id=61584336012665',
      label: 'Facebook – UpLadoMyr Digital',
    },
    {
      Icon: FaInstagram,
      href: 'https://www.instagram.com/upladomyr/',
      label: 'Instagram – UpLadoMyr Digital',
    },
    {
      Icon: FaThreads,
      href: 'https://www.threads.com/@upladomyr',
      label: 'Threads – UpLadoMyr Digital',
    },
  ];

  return (
    <>
      <div
        className="relative bg-cover bg-center text-white py-16 px-4 sm:px-8 lg:py-24"
        style={{ backgroundImage: "url('/img/bannerhome/imgfooter.jpg')" }}
      >
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-dmserif text-xl sm:text-2xl md:text-3xl font-bold mb-6 leading-snug">
            Let’s build a website that works as hard as you do.
          </h2>

          <Link
            href="/contacts"
            onClick={() =>
              track('Contact', {
                source: 'footer_hero_cta',
                cta: 'free_consultation',
                destination: '/contacts',
              })
            }
            className="group relative inline-flex items-center gap-2 px-9 py-4 border-4 border-transparent text-base font-semibold rounded-full text-white bg-blue-900 shadow-[0_0_0_2px_#c7a23f] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-xl hover:shadow-[0_0_0_12px_transparent] hover:text-neutral-900 active:scale-95"
          >
            <span className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#c7a23f] rounded-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transform -translate-x-1/2 -translate-y-1/2" />
            <span className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3">
              FREE CONSULTATION
            </span>
            <svg
              className="absolute right-4 w-6 z-10 fill-[#c7a23f] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:right-[-25%] group-hover:fill-neutral-900"
              viewBox="0 0 24 24"
            >
              <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
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
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative w-10 h-10 sm:w-14 sm:h-12 md:w-16 md:h-14 lg:w-19 lg:h-14">
                <Image
                  src="/img/header/logo4.avif"
                  alt="UpLadoMyr Logo"
                  fill
                  className="object-contain rounded-full ring-2 ring-yellow-400 bg-white"
                />
              </div>
              <p className="text-2xl sm:text-lg font-medium tracking-wide text-gray-300">
                <span className="font-bold text-blue-950 font-dmserif">UpLadoMyr</span>{' '}
                <span className="text-yellow-700 font-dmserif">Digital</span>{' '}
                <span className="font-tangerine italic text-gray-500 hidden sm:inline">
                  — The diligent hand makes rich
                </span>
              </p>
            </div>

            <ul className="space-y-2 mt-2 text-sm">
              <li className="mt-3 text-black flex items-center gap-2 font-bold text-accent">
                <FaPhone className="bg-white rounded-full p-3 w-10 h-10 shadow-md border border-yellow-500 hover:shadow-lg transition-transform duration-300 hover:scale-110" />
                <a
                  href="tel:+31619388895"
                  onClick={() =>
                    track('Contact', {
                      source: 'footer_contact_list',
                      channel: 'phone',
                      value: '+31619388895',
                    })
                  }
                  className="hover:underline cursor-pointer"
                >
                  +31 619 - 38 - 88 - 95
                </a>
              </li>

              <li className="flex items-center space-x-2 font-bold text-black">
                <FaBriefcase className="text-accent bg-white rounded-full p-3 w-10 h-10 shadow-md border border-yellow-500 hover:shadow-lg transition-transform duration-300 hover:scale-110" />
                <a
                  href="mailto:info@upladomyr.com"
                  onClick={() =>
                    track('Contact', {
                      source: 'footer_contact_list',
                      channel: 'email',
                      value: 'info@upladomyr.com',
                    })
                  }
                  className="hover:underline cursor-pointer"
                >
                  info@upladomyr.com
                </a>
              </li>
            </ul>
          </div>

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
                      onClick={() =>
                        track('ViewContent', {
                          source: 'footer_sitemap',
                          content_name: item.label,
                          destination: item.href,
                        })
                      }
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
                disabled={isSending}
                className={`relative overflow-hidden border border-[#c7a23f] text-[#c7a23f] inline-block text-[15px] leading-[15px] py-[18px] px-[24px] bg-white select-none transition duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)] group ${
                  isSending ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                }`}
              >
                <span className="relative z-10 transition-colors duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)]">
                  {isSending ? 'SENDING…' : 'SEND'}
                </span>

                <span className="absolute bottom-0 left-1/2 text-white text-[13px] leading-[13px] h-[14px] opacity-0 top-1/2 transform -translate-x-1/2 translate-y-[225%] transition-all duration-[900ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:translate-y-[-50%] group-hover:opacity-100 z-[100]">
                  THANKS!
                </span>

                <span className="absolute bottom-[-50%] left-0 w-full h-full bg-[#c7a23f] transform skew-y-[9.3deg] scale-y-0 origin-bottom transition-transform duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:scale-y-200 z-[50]" />
              </button>
            </form>

            <div className="relative mt-8 w-full max-w-xl">
              <div className="flex items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900 shadow-sm">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 font-semibold">
                  i
                </span>

                <p className="leading-6 flex flex-wrap items-center gap-x-1">
                  <span>You can send us a message without an account.</span>
                  <span className="whitespace-nowrap">For faster support, please</span>

                  <span className="whitespace-nowrap">
                    <Link
                      href="/signin"
                      className="underline font-semibold hover:text-yellow-700"
                      onClick={() =>
                        track('ViewContent', {
                          source: 'footer_info_callout',
                          content_name: 'signin',
                          destination: '/signin',
                        })
                      }
                    >
                      sign in
                    </Link>
                  </span>

                  <span>or</span>

                  <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
                    <Link
                      href="/signup"
                      className="underline font-semibold hover:text-yellow-700"
                      onClick={() =>
                        track('ViewContent', {
                          source: 'footer_info_callout',
                          content_name: 'signup',
                          destination: '/signup',
                        })
                      }
                    >
                      create an account
                    </Link>
                    <span>.</span>
                    <FiArrowUp
                      className="text-yellow-600 text-sm sm:text-base translate-y-[-1px]"
                      aria-hidden
                    />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-2 pt-4 px-4 md:px-16 flex flex-col md:flex-row justify-between items-center text-xs text-gray-800 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left mb-7">
            <p>
              &copy; 2025-2026{' '}
              <Link
                href="https://www.upladomyr.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track('ViewContent', {
                    source: 'footer_copyright',
                    content_name: 'upladomyr.com',
                    destination: 'https://www.upladomyr.com',
                  })
                }
                className="text-blue-950 font-semibold font-dmserif hover:underline"
              >
                UpLadoMyr Digital
              </Link>
              . All rights reserved.
            </p>
            <span className="hidden md:inline">/</span>
            <Link
              href="/privacy"
              onClick={() =>
                track('ViewContent', {
                  source: 'footer_links',
                  content_name: 'privacy',
                  destination: '/privacy',
                })
              }
              className="underline hover:text-blue-500"
            >
              Privacy
            </Link>
            <span className="hidden md:inline">/</span>
            <Link
              href="/terms"
              onClick={() =>
                track('ViewContent', {
                  source: 'footer_links',
                  content_name: 'terms',
                  destination: '/terms',
                })
              }
              className="underline hover:text-blue-500"
            >
              Terms and Conditions
            </Link>
            <span className="hidden md:inline">/</span>
            <CookieSettingsButton />
          </div>

          <div className="flex flex-col items-center gap-4 mb-7">
            <div className="flex gap-4 justify-center">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() =>
                    track('Contact', {
                      source: 'footer_social_icons',
                      channel: 'social',
                      label,
                      href,
                    })
                  }
                  className="
                    w-8 h-8 flex items-center justify-center
                    rounded-full
                    bg-white text-[#042d5d]
                    border border-amber-900/80
                    text-xl
                    transition-all duration-200 ease-out
                    hover:scale-110
                    hover:text-[#042d5d]
                    hover:shadow-md
                    hover:bg-gradient-to-br
                    hover:from-[#f6d365]
                    hover:via-[#efc741]
                    hover:to-[#c58a1b]
                    active:scale-100
                    active:shadow-sm
                  "
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
