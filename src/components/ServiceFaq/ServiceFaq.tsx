'use client';

import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

type ServiceFaqProps = {
  items: FaqItem[];
};

export default function ServiceFaq({ items }: ServiceFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="mt-5 space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={index * 80}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="group flex w-full items-center justify-between gap-3
                         px-3 py-3 sm:px-4 sm:py-3 text-left"
            >
              <span
                className="flex-1 font-semibold text-slate-900 group-hover:text-slate-950
                           text-[0.95rem] sm:text-base leading-snug"
              >
                {item.question}
              </span>

              <span
                className={`flex shrink-0 items-center justify-center
                            h-7 w-7 sm:h-8 sm:w-8
                            rounded-full text-xs sm:text-sm font-bold
                            transition-colors
                            ${
                              isOpen
                                ? 'bg-gradient-to-br from-[#767675] via-[#efc741] to-[#904e0d] text-black'
                                : 'bg-slate-200 text-slate-800 group-hover:bg-slate-300'
                            }`}
                aria-hidden="true"
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {/* Акордеон через grid-rows hack, без framer */}
            <div
              className={`grid overflow-hidden transition-all duration-200 ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden px-3 pb-3 sm:px-4 sm:pb-4 text-sm text-slate-700 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
