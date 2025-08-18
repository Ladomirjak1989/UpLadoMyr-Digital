'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Users', href: '/admin/users' },
  { label: 'Settings', href: '/admin/settings' },
];

const AdminMain = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded hover:bg-gray-800 transition ${
                pathname === href ? 'bg-gray-800' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile notice */}
      <aside className="md:hidden fixed inset-0 bg-black/80 text-white flex items-center justify-center z-50 text-center p-4">
        <div>
          <h2 className="text-lg font-bold">Admin menu not available on mobile</h2>
          <p className="text-sm mt-2">Please use a larger screen to access the admin panel.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminMain;
