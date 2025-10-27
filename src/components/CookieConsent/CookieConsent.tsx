'use client';

import { useCallback, useEffect, useState } from 'react';
import { LiaCookieSolid } from 'react-icons/lia';

type ConsentState = { analytics: boolean; marketing: boolean };

const BRAND = 'UpLadoMyr Digital';
const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME ?? 'token';

const CONSENT_COOKIE = 'cookie_consent';
const COOKIE_MAX_AGE_DAYS = 180;

/* ---------- Helpers: read/write consent cookie ---------- */
function readConsent(): ConsentState | null {
  const raw = document.cookie.split('; ').find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.split('=')[1])) as ConsentState;
  } catch {
    return null;
  }
}

function writeConsent(value: ConsentState) {
  const expires = new Date(Date.now() + COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000);
  const secure =
    typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; ` +
    `Path=/; Expires=${expires.toUTCString()}; SameSite=Lax${secure}`;
}

/* ---------- Hook: lock page scroll while dialog is open ---------- */
function useLockScroll(lock: boolean) {
  useEffect(() => {
    if (!lock) return;
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [lock]);
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // збережений стан (для «закрити без змін»)
  const [initial, setInitial] = useState<ConsentState>({ analytics: false, marketing: false });
  const [hasSaved, setHasSaved] = useState(false); // чи була колись згода

  useLockScroll(open);

  // підтягнути збережене у перемикачі
  const syncFromSaved = () => {
    const saved = readConsent();
    setHasSaved(!!saved);
    const next = saved ?? { analytics: false, marketing: false };
    setInitial(next);
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
  };

  useEffect(() => {
    const saved = readConsent();
    if (!saved) setOpen(true); // перший візит — просимо вибір
    syncFromSaved();

    // відкривати банер із будь-якого місця сайту:
    const onOpen = () => {
      syncFromSaved();
      setOpen(true);
    };
    window.addEventListener('open-cookie-banner', onOpen);
    return () => window.removeEventListener('open-cookie-banner', onOpen);
  }, []);

  // Esc — закриття без змін (якщо згода була раніше)

  const onClose = useCallback(() => {
    setAnalytics(initial.analytics);
    setMarketing(initial.marketing);
    setOpen(false);
  }, [initial]); // або [initial.analytics, initial.marketing]

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hasSaved) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, hasSaved]);

  const acceptAll = () => {
    writeConsent({ analytics: true, marketing: true });
    setHasSaved(true);
    setOpen(false);
    // TODO: ініціалізуй GA/Meta тут за потреби
  };

  const rejectAll = () => {
    writeConsent({ analytics: false, marketing: false });
    setHasSaved(true);
    setOpen(false);
  };

  const save = () => {
    writeConsent({ analytics, marketing });
    setHasSaved(true);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay: затемнення + blur + safe-area; кліком закриваємо тільки якщо згода була */}
      <div
        className={`fixed inset-0 z-[55] bg-slate-900/55 backdrop-blur-[2px] ${
          hasSaved ? 'cursor-pointer' : 'cursor-not-allowed'
        }`}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
        onClick={hasSaved ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Dialog wrapper: bottom sheet на мобілці, центр на md+ */}
      <div
        className="
          fixed inset-x-0 bottom-0 z-[60]
          md:inset-0 md:flex md:items-center md:justify-center
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        <div
          className="
            mx-auto m-3 w-full max-w-4xl
            rounded-2xl border border-yellow-300 bg-white shadow-2xl
            md:m-6
          "
          style={{
            paddingBottom: 'env(safe-area-inset-bottom)',
            paddingLeft: 'env(safe-area-inset-left)',
            paddingRight: 'env(safe-area-inset-right)',
          }}
        >
          {/* Header */}
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 shrink-0 rounded-full bg-yellow-100 p-2 ring-1 ring-yellow-300">
                  <LiaCookieSolid className="text-yellow-700" size={22} />
                </div>
                <div>
                  <h2
                    id="cookie-title"
                    className="text-base sm:text-lg font-semibold tracking-tight text-blue-950"
                  >
                    Cookies on <span className="text-[#c7a23f]">{BRAND}</span>
                  </h2>
                  <p className="mt-1 text-[13px] leading-5 text-slate-600">
                    We use <b>essential</b> cookies to keep you signed in and secure. With your
                    permission, we also use <b>analytics</b> and <b>marketing</b> cookies.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                      Essential (first-party)
                    </span>
                    <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      Analytics (opt-in)
                    </span>
                    <span className="rounded-full border border-fuchsia-300 bg-fuchsia-50 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-700">
                      Marketing (opt-in)
                    </span>
                  </div>
                </div>
              </div>

              {/* Close без змін — лише якщо вже зберігали вибір */}
              {hasSaved && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                  title="Close without saving changes"
                  aria-label="Close cookie dialog without saving changes"
                >
                  Close
                </button>
              )}
            </div>
          </div>

          {/* Toggles (1 колонка на моб, 3 колонки на sm+) */}
          <div className="grid gap-3 px-4 sm:grid-cols-3 sm:px-6">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <input type="checkbox" checked disabled className="h-4 w-4" />
              <div className="text-sm">
                <div className="font-medium text-slate-800">Essential (always on)</div>
                <div className="text-[12px] text-slate-500">
                  Authentication, security, core features
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 accent-emerald-600"
              />
              <div className="text-sm">
                <div className="font-medium text-emerald-800">Analytics</div>
                <div className="text-[12px] text-emerald-700/80">Traffic & usability insights</div>
              </div>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-fuchsia-200 bg-fuchsia-50 px-3 py-2.5">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4 accent-fuchsia-600"
              />
              <div className="text-sm">
                <div className="font-medium text-fuchsia-800">Marketing</div>
                <div className="text-[12px] text-fuchsia-700/80">Personalization & remarketing</div>
              </div>
            </label>
          </div>

          {/* Details table (optional) */}
          <div className="px-4 pt-2 sm:px-6">
            <button
              type="button"
              onClick={() => setShowDetails((s) => !s)}
              className="mt-2 text-xs font-semibold text-blue-900 underline decoration-blue-300 underline-offset-4 hover:text-blue-700"
              aria-expanded={showDetails}
              aria-controls="cookie-details"
            >
              {showDetails ? 'Hide details' : 'What exactly do we use?'}
            </button>

            {showDetails && (
              <div
                id="cookie-details"
                className="mt-3 overflow-x-auto rounded-xl border border-slate-200"
              >
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-3 py-2">Cookie / Provider</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Purpose</th>
                      <th className="px-3 py-2">Lifetime</th>
                      <th className="px-3 py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white">
                      <td className="px-3 py-2">
                        <code className="rounded bg-slate-100 px-1.5 py-0.5">
                          {AUTH_COOKIE_NAME}
                        </code>{' '}
                        <span className="text-slate-500">/ {BRAND}</span>
                      </td>
                      <td className="px-3 py-2">Essential (first-party)</td>
                      <td className="px-3 py-2">Keeps you signed in (JWT), secures routes</td>
                      <td className="px-3 py-2">Session / 1h / up to 30d</td>
                      <td className="px-3 py-2">HttpOnly; Secure+SameSite=None in prod</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-3 py-2">
                        <code className="rounded bg-slate-100 px-1.5 py-0.5">cookie_consent</code>{' '}
                        <span className="text-slate-500">/ {BRAND}</span>
                      </td>
                      <td className="px-3 py-2">Preference</td>
                      <td className="px-3 py-2">Stores your cookie choices</td>
                      <td className="px-3 py-2">6 months</td>
                      <td className="px-3 py-2">Client-read (to hide/show banner)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-end gap-2 px-4 py-4 sm:px-6">
            <a
              href="/cookies"
              className="mr-auto text-xs font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-800"
            >
              Cookie Policy
            </a>

            <button
              type="button"
              onClick={rejectAll}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={save}
              className="rounded-xl border border-[#c7a23f] bg-white px-4 py-2 text-sm font-semibold text-[#c7a23f] shadow-sm hover:bg-yellow-50"
            >
              Save choices
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
