'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { track } from '@/lib/pixel';
import { FiArrowUpRight, FiMail, FiClock } from 'react-icons/fi';
import { HiOutlineCheckBadge } from 'react-icons/hi2';

type LeadData = {
  name: string | null;
  email: string;
};

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

  const [lead, setLead] = useState<LeadData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    track('Lead', {
      content_name: 'Contact form submitted',
      page: 'Thank You',
    });
  }, []);

  useEffect(() => {
    if (!ref) {
      setLoading(false);
      return;
    }

    const fetchLead = async () => {
      try {
        const encodedRef = encodeURIComponent(ref);

        // 1. пробуємо contact form lead
        let res = await fetch(`/api/contact/ref/${encodedRef}`, {
          method: 'GET',
          cache: 'no-store',
        });

        // 2. якщо не знайдено — пробуємо footer lead
        if (!res.ok) {
          res = await fetch(`/api/footer-leads/ref/${encodedRef}`, {
            method: 'GET',
            cache: 'no-store',
          });
        }

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to load lead info: ${res.status} ${errorText}`);
        }

        const data = await res.json();
        setLead(data);
      } catch (error) {
        console.error('Failed to fetch thank-you data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [ref]);

  const firstName = useMemo(() => {
    if (!lead?.name) return '';
    return lead.name.trim().split(' ')[0] || '';
  }, [lead]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f3f5f8]">
      <div className="absolute inset-0">
        <div className="absolute left-[-140px] top-[-120px] h-[340px] w-[340px] rounded-full bg-[#16357a]/[0.08] blur-3xl" />
        <div className="absolute right-[-120px] top-[8%] h-[300px] w-[300px] rounded-full bg-[#c7a23f]/[0.12] blur-3xl" />
        <div className="absolute bottom-[-160px] left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#1f3c88]/[0.05] blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(20,30,60,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(20,30,60,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="animate-[fadeUp_700ms_ease-out] overflow-hidden rounded-[38px] border border-white/70 bg-white/80 shadow-[0_28px_100px_rgba(15,23,42,0.10)] backdrop-blur-xl">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c7a23f] to-transparent" />

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT SIDE */}
            <div className="relative px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              <div className="absolute -left-10 top-12 h-32 w-32 rounded-full bg-[#16357a]/[0.06] blur-3xl" />

              <div className="mb-10">
                <Image
                  src="/img/header/logo-invoice.png"
                  alt="iVoice logo"
                  width={160}
                  height={48}
                  className="h-auto w-[130px] sm:w-[250px]"
                  priority
                />
              </div>

              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c7a23f]/25 bg-[#fffaf0] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.24em] text-[#9a7a23] shadow-sm">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#c7a23f]" />
                  Inquiry received
                </div>
              </div>

              <div className="max-w-3xl">
                <div className="mb-8 flex items-center gap-5">
                  <div className="relative flex h-18 w-27 items-center justify-center rounded-full border border-[#d8e0f0] bg-gradient-to-br from-white via-[#f7f9fd] to-[#eef3fb] shadow-[0_18px_40px_rgba(31,60,136,0.14)]">
                    <div className="absolute inset-[6px] rounded-full border border-white/80 bg-[radial-gradient(circle_at_top,rgba(255,255,255,1),rgba(242,246,252,0.92)_55%,rgba(230,236,246,0.85)_100%)] shadow-[inset_0_10px_24px_rgba(255,255,255,0.95),inset_0_-8px_20px_rgba(31,60,136,0.05)]" />
                    <div className="absolute h-12 w-12 rounded-full bg-[#1d3b8b]/10 blur-xl" />
                    <HiOutlineCheckBadge className="relative z-10 text-[38px] text-[#1d3b8b]" />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Confirmation
                    </p>
                    <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-[#132c6b] sm:text-5xl lg:text-6xl">
                      {loading
                        ? 'Thank you for your inquiry'
                        : firstName
                          ? `Thank you, ${firstName}`
                          : 'Thank you for your inquiry'}
                    </h1>
                  </div>
                </div>

                <p className="max-w-2xl text-[18px] leading-8 text-slate-600 sm:text-[20px]">
                  Your inquiry has been successfully received and is now under review. Our team will
                  get back to you with a clear, thoughtful response and the right next steps for
                  your project.
                </p>

                {!loading && lead?.email && (
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f8fc] text-[#16357a]">
                        <FiMail className="text-[18px]" />
                      </span>

                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-slate-400">
                          Reply address
                        </p>
                        <p className="truncate text-sm font-medium text-slate-700 sm:text-base">
                          {lead.email}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f8fc] text-[#16357a]">
                        <FiClock className="text-[18px]" />
                      </span>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-slate-400">
                          Estimated response
                        </p>
                        <p className="text-sm font-medium text-slate-700 sm:text-base">
                          Within 1 business day
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                  <Link
                    href="/services"
                    className="group inline-flex min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-[#16357a] px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(22,53,122,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#102d6b]"
                  >
                    Explore Services
                    <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex min-w-[220px] items-center justify-center rounded-2xl border border-[#c7a23f]/60 bg-white px-7 py-4 text-sm font-semibold text-[#9a7a23] transition duration-300 hover:border-[#c7a23f] hover:bg-[#fffaf0]"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative border-t border-slate-200/70 bg-[linear-gradient(180deg,rgba(248,250,252,0.8),rgba(255,255,255,0.94))] px-6 py-12 sm:px-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-16">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#c7a23f]/10 blur-3xl" />

              {!loading && lead && (
                <div className="overflow-hidden rounded-[30px] border border-slate-200/70 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                  <div className="border-b border-slate-200/70 px-6 py-4 sm:px-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      Submission record
                    </p>
                  </div>

                  <div className="space-y-0">
                    <div className="border-b border-slate-200/70 px-6 py-6 sm:px-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-slate-400">
                        Submitted by
                      </p>
                      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                        {lead.name || 'Website visitor'}
                      </p>
                    </div>

                    <div className="px-6 py-6 sm:px-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-slate-400">
                        Contact channel
                      </p>
                      <p className="mt-3 break-all text-lg font-medium text-slate-800">
                        {lead.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="rounded-[30px] border border-slate-200/70 bg-white/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                  <div className="h-4 w-32 rounded bg-slate-200/70" />
                  <div className="mt-6 h-8 w-3/4 rounded bg-slate-200/70" />
                  <div className="mt-8 h-4 w-28 rounded bg-slate-200/70" />
                  <div className="mt-4 h-6 w-full rounded bg-slate-200/70" />
                </div>
              )}

              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  What happens next
                </p>

                <div className="mt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex w-10 flex-col items-center flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16357a] text-sm font-semibold text-white shadow-[0_8px_18px_rgba(22,53,122,0.28)]">
                        1
                      </div>
                      <div className="mt-2 h-16 w-px bg-gradient-to-b from-slate-200 to-slate-100" />
                    </div>

                    <div className="pt-1">
                      <h3 className="text-base font-semibold text-slate-800">
                        We review your request
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        We assess your goals, scope, and technical details with care.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex w-10 flex-col items-center flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16357a] text-sm font-semibold text-white shadow-[0_8px_18px_rgba(22,53,122,0.28)]">
                        2
                      </div>
                      <div className="mt-2 h-16 w-px bg-gradient-to-b from-slate-200 to-slate-100" />
                    </div>

                    <div className="pt-1">
                      <h3 className="text-base font-semibold text-slate-800">
                        We prepare recommendations
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        We outline the right direction and the most practical next step.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex w-10 flex-col items-center flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16357a] text-sm font-semibold text-white shadow-[0_8px_18px_rgba(22,53,122,0.28)]">
                        3
                      </div>
                    </div>

                    <div className="pt-1">
                      <h3 className="text-base font-semibold text-slate-800">We contact you</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        You receive a clear response and a structured follow-up.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-[#c7a23f]/20 bg-[#fffaf2] px-5 py-4">
                <p className="text-sm leading-6 text-[#7d6320]">
                  We appreciate your interest and treat every serious project inquiry with care and
                  attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
