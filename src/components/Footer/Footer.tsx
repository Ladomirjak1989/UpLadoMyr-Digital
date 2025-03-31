'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/projects', label: 'PROJECTEN' },
    { href: '/about', label: 'OVER ONS' },
    { href: '/contacts', label: 'CONTACT' },
  ];

  return (
    <footer className="bg-green-950 text-white px-6 py-10 shadow-lg">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center p-6 lg:p-10 text-gray-800">
        {/* Ліва частина - ім’я + контакти */}
        <div className="flex-1 space-y-4 text-left">
          <div className="relative w-fit">
            {/* Кутова форма через clip-path */}
            <div className="mb-24 bg-[#3f5968] text-white px-6 py-3 w-md font-bold text-lg clip-skew-right">
              <p className="uppercase tracking-wide">ALEKSANDER ZHYHAN</p>
              <p className="text-xs font-light mt-1">RENOVATIESPECIALIST</p>
            </div>
          </div>

          <ul className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-medium">
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-all duration-200 ${
                    pathname === item.href
                      ? 'text-green-900 underline font-bold'
                      : 'text-gray-700 hover:text-green-800 hover:underline'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="my-6 lg:my-0 lg:px-10">
          <div className="w-64 h-64 relative overflow-hidden clip-hexagon shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Image
              src="/img/img6.avif"
              alt="Profile"
              fill
              style={{ objectFit: 'contain' }} // 👈 вписується без обрізань
              className="transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Права частина - логотип і соцмережі */}
        <div className="flex-1 text-center lg:text-right space-y-4">
          <h3 className="text-xl font-bold tracking-widest text-yellow-600 underline">
            DELAX BOUW B.V.
          </h3>
          <p className="text-md text-gray-600">Van oud naar goud – elke renovatie telt</p>

          <div className="relative mt-10">
            {/* Скошений фон */}
            <div className="w-xs h-16 bg-[#345261] clip-custom absolute top-0 left-0 z-0"></div>

            {/* Іконки поверх фону */}
            <div className="relative z-10 flex justify-center gap-4 pt-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-blue-100 transition">
                <FaFacebookF className="text-[#3f5968] hover:text-blue-700 transition" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-pink-100 transition">
                <FaInstagram className="text-[#3f5968] hover:text-pink-600 transition" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-sky-100 transition">
                <FaTelegramPlane className="text-[#3f5968] hover:text-sky-500 transition" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-red-100 transition">
                <FaYoutube className="text-[#3f5968] hover:text-red-600 transition" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 px-4 lg:px-0 text-center">
        {/* Горизонтальна лінія */}
        <hr className="border-t-2 border-gray-300 w-32 mx-auto mb-4" />

        {/* Copyright текст */}
        <p className="text-sm text-white font-medium tracking-wide">
          &copy; 2025 <span className="text-yellow-500 font-semibold">UpLadoMyr Digital</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
