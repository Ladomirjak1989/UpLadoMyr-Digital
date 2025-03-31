'use client';
import React, { useState } from 'react';
import { FaDraftingCompass, FaTools, FaBath, FaTimes, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { FaUsers, FaKey, FaShieldAlt, FaMoneyBillWave, FaGift, FaWallet } from 'react-icons/fa';
import { FaEye, FaThumbsUp, FaMapMarkerAlt } from 'react-icons/fa';

const reasons = [
  {
    icon: <FaUsers className="text-[#FFCD00] text-2xl" />,
    title: 'Eigen renovatieteams',
    description: 'Wij schakelen geen externe aannemers in',
  },
  {
    icon: <FaKey className="text-[#FFCD00] text-2xl" />,
    title: 'Sleutel-op-de-deur',
    description: 'Van ontwerp tot volledige realisatie',
  },
  {
    icon: <FaShieldAlt className="text-[#FFCD00] text-2xl" />,
    title: 'Kwaliteitsgarantie',
    description: 'Wij bieden 36 maanden garantie op renovatie',
  },
  {
    icon: <FaMoneyBillWave className="text-[#FFCD00] text-2xl" />,
    title: 'Betaalbare prijzen',
    description: 'Onze prijzen zijn gemiddeld voor de markt',
  },
  {
    icon: <FaGift className="text-[#FFCD00] text-2xl" />,
    title: 'Leuke extra’s',
    description: 'Gratis ontwerp bij volledige renovatie-opdracht',
  },
  {
    icon: <FaWallet className="text-[#FFCD00] text-2xl" />,
    title: 'Gespreide betaling',
    description: 'Flexibel betalingssysteem',
  },
];

const services = [
  {
    icon: <FaDraftingCompass size={40} />,
    title: 'BOUWTEKENINGEN',
    description:
      'Het opstellen van gedetailleerde bouwplannen met bekwame architecten en management. Of ze nu aan uw aannemer worden overhandigd of door ons worden beheerd, wij behandelen cruciale details voor optimale oplossingen.',
  },
  {
    icon: <FaTools size={40} />,
    title: 'BOUWVERGUNNINGEN',
    description:
      'Denkt u aan een uitbreiding van uw huis? Wij leveren uitgebreide plannen aan de gemeente en beheren het proces totdat uw aannemer met de nieuwe vergunning kan bouwen. Ons team staat klaar om uw visie tot leven te brengen.',
  },
  {
    icon: <FaBath size={40} />,
    title: 'TOTALE RENOVATIE',
    description:
      'Kies voor onze complete renovatiediensten. Als projectmanagers voor ons bouwteam handelen wij on-site communicatie, kwaliteitscontroles en prijsafstemming af, waardoor de noodzaak voor een afzonderlijke aannemer vervalt. Waarom ergens anders inhuren als wij het afgedekt hebben?',
  },
];

const projects = [
  {
    title: 'Dibrova Park Appartement',
    location: 'Kyiv, Viktor Nekrasova Str. 10a',
    size: '79,45 m²',
    likes: 21,
    views: 2245,
    image: '/img/homeprojects/img1.webp',
  },

  {
    title: 'Modern Kitchen Design',
    location: 'Amsterdam, Westzijde 48',
    size: '65 m²',
    likes: 14,
    views: 1580,
    image: '/img/homeprojects/img2.png',
  },
  {
    title: 'Bedroom Renovatie Luxe',
    location: 'Rotterdam, Blaak 23',
    size: '45 m²',
    likes: 32,
    views: 1990,
    image: '/img/homeprojects/img3.jpg',
  },
  {
    title: 'Minimalistische Flat',
    location: 'Den Haag, Lange Vijverberg 7',
    size: '58 m²',
    likes: 18,
    views: 1704,
    image: '/img/homeprojects/img4.jpg',
  },
  {
    title: 'Scandinavisch Slaapkamer',
    location: 'Utrecht, Oudegracht 22',
    size: '48 m²',
    likes: 26,
    views: 2100,
    image: '/img/homeprojects/img5.webp',
  },
  {
    title: 'Luxe Interieur Renovatie',
    location: 'Eindhoven, Strijp S',
    size: '72 m²',
    likes: 17,
    views: 1988,
    image: '/img/homeprojects/img6.jpg',
  },
];

const accordionItems = [
  {
    title: 'Moeiteloos Projectbeheer',
    description:
      'Wij vereenvoudigen uw leven met uitgebreide diensten en bieden een alles-in-één oplossing voor al uw behoeften.',
    icon: '📑',
  },
  {
    title: 'Eenvoudige Klantbetrokkenheid',
    description:
      'Wij beheren communicatie efficiënt en houden klanten op de hoogte van eventuele veranderingen of complicaties gedurende het proces.',
    icon: '👍',
  },
  {
    title: 'Eerlijke Prijzen en Kwaliteitsborging',
    description:
      ' Onze toewijding ligt in transparante en eerlijke prijsstelling, zodat klanten waarde krijgen door duidelijk inzicht in de kosten.',
    icon: '📊',
  },
  {
    title: 'Wereldwijde Toegankelijkheid en Gemak',
    description:
      'Als internationaal bedrijf zijn we gespecialiseerd in het assisteren van expats bij hun renovaties, waarbij we duidelijkheid bieden over kosten en regelgeving, zelfs wanneer ze in het buitenland zijn.',
    icon: '🌍',
  },
];

const HomePage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section className="py-16 bg-white-50 px-4 md:px-12 lg:px-16">
        <div
          id="interier"
          className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-x-4"
        >
          <hr className="w-16 border-t-2 border-green-950" />
          <span className="text-sm font-light tracking-wide text-green-900">ONZE</span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-950">Projectbeheer</h2>
        </div>
        <p className="mt-4 text-lg text-gray-900 text-center md:text-left">
          Wij regelen alles van begin tot eind
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gray-100 hover:bg-gray-200 transition duration-300 shadow-lg rounded-2xl p-6 text-center border border-[#D4BFAA] hover:border-[#FFCD00]"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-950 text-[#FFCD00] text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-green-900 group-hover:text-[#FFCD00] transition">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-700 leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white-50  dark:bg-[#14532d] text-gray-900 dark:text-white py-16 px-6 lg:px-24 transition-colors duration-500">
          <h2 className="text-3xl md:text-4xl text-green-950 font-bold text-center mb-12">
            Waarom kiezen voor ons?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="group flex items-start space-x-4 p-4 border border-transparent 
          hover:border-[#FFCD00] transition duration-300 rounded-lg 
          bg-gray-100 dark:bg-[#166534] hover:bg-gray-200 dark:hover:bg-[#1e4d2b] shadow-md"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full 
            bg-[#022c0b] text-[#14532d] shadow-sm"
                >
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-[#FFCD00] transition">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/80 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Проекти */}
        {/* <div
          id="projects"
          className="p-6 md:p-14 lg:px-16 flex flex-col lg:flex-row items-center lg:items-start gap-12 mt-10"
        >
          <div className="lg:w-1/2 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-x-4">
              <hr className="w-16 border-t-2 border-green-950" />
              <span className="text-sm font-light tracking-wide text-green-900">
                ONZE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-green-950">
                PROJECTEN
              </h2>
            </div>
            <p className="text-gray-900 mt-4 leading-relaxed">
              Met een passie voor tijdloos design en een praktische benadering
              van projectmanagement...
            </p>
            <p className="text-gray-900 mt-4 leading-relaxed">
              Bij Alexander Zhuhan bieden we meer dan alleen mooie interieurs.
              We creëren ruimtes waar je van zult houden en die je jarenlang
              zult koesteren, terwijl we zorgen voor een zo soepel en
              kwalitatief hoogstaand mogelijk proces van begin tot eind. Klaar
              om jouw ruimte te transformeren? Laten we jouw visie tot leven
              brengen.
            </p>
          </div> */}

        {/* Слайдер */}
        {/* <div className="lg:w-1/2 w-full">
            <Slider id="flip" />
          </div>
        </div> */}

        <div className="px-6 py-16 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-lg shadow-md">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-yellow-400" /> {project.location}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-medium">{project.size}</span>
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <FaThumbsUp className="text-yellow-400" /> {project.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye className="text-yellow-400" /> {project.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Акордеон Diensten */}
        <div className="mt-16 flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-x-4">
              <hr className="w-16 border-t-2 border-green-950" />
              <span className="text-sm font-light tracking-wide text-green-900">ONZE</span>
              <h2 className="text-3xl md:text-4xl font-bold text-green-950">DIENSTEN</h2>
            </div>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Transformeer uw huis met onze deskundige renovatieoplossingen...
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            {accordionItems.map((item, index) => (
              <div key={index} className="border-b border-gray-300 py-4">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-900 text-white text-lg">
                      {item.icon}
                    </div>
                    <span className="text-lg font-semibold text-green-900">{item.title}</span>
                  </div>
                  {openIndex === index ? (
                    <FaTimes className="text-green-900" />
                  ) : (
                    <FaPlus className="text-green-900" />
                  )}
                </button>
                {openIndex === index && <p className="mt-2 text-gray-600">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секція з текстом зліва та фото справа */}
      <div className="bg-white mb-12 px-4">
        <div className=" bg-gray-100 flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto mt-10 rounded-lg shadow-lg overflow-hidden">
          {/* Ліва частина — текст */}
          <div className="w-full lg:w-1/2 p-6 lg:p-12 text-gray-800">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Samen bouwen aan uw droomruimte.
            </h2>
            <p className="text-lg leading-relaxed space-y-2">
              Wij geloven dat elk project uniek is en persoonlijke aandacht verdient. Van de eerste
              schets tot de laatste afwerking begeleiden wij u met zorg. Kwaliteit, communicatie en
              transparantie staan bij ons centraal. Dankzij jarenlange ervaring garanderen we een
              vlotte uitvoering. Uw wensen vormen de basis voor elk ontwerp en elke renovatie. We
              zorgen voor slimme oplossingen, binnen planning en budget. Kies voor rust,
              duidelijkheid en een resultaat waar u trots op bent.
            </p>
          </div>

          {/* Права частина — зображення */}
          <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] relative">
            <Image
              src="/img/img4.jpg"
              alt="Renovation Call-to-Action"
              layout="fill"
              objectFit="cover"
              className="brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
              <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
                NEEM CONTACT MET ONS OP VOOR UW RENOVATIE.
              </h2>
              <p className="text-white text-lg mt-4 max-w-2xl drop-shadow-md">
                Ontwerp uw ruimte en ontvang binnen enkele minuten een schatting.
              </p>

              <motion.div
                className="mt-6"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              >
                <FaArrowDown className="text-white text-3xl" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
