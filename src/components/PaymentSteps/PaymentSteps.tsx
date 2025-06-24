'use client';

// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import 'aos/dist/aos.css';
// import AOS from 'aos';
// import { FaArrowRight } from "react-icons/fa6";

// const PaymentSteps = () => {
//     useEffect(() => {
//         AOS.init({ duration: 800 });
//     }, []);

//     const steps = [
//         {
//             number: '1',
//             title: 'Step',
//             description: 'Contract signing 20%',
//             height: 'h-[300px]',
//             width: 'w-[340px]'
//         },
//         {
//             number: '2',
//             title: 'Step',
//             description: 'Design approval 30%',
//             height: 'h-[360px]',
//             width: 'w-[340px]'
//         },
//         {
//             number: '3',
//             title: 'Step',
//             description: 'Delivery of final product 50%',
//             height: 'h-[420px]',
//             width: 'w-[340px]'
//         },
//     ];

//     return (
//         <section className="bg-white py-12 px-4 md:px-20">
//             <h2 className="text-4xl text-center font-bold mb-12 text-black" data-aos="fade-up">
//                 Payment Stages
//             </h2>
//             <div className="relative flex flex-col md:flex-row items-end justify-center gap-[3cm]">
//                 {steps.map((step, index) => (
//                     <div key={index} className="relative flex flex-col items-center">
//                         <motion.div
//                             className={`rounded-2xl p-6 text-white relative overflow-hidden shadow-lg flex items-center justify-center flex-col text-center transition-all duration-500 transform hover:scale-105 ${step.height} ${step.width} bg-gradient-to-t from-green-500 to-gray-300`}
//                             data-aos="zoom-in"
//                         >
//                             <div className="flex flex-col items-center mb-20">
//                                 <div className="border-2 border-dotted border-white rounded-full w-14 h-14 flex items-center justify-center text-sm mb-2">
//                                     {step.number}
//                                 </div>
//                                 <div className="text-2xl italic font-semibold">{step.title}</div>
//                             </div>
//                             <div className="text-white text-xl mb-10 font-medium leading-snug">
//                                 {step.description}
//                             </div>
//                         </motion.div>
//                         {index < steps.length - 1 && (
//                             <FaArrowRight className="hidden md:block absolute -right-16 top-1/2 transform -translate-y-1/2 animate-pulse text-gray-700" size={32} />
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default PaymentSteps;

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
    <section className="bg-white py-12 px-4 sm:px-6 md:px-20">
      <h2
        className="text-3xl sm:text-4xl text-center font-bold mb-12 text-black"
        data-aos="fade-up"
      >
        Payment Stages
      </h2>
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-[3cm]">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <motion.div
              className={`rounded-2xl p-6 text-gray-800 relative overflow-hidden shadow-lg flex items-center justify-center flex-col text-center transition-all duration-500 transform hover:scale-105 ${step.height} ${step.width} bg-gradient-to-t from-green-500 to-gray-300`}
              data-aos="zoom-in"
            >
              <div className="flex flex-col items-center mb-10 sm:mb-16">
                <div className="border-2 border-dotted border-gray-600 rounded-full w-14 h-14 flex items-center justify-center text-sm mb-2">
                  {step.number}
                </div>
                <div className="text-xl sm:text-2xl italic font-semibold">{step.title}</div>
              </div>
              <div className="text-yellow-900 font-tangerine text-base sm:text-xl mb-6 sm:mb-10 font-medium leading-snug">
                {step.description}
              </div>
            </motion.div>
            {index < steps.length - 1 && (
              <>
                <FaArrowRight
                  className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 animate-pulse text-gray-700"
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
    </section>
  );
};

export default PaymentSteps;
