'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUp } from 'react-icons/fi';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    message: '',
    time: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const time = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const templateReplyId = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_KEY;

    if (!serviceId || !templateId || !userId || !templateReplyId) {
      setSuccessMessage('❌ Configuration error. Please contact support.');
      return;
    }

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          last_name: formData.lastName,
          email: formData.email,
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
          email: formData.email,
          reply_to: process.env.EMAIL_USER,
          message: formData.message,
          time: time,
        },
        userId
      );

      if (response.status === 200) {
        setSuccessMessage('✅ Your message has been sent successfully!');
        setFormData({ name: '', lastName: '', email: '', message: '', time: '' });
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setSuccessMessage('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-16">
      <div className="bg-white py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          {/* Верхня частина – картинка + текст ПІД нею */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Image Section */}
            <div className="w-fit mx-auto">
              <Image
                src="/img/contact1.jpg"
                alt="Contact Visual"
                width={400}
                height={300}
                className="rounded-xl object-contain"
              />
            </div>

            {/* Text Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-center text-2xl sm:text-3xl font-semibold text-blue-950 mb-4">
                We are here to help!
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Let us know how we can best serve you. Use the contact form to email us or select
                from the topics below that best fit your needs. It's an honor to support you in your
                journey towards better health.
              </p>
            </div>
          </div>

          {/* Права частина – форма */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-2">Reach out to us</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Have any questions or feedback? Drop us a message!
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 shadow-xl rounded-xl px-6 py-8 space-y-6"
            >
              {/* Naam + Achternaam */}
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
                    placeholder="Lastname"
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

              {/* Bericht */}
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

              {/* Privacy Policy Agreement */}
              <div className="flex items-start gap-2 text-sm text-gray-900">
                <input type="checkbox" required className="mt-1 accent-yellow-500" />
                <label>
                  By submitting the form, you agree to the processing of your{' '}
                  <Link
                    href="/privacy"
                    className="underline text-blue-800 hover:text-yellow-600 transition"
                  >
                    personal data
                  </Link>
                  .
                </label>
              </div>

              {/* Verzenden */}
              <button
                type="submit"
                className="group relative overflow-hidden border border-[#c7a23f] text-[#c7a23f] inline-block text-[15px] leading-[15px] py-[18px] px-[24px] bg-white cursor-pointer select-none transition duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)]"
              >
                {/* Top layer (visible text) */}
                <span className="relative z-10 transition-colors duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)]">
                  SEND
                </span>

                {/* Hidden reveal text */}
                <span className="absolute bottom-0 left-1/2 text-white text-[13px] leading-[13px] h-[14px] opacity-0 top-1/2 transform translate-x-[-50%] translate-y-[225%] transition-all duration-[900ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:translate-y-[-50%] group-hover:opacity-100 z-[100]">
                  THANKS!
                </span>

                {/* Background animation */}
                <span className="absolute bottom-[-50%] left-0 w-full h-full bg-[#c7a23f] transform skew-y-[9.3deg] scale-y-0 origin-bottom transition-transform duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:scale-y-200 z-[50]" />
              </button>

              {/* Statusbericht */}
              {successMessage && (
                <p
                  className={`text-center font-medium ${successMessage.includes('✅') ? 'text-green-700' : 'text-red-600'}`}
                >
                  {successMessage}
                </p>
              )}
            </form>

            {/* 🔐 Info-callout: need to sign in */}
            <div className="relative mt-8 w-full max-w-xl">
              <div className="flex items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900 shadow-sm">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 font-semibold">
                  i
                </span>

                {/* робимо рядок «токенами», що можуть переноситись між собою,
                але окремі фрази тримаємо нерозривно */}
                <p className="leading-6 flex flex-wrap items-center gap-x-1">
                  <span>To send us an email, please</span>

                  <span className="whitespace-nowrap">
                    <Link href="/signin" className="underline font-semibold hover:text-yellow-700">
                      sign in
                    </Link>
                  </span>

                  <span>or</span>

                  {/* фраза + стрілка тримаються разом */}
                  <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
                    <Link href="/signup" className="underline font-semibold hover:text-yellow-700">
                      create an account
                    </Link>
                    <span>.</span>
                    <FiArrowUp
                      className="text-yellow-600 text-sm sm:text-base translate-y-[-1px] motion-safe:animate-bounce"
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
  );
};

export default ContactPage;
