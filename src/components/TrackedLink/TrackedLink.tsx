'use client';

import Link from 'next/link';
import React from 'react';
import { track } from '@/lib/pixel';

type Props = React.ComponentProps<typeof Link> & {
  eventName: string;
  payload?: Record<string, any>;
};

export default function TrackedLink({ eventName, payload, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        try {
          track(eventName, payload || {});
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('[TrackedLink] track failed:', err);
        }

        onClick?.(e);
      }}
    />
  );
}
