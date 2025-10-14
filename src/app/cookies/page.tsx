// // src/app/cookies/page.tsx  (Server Component)
// import type { Metadata } from 'next';
// import CookieSettingsButton from '@/components/CookieConsent/CookieSettingsButton';
// import Image from 'next/image';

// export const metadata: Metadata = {
//   title: 'Cookie Policy | UpLadoMyr Digital',
//   description:
//     'Details about the cookies used by UpLadoMyr Digital: strictly necessary (JWT/auth), analytics, and marketing. How we use them, legal bases, and how to control your choices.',
//   robots: { index: true, follow: true },
// };

// const BRAND = 'UpLadoMyr Digital';
// const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME ?? 'token';
// const CONSENT_COOKIE = 'cookie_consent';

// type Row = {
//   name: string;
//   provider: string;
//   type: 'Essential' | 'Preference' | 'Analytics' | 'Marketing' | 'Security';
//   purpose: string;
//   lifetime: string;
//   notes?: string;
// };

// // ⬇️ Основні та можливі сторонні cookies для твого стеку
// const rows: Row[] = [
//   {
//     name: AUTH_COOKIE_NAME,
//     provider: `${BRAND} (first-party)`,
//     type: 'Essential',
//     purpose: 'JWT session cookie used to keep you signed in and protect admin/api routes.',
//     lifetime: 'Session / ~1h / up to 30 days (if "remember me")',
//     notes: 'HttpOnly. In production set with Secure + SameSite=None.',
//   },
//   {
//     name: CONSENT_COOKIE,
//     provider: `${BRAND} (first-party)`,
//     type: 'Preference',
//     purpose:
//       'Stores your consent choices (analytics/marketing) so we can honor them on future visits.',
//     lifetime: '6 months',
//     notes: 'Not HttpOnly (client needs to read it to hide/show the banner).',
//   },
//   // Analytics (вмикаються лише ПІСЛЯ згоди)
//   {
//     name: '_ga, _ga_* , _gid',
//     provider: 'Google Analytics (third-party)',
//     type: 'Analytics',
//     purpose:
//       'Anonymous usage statistics: pages, events, device info. Helps improve UX and content.',
//     lifetime: '~24 hours ( _gid ), up to 2 years ( _ga )',
//     notes: 'Set only after you accept Analytics.',
//   },
//   // Marketing (вмикаються лише ПІСЛЯ згоди)
//   {
//     name: '_fbp',
//     provider: 'Meta Pixel (third-party)',
//     type: 'Marketing',
//     purpose:
//       'Helps measure ads performance and build audiences for remarketing across Meta services.',
//     lifetime: '~90 days',
//     notes: 'Set only after you accept Marketing.',
//   },
//   // Інфраструктура/безпека (можуть з’являтися залежно від захистів)
//   {
//     name: '__cf_bm / cf_clearance (may appear)',
//     provider: 'Cloudflare (edge/security)',
//     type: 'Security',
//     purpose:
//       'Bot management / challenge clearance to protect the site from abuse and ensure availability.',
//     lifetime: 'From minutes to hours',
//     notes: 'May appear if Cloudflare protection is triggered.',
//   },
//   {
//     name: 'weglot_* (may appear)',
//     provider: 'Weglot (localization)',
//     type: 'Preference',
//     purpose:
//       'Remembers selected language and translation state to deliver pages in your preferred language.',
//     lifetime: 'Varies (days to months)',
//   },
//   {
//     name: 'emailjs_* (may appear)',
//     provider: 'EmailJS (forms)',
//     type: 'Essential',
//     purpose:
//       'Technical cookie(s) used by the contact/subscribe form to send emails client-side reliably.',
//     lifetime: 'Session / short-lived',
//   },
// ];

// export default function CookiePolicyPage() {
//   return (
//     <div className="relative min-h-screen w-full overflow-hidden">
//       {/* Background Image */}
//       <Image
//         src="/img/privacy/privacybg1.jpg"
//         alt="Privacy background"
//         fill
//         className="absolute inset-0 object-cover -z-10"
//         priority
//       />

//       {/* Мутний затемнюючий шар для контрасту тексту */}
//       <div className="absolute inset-0 bg-white/70 backdrop-blur-sm -z-10" />

//       {/* Контент поверх усього */}
//       <div className="relative z-20 mx-auto max-w-4xl px-4 py-10 prose prose-slate">
//         <h1 className="text-3xl mt-12 font-bold mb-6">Cookie Policy</h1>

//         <p>
//           This Cookie Policy explains how <strong className="text-yellow-700">{BRAND}</strong>{' '}
//           (“we”, “us”, “our”) uses cookies and similar technologies on this website. We only set{' '}
//           <em className="font-bold">non-essential</em> cookies (Analytics / Marketing) after your
//           explicit consent. You can update your choices any time using the button below.
//         </p>

//         <p>
//           <CookieSettingsButton />
//         </p>

//         <h2>Who is responsible for cookies on this site?</h2>
//         <p>
//           Controller: <strong className="text-yellow-700">{BRAND}</strong>. The frontend is hosted
//           on Vercel, and the backend API runs on Render. Some infrastructure or third-party features
//           (e.g., analytics, localization, email delivery) may set their own cookies as described
//           below.
//         </p>

//         <h2>What are cookies?</h2>
//         <p>
//           Cookies are small text files placed on your device to enable core site functions, improve
//           security, and (if you agree) help us measure usage and deliver relevant content. Cookies
//           may be “first-party” (set by us) or “third-party” (set by service providers).
//         </p>

//         <h2>Categories of cookies</h2>
//         <ul>
//           <li>
//             <strong>Essential</strong> — strictly necessary for the site to function (e.g., sign-in,
//             security, load balancing). These do not require consent.
//           </li>
//           <li>
//             <strong>Preference</strong> — remember choices (e.g., language, consent).
//           </li>
//           <li>
//             <strong>Analytics</strong> — measure how the site is used to help us improve (enabled
//             only after you consent).
//           </li>
//           <li>
//             <strong>Marketing</strong> — personalize content/ads and measure ad performance (enabled
//             only after you consent).
//           </li>
//           <li>
//             <strong>Security</strong> — anti-bot/anti-abuse protections (may appear depending on
//             traffic patterns).
//           </li>
//         </ul>

//         <h2>Cookies we use (or may use)</h2>
//         <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
//           <table className="w-full text-left text-sm">
//             <thead className="bg-slate-50 text-slate-600">
//               <tr>
//                 <th className="px-3 py-2">Name</th>
//                 <th className="px-3 py-2">Provider</th>
//                 <th className="px-3 py-2">Category</th>
//                 <th className="px-3 py-2">Purpose</th>
//                 <th className="px-3 py-2">Lifetime</th>
//                 <th className="px-3 py-2">Notes</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 bg-white">
//               {rows.map((r, i) => (
//                 <tr key={i}>
//                   <td className="px-3 py-2">
//                     <code className="rounded bg-slate-100 px-1.5 py-0.5">{r.name}</code>
//                   </td>
//                   <td className="px-3 py-2">{r.provider}</td>
//                   <td className="px-3 py-2">{r.type}</td>
//                   <td className="px-3 py-2">{r.purpose}</td>
//                   <td className="px-3 py-2">{r.lifetime}</td>
//                   <td className="px-3 py-2">{r.notes ?? '—'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <h2>Legal bases for using cookies</h2>
//         <ul>
//           <li>
//             <strong>Strictly necessary</strong> cookies are processed on the basis of{' '}
//             <em className="font-bold">legitimate interests</em> to provide a secure and functional
//             service.
//           </li>
//           <li>
//             <strong>Analytics</strong> and <strong>Marketing</strong> cookies are processed only
//             with your <em className="font-bold">consent</em>, which you can withdraw at any time.
//           </li>
//         </ul>

//         <h2>How to manage your preferences</h2>
//         <ul>
//           <li>
//             Use the in-site banner or click the{' '}
//             <em>
//               <CookieSettingsButton />
//             </em>{' '}
//             button to review/update your choices.
//           </li>
//           <li>
//             You can also block/delete cookies via your browser settings. Note that blocking
//             essential cookies may break sign-in or other core features.
//           </li>
//         </ul>

//         <h2>Retention</h2>
//         <p>
//           Retention varies by cookie (see the table). Authentication cookies are usually
//           session-based or short-lived. Consent cookies last up to 6 months. Analytics/marketing
//           cookies follow the provider’s standard lifetimes.
//         </p>

//         <h2>International transfers & third parties</h2>
//         <p>
//           Some providers (e.g., Google, Meta) may process data on servers outside your country. We
//           only load such cookies after you consent. Please review their privacy/cookie policies for
//           details about processing and safeguards.
//         </p>

//         <h2>Updates</h2>
//         <p>
//           We may revise this Cookie Policy if our technology or providers change. We encourage you
//           to re-visit this page periodically.
//         </p>

//         <p className="text-sm text-slate-500">
//           Last updated:{' '}
//           {new Date().toLocaleDateString('en-GB', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//           })}
//         </p>
//       </div>
//     </div>
//   );
// }

// src/app/cookies/page.tsx  (Server Component)

'use client';

import { useEffect, useState } from 'react';

type Consent = {
  essential: true; // завжди true
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = 'cookie_consent_v1';

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  // Зчитати попереднє рішення
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) {
        setOpen(true);
        return;
      }
      const saved = JSON.parse(raw) as Consent;
      setConsent({
        essential: true,
        analytics: !!saved.analytics,
        marketing: !!saved.marketing,
      });
    } catch {
      setOpen(true);
    }
  }, []);

  // Відкриття з будь-якої кнопки (через CustomEvent)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-cookie-consent', handler as EventListener);
    return () => window.removeEventListener('open-cookie-consent', handler as EventListener);
  }, []);

  // Лочимо скрол фону, поки модалка відкрита
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const save = (c: Consent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
    setConsent(c);
    setOpen(false);
  };

  const acceptAll = () => save({ essential: true, analytics: true, marketing: true });
  const rejectAll = () => save({ essential: true, analytics: false, marketing: false });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4
                 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden
        onClick={() => setOpen(false)}
      />

      {/* modal */}
      <div
        className="
        relative w-full max-w-md rounded-2xl border border-amber-200
        bg-gradient-to-b from-[#fff7e9] via-[#f4ead6] to-[#ead8bf]
        shadow-xl
      "
      >
        {/* header */}
        <div className="flex items-start gap-3 p-4 sm:p-5">
          <div className="h-8 w-8 shrink-0 rounded-full bg-amber-300/70 grid place-items-center">
            <span aria-hidden>🍪</span>
          </div>
          <div className="flex-1">
            <h2 id="cookie-title" className="font-semibold text-blue-950">
              Cookies on <span className="text-yellow-700">UpLadoMyr Digital</span>
            </h2>
            <p className="mt-1 text-sm text-slate-700">
              We use <strong>essential</strong> cookies to keep you signed in and secure. With your
              permission, we also use <strong>analytics</strong> and <strong>marketing</strong>{' '}
              cookies.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="ml-2 rounded-md border border-amber-300 bg-white/70 px-2 py-1 text-sm text-slate-700 hover:bg-white"
          >
            Close
          </button>
        </div>

        {/* pills */}
        <div className="px-4 sm:px-5 pb-2 flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs">
            Essential (first-party)
          </span>
          <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs">
            Analytics (opt-in)
          </span>
          <span className="rounded-full border border-fuchsia-300 bg-fuchsia-50 px-3 py-1 text-xs">
            Marketing (opt-in)
          </span>
        </div>

        {/* options */}
        <div className="px-4 sm:px-5 pb-4 space-y-2">
          <label className="flex gap-3 rounded-xl border border-amber-200 bg-white/80 p-3">
            <input type="checkbox" disabled checked className="mt-1" />
            <div className="text-sm">
              <div className="font-medium">Essential (always on)</div>
              <div className="text-slate-600">Authentication, security, core features</div>
            </div>
          </label>

          <label className="flex gap-3 rounded-xl border border-emerald-200 bg-white/80 p-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={consent.analytics}
              onChange={(e) => setConsent((c) => ({ ...c, analytics: e.target.checked }))}
            />
            <div className="text-sm">
              <div className="font-medium">Analytics</div>
              <div className="text-slate-600">Traffic & usability insights</div>
            </div>
          </label>

          <label className="flex gap-3 rounded-xl border border-fuchsia-200 bg-white/80 p-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={consent.marketing}
              onChange={(e) => setConsent((c) => ({ ...c, marketing: e.target.checked }))}
            />
            <div className="text-sm">
              <div className="font-medium">Marketing</div>
              <div className="text-slate-600">Personalization & remarketing</div>
            </div>
          </label>

          <div className="mt-1 text-xs text-slate-600">
            <a href="/cookies" className="underline">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* actions */}
        <div
          className="flex flex-col gap-2 p-4 sm:p-5 border-t border-amber-200/60 bg-white/70 rounded-b-2xl
                        md:flex-row md:items-center"
        >
          <button
            type="button"
            onClick={rejectAll}
            className="w-full md:w-auto rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Reject all
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => save(consent)}
            className="w-full md:w-auto rounded-md border border-amber-300 bg-amber-100 px-4 py-2 text-sm font-medium hover:bg-amber-200"
          >
            Save choices
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="w-full md:w-auto rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:brightness-105"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
