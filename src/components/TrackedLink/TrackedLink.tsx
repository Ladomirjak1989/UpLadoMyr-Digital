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
        // fire pixel first
        try {
          track(eventName, payload || {});
        } catch {}

        // keep existing onClick if someone passes it later
        onClick?.(e);
      }}
    />
  );
}
