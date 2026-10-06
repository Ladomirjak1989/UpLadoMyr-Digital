'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GOOGLE_ADS_ID = 'AW-18455284906';
const CONSENT_COOKIE = 'cookie_consent';

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Read saved cookie consent.
 */
function getConsent(): ConsentState | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const raw = document.cookie.split('; ').find((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`));

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(raw.split('=')[1])) as ConsentState;
  } catch {
    return null;
  }
}

/**
 * Initialize Google's dataLayer / gtag.
 */
function initializeGtag() {
  window.dataLayer = window.dataLayer || [];

  window.gtag =
    window.gtag ||
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };
}

export default function GoogleAdsTag() {
  useEffect(() => {
    initializeGtag();

    /**
     * Read existing consent.
     *
     * If there is no saved consent yet,
     * advertising consent remains DENIED.
     */
    const consent = getConsent();
    const marketingGranted = consent?.marketing === true;

    /**
     * Google Consent Mode v2
     */
    window.gtag?.('consent', 'default', {
      ad_storage: marketingGranted ? 'granted' : 'denied',
      ad_user_data: marketingGranted ? 'granted' : 'denied',
      ad_personalization: marketingGranted ? 'granted' : 'denied',

      // We are not using Google Analytics here.
      analytics_storage: 'denied',

      wait_for_update: 500,
    });

    /**
     * Update Google consent whenever the visitor
     * changes Cookie Consent preferences.
     */
    const updateConsent = () => {
      const updatedConsent = getConsent();
      const granted = updatedConsent?.marketing === true;

      window.gtag?.('consent', 'update', {
        ad_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
      });
    };

    window.addEventListener('cookie-consent-updated', updateConsent);

    return () => {
      window.removeEventListener('cookie-consent-updated', updateConsent);
    };
  }, []);

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        id="google-ads-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />

      {/* Google Ads configuration */}
      <Script id="google-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          window.gtag = window.gtag || function() {
            window.dataLayer.push(arguments);
          };

          window.gtag('js', new Date());

          window.gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
