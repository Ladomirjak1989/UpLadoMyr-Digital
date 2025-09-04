'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function UnauthorizedPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [seconds, setSeconds] = useState(10);

  // Тік кожну секунду, зупиняємося на 0
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Коли дійшли до 0 — робимо редірект (побічний ефект окремо!)
  useEffect(() => {
    if (seconds === 0) {
      router.replace('/signin');
    }
  }, [seconds, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <FaLock className="text-red-500 text-6xl mb-6" />
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>

      <p className="text-center text-lg max-w-md mb-6">
        {user
          ? 'Hi, your role does not have access to this page.'
          : 'Only admins can access this page.'}
      </p>

      <p className="text-sm text-gray-800 mb-6">
        Redirecting to <span className="underline">Sign In</span> in{' '}
        <span className="font-semibold">{seconds}</span> second{seconds === 1 ? '' : 's'}…
      </p>

      <Link
        href="/signin"
        className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
      >
        Go to Sign In now
      </Link>
    </div>
  );
}
