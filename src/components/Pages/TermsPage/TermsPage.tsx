// 'use client';

// import React from 'react';

// const TermsPage: React.FC = () => {
//   return (
//     <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
//       <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>

//       <p className="mb-4">
//         Welcome to <strong>UpLadoMyr Digital</strong>. These terms and conditions outline the rules
//         and regulations for the use of our website. By accessing this website, you accept these
//         terms in full. Do not continue to use the site if you do not accept all of the terms stated
//         on this page.
//       </p>

//       <h2 className="text-xl font-semibold mt-6 mb-2">1. Intellectual Property Rights</h2>
//       <p className="mb-4">
//         All content published and made available on our site is the property of UpLadoMyr Digital.
//         This includes, but is not limited to, images, text, logos, documents, downloadable files,
//         and anything that contributes to the composition of our site.
//       </p>

//       <h2 className="text-xl font-semibold mt-6 mb-2">2. Acceptable Use</h2>
//       <p className="mb-4">
//         You agree to use our website in a legal, respectful, and non-malicious manner. You may not
//         misuse the site in any way that could damage the platform or our reputation.
//       </p>

//       <h2 className="text-xl font-semibold mt-6 mb-2">3. User Accounts</h2>
//       <p className="mb-4">When you create an account on our site, you agree to the following:</p>
//       <ul className="list-disc list-inside mb-4 space-y-1">
//         <li>You are solely responsible for your account credentials.</li>
//         <li>You will not share your credentials with others.</li>
//         <li>You will not use the site for any illegal or unauthorized purpose.</li>
//       </ul>

//       <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
//       <p className="mb-4">
//         UpLadoMyr Digital is not liable for any damages that may occur to you as a result of your
//         use of our website.
//       </p>

//       <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes</h2>
//       <p className="mb-4">
//         We reserve the right to change these terms at any time. It is your responsibility to review
//         them periodically.
//       </p>

//       <p className="mt-8 text-sm text-gray-600">
//         If you have any questions, contact us at{' '}
//         <a href="mailto:info@upladomyr.com" className="underline text-blue-600">
//           info@upladomyr.com
//         </a>
//         .
//       </p>
//     </section>
//   );
// };

// export default TermsPage;

'use client';

import React from 'react';
import Image from 'next/image';

const TermsPage: React.FC = () => {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background image позаду всього */}
      <Image
        src="/img/privacy/privacybg1.jpg"
        alt="Soft abstract background"
        fill
        priority
        className="absolute inset-0 -z-20 object-cover"
      />
      {/* Мутний світлий оверлей для контрасту тексту */}
      <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-sm" />

      {/* Контент поверх */}
      <section className="relative z-20 max-w-4xl mx-auto px-4 py-28 text-slate-900">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <p className="mb-4">
          Welcome to <strong className="text-yellow-700">UpLadoMyr Digital</strong>. These terms and
          conditions outline the rules and regulations for the use of our website. By accessing this
          website, you accept these terms in full. Do not continue to use the site if you do not
          accept all of the terms stated on this page.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Intellectual Property Rights</h2>
        <p className="mb-4">
          All content published and made available on our site is the property of{' '}
          <strong className="text-yellow-700">UpLadoMyr Digital</strong>. This includes, but is not
          limited to, images, text, logos, documents, downloadable files, and anything that
          contributes to the composition of our site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Acceptable Use</h2>
        <p className="mb-4">
          You agree to use our website in a legal, respectful, and non-malicious manner. You may not
          misuse the site in any way that could damage the platform or our reputation.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. User Accounts</h2>
        <p className="mb-2">When you create an account on our site, you agree to the following:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>You are solely responsible for your account credentials.</li>
          <li>You will not share your credentials with others.</li>
          <li>You will not use the site for any illegal or unauthorized purpose.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
        <p className="mb-4">
          UpLadoMyr Digital is not liable for any damages that may occur to you as a result of your
          use of our website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes</h2>
        <p className="mb-4">
          We reserve the right to change these terms at any time. It is your responsibility to
          review them periodically.
        </p>

        <p className="mt-8 text-sm text-gray-700">
          If you have any questions, contact us at{' '}
          <a href="mailto:info@upladomyr.com" className="underline text-blue-700">
            info@upladomyr.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
