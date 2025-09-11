'use client';

import { LiaCookieSolid } from 'react-icons/lia';

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new Event('open-cookie-banner'));
      }}
      aria-label="Open cookie settings"
      className="
        group inline-flex items-center gap-2 rounded-full
        border border-yellow-400 bg-white/90 px-3 py-1.5
        text-xs font-semibold text-blue-950 shadow-sm
        transition duration-200
        hover:bg-blue-700 hover:text-white hover:border-yellow-600 hover:shadow-md
        focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/60
        active:translate-y-px font-dmserif hover:underline 
      "
    >
      <LiaCookieSolid
        size={16}
        className="text-yellow-700  hover:text-white transition-colors duration-200 group-hover:text-yellow-700 animate-spin"
      />
      Cookie settings
    </button>
  );
}
