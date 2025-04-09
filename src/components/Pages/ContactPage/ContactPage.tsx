'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import Image from 'next/image';

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
                  <FaUser className="absolute top-3.5 left-4 text-gray-400" />
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
                  <FaUser className="absolute top-3.5 left-4 text-gray-400" />
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
                <FaEnvelope className="absolute top-3.5 left-4 text-gray-400" />
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
                <FaCommentDots className="absolute top-3.5 left-4 text-gray-400" />
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

              {/* Verzenden */}
              <button
                type="submit"
                className="w-full bg-[#c7a23f] hover:bg-yellow-500 text-white py-3 rounded-xl font-semibold transition"
              >
                SEND
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
