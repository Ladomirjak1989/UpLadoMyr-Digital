'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

/** Дозволяємо будь-які коректні домени (.ua, .de, .co, .me тощо) */
const emailRe = /^(?!.*\.\.)[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
/** Політика пароля як на SignUp (мін. 8, літери + цифри) */
const passwordPolicyRe = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const passwordPolicyMsg = 'Password must be at least 8 characters and include letters and numbers.';

/** Левенштейн для виявлення опечаток у домені */
function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

const COMMON_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'icloud.com',
  'proton.me',
  'ukr.net',
  'i.ua',
  'meta.ua',
  'bigmir.net',
  'mail.ru',
];

function suggestDomain(email: string): string | null {
  const parts = email.split('@');
  if (parts.length !== 2) return null;
  const [local, domain] = parts;
  if (!local || !domain) return null;

  if (COMMON_DOMAINS.includes(domain.toLowerCase())) return null;

  let best: { d: string; dist: number } | null = null;
  for (const d of COMMON_DOMAINS) {
    const dist = levenshtein(domain.toLowerCase(), d);
    if (!best || dist < best.dist) best = { d, dist };
  }
  if (best && best.dist <= 2) return `${local}@${best.d}`;
  return null;
}

type Errors = Partial<{ email: string; password: string }>;

export default function SignIn() {
  const router = useRouter();
  const { login, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // remember me (із localStorage)
  const [remember, setRemember] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('rememberMe') === 'true';
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (remember) localStorage.setItem('rememberMe', 'true');
      else localStorage.removeItem('rememberMe');
    }
  }, [remember]);

  // інлайн-помилки / touched
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  // підказка для опечаток у домені
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [ignoreSuggestion, setIgnoreSuggestion] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  // refs для фокусу першої помилки
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // валідація полів
  const validateField = (key: keyof Errors, val: string): string | undefined => {
    if (key === 'email') {
      if (!val.trim()) return 'Email is required.';
      if (!emailRe.test(val.trim().toLowerCase())) return 'Enter a valid email.';
    }
    if (key === 'password') {
      if (!val) return 'Password is required.';
      if (!passwordPolicyRe.test(val)) return passwordPolicyMsg;
    }
    return;
  };

  const validateAll = (): Errors => {
    const next: Errors = {};
    const e = email.trim();
    const p = password;

    const errEmail = validateField('email', e);
    if (errEmail) next.email = errEmail;

    const errPass = validateField('password', p);
    if (errPass) next.password = errPass;

    if (emailSuggestion && !ignoreSuggestion && !next.email) {
      next.email = `Looks like a typo. Did you mean ${emailSuggestion}?`;
    }
    return next;
  };

  const focusFirstInvalid = (errs: Errors) => {
    if (errs.email) emailRef.current?.focus();
    else if (errs.password) passwordRef.current?.focus();
  };

  // email: зміни/blur + підказка
  const handleEmailChange = (v: string) => {
    setEmail(v);
    setIgnoreSuggestion(false);
    const s = suggestDomain(v.trim());
    if (s && s.toLowerCase() === v.trim().toLowerCase()) setEmailSuggestion(null);
    else setEmailSuggestion(s);

    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateField('email', v) }));
    }
  };
  const handleEmailBlur = () => {
    setTouched((t) => ({ ...t, email: true }));
    setErrors((prev) => ({ ...prev, email: validateField('email', email) }));
    const s = suggestDomain(email.trim());
    setEmailSuggestion(s && s.toLowerCase() !== email.trim().toLowerCase() ? s : null);
  };

  // password: зміни/blur + зняття серверної помилки при наборі
  const handlePasswordChange = (v: string) => {
    setPassword(v);
    setErrors((prev) => ({ ...prev, password: undefined })); // прибрати "Password is incorrect" при вводі
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validateField('password', v) }));
    }
  };
  const handlePasswordBlur = () => {
    setTouched((t) => ({ ...t, password: true }));
    setErrors((prev) => ({ ...prev, password: validateField('password', password) }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateAll();
    setErrors(nextErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(nextErrors).length) {
      toast.error('Please fix the errors in the form.');
      focusFirstInvalid(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      await login(email.trim().toLowerCase(), password, remember); // редірект зробить AuthContext
      toast.success('Logged in successfully');
    } catch (err: any) {
      // Розбір відповіді бекенда
      const status = err?.response?.status;
      const raw = err?.response?.data?.message ?? err?.message ?? '';
      const msg = (Array.isArray(raw) ? raw.join(', ') : String(raw)).toLowerCase();

      if (status === 401 || /invalid|wrong|incorrect/.test(msg)) {
        setErrors((prev) => ({ ...prev, password: 'Password is incorrect' }));
        setTouched((t) => ({ ...t, password: true }));
        passwordRef.current?.focus();
        toast.error('Password is incorrect');
      } else if (status === 404 || /user.*not.*found|email.*not.*found/.test(msg)) {
        setErrors((prev) => ({ ...prev, email: 'Email not found' }));
        setTouched((t) => ({ ...t, email: true }));
        emailRef.current?.focus();
        toast.error('Email not found');
      } else {
        toast.error('Login failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full py-3 px-4 rounded-xl border ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`;

  const ErrorText = ({ id, msg }: { id: string; msg?: string }) =>
    msg ? (
      <p id={id} role="alert" className="mt-1 text-xs text-red-600">
        {msg}
      </p>
    ) : null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-16">
      {/* LEFT PANEL */}
      <div className="space-y-6 hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-orange-200 to-blue-300 text-amber-900 w-full lg:w-1/2 p-6">
        <h2 className="text-3xl text-yellow-700 font-semibold animate-pulse">UpLadoMyr Digital</h2>
        <p className="text-lg text-center max-w-sm italic">
          Empowering businesses with elegant, scalable, and user-friendly digital solutions.
        </p>
        <Image
          src="/img/signup/loginimg.avif"
          alt="Login Illustration"
          width={300}
          height={300}
          className="rounded-md shadow-lg"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col pt-10 justify-center items-center w-full lg:w-1/2 bg-white p-10 sm:p-12">
        <h2 className="text-2xl pt-10 font-bold mb-4 text-yellow-900">Welcome Back!</h2>

        {/* Якщо вже залогінений — НЕ редіректимо автоматом */}
        {user && (
          <div className="w-full max-w-sm mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            You are already signed in.
            <button
              type="button"
              onClick={() => router.replace(user.role === 'admin' ? '/admin' : '/')}
              className="ml-2 underline font-medium"
            >
              Go to dashboard →
            </button>
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4" noValidate>
          {/* Email */}
          <div className="relative">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              className={inputClass(!!errors.email)}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
            <MdEmail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 text-xl" />
            {/* Підказка-опечатка */}
            {emailSuggestion && !ignoreSuggestion && !errors.email && (
              <p className="mt-1 text-xs text-amber-600">
                Looks like a typo. Did you mean{' '}
                <button
                  type="button"
                  className="underline"
                  onClick={() => {
                    setEmail(emailSuggestion!);
                    setEmailSuggestion(null);
                    setIgnoreSuggestion(true);
                    setErrors((p) => {
                      const { email: _e, ...rest } = p;
                      return rest as Errors;
                    });
                  }}
                >
                  {emailSuggestion}
                </button>
                ?{' '}
                <button
                  type="button"
                  className="ml-1 text-[11px] underline"
                  onClick={() => {
                    setIgnoreSuggestion(true);
                    setEmailSuggestion(null);
                    setErrors((p) => {
                      const { email: _e, ...rest } = p;
                      return rest as Errors;
                    });
                  }}
                >
                  Use anyway
                </button>
              </p>
            )}
            <ErrorText id="email-error" msg={errors.email} />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={handlePasswordBlur}
              className={inputClass(!!errors.password)}
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              autoComplete="current-password"
            />
            {showPassword ? (
              <FaLockOpen
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 text-xl cursor-pointer"
                onClick={() => setShowPassword(false)}
                aria-label="Hide password"
              />
            ) : (
              <FaLock
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 text-xl cursor-pointer"
                onClick={() => setShowPassword(true)}
                aria-label="Show password"
              />
            )}
            <ErrorText id="password-error" msg={errors.password} />
          </div>

          {/* Remember Me */}
          <label htmlFor="remember" className="flex items-center gap-2 text-sm text-gray-700">
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="accent-yellow-600"
            />
            Remember me
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
            disabled={submitting}
            aria-busy={submitting}
            aria-disabled={submitting}
          >
            {submitting ? 'Logging in...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-[1px] bg-gray-300" />
            <span className="mx-4 text-gray-500 text-sm font-medium">or</span>
            <div className="flex-grow h-[1px] bg-gray-300" />
          </div>

          {/* OAuth (заглушки) */}
          <div className="flex gap-4">
            <button
              type="button"
              className="p-5 flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-transform hover:scale-105"
            >
              <Image src="/img/signup/search.png" alt="Google" width={20} height={20} />
              Google
            </button>

            <button
              type="button"
              className="p-5 flex items-center justify-center gap-2 w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-transform hover:scale-105"
            >
              <Image
                src="/img/signup/icons8-facebook-50.png"
                alt="Facebook"
                width={20}
                height={20}
              />
              Facebook
            </button>
          </div>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-500 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
