'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

export function useAdminGate() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await axios.get('api/auth/me');
        if (data?.role !== 'admin') router.replace('/'); // не адмін → додому
      } catch {
        router.replace('/unauthorized'); // або /login
      } finally {
        if (active) setReady(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [router]);

  return ready; // коли true — можна малювати сторінку
}
