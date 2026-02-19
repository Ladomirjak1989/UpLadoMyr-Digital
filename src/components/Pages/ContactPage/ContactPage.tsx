'use client';

import React, { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUp } from 'react-icons/fi';

type ToastState = { type: 'success' | 'error'; text: string } | null;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [toast, setToast] = useState<ToastState>(null);
  const [toastKey, setToastKey] = useState(0); // ✅ to restart progress animation
  const [isSending, setIsSending] = useState(false);

  const time = useMemo(
    () =>
      new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (next: NonNullable<ToastState>) => {
    setToast(next);
    setToastKey((k) => k + 1);
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const templateReplyId = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_KEY;

    if (!serviceId || !templateId || !userId || !templateReplyId) {
      showToast({ type: 'error', text: 'Configuration error. Please contact support.' });
      return;
    }

    const cleanEmail = formData.email.trim();

    try {
      setIsSending(true);

      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          last_name: formData.lastName,
          email: cleanEmail,
          message: formData.message,
          time: time,
        },
        userId
      );

      await emailjs.send(
        serviceId,
        templateReplyId,
        {
          name: formData.name,
          email: cleanEmail,
          reply_to: 'info@upladomyr.com',
          message: formData.message,
          time: time,
        },
        userId
      );

      if (response.status === 200) {
        showToast({ type: 'success', text: 'Your message has been sent successfully!' });
        setFormData({ name: '', lastName: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (err: any) {
      console.error('Email sending error:', {
        status: err?.status,
        text: err?.text,
        message: err?.message,
        raw: err,
      });
      showToast({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section className="bg-white py-16 px-4 sm:px-8 lg:px-16">
        <div className="bg-white py-16 px-4 sm:px-8 lg:px-20">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
            {/* Left: image + text */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="w-fit mx-auto">
                <Image
                  src="/img/contact1.jpg"
                  alt="Contact Visual"
                  width={400}
                  height={300}
                  className="rounded-xl object-contain"
                />
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-center text-2xl sm:text-3xl font-semibold text-blue-950 mb-4">
                  Let’s Discuss Your Project
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Tell us about your business goals, timeline, and technical needs. Whether you’re
                  planning a new website, a scalable web platform, or need expert guidance — we’re
                  here to provide clear direction and practical solutions.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="w-full lg:w-1/2">
              <div className="max-w-3xl mx-auto text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-2">
                  Reach out to us
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Have any questions or feedback? Drop us a message!
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 shadow-xl rounded-xl px-6 py-8 space-y-6"
              >
                {/* Name + Last name */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <FaUser className="absolute top-3.5 left-4 text-gray-700" />
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className="pl-12 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  <div className="relative group">
                    <FaUser className="absolute top-3.5 left-4 text-gray-700" />
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      className="pl-12 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative group">
                  <FaEnvelope className="absolute top-3.5 left-4 text-gray-700" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    required
                    className="pl-12 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* Message */}
                <div className="relative group">
                  <FaCommentDots className="absolute top-3.5 left-4 text-gray-700" />
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                    className="pl-12 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* Privacy consent */}
                <div className="flex items-start gap-2 text-sm text-gray-900">
                  <input
                    id="privacyConsent"
                    name="privacyConsent"
                    type="checkbox"
                    required
                    className="mt-1 accent-yellow-500"
                  />

                  <label htmlFor="privacyConsent" className="leading-snug">
                    By submitting this form, you agree to the processing of your personal data in
                    accordance with our{' '}
                    <Link
                      href="/privacy"
                      className="underline text-blue-800 hover:text-yellow-600 transition"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSending}
                  className={`group relative overflow-hidden border border-[#c7a23f] text-[#c7a23f] inline-block text-[15px] leading-[15px] py-[18px] px-[24px] bg-white select-none transition duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)]
                  ${isSending ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="relative z-10 transition-colors duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)]">
                    {isSending ? 'SENDING…' : 'SEND'}
                  </span>

                  <span className="absolute bottom-0 left-1/2 text-white text-[13px] leading-[13px] h-[14px] opacity-0 top-1/2 transform translate-x-[-50%] translate-y-[225%] transition-all duration-[900ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:translate-y-[-50%] group-hover:opacity-100 z-[100]">
                    THANKS!
                  </span>

                  <span className="absolute bottom-[-50%] left-0 w-full h-full bg-[#c7a23f] transform skew-y-[9.3deg] scale-y-0 origin-bottom transition-transform duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:scale-y-200 z-[50]" />
                </button>
              </form>

              {/* Info-callout */}
              <div className="relative mt-8 w-full max-w-xl">
                <div className="flex items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900 shadow-sm">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 font-semibold">
                    i
                  </span>

                  <p className="leading-6 flex flex-wrap items-center gap-x-1">
                    <span>You can contact us without creating an account.</span>
                    <span className="whitespace-nowrap">For quicker replies, please</span>

                    <span className="whitespace-nowrap">
                      <Link
                        href="/signin"
                        className="underline font-semibold hover:text-yellow-700"
                      >
                        sign in
                      </Link>
                    </span>

                    <span>or</span>

                    <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
                      <Link
                        href="/signup"
                        className="underline font-semibold hover:text-yellow-700"
                      >
                        create an account
                      </Link>
                      <span>.</span>
                      <FiArrowUp
                        className="text-yellow-600 text-sm sm:text-base translate-y-[-1px]"
                        aria-hidden
                        title="Login is at the top"
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Floating SaaS Toast + progress bar */}
      <div className="fixed z-[9999] bottom-5 right-5 sm:bottom-6 sm:right-6 pointer-events-none">
        <div
          className={`transition-all duration-300 ease-out ${
            toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {toast && (
            <div
              role="status"
              aria-live="polite"
              className={`relative pointer-events-auto flex items-start gap-3 w-[min(92vw,380px)] rounded-2xl border shadow-lg bg-white/90 backdrop-blur-md px-4 py-3 ${
                toast.type === 'success' ? 'border-green-200' : 'border-red-200'
              }`}
            >
              {/* Progress bar */}
              <div className="absolute left-0 top-0 h-[3px] w-full overflow-hidden rounded-t-2xl">
                <div
                  key={toastKey}
                  className={`h-full origin-left animate-toast-progress ${
                    toast.type === 'success' ? 'bg-green-500/80' : 'bg-red-500/80'
                  }`}
                />
              </div>

              <div
                className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold shrink-0 ${
                  toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                }`}
                aria-hidden
              >
                {toast.type === 'success' ? '✓' : '!'}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {toast.type === 'success' ? 'Sent' : 'Error'}
                </p>
                <p className="text-sm text-slate-700 leading-snug">{toast.text}</p>
              </div>

              <button
                type="button"
                onClick={() => setToast(null)}
                className="ml-2 -mt-1 rounded-lg px-2 py-1 text-slate-500 hover:text-slate-900 transition pointer-events-auto"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactPage;
