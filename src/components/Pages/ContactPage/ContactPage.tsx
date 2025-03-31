'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaUser, FaEnvelope, FaCommentDots, FaPhone } from 'react-icons/fa';
import { FaHouseChimneyWindow } from 'react-icons/fa6';
import Image from 'next/image';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

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
        },
        userId
      );

      if (response.status === 200) {
        setSuccessMessage('✅ Je bericht is succesvol verzonden!');
        setFormData({ name: '', lastName: '', email: '', message: '' });
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setSuccessMessage('❌ Er ging iets mis. Probeer opnieuw.');
    }
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-16">
      <div className="bg-white py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          {/* Ліва частина – картинка */}
          <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden ">
            <Image
              src="/img/img-contact.avif"
              alt="Contact Visual"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Права частина – форма */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">
                Neem contact op
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Heb je vragen of opmerkingen? Laat een berichtje achter!
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
                    placeholder="Voornaam"
                    required
                    className="pl-12 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-800"
                  />
                </div>
                <div className="relative group">
                  <FaUser className="absolute top-3.5 left-4 text-gray-400" />
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Achternaam"
                    required
                    className="pl-12 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-800"
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
                  placeholder="E-mailadres"
                  required
                  className="pl-12 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-800"
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
                  placeholder="Bericht"
                  required
                  className="pl-12 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-800"
                />
              </div>

              {/* Verzenden */}
              <button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                VERZENDEN
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

      <div className="relative bg-gradient-to-br from-gray-700 via-green-200 to-emerald-400 mt">
        {/* Верхня хвиля */}
        <svg
          className="absolute top-0 left-0 w-full h-24 animate-wave"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#ecfdf5" d="M0,100 C360,0 1080,0 1440,100 L1440,0 L0,0 Z" />
        </svg>

        {/* Контент */}
        <div className="py-14 px-4 sm:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center relative z-10">
          {/* TELEFOON */}
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-green-900 text-yellow-400 rounded-full shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-6">
                <FaPhone />
              </div>
            </div>
            <h4 className="font-bold text-green-900">TELEFOON</h4>
            <p className="text-gray-600 mt-1 text-sm">+31 (06) 57-63-48-94</p>
          </div>

          {/* EMAIL */}
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-green-900 text-yellow-400 rounded-full shadow-md transition-transform duration-300 hover:scale-110 hover:-rotate-6">
                <FaEnvelope />
              </div>
            </div>
            <h4 className="font-bold text-green-900">E-MAIL</h4>
            <p className="text-gray-600 mt-1 text-sm">alex.zhyhan@hotmail.com</p>
            <p className="text-gray-600 text-sm">alexanderzhyhan@gmail.com</p>
          </div>

          {/* ADRES */}
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-green-900 text-yellow-400 rounded-full shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-3">
                <FaHouseChimneyWindow />
              </div>
            </div>
            <h4 className="font-bold text-green-900">ADRES</h4>
            <p className="text-gray-600 mt-1 text-sm">
              Lange Hilleweg 69 C, 3073 BJ <br /> Rotterdam
            </p>
          </div>
        </div>

        {/* Нижня хвиля */}
        <svg
          className="absolute bottom-0 left-0 w-full h-24 animate-wave reverse"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#ecfdf5" d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
};

export default ContactPage;
