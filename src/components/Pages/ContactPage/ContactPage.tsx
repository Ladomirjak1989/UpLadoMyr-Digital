'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import emailjs from '@emailjs/browser';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiGlobe,
  FiMail,
  FiMessageSquare,
  FiUser,
} from 'react-icons/fi';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type ToastState = {
  type: 'success' | 'error';
  text: string;
} | null;

type FormData = {
  name: string;
  lastName: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  website: string;
  message: string;
};

type CustomSelectProps = {
  label: string;
  name: keyof FormData;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  icon?: React.ReactNode;
  onChange: (name: keyof FormData, value: string) => void;
};

// ─────────────────────────────────────────────────────────────
// OPTIONS
// ─────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  'Starter Website',
  'Landing Page',
  'Business Website',
  'E-commerce Store',
  'MVP Development',
  'SaaS Development',
  'Custom Web App / CRM',
  'Website Redesign',
  'Not sure yet',
];

const BUDGET_OPTIONS = [
  'Under $1,000',
  '$1,000 – $3,000',
  '$3,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000 – $20,000',
  '$20,000+',
  'Not sure yet',
];

const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 2–4 weeks',
  'Within 1–2 months',
  'Within 3 months',
  'I’m flexible',
];

// ─────────────────────────────────────────────────────────────
// CUSTOM SELECT
// ─────────────────────────────────────────────────────────────

function CustomSelect({
  label,
  name,
  value,
  placeholder,
  options,
  required = false,
  icon,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const selectOption = (option: string) => {
    onChange(name, option);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label
        htmlFor={`${name}-select`}
        className="
          mb-2
          block
          text-sm
          font-bold
          text-slate-800
        "
      >
        {label}

        {required && <span className="ml-1 text-amber-600">*</span>}
      </label>

      {/* Hidden value for semantics/form data */}

      <input type="hidden" name={name} value={value} required={required} />

      <button
        id={`${name}-select`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          border
          bg-white
          px-4
          py-3.5
          text-left
          text-sm
          outline-none
          transition-all
          duration-200

          ${
            isOpen
              ? `
                border-amber-500
                ring-4
                ring-amber-500/10
              `
              : `
                border-slate-300
                hover:border-slate-400
              `
          }
        `}
      >
        {icon && <span className="shrink-0 text-slate-500">{icon}</span>}

        <span
          className={`
            flex-1
            ${value ? 'font-medium text-slate-900' : 'text-slate-400'}
          `}
        >
          {value || placeholder}
        </span>

        <FiChevronDown
          className={`
            h-5
            w-5
            shrink-0
            text-slate-500
            transition-transform
            duration-200

            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="
            absolute
            left-0
            right-0
            top-[calc(100%+8px)]
            z-50
            max-h-72
            overflow-y-auto
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-2
            shadow-[0_20px_60px_rgba(15,23,42,0.16)]
          "
        >
          {options.map((option) => {
            const isSelected = option === value;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option)}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-4
                  rounded-xl
                  px-3.5
                  py-3
                  text-left
                  text-sm
                  transition-colors

                  ${
                    isSelected
                      ? `
                        bg-amber-50
                        font-bold
                        text-blue-950
                      `
                      : `
                        text-slate-700
                        hover:bg-slate-50
                        hover:text-blue-950
                      `
                  }
                `}
              >
                <span>{option}</span>

                {isSelected && (
                  <span
                    className="
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-amber-400
                      text-blue-950
                    "
                  >
                    <FiCheck className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────────

const ContactPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    website: '',
    message: '',
  });

  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [toast, setToast] = useState<ToastState>(null);

  const [toastKey, setToastKey] = useState(0);

  const [isSending, setIsSending] = useState(false);

  // ───────────────────────────────────────────────────────────
  // TIME
  // ───────────────────────────────────────────────────────────

  const time = useMemo(
    () =>
      new Date().toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    []
  );

  // ───────────────────────────────────────────────────────────
  // INPUT CHANGE
  // ───────────────────────────────────────────────────────────

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ───────────────────────────────────────────────────────────
  // CUSTOM SELECT CHANGE
  // ───────────────────────────────────────────────────────────

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ───────────────────────────────────────────────────────────
  // TOAST
  // ───────────────────────────────────────────────────────────

  const showToast = (next: NonNullable<ToastState>) => {
    setToast(next);

    setToastKey((key) => key + 1);

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // ───────────────────────────────────────────────────────────
  // SUBMIT
  // ───────────────────────────────────────────────────────────

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) return;

    if (!formData.projectType) {
      showToast({
        type: 'error',
        text: 'Please select what you would like to build.',
      });

      return;
    }

    if (!formData.budget) {
      showToast({
        type: 'error',
        text: 'Please select your estimated project budget.',
      });

      return;
    }

    if (!privacyConsent) {
      showToast({
        type: 'error',
        text: 'Please accept the Privacy Policy before submitting.',
      });

      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    const templateReplyId = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;

    const userId = process.env.NEXT_PUBLIC_EMAILJS_KEY;

    if (!serviceId || !templateId || !templateReplyId || !userId) {
      showToast({
        type: 'error',
        text: 'Email configuration error. Please contact support.',
      });

      return;
    }

    const cleanEmail = formData.email.trim();

    const rawWebsite = formData.website.trim();

    const cleanWebsite = rawWebsite
      ? /^https?:\/\//i.test(rawWebsite)
        ? rawWebsite
        : `https://${rawWebsite}`
      : '';

    try {
      setIsSending(true);

      // ───────────────────────────────────────────────────────
      // BACKEND PAYLOAD
      // ───────────────────────────────────────────────────────

      const contactPayload = {
        name: formData.name.trim(),
        lastName: formData.lastName.trim(),
        email: cleanEmail,

        company: formData.company.trim(),

        projectType: formData.projectType,

        budget: formData.budget,

        timeline: formData.timeline || null,

        website: cleanWebsite || null,

        message: formData.message.trim(),
      };

      // ───────────────────────────────────────────────────────
      // 1. SAVE CONTACT REQUEST
      // ───────────────────────────────────────────────────────

      const backendRes = await fetch('/api/contact', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(contactPayload),
      });

      if (!backendRes.ok) {
        const errorText = await backendRes.text();

        console.error('Backend error response:', errorText);

        throw new Error(`Backend request failed with status ${backendRes.status}: ${errorText}`);
      }

      const backendData: {
        success: boolean;
        ref: string;
      } = await backendRes.json();

      if (!backendData?.ref) {
        throw new Error('Missing contact reference from backend');
      }

      // ───────────────────────────────────────────────────────
      // 2. EMAIL TO ADMIN
      // ───────────────────────────────────────────────────────

      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name.trim(),

          last_name: formData.lastName.trim(),

          email: cleanEmail,

          company: formData.company.trim() || 'Not provided',

          project_type: formData.projectType,

          budget: formData.budget,

          timeline: formData.timeline || 'Not specified',

          website: cleanWebsite || 'Not provided',

          message: formData.message.trim(),

          reference: backendData.ref,

          time,
        },
        userId
      );

      // ───────────────────────────────────────────────────────
      // 3. AUTO REPLY
      // ───────────────────────────────────────────────────────

      await emailjs.send(
        serviceId,
        templateReplyId,
        {
          name: formData.name.trim(),

          email: cleanEmail,

          reply_to: 'info@upladomyr.com',

          project_type: formData.projectType,

          budget: formData.budget,

          timeline: formData.timeline || 'Not specified',

          message: formData.message.trim(),

          reference: backendData.ref,

          time,
        },
        userId
      );

      // ───────────────────────────────────────────────────────
      // SUCCESS
      // ───────────────────────────────────────────────────────

      if (response.status === 200) {
        setFormData({
          name: '',
          lastName: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          website: '',
          message: '',
        });

        setPrivacyConsent(false);

        router.push(`/thank-you?ref=${encodeURIComponent(backendData.ref)}`);

        return;
      }

      throw new Error('Failed to send message via EmailJS.');
    } catch (error: unknown) {
      console.error('Email/contact sending error:', error);

      showToast({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  // ───────────────────────────────────────────────────────────
  // PAGE
  // ───────────────────────────────────────────────────────────

  return (
    <>
      <main className="bg-white">
        {/* ─────────────────────────────────────────────────── */}
        {/* HERO */}
        {/* ─────────────────────────────────────────────────── */}

        <section
          className="
            relative
            overflow-hidden
            border-b
            border-slate-200
            bg-gradient-to-br
            from-white
            via-slate-50
            to-amber-50
          "
        >
          <div
            className="
              absolute
              -right-32
              -top-32
              h-96
              w-96
              rounded-full
              bg-amber-300/10
              blur-3xl
            "
          />

          <div
            className="
              mx-auto
              max-w-7xl
              px-4
              py-20
              sm:px-6
              lg:px-8
              lg:py-28
            "
          >
            <div className="mx-auto max-w-4xl text-center">
              <p
                className="
                  text-sm
                  font-extrabold
                  uppercase
                  tracking-[0.18em]
                  text-amber-700
                "
              >
                Start a Project
              </p>

              <h1
                className="
                  mt-4
                  text-4xl
                  font-extrabold
                  tracking-tight
                  text-blue-950
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Let&apos;s Build Something
                <span className="block text-yellow-700">That Moves Your Business Forward</span>
              </h1>

              <p
                className="
                  mx-auto
                  mt-6
                  max-w-3xl
                  text-lg
                  leading-relaxed
                  text-slate-600
                  sm:text-xl
                "
              >
                Planning a website, e-commerce platform, MVP, SaaS product or custom web
                application? Tell us what you want to build and we&apos;ll help you define the right
                approach.
              </p>

              <a
                href="#project-form"
                className="
    mt-8
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-amber-950

    bg-gradient-to-br
    from-blue-950
    via-blue-900
    to-blue-800

    px-7
    py-3.5
    text-sm
    font-extrabold
    text-amber-400
    shadow-lg
    transition-all
    duration-300

    hover:-translate-y-0.5
    hover:from-[#767675]
    hover:via-[#efc741]
    hover:to-[#904e0d]
    hover:text-blue-950
    hover:shadow-xl
  "
              >
                Tell Us About Your Project
                <FiArrowRight />
              </a>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────── */}
        {/* FORM SECTION */}
        {/* ─────────────────────────────────────────────────── */}

        <section
          id="project-form"
          className="
            scroll-mt-28
            px-4
            py-20
            sm:px-6
            lg:px-8
            lg:py-24
          "
        >
          <div
            className="
              mx-auto
              grid
              max-w-7xl
              gap-12
              lg:grid-cols-[0.72fr_1.28fr]
              lg:gap-16
            "
          >
            {/* LEFT */}

            <div className="lg:sticky lg:top-28 lg:self-start">
              <p
                className="
                  text-sm
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-amber-700
                "
              >
                Project Inquiry
              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-blue-950
                  sm:text-4xl
                "
              >
                Tell us about your project
              </h2>

              <p
                className="
                  mt-5
                  text-base
                  leading-7
                  text-slate-600
                "
              >
                Share a few details about what you&apos;d like to build. This helps us understand
                your goals, recommend the right technical approach and prepare a more accurate
                project estimate.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-amber-50
                      font-extrabold
                      text-amber-700
                    "
                  >
                    01
                  </span>

                  <div>
                    <h3 className="font-bold text-blue-950">Share your requirements</h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Tell us what you&apos;re building, your goals and the functionality you need.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-amber-50
                      font-extrabold
                      text-amber-700
                    "
                  >
                    02
                  </span>

                  <div>
                    <h3 className="font-bold text-blue-950">We review your project</h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      We&apos;ll review the scope, requirements and technical needs of your project.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-amber-50
                      font-extrabold
                      text-amber-700
                    "
                  >
                    03
                  </span>

                  <div>
                    <h3 className="font-bold text-blue-950">Get clear next steps</h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      If we&apos;re a good fit, we&apos;ll discuss the scope, timeline and estimated
                      project cost.
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTACT */}

              <div
                className="
                  mt-10
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                "
              >
                <p
                  className="
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-[0.14em]
                    text-slate-500
                  "
                >
                  Prefer email?
                </p>

                <a
                  href="mailto:info@upladomyr.com"
                  className="
                    mt-2
                    inline-flex
                    items-center
                    gap-2
                    font-bold
                    text-blue-950
                    transition-colors
                    hover:text-amber-700
                  "
                >
                  <FiMail />
                  info@upladomyr.com
                </a>
              </div>
            </div>

            {/* RIGHT / FORM */}

            <div
              className="
                overflow-visible
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-[0_20px_70px_rgba(15,23,42,0.09)]
                sm:p-8
                lg:p-10
              "
            >
              <div className="mb-8">
                <p
                  className="
                    text-sm
                    font-extrabold
                    uppercase
                    tracking-[0.14em]
                    text-amber-700
                  "
                >
                  Project Details
                </p>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-extrabold
                    text-blue-950
                    sm:text-3xl
                  "
                >
                  What would you like to build?
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Fields marked with <span className="font-bold text-amber-600">*</span> are
                  required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NAME */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-2
                        block
                        text-sm
                        font-bold
                        text-slate-800
                      "
                    >
                      First name
                      <span className="ml-1 text-amber-600">*</span>
                    </label>

                    <div className="relative">
                      <FiUser
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="given-name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-300
                          bg-white
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-slate-900
                          outline-none
                          transition-all
                          placeholder:text-slate-400
                          hover:border-slate-400
                          focus:border-amber-500
                          focus:ring-4
                          focus:ring-amber-500/10
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="
                        mb-2
                        block
                        text-sm
                        font-bold
                        text-slate-800
                      "
                    >
                      Last name
                      <span className="ml-1 text-amber-600">*</span>
                    </label>

                    <div className="relative">
                      <FiUser
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Smith"
                        required
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-300
                          bg-white
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-slate-900
                          outline-none
                          transition-all
                          placeholder:text-slate-400
                          hover:border-slate-400
                          focus:border-amber-500
                          focus:ring-4
                          focus:ring-amber-500/10
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* EMAIL + COMPANY */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-2
                        block
                        text-sm
                        font-bold
                        text-slate-800
                      "
                    >
                      Business email
                      <span className="ml-1 text-amber-600">*</span>
                    </label>

                    <div className="relative">
                      <FiMail
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-300
                          bg-white
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-slate-900
                          outline-none
                          transition-all
                          placeholder:text-slate-400
                          hover:border-slate-400
                          focus:border-amber-500
                          focus:ring-4
                          focus:ring-amber-500/10
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="
                        mb-2
                        block
                        text-sm
                        font-bold
                        text-slate-800
                      "
                    >
                      Company / Business
                      <span className="ml-2 text-xs font-normal text-slate-400">Optional</span>
                    </label>

                    <div className="relative">
                      <FiBriefcase
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-300
                          bg-white
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-slate-900
                          outline-none
                          transition-all
                          placeholder:text-slate-400
                          hover:border-slate-400
                          focus:border-amber-500
                          focus:ring-4
                          focus:ring-amber-500/10
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* PROJECT TYPE */}

                <CustomSelect
                  label="What would you like to build?"
                  name="projectType"
                  value={formData.projectType}
                  placeholder="Select a project type"
                  options={PROJECT_TYPES}
                  required
                  icon={<FiBriefcase />}
                  onChange={handleSelectChange}
                />

                {/* BUDGET + TIMELINE */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <CustomSelect
                    label="Estimated project budget"
                    name="budget"
                    value={formData.budget}
                    placeholder="Select your budget"
                    options={BUDGET_OPTIONS}
                    required
                    icon={<FiDollarSign />}
                    onChange={handleSelectChange}
                  />

                  <CustomSelect
                    label="When would you like to start?"
                    name="timeline"
                    value={formData.timeline}
                    placeholder="Select a timeline"
                    options={TIMELINE_OPTIONS}
                    icon={<FiClock />}
                    onChange={handleSelectChange}
                  />
                </div>

                {/* WEBSITE */}

                <div>
                  <label
                    htmlFor="website"
                    className="
                      mb-2
                      block
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    Existing website
                    <span className="ml-2 text-xs font-normal text-slate-400">Optional</span>
                  </label>

                  <div className="relative">
                    <FiGlobe
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      id="website"
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        bg-white
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        hover:border-slate-400
                        focus:border-amber-500
                        focus:ring-4
                        focus:ring-amber-500/10
                      "
                    />
                  </div>
                </div>

                {/* MESSAGE */}

                <div>
                  <label
                    htmlFor="message"
                    className="
                      mb-2
                      block
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    Tell us about your project
                    <span className="ml-1 text-amber-600">*</span>
                  </label>

                  <div className="relative">
                    <FiMessageSquare
                      className="
                        absolute
                        left-4
                        top-4
                        text-slate-400
                      "
                    />

                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what you'd like to build, your goals, important features, and anything else we should know..."
                      required
                      className="
                        min-h-[170px]
                        w-full
                        resize-y
                        rounded-xl
                        border
                        border-slate-300
                        bg-white
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        leading-6
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        hover:border-slate-400
                        focus:border-amber-500
                        focus:ring-4
                        focus:ring-amber-500/10
                      "
                    />
                  </div>
                </div>

                {/* PRIVACY */}

                <label
                  htmlFor="privacyConsent"
                  className="
                    flex
                    cursor-pointer
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                  "
                >
                  <input
                    id="privacyConsent"
                    name="privacyConsent"
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(event) => setPrivacyConsent(event.target.checked)}
                    required
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      accent-amber-500
                    "
                  />

                  <span
                    className="
                      text-xs
                      leading-5
                      text-slate-600
                    "
                  >
                    By submitting this form, you agree to the processing of your personal data in
                    accordance with our{' '}
                    <Link
                      href="/privacy"
                      className="
                        font-bold
                        text-blue-900
                        underline
                        underline-offset-2
                        transition-colors
                        hover:text-amber-700
                      "
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={isSending}
                  className={`
    inline-flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-amber-950

    bg-gradient-to-br
    from-blue-950
    via-blue-900
    to-blue-800

    px-6
    py-4
    text-sm
    font-extrabold
    text-amber-400
    shadow-lg
    transition-all
    duration-300

    ${
      isSending
        ? `
          cursor-not-allowed
          opacity-60
        `
        : `
          hover:-translate-y-0.5
          hover:from-[#767675]
          hover:via-[#efc741]
          hover:to-[#904e0d]
          hover:text-blue-950
          hover:shadow-xl
        `
    }
  `}
                >
                  {isSending ? 'Sending Project Request...' : 'Send Project Request'}

                  {!isSending && <FiArrowRight />}
                </button>

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-center
                    text-xs
                    text-slate-500
                  "
                >
                  <FiClock />
                  We normally respond within 1–2 business days.
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────── */}
        {/* WHAT HAPPENS NEXT */}
        {/* ─────────────────────────────────────────────────── */}

        <section className="bg-slate-50">
          <div
            className="
              mx-auto
              max-w-7xl
              px-4
              py-20
              sm:px-6
              lg:px-8
            "
          >
            <div className="mx-auto max-w-3xl text-center">
              <p
                className="
                  text-sm
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-amber-700
                "
              >
                What Happens Next?
              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-blue-950
                  sm:text-4xl
                "
              >
                A clear process from the first message
              </h2>

              <p
                className="
                  mt-4
                  text-base
                  leading-relaxed
                  text-slate-600
                "
              >
                You&apos;ll know what the next step is before any development work begins.
              </p>
            </div>

            <div
              className="
                mt-12
                grid
                gap-5
                md:grid-cols-3
              "
            >
              {[
                {
                  number: '01',
                  title: 'We review your request',
                  text: 'We review your goals, requirements, budget and timeline to understand the scope of the project.',
                },
                {
                  number: '02',
                  title: 'We discuss the project',
                  text: 'If the project is a good fit, we clarify the functionality, priorities and technical requirements.',
                },
                {
                  number: '03',
                  title: 'You receive a clear proposal',
                  text: 'Before development begins, you receive a defined scope, estimated timeline and project pricing.',
                },
              ].map((item) => (
                <article
                  key={item.number}
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                  "
                >
                  <span
                    className="
                      text-sm
                      font-black
                      text-amber-600
                    "
                  >
                    {item.number}
                  </span>

                  <h3
                    className="
                      mt-4
                      text-lg
                      font-extrabold
                      text-blue-950
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-slate-600
                    "
                  >
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────── */}
        {/* FINAL CTA */}
        {/* ─────────────────────────────────────────────────── */}

        <section
          className="
            mx-auto
            max-w-7xl
            px-4
            py-20
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-blue-950
              px-6
              py-12
              text-center
              sm:px-10
              lg:px-16
              lg:py-16
            "
          >
            <div
              className="
                absolute
                -left-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-amber-400/10
                blur-3xl
              "
            />

            <div className="relative mx-auto max-w-3xl">
              <p
                className="
                  text-sm
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-amber-400
                "
              >
                Have an Idea?
              </p>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                Not sure which solution you need?
              </h2>

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-2xl
                  text-base
                  leading-relaxed
                  text-slate-300
                "
              >
                You don&apos;t need to have every technical detail figured out. Tell us about your
                business idea and goals, and we&apos;ll help determine the appropriate solution.
              </p>

              <a
                href="#project-form"
                className="
    mt-8
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-amber-950
    bg-amber-400
    px-7
    py-3.5
    text-sm
    font-extrabold
    text-blue-950
    shadow-lg
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:bg-gradient-to-br
    hover:from-[#767675]
    hover:via-[#efc741]
    hover:to-[#904e0d]
    hover:text-blue-950
    hover:shadow-xl
  "
              >
                Start Your Project
                <FiArrowRight />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ───────────────────────────────────────────────────── */}
      {/* TOAST */}
      {/* ───────────────────────────────────────────────────── */}

      <div
        className="
          pointer-events-none
          fixed
          bottom-5
          right-5
          z-[9999]
          sm:bottom-6
          sm:right-6
        "
      >
        <div
          className={`
            transition-all
            duration-300
            ease-out

            ${toast ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
          `}
        >
          {toast && (
            <div
              role="status"
              aria-live="polite"
              className={`
                pointer-events-auto
                relative
                flex
                w-[min(92vw,380px)]
                items-start
                gap-3
                rounded-2xl
                border
                bg-white/95
                px-4
                py-3
                shadow-xl
                backdrop-blur-md

                ${toast.type === 'success' ? 'border-green-200' : 'border-red-200'}
              `}
            >
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-[3px]
                  w-full
                  overflow-hidden
                  rounded-t-2xl
                "
              >
                <div
                  key={toastKey}
                  className={`
                    h-full
                    origin-left
                    animate-toast-progress

                    ${toast.type === 'success' ? 'bg-green-500/80' : 'bg-red-500/80'}
                  `}
                />
              </div>

              <div
                className={`
                  mt-0.5
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-sm
                  font-bold
                  text-white

                  ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}
                `}
                aria-hidden
              >
                {toast.type === 'success' ? '✓' : '!'}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {toast.type === 'success' ? 'Sent' : 'Error'}
                </p>

                <p
                  className="
                    text-sm
                    leading-snug
                    text-slate-700
                  "
                >
                  {toast.text}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setToast(null)}
                className="
                  pointer-events-auto
                  -mt-1
                  ml-2
                  rounded-lg
                  px-2
                  py-1
                  text-slate-500
                  transition
                  hover:text-slate-900
                "
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
