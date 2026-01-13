'use client';

import React, { useEffect, useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaStar, FaStarHalfAlt, FaArrowRight, FaUserCircle } from 'react-icons/fa';

interface Testimonial {
  name: string;
  text: string;
  rating: number; // e.g. 4.5
}

const STORAGE_KEY = 'user_testimonials';

const INITIAL_TESTIMONIALS: Testimonial[] = [
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
  { name: 'Isabella J.', text: 'Perfect execution of all my requirements. Thank you!', rating: 5 },
  { name: 'Sophia K.', text: 'Helpful support and great layout suggestions.', rating: 4.5 },
  { name: 'Mason D.', text: 'Modern, responsive, and elegant design.', rating: 5 },
  { name: 'Ethan B.', text: 'Good communication and final product quality.', rating: 4.5 },
  { name: 'Mia N.', text: 'Everything went smoothly and on time.', rating: 5 },
];

function clampRating(value: number) {
  if (Number.isNaN(value)) return 5;
  return Math.min(5, Math.max(1, value));
}

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <FaStar key={i} />;
        if (i === full && hasHalf) return <FaStarHalfAlt key={i} />;
        return <FaStar key={i} className="opacity-20" />;
      })}
    </>
  );
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 3;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    rating: 5,
  });

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ✅ Load once (fixes "Too many re-renders")
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as Testimonial[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTestimonials(parsed);
          return;
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
      setTestimonials(INITIAL_TESTIMONIALS);
    } catch {
      // If localStorage blocked or JSON broken — fall back
      setTestimonials(INITIAL_TESTIMONIALS);
    }
  }, []);

  // ✅ Derived data (no extra state)
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(testimonials.length / testimonialsPerPage)),
    [testimonials.length]
  );

  // ✅ Keep currentPage valid if data changes
  useEffect(() => {
    setCurrentPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const currentTestimonials = useMemo(() => {
    const indexOfLast = currentPage * testimonialsPerPage;
    const indexOfFirst = indexOfLast - testimonialsPerPage;
    return testimonials.slice(indexOfFirst, indexOfLast);
  }, [testimonials, currentPage]);

  const averageRating = useMemo(() => {
    if (testimonials.length === 0) return 5;
    const sum = testimonials.reduce((acc, t) => acc + clampRating(t.rating), 0);
    return sum / testimonials.length;
  }, [testimonials]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTestimonial: Testimonial = {
      name: formData.name.trim(),
      text: formData.message.trim(),
      rating: clampRating(formData.rating),
    };

    const updated = [newTestimonial, ...testimonials];

    setTestimonials(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setFormData({ name: '', phone: '', message: '', rating: 5 });
    setSubmitted(true);
    setShowForm(false);
    setCurrentPage(1); // ✅ show newest review immediately

    window.setTimeout(() => {
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

        <div className="flex items-center gap-1 text-yellow-500" aria-label="Average rating">
          {renderStars(averageRating)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {currentTestimonials.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="relative bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] shadow-md rounded-xl p-6 space-y-4 transition-transform duration-300 hover:scale-105 overflow-hidden"
            data-aos="fade-left"
          >
            <div className="absolute top-0 left-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-blue-400 to-blue-600" />

            <div className="flex items-center gap-2">
              <FaUserCircle className="text-gray-800 text-xl" />
              <h4 className="text-lg font-semibold italic underline text-blue-900">{item.name}</h4>
            </div>

            <p className="text-gray-700 text-sm">{item.text}</p>

            <div className="flex items-center gap-2">
              <div
                className="flex gap-1 text-yellow-500"
                aria-label={`Rating ${item.rating} out of 5`}
              >
                {renderStars(item.rating)}
              </div>
              <span className="ml-2 bg-yellow-500 text-black text-sm font-bold px-2 py-0.5 rounded">
                {clampRating(item.rating).toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded transition ${
              currentPage === i + 1
                ? 'bg-blue-900 text-white'
                : 'text-gray-800 border-gray-400 hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

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

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="mb-6 bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] border-1 border-amber-950 text-black shadow-lg hover:scale-110 transition-transform px-6 py-2 rounded-4xl flex items-center gap-2 group"
        >
          {showForm ? 'Hide Form' : 'Leave a Review'}
          <FaArrowRight
            className={`transition-transform duration-300 group-hover:translate-x-1 ${showForm ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

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
            country={'nl'}
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
          />

          {/* Optional: rating selector (simple + safe) */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {[5, 4.5, 4, 3.5, 3].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

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
