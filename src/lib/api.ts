// src/lib/api.ts
export const API_BASE =
  (process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BACKEND_LOCALHOST_URL ||
      process.env.BACKEND_LOCALHOST_URL ||
      'http://localhost:5000'
    : process.env.NEXT_PUBLIC_RENDER_URL || process.env.RENDER_URL || ''
  )?.replace(/\/$/, '') || '';

export function apiUrl(path: string) {
  return `${API_BASE}/api${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Базовий URL фронтенда – для share-лінків, OG та ін.
 * - dev:  NEXT_PUBLIC_FRONTEND_LOCALHOST_URL (http://localhost:3000)
 * - prod: NEXT_PUBLIC_FRONTEND_URL (наприклад, https://upladomyr.com)
 */
export const FRONTEND_BASE_URL =
  (process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_FRONTEND_LOCALHOST_URL || 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_FRONTEND_URL ||
      process.env.FRONTEND_URL_PROD || // ← твоя існуюча змінна
      process.env.FRONTEND_URL
  )?.replace(/\/$/, '') || '';
