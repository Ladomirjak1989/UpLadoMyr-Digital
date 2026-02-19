'use client';

import { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';

type ToastState = { type: 'success' | 'error'; text: string } | null;

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<ToastState>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    // ✅ окремий template для newsletter
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID;
    // ✅ опціонально: авто-відповідь користувачу
    const templateReplyId = process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_AUTO_REPLY_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_KEY;

    if (!serviceId || !templateId || !userId) {
      setToast({ type: 'error', text: 'Configuration error. Please contact support.' });
      setTimeout(() => setToast(null), 5000);
      return;
    }

    try {
      setIsSending(true);

      // 1) лист тобі (підписка)
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          email,
          name: email,
          time,
          source: 'Blog page — Newsletter box',
        },
        userId
      );

      // 2) авто-відповідь користувачу (якщо template заданий)
      if (templateReplyId) {
        await emailjs.send(
          serviceId,
          templateReplyId,
          {
            email,
            name: email,
            reply_to: 'info@upladomyr.com',
            time,
          },
          userId
        );
      }

      if (response.status === 200) {
        setToast({ type: 'success', text: 'Thanks! You are subscribed.' });
        setEmail('');
        setTimeout(() => setToast(null), 5000);
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (err) {
      console.error('Email sending error:', err);
      setToast({ type: 'error', text: 'Something went wrong. Please try again.' });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm
          text-slate-900 shadow-sm placeholder:text-slate-400
          focus:outline-none focus:ring-1 focus:ring-amber-400"
        />

        <button
          type="submit"
          disabled={isSending}
          className={`inline-flex items-center justify-center px-6 py-2 text-sm font-semibold
          bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] border-1 border-amber-950 text-black rounded-full shadow-lg
          transition-transform ${isSending ? 'opacity-70 cursor-not-allowed' : 'hover:scale-110'}`}
        >
          {isSending ? 'Sending...' : 'Subscribe'}
        </button>
      </form>

      {/* ✅ Floating SaaS Toast */}
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
              className={`pointer-events-auto flex items-start gap-3 w-[min(92vw,380px)] rounded-2xl border shadow-lg bg-white/90 backdrop-blur-md px-4 py-3 ${
                toast.type === 'success' ? 'border-green-200' : 'border-red-200'
              }`}
            >
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
                  {toast.type === 'success' ? 'Subscribed' : 'Error'}
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
}
