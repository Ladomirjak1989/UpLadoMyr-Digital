'use client';
import React from 'react';
import {
  FaLightbulb,
  FaClipboardList,
  FaComments,
  FaUserCog,
  FaClipboardCheck,
  FaLaptopCode
} from 'react-icons/fa';
import { FaCogs, FaCode, FaPalette, FaNetworkWired, FaBug, FaWrench } from 'react-icons/fa';


import 'animate.css';
import useWow from '@/components/hooks/useWow';


interface Services {
  title: string;
  icon: string;
  subtitle: string;
  description: string;
  footer: string;

}

type MethodStep = {
  icon: React.ReactNode;
  title: string;
  color: string;

};

interface TechBlock {
  title: string;
  tech: string;
}


const services = [
  {
    icon: <FaPalette className="text-orange-500 text-3xl" />,
    title: 'Experience Design',
    subtitle: 'Designing Intuitive, Engaging User Experiences',
    description:
      'Crafting seamless, intuitive user journeys with ADA-compliant designs for faster task completion and higher engagement.',
    footer: 'ADA/WCAG Compliant | Mobile-responsive | Optimized for user engagement',
  },
  {
    icon: <FaNetworkWired className="text-pink-500 text-3xl" />,
    title: 'Architecture & Scalability',
    subtitle: 'Building Robust, Scalable System Architectures',
    description:
      'Developing scalable, cloud-native architectures with microservices and APIs for future-proof, high-performance digital solutions.',
    footer: 'Flexible & scalable infrastructure | Optimized for performance and security',
  },
  {
    icon: <FaCode className="text-blue-500 text-3xl" />,
    title: 'Full Stack Development',
    subtitle: 'Turning Ideas into High-Impact Digital Solutions',
    description:
      'Full-stack development using both front-end and back-end technologies for responsive, secure, and scalable applications.',
    footer: 'High-performing, cross-platform apps | Continuous delivery',
  },
  {
    icon: <FaCogs className="text-purple-500 text-3xl" />,
    title: 'API Integration & Automation',
    subtitle: 'Streamlining Systems for Seamless Operations',
    description:
      'Connect APIs for real-time data sync and optimized workflows across platforms for efficient data flow.',
    footer: 'Real-time data synchronization | Increased workflow efficiency | Seamless integration with existing systems',
  },
  {
    icon: <FaBug className="text-red-500 text-3xl" />,
    title: 'QA & Performance Testing',
    subtitle: 'Ensuring High-Quality, Reliable Applications',
    description:
      'Rigorous automated and manual testing to ensure flawless performance, security, and cross-browser compatibility every time.',
    footer: 'Error-free experience | Mobile and cross-browser optimization | Enhanced security and load performance',
  },
  {
    icon: <FaWrench className="text-green-500 text-3xl" />,
    title: 'Maintenance & Support',
    subtitle: 'Ensuring Ongoing Performance and Security',
    description:
      'Support from 9:00–18:00 CET, including bug fixes and performance optimization for long-term reliability.',
    footer: 'Proactive system health checks | Fast response times | Minimized downtime',
  },
];

const steps: MethodStep[] = [

  {
    title: 'Project Initiation',
    icon: <FaLightbulb className="text-4xl text-indigo-600" />,
    color: 'text-indigo-400',
  },
  {
    title: 'Project Planning',
    icon: <FaClipboardList className="text-4xl text-yellow-500" />,
    color: 'text-yellow-500',
  },
  {
    title: 'Project Communication',
    icon: <FaComments className="text-4xl text-cyan-500" />,
    color: 'text-cyan-500',
  },
  {
    title: 'Project Development',
    icon: <FaLaptopCode className="text-4xl text-pink-600" />,
    color: 'text-pink-600',
  },
  {
    title: 'Monitoring & Control',
    icon: <FaUserCog className="text-4xl text-teal-600" />,
    color: 'text-teal-600',
  },
  {
    title: 'Implementation Review',
    icon: <FaClipboardCheck className="text-4xl text-rose-500" />,
    color: 'text-rose-500',
  },
];

const blocks: TechBlock[] = [
  {
    title: 'LANGUAGE/FRAMEWORKS',
    tech: 'JavaScript, TypeScript, MERN, Express Js, Node Js',
  },
  {
    title: 'FRONTEND',
    tech: 'HTML, CSS, Tailwind CSS, Bootstrap, React Js, Redux-toolkit, Next Js',
  },
  {
    title: 'DATABASES',
    tech: 'MongoDB, MySQL, PostgreSQL',
  },
  {
    title: 'VERSION CONTROL',
    tech: 'GitLab, GitHub',
  },
];

const HomePage: React.FC = () => {
  useWow();

  return (
    <>


      <div className="bg-white py-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="wow animate__animated animate__fadeInDown text-4xl md:text-5xl font-bold text-center text-deep mb-2">
            All-in-One Web Development for Entrepreneurs
          </h2>
          <p className="wow animate__animated animate__fadeInDown text-center text-xl text-yellow-600 italic mb-12">
            Design <span className="text-blue-700">|</span> Develop <span className="text-blue-700">|</span> Deliver
          </p>

          <div className="wow animate__animated animate__fadeInDown grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="hover:shadow-xl transition-all duration-300 group hover:scale-[1.02] border border-gray-200 rounded-xl shadow-sm p-6 bg-white"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 underline underline-offset-2">
                    {service.title}
                  </h3>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 leading-snug">
                  {service.subtitle}
                </h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="text-xs bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] p-2 rounded-md">
                  {service.footer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      <div className="relative w-full py-20 overflow-hidden">
        {/* Wave Top */}
        <svg
          className="absolute top-0 left-0 w-full text-brand-light"
          viewBox="0 0 1440 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,100 C360,0 1080,0 1440,100 L1440,0 L0,0 Z" />
        </svg>

        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-deep mb-6 wow animate__animated animate__fadeInDown">
            Web Development Methodology
          </h2>
          <p className="text-center text-lg text-yellow-600 italic mb-12 max-w-3xl mx-auto wow animate__animated animate__fadeIn">
            We focus on transparent processes and a structured approach used to plan, design, and manage the process of creating a web application.
          </p>

          <div className="flex flex-wrap justify-center gap-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Hexagon */}
                <div
                  className={`hexagon w-64 h-72 border-[6px] ${step.color}
            flex items-center justify-center
            p-2 bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] shadow-lg hover:shadow-2xl transition-all duration-300
            group wow animate__animated animate__zoomIn animate__delay-${index}s`}
                  style={{
                    clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)',
                  }}
                >
                  <div
                    className="w-[90%] h-[90%] bg-white flex flex-col justify-center items-center text-center px-4 py-6 shadow-lg"
                    style={{
                      clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)',
                    }}
                  >
                    <div className="text-4xl transition-transform duration-300 transform group-hover:scale-110">
                      {step.icon}
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-700">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Стрілка */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:block">
                    <svg
                      className={`wow animate__animated animate__zoomIn animate__delay-${index}s 
                  absolute left-[calc(100%+12px)] top-1/2 transform -translate-y-1/2 text-deep w-6 h-6`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Wave Bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full text-brand-light"
          viewBox="0 0 1440 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" />
        </svg>
      </div>




      {/* Technical Expertise */}
      <div className="relative w-full bg-white py-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-deep mb-6 wow animate__animated animate__fadeInDown">
            Technical Expertise
          </h2>
          <p className="text-lg text-yellow-600 italic max-w-4xl mx-auto mb-12 wow animate__animated animate__fadeIn">
            We help businesses grow by delivering fast, modern, and cost-effective web applications using the latest technologies.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {blocks.map((block, i) => (
              <div
                key={i}
                className={`
        wow animate__animated animate__fadeInUp animate__delay-${i}s
        relative bg-gradient-to-br from-[#f7f4ea] via-[#e5dfd0] to-[#d4bfaa] p-6 rounded-lg shadow-md transition-all duration-300
        hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:drop-shadow-xl hover:-translate-y-1 group
      `}
              >
                {/* Градієнтний бордер зліва */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-l-lg"></div>

                {/* Контент */}
                <div className="relative z-10">
                  <h3 className="font-bold text-deep mb-2 underline group-hover:text-accent transition duration-300">
                    {block.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed transition duration-300 group-hover:text-gray-900">
                    {block.tech}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>


  );
};

export default HomePage;




{/* Проекти */ }
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

{/* Слайдер */ }
{/* <div className="lg:w-1/2 w-full">
            <Slider id="flip" />
          </div>
        </div> */}