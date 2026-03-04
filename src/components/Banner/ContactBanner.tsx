'use client';
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaAt } from 'react-icons/fa';
import { SiViber, SiTelegram, SiWhatsapp } from 'react-icons/si';

/* ✅✅✅ ADDED START */
import { track } from '@/lib/pixel';
/* ✅✅✅ ADDED END */

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  info: string;
  href: string;

  /* ✅✅✅ ADDED START */
  channel?: 'phone' | 'email' | 'website' | 'viber' | 'telegram' | 'whatsapp';
  /* ✅✅✅ ADDED END */
}

function ContactBanner() {
  const [hovered, setHovered] = useState<number | null>(null);

  const contactList: ContactItem[] = [
    {
      icon: <FaPhone size={20} />,
      label: 'Phone',
      info: '+31 619-38-88-95',
      href: 'tel:+31 619-38-88-95',

      /* ✅✅✅ ADDED START */
      channel: 'phone',
      /* ✅✅✅ ADDED END */
    },
    {
      icon: <FaEnvelope size={20} />,
      label: 'Email',
      info: 'info@upladomyr.com',
      href: 'mailto:info@upladomyr.com',

      /* ✅✅✅ ADDED START */
      channel: 'email',
      /* ✅✅✅ ADDED END */
    },
    {
      icon: <FaAt size={20} />,
      label: 'Website',
      info: 'upladomyr.com',
      href: 'https://upladomyr.com',

      /* ✅✅✅ ADDED START */
      channel: 'website',
      /* ✅✅✅ ADDED END */
    },
    {
      icon: <SiViber size={20} />,
      label: 'Viber',
      info: 'Viber Chat',
      href: 'viber://chat?number=+380507252223',

      /* ✅✅✅ ADDED START */
      channel: 'viber',
      /* ✅✅✅ ADDED END */
    },
    {
      icon: <SiTelegram size={20} />,
      label: 'Telegram',
      info: '@upladomyr_support',
      href: 'https://t.me/bettinaladomirjak',

      /* ✅✅✅ ADDED START */
      channel: 'telegram',
      /* ✅✅✅ ADDED END */
    },
    {
      icon: <SiWhatsapp size={20} />,
      label: 'WhatsApp',
      info: 'Chat on WhatsApp',
      href: 'https://wa.me/+31619388895',

      /* ✅✅✅ ADDED START */
      channel: 'whatsapp',
      /* ✅✅✅ ADDED END */
    },
  ];

  return (
    <div
      className="relative w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] overflow-hidden  rounded-b-[40px]"
      style={{
        backgroundImage: "url('/img/bannercontact/contact-banner1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      data-aos="fade-up"
    >
      <div className="relative z-10 flex flex-col justify-between h-full px-4 sm:px-8 lg:px-20 py-10">
        <h2
          className="mt-40 sm:mt-48 text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-right text-white"
          data-aos="fade-down"
        >
          Contact Us
        </h2>

        <div className="flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-6 text-sm sm:text-base font-medium mt-10 pt-10">
          {contactList.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              /* ✅✅✅ ADDED START: Meta Pixel event on every CTA click */
              onClick={() => {
                track('Contact', {
                  source: 'contact_banner',
                  page: 'Contact',
                  channel: contact.channel ?? contact.label.toLowerCase(),
                  label: contact.label,
                  href: contact.href,
                  position: index + 1,
                });
              }}
              /* ✅✅✅ ADDED END */

              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative flex items-center gap-3 group transition-transform duration-300 transform hover:scale-105 focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full p-2 sm:p-3 shadow-md border border-yellow-300 group-hover:bg-[#c7a23f] group-hover:text-white hover:shadow-sm transition-transform duration-300 hover:scale-110 text-black flex items-center justify-center">
                {contact.icon}
              </div>
              <span className="text-xs sm:text-sm text-white/80">{contact.label}</span>

              {hovered === index && (
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-gray-950 text-xs px-3 py-1 rounded-full shadow-md whitespace-nowrap z-10">
                  {contact.info}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactBanner;
