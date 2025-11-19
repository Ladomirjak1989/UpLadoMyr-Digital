// src/components/Blog/ShareButtons.tsx
'use client';

import * as React from 'react';

type Props = {
  url: string;
  title: string;
};

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareX = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const shareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const shareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Could not copy the link. Please copy it manually.');
    }
  };

  // Закривати меню при кліку поза (простий варіант – onBlur + tabIndex)
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block group/btn"
      tabIndex={0}
      onBlur={(e) => {
        if (!wrapperRef.current) return;
        if (!wrapperRef.current.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
      onMouseLeave={() => {
        // для десктопу – закриваємо при втраті hover
        setOpen(false);
      }}
    >
      {/* Тултіп з іконками соцмереж */}
      <div
        className={[
          'absolute -top-24 left-1/2 z-30 -translate-x-1/2 transform rounded-3xl',
          'bg-gray-100 p-3 shadow-lg shadow-gray-400/35 transition-transform ease-in-out',
          open ? 'flex' : 'hidden md:group-hover/btn:flex',
        ].join(' ')}
      >
        <div className="flex items-center justify-center gap-3">
          {/* X / Twitter */}
          <button
            type="button"
            onClick={shareX}
            className="group/tooltip rounded-full bg-gray-50 p-2 shadow-md shadow-gray-200
                       hover:bg-gray-700 hover:text-gray-50 transition-colors"
            aria-label="Share on X"
          >
            <span className="sr-only">X</span>
            <span className="[&>svg]:h-6 [&>svg]:w-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 520 520">
                <path
                  className="fill-gray-700 transition-colors duration-300 ease-in-out
                             group-hover/tooltip:fill-gray-50"
                  d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                />
              </svg>
            </span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={shareFacebook}
            className="group/tooltip rounded-full bg-gray-50 p-2 shadow-md shadow-gray-200
                       hover:bg-sky-500 hover:text-gray-50 transition-colors"
            aria-label="Share on Facebook"
          >
            <span className="sr-only">Facebook</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path
                className="fill-gray-700 transition-colors duration-300 ease-in-out
                           group-hover/tooltip:fill-gray-50"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
          </button>

          {/* Instagram-style */}
          <button
            type="button"
            onClick={shareX}
            className="group/tooltip rounded-full bg-gray-50 p-2 shadow-md shadow-gray-200
                       hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500
                       hover:text-gray-50 transition-colors"
            aria-label="Share on Instagram"
          >
            <span className="sr-only">Instagram</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className="fill-gray-700 transition-colors duration-300 ease-in-out
                           group-hover/tooltip:fill-gray-50"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
              />
            </svg>
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={shareLinkedIn}
            className="group/tooltip rounded-full bg-gray-50 p-2 shadow-md shadow-gray-200
                       hover:bg-sky-700 hover:text-gray-50 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <span className="sr-only">LinkedIn</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                className="fill-gray-700 transition-colors duration-300 ease-in-out
                           group-hover/tooltip:fill-gray-50"
                d="M4.983 3.5C4.983 4.604 4.09 5.5 2.99 5.5h-.02C1.89 5.5 1 4.604 1 3.5 1 2.395 1.905 1.5 3.005 1.5c1.1 0 1.978.895 1.978 2zm.017 4.5H1V22h4V8zM8 8h3.8v1.89h.055C12.5 8.85 13.8 8 15.6 8 19.1 8 20 10.1 20 13.3V22h-4v-7.2c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.8.7-2.1 1.5-.1.3-.1.7-.1 1.1V22H8V8z"
              />
            </svg>
          </button>

          {/* Copy link кнопка */}
          <button
            type="button"
            onClick={copyLink}
            className="group/tooltip rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium
                       text-gray-700 shadow-md shadow-gray-200 hover:bg-gray-800 hover:text-gray-50
                       transition-colors"
          >
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>

        {/* прозора зона, щоб hover не обривався знизу */}
        <div className="absolute left-0 -bottom-4 h-4 w-full bg-transparent" />
        <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-100" />
      </div>

      {/* Основна кнопка Share */}
      <div
        className="relative flex w-44 items-center justify-center rounded-full border-4 border-gray-50
                   bg-gradient-to-r from-violet-600 to-indigo-600 p-3 shadow-xl shadow-gray-300/50
                   transition-all duration-300 ease-in-out
                   group-hover/btn:from-violet-800 group-hover/btn:to-indigo-800
                   group-hover/btn:scale-110 group-hover/btn:-translate-y-1"
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-center gap-1"
        >
          <span className="text-xl font-semibold text-gray-50">Share</span>
          <svg
            className={`mt-1 h-6 w-6 text-gray-100 transition-transform duration-300 ease-in-out ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
