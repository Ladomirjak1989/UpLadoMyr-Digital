'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

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
 * Reads the consent preferences stored by CookieConsent.tsx.
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
 * Creates dataLayer and gtag before the external
 * Google script is loaded.
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
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    initializeGtag();

    /**
     * Google Consent Mode v2
     *
     * Default:
     * advertising consent is denied.
     */
    window.gtag?.('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    /**
     * Synchronize Google Ads with our
     * cookie_consent preference.
     */
    const updateConsent = () => {
      const consent = getConsent();

      const granted = consent?.marketing === true;

      setMarketingConsent(granted);

      window.gtag?.('consent', 'update', {
        ad_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
      });
    };

    /**
     * Check previously saved consent
     * when the website first loads.
     */
    updateConsent();

    /**
     * CookieConsent.tsx dispatches this event
     * whenever the visitor changes preferences.
     */
    window.addEventListener('cookie-consent-updated', updateConsent);

    return () => {
      window.removeEventListener('cookie-consent-updated', updateConsent);
    };
  }, []);

  /**
   * Do not load the Google Ads script
   * until Marketing consent is granted.
   */
  if (!marketingConsent) {
    return null;
  }

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
