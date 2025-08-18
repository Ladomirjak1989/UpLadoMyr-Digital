'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function UnauthorizedPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/signin');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <FaLock className="text-red-500 text-6xl mb-6" />
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>

      <p className="text-center text-lg max-w-md mb-6">
        {user
          ? `Hi, your role does not have access to this page.`
          : 'Only admins can access this page.'}
      </p>

      <p className="text-sm text-gray-500 mb-6">
        Redirecting to <span className="underline">Sign In</span> in 10 seconds...
      </p>

      <Link
        href="/signin"
        className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
      >
        Go to Sign In
      </Link>
    </div>
  );
}
