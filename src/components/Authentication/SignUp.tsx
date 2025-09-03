'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaLockOpen } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

type Form = { username: string; email: string; password: string; confirm: string };
type Errors = Partial<Record<keyof Form | 'terms', string>>;
type Field = keyof Form | 'terms';

/** Дозволяємо будь-які коректні домени (включно з .ua, .de, .co, .me і т.д.) */
const emailRe = /^(?!.*\.\.)[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
/** Імʼя користувача: 3–32 символи */
const usernameRe = /^[a-zA-Z0-9._-]{3,32}$/;

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

/** Часті домени — щоб пропонувати виправлення опечаток */
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

/** Повертає рекомендовану адресу, якщо домен схожий на популярний */
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

const SignUp: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState<Form>({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    username: false,
    email: false,
    password: false,
    confirm: false,
    terms: false,
  });
  const [agreed, setAgreed] = useState(false);
  const [show, setShow] = useState({ password: false, confirm: false });
  const [submitting, setSubmitting] = useState(false);

  // анти-опечаткова підказка для e-mail
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [ignoreSuggestion, setIgnoreSuggestion] = useState(false);

  // посилання для фокусу першого невалідного поля
  const refs = {
    username: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirm: useRef<HTMLInputElement>(null),
    terms: useRef<HTMLInputElement>(null),
  };

  const onChange = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((s) => ({ ...s, [key]: value }));

    if (key === 'email') {
      setIgnoreSuggestion(false);
      const suggestion = suggestDomain(value.trim());
      // якщо введене вже збігається з підказкою — прибираємо повідомлення
      if (suggestion && suggestion.toLowerCase() === value.trim().toLowerCase()) {
        setEmailSuggestion(null);
      } else {
        setEmailSuggestion(suggestion);
      }
    }

    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: validateField(key, value, form) }));
    }
  };

  const onBlur = (key: keyof Form) => (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key, e.target.value, form) }));

    if (key === 'email') {
      setIgnoreSuggestion(false);
      const value = e.target.value.trim();
      const suggestion = suggestDomain(value);
      setEmailSuggestion(
        suggestion && suggestion.toLowerCase() !== value.toLowerCase() ? suggestion : null
      );
    }
  };

  // ✅ FIX: миттєво прибираємо/ставимо помилку при зміні чекбокса
  const onTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAgreed(checked);
    setTouched((t) => ({ ...t, terms: true }));
    setErrors((prev) => {
      const next = { ...prev };
      if (checked) delete next.terms;
      else next.terms = 'You must agree to the Terms & Conditions.';
      return next;
    });
  };

  function validateField(key: keyof Form, value: string, all: Form): string | undefined {
    switch (key) {
      case 'username':
        if (!value.trim()) return 'Username is required.';
        if (!usernameRe.test(value.trim())) return '3–32 chars: letters, numbers, . _ -';
        return;
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!emailRe.test(value.trim().toLowerCase()))
          return 'Enter a valid email (e.g. name@example.com).';
        return;
      case 'password':
        if (!value) return 'Password is required.';
        if (value.length < 8) return 'Minimum 8 characters.';
        return;
      case 'confirm':
        if (!value) return 'Please confirm your password.';
        if (value !== all.password) return 'Passwords do not match.';
        return;
    }
  }

  function validateAll(f: Form, isAgreed: boolean): Errors {
    const next: Errors = {};
    (Object.keys(f) as (keyof Form)[]).forEach((k) => {
      const err = validateField(k, f[k], f);
      if (err) next[k] = err;
    });
    if (!isAgreed) next.terms = 'You must agree to the Terms & Conditions.';
    // якщо є підказка і користувач її не ігнорував — блокуємо сабміт
    if (emailSuggestion && !ignoreSuggestion) {
      next.email = `Looks like a typo. Did you mean ${emailSuggestion}?`;
    }
    return next;
  }

  function focusFirstInvalid(errs: Errors) {
    const order: (keyof Form | 'terms')[] = ['username', 'email', 'password', 'confirm', 'terms'];
    for (const key of order) {
      if (errs[key]) {
        if (key === 'terms') refs.terms.current?.focus();
        else refs[key].current?.focus();
        break;
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validateAll(form, agreed);
    setErrors(nextErrors);
    setTouched({ username: true, email: true, password: true, confirm: true, terms: true });

    if (Object.keys(nextErrors).length) {
      toast.error('Please fix the errors in the form.');
      focusFirstInvalid(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      const email = form.email.trim().toLowerCase();
      const username = form.username.trim();

      await axios.post('/auth/signup', { email, password: form.password, username });

      toast.success('Account created successfully!');
      try {
        await login(email, form.password, false); // автологін (без remember)
      } catch {
        router.replace('/signin');
      }
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? 'Sign up failed.';
      const text = Array.isArray(message) ? message.join(', ') : String(message);
      const lower = text.toLowerCase();

      if (lower.includes('email')) {
        setErrors((p) => ({ ...p, email: text }));
        refs.email.current?.focus();
      } else if (lower.includes('username')) {
        setErrors((p) => ({ ...p, username: text }));
        refs.username.current?.focus();
      } else {
        toast.error(text);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (key: keyof Form) =>
    `w-full rounded-lg border px-4 py-2 ${
      errors[key]
        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
        : 'border-gray-300'
    }`;

  const ErrorText = ({ id, msg }: { id: string; msg?: string }) =>
    msg ? (
      <p id={id} role="alert" aria-live="polite" className="mt-1 text-xs text-red-600">
        {msg}
      </p>
    ) : null;

  return (
    <div className="flex min-h-screen flex-col lg:flex-row p-6 sm:p-10 lg:p-16">
      {/* LEFT PANEL */}
      <div className="hidden w-full flex-col items-center justify-center space-y-6 bg-gradient-to-br from-orange-200 to-blue-300 p-6 text-amber-900 lg:flex lg:w-1/2">
        <p className="mt-6 max-w-sm text-center text-lg italic">
          <span className="animate-pulse text-3xl font-semibold text-yellow-700">
            UpLadoMyr Digital
          </span>
          <br />
          Turning ideas into scalable websites and smart digital solutions.
          <br />
          Let’s build your future — pixel by pixel, line by line.
        </p>
        <Image
          src="/img/signup/welkom2.avif"
          alt="Welcome"
          width={300}
          height={300}
          className="rounded-md shadow-lg"
          priority
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full items-center justify-center bg-white p-6 sm:p-10 lg:w-1/2">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4" noValidate>
          <h2 className="pt-8 text-center text-2xl font-bold text-yellow-900">Welcome</h2>
          <p className="text-center text-xl font-bold text-yellow-700">Create your account</p>

          {/* Username */}
          <div className="relative">
            <input
              ref={refs.username}
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onChange('username')}
              onBlur={onBlur('username')}
              autoComplete="username"
              required
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'username-error' : undefined}
              className={inputClass('username')}
            />
            <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <ErrorText id="username-error" msg={errors.username} />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              ref={refs.email}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange('email')}
              onBlur={onBlur('email')}
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClass('email')}
            />
            <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
            {/* Підказка-опечатка: зникає після вибору/Use anyway/точного збігу */}
            {emailSuggestion && !ignoreSuggestion && !errors.email && (
              <p className="mt-1 text-xs text-amber-600">
                Looks like a typo. Did you mean{' '}
                <button
                  type="button"
                  className="underline"
                  onClick={() => {
                    setForm((f) => ({ ...f, email: emailSuggestion! }));
                    setEmailSuggestion(null); // прибрати підказку
                    setIgnoreSuggestion(true); // не показувати знову одразу
                    setErrors((p) => {
                      const { email, ...rest } = p;
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
                      const { email, ...rest } = p;
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
              ref={refs.password}
              type={show.password ? 'text' : 'password'}
              name="new-password"
              placeholder="Password"
              value={form.password}
              onChange={onChange('password')}
              onBlur={onBlur('password')}
              autoComplete="new-password"
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={inputClass('password')}
            />
            {show.password ? (
              <FaLockOpen
                onClick={() => setShow((s) => ({ ...s, password: false }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                aria-label="Hide password"
              />
            ) : (
              <FaLock
                onClick={() => setShow((s) => ({ ...s, password: true }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                aria-label="Show password"
              />
            )}
            <ErrorText id="password-error" msg={errors.password} />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              ref={refs.confirm}
              type={show.confirm ? 'text' : 'password'}
              name="confirm-password"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={onChange('confirm')}
              onBlur={onBlur('confirm')}
              autoComplete="new-password"
              required
              aria-invalid={!!errors.confirm}
              aria-describedby={errors.confirm ? 'confirm-error' : undefined}
              className={inputClass('confirm')}
            />
            {show.confirm ? (
              <FaLockOpen
                onClick={() => setShow((s) => ({ ...s, confirm: false }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                aria-label="Hide confirm password"
              />
            ) : (
              <FaLock
                onClick={() => setShow((s) => ({ ...s, confirm: true }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                aria-label="Show confirm password"
              />
            )}
            <ErrorText id="confirm-error" msg={errors.confirm} />
          </div>

          {/* Terms & Conditions */}
          <div>
            <label className="flex items-center gap-2 text-sm">
              <input
                ref={refs.terms}
                type="checkbox"
                checked={agreed}
                onChange={onTermsChange}
                className={`accent-blue-600`}
                aria-invalid={!!errors.terms}
                aria-describedby={errors.terms ? 'terms-error' : undefined}
                required
              />
              <span>
                I agree to the{' '}
                <Link href="/terms" className="text-blue-600 underline">
                  Terms &amp; Conditions
                </Link>
                .
              </span>
            </label>
            <ErrorText id="terms-error" msg={errors.terms} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="btn mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Creating…' : 'Sign Up'}
          </button>

          {/* Switch to Sign In */}
          <p className="text-center text-sm">
            Already have an account?
            <Link href="/signin" className="ml-1 text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>

          {/* OAuth placeholders */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 transition-transform hover:scale-105 hover:bg-gray-200"
            >
              <Image src="/img/signup/search.png" alt="Google" width={20} height={20} /> Google
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition-transform hover:scale-105 hover:bg-red-600"
            >
              <Image
                src="/img/signup/icons8-facebook-50.png"
                alt="Facebook"
                width={20}
                height={20}
              />{' '}
              Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
