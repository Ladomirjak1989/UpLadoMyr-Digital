'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { FaArrowRight, FaArrowDown } from 'react-icons/fa';

const PaymentSteps = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Step',
      description: 'Contract signing 20%',
      height: 'h-[280px] md:h-[300px]',
      width: 'w-full md:w-[280px]',
    },
    {
      number: '2',
      title: 'Step',
      description: 'Design approval 30%',
      height: 'h-[320px] md:h-[360px]',
      width: 'w-full md:w-[280px]',
    },
    {
      number: '3',
      title: 'Step',
      description: 'Delivery of final product 50%',
      height: 'h-[360px] md:h-[420px]',
      width: 'w-full md:w-[280px]',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Top wave */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path fill="#000000" d="M0,100 C360,0 1080,200 1440,0 L1440,100 L0,100 Z"></path>
      </svg>

      <section className="bg-gradient-to-t from-white to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-black mt-10 sm:mt-16 md:mt-20 mb-8 sm:mb-12"
            data-aos="fade-up"
          >
            Payment Stages
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              >
                <motion.div
                  className="rounded-2xl px-6 py-8 sm:px-8 sm:py-10 text-gray-800 relative overflow-hidden shadow-xl flex flex-col items-center justify-center text-center transition-all duration-500 transform hover:scale-105 w-full bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa]"
                  data-aos="zoom-in"
                >
                  {/* Step Header */}
                  <div className="flex flex-col items-center mb-8 sm:mb-12">
                    <div className="border-2 border-dotted border-gray-600 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-sm sm:text-base mb-2">
                      {step.number}
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl italic font-semibold">
                      {step.title}
                    </div>
                  </div>

                  {/* Step Description */}
                  <div className="font-tangerine text-2xl sm:text-lg text-yellow-800 sm:text-yellow-600 mb-4 sm:mb-8 font-medium leading-snug">
                    {step.description}
                  </div>
                </motion.div>

                {/* Arrows (Right on desktop, Down on mobile) */}
                {index < steps.length - 1 && (
                  <>
                    <FaArrowRight
                      className="hidden md:block absolute -right-8 md:-right-14 top-1/2 transform -translate-y-1/2 animate-pulse text-gray-700"
                      size={28}
                    />
                    <FaArrowDown
                      className="block md:hidden mt-4 animate-pulse text-gray-700"
                      size={20}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path fill="#000000" d="M0,100 C360,0 1080,200 1440,0 L1440,100 L0,100 Z"></path>
      </svg>
    </div>
  );
};

export default PaymentSteps;
