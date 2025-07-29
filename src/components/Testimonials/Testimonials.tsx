'use client';

import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaStar, FaStarHalfAlt, FaArrowRight, FaUserCircle } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 3;
  const [formData, setFormData] = useState({ name: '', phone: '', message: '', rating: 5 });
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out' });

    const stored = localStorage.getItem('user_testimonials');
    if (stored) {
      setTestimonials(JSON.parse(stored));
    } else {
      const initial: Testimonial[] = [
        {
          name: 'Emma R.',
          text: 'Exceptional service and stunning design work. Highly recommend!',
          rating: 5,
        },
        {
          name: 'Liam V.',
          text: 'Timely delivery and smooth communication throughout the project. Excellent work!',
          rating: 4.5,
        },
        { name: 'Noah S.', text: 'Impressive attention to detail. Will hire again.', rating: 5 },
        { name: 'Olivia M.', text: 'Professional and creative team. Loved the result.', rating: 5 },
        { name: 'Ava L.', text: 'Solid experience overall. Good price and delivery.', rating: 4.5 },
        {
          name: 'Isabella J.',
          text: 'Perfect execution of all my requirements. Thank you!',
          rating: 5,
        },
        { name: 'Sophia K.', text: 'Helpful support and great layout suggestions.', rating: 4.5 },
        { name: 'Mason D.', text: 'Modern, responsive, and elegant design.', rating: 5 },
        { name: 'Ethan B.', text: 'Good communication and final product quality.', rating: 4.5 },
        { name: 'Mia N.', text: 'Everything went smoothly and on time.', rating: 5 },
      ];

      localStorage.setItem('user_testimonials', JSON.stringify(initial));
      setTestimonials(initial);
    }
  }, []);

  const indexOfLast = currentPage * testimonialsPerPage;
  const indexOfFirst = indexOfLast - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const averageRating = 4.9;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTestimonial = {
      name: formData.name,
      text: formData.message,
      rating: formData.rating,
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('user_testimonials', JSON.stringify(updated));

    setFormData({ name: '', phone: '', message: '', rating: 5 });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 7000);
  };

  return (
    <section className="px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-black mb-8" data-aos="fade-up">
        Client Testimonials
      </h2>

      <div
        className="w-full max-w-md mx-auto mb-10 ml-1 border border-gray-500 rounded-lg px-4 py-3 flex items-center justify-between text-white bg-gray-700"
        data-aos="fade-up"
      >
        <p className="text-sm md:text-base">
          Overall rating{' '}
          <span className="font-semibold text-yellow-400">{averageRating.toFixed(1)}</span> out of 5
        </p>
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => {
            if (i < Math.floor(averageRating)) {
              return <FaStar key={i} />;
            } else if (i === Math.floor(averageRating) && averageRating % 1 >= 0.5) {
              return <FaStarHalfAlt key={i} />;
            } else {
              return <FaStar key={i} className="opacity-20" />;
            }
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {currentTestimonials.map((item, i) => (
          <div
            key={i}
            className="relative bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] shadow-md rounded-xl p-6 space-y-4 transition-transform duration-300 hover:scale-105 overflow-hidden"
            data-aos="fade-left"
          >
            {/* Left gradient border */}
            <div className="absolute top-0 left-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-blue-400 to-blue-600" />

            <div className="flex items-center gap-2">
              <FaUserCircle className="text-gray-800 text-xl" />
              <h4 className="text-lg font-semibold italic underline text-blue-900">{item.name}</h4>
            </div>

            <p className="text-gray-700 text-sm">{item.text}</p>

            <div className="flex items-center gap-2">
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} className={idx < item.rating ? 'opacity-100' : 'opacity-30'} />
                ))}
              </div>
              <span className="ml-2 bg-yellow-500 text-black text-sm font-bold px-2 py-0.5 rounded">
                {item.rating.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-yellow-700 text-white' : 'text-gray-800 border-gray-400'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Success Message (always visible if submitted) */}
      {submitted && (
        <div
          className="max-w-xl mx-auto text-center bg-gray-900 text-white p-6 rounded-xl shadow-lg mb-10"
          data-aos="fade-up"
        >
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">
            THANK YOU FOR YOUR SUBMISSION!
          </h3>
          <p className="mb-6">Your feedback is important to us. ✅</p>
          <div className="border border-gray-700 rounded-lg p-4">
            <p className="text-sm mb-2 font-semibold">
              FOLLOW US ON INSTAGRAM
              <br />
              to see our studio’s latest work, learn more about our process, and be the first to
              know about offers and updates.
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-yellow-400">
              <span className="text-xl">info@upladomyr.com</span>
            </div>
          </div>
        </div>
      )}

      {/* Form Toggle Button */}
      <div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 bg-blue-900 hover:bg-yellow-600 text-white px-6 py-2 rounded-4xl transition flex items-center gap-2 group"
        >
          {showForm ? 'Hide Form' : 'Leave a Review'}
          <FaArrowRight
            className={`transition-transform duration-300 group-hover:translate-x-1 ${showForm ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Form */}
      {showForm && !submitted && (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-50 p-6 rounded-xl shadow"
          data-aos="fade-up"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <PhoneInput
            country={'us'}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputClass="w-full mb-4 p-3 rounded border border-gray-300"
            inputStyle={{ width: '100%' }}
          />
          <textarea
            name="message"
            rows={4}
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded transition w-full"
          >
            Submit
          </button>
        </form>
      )}
    </section>
  );
};

export default Testimonials;
