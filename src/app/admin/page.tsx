// import AdminMain from '@/components/Admin/AdminMain';

// export default function AdminPage() {
//   return (
//     <AdminMain>
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, Admin!</h1>
//       <p className="text-gray-600">This is your dashboard.</p>
//     </AdminMain>
//   );
// }

'use client';

import React from 'react';
import Link from 'next/link';
import AdminMain from '@/components/Admin/AdminMain';

const AdminPage = () => {
  return (
    <AdminMain>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, Admin!</h1>
      <p className="text-gray-600 mb-6">This is your dashboard.</p>

      <div className="flex gap-3">
        <Link
          href="/admin/users"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Manage users
        </Link>
      </div>
    </AdminMain>
  );
};

export default AdminPage;
