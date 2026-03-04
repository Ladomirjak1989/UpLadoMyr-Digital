'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const CONSENT_COOKIE = 'cookie_consent';
const PIXEL_ID = '1594928181725341';

type ConsentState = { analytics: boolean; marketing: boolean };

function readConsent(): ConsentState | null {
  const raw = document.cookie.split('; ').find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.split('=')[1])) as ConsentState;
  } catch {
    return null;
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);

  // первинна перевірка
  useEffect(() => {
    const saved = readConsent();
    setEnabled(!!saved?.marketing);
  }, []);

  // оновлення після Accept/Reject/Save
  useEffect(() => {
    const handler = () => {
      const saved = readConsent();
      setEnabled(!!saved?.marketing);
    };
    window.addEventListener('cookie-consent-updated', handler);
    return () => window.removeEventListener('cookie-consent-updated', handler);
  }, []);

  // PageView на кожен client navigation
  useEffect(() => {
    if (!enabled) return;

    // ✅✅✅ CHANGED: ts-ignore -> ts-expect-error (fbq comes from Meta script)
    // @ts-expect-error - fbq is injected by Meta Pixel script at runtime
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      // ✅✅✅ CHANGED: ts-ignore -> ts-expect-error (fbq comes from Meta script)
      // @ts-expect-error - fbq is injected by Meta Pixel script at runtime
      window.fbq('track', 'PageView');
    }
  }, [enabled, pathname, searchParams]);

  if (!enabled) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* ✅✅✅ CHANGED: avoid <img> in JSX (next/no-img-element). Use Script in noscript. */}
      <noscript>
        <Script
          id="meta-pixel-noscript"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1" alt="" />`,
          }}
        />
      </noscript>
    </>
  );
}
