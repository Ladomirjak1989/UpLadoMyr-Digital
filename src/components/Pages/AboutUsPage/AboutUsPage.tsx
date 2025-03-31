'use client';

import React, { ReactNode } from 'react';
import {
  FaTools,
  FaLightbulb,
  FaEuroSign,
  FaAward,
  FaMoneyCheck,
  FaCogs,
  FaUsers,
  FaBroom,
} from 'react-icons/fa';

// Тип для елементів переваг
type Benefit = {
  icon: ReactNode;
  text: string;
};

const benefits: Benefit[] = [
  {
    icon: <FaTools className="text-[#ebba2a] text-2xl mb-4" />,
    text: 'Betrouwbaar renovatieteam met ruime werkervaring.',
  },
  {
    icon: <FaLightbulb className="text-[#ebba2a] text-2xl mb-4" />,
    text: 'We houden rekening met de wensen van de klant – een individuele aanpak voor iedereen.',
  },
  {
    icon: <FaEuroSign className="text-[#ebba2a] text-2xl mb-4" />,
    text: 'Voordelig samenwerken: wij bieden bouwmaterialen tegen groothandelsprijzen.',
  },
  {
    icon: <FaAward className="text-[#ebba2a] text-2xl mb-4" />,
    text: 'Meer dan 7 jaar ervaring in renovatiewerkzaamheden.',
  },
  {
    icon: <FaMoneyCheck className="text-[#ebba2a] text-2xl mb-4" />,
    text: 'Betaling vindt plaats na voltooiing en controle van de renovatiefase.',
  },
  {
    icon: <FaCogs className="text-[#ebba2a] text-2xl mb-4" />,
    text: 'Wij passen moderne Europese technologieën toe.',
  },
  {
    icon: <FaUsers className="text-[#ebba2a] text-2xl mb-4" />,
    text: 'Ons team is groot, waardoor we meerdere projecten tegelijk kunnen uitvoeren.',
  },
  {
    icon: <FaBroom className="text-[#ebba2a] text-2xl mb-4" />,
    text: 'Wij ruimen al het afval op na de renovatie- en afwerkingswerken.',
  },
];

const AboutUsPage = () => {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-20 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
        Voordelen van ons bouwteam
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl border-t-4 border-green-900 shadow-sm transition duration-300 hover:shadow-md hover:scale-[1.02] hover:bg-gray-50 animate__animated animate__fadeInUp"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex flex-col items-center">
              {item.icon}
              <div className="h-1 w-12 bg-green-900 mb-4" />
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUsPage;
