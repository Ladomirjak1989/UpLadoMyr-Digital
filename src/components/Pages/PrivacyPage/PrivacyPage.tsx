'use client';

import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Privacy Policy | UpLadoMyr Digital',
  description: 'Read our privacy practices and how we handle your data.',
};

const PrivacyPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/img/privacy/privacybg1.avif"
        alt="Privacy background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Content Overlay */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl mt-12 font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At <strong className="font-semibold text-yellow-700">UpLadoMyr Digital</strong>, we value
          the privacy of our users' personal information. By using our services, you agree to the
          terms of this privacy policy.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Consent to Data Processing</h2>
        <p className="mb-4">
          By providing your personal data through registration or other forms on our website, you
          voluntarily consent to its processing in accordance with this Privacy Policy and
          applicable legislation. Your consent is voluntary, informed, and conscious.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">What Data We Collect</h2>
        <p className="mb-4">
          We only collect the personal data necessary to provide our services or fulfill contractual
          obligations:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>- Name</li>
          <li>- Phone number</li>
          <li>- Email address</li>
          <li>- Website activity (via cookies and Google Analytics)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          Purpose of Data Collection and Processing
        </h2>
        <p className="mb-4">We use personal data solely for the following purposes:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Sending newsletters, special offers, and training updates</li>
          <li>Website administration and improvement</li>
          <li>Statistical analysis to enhance services and products</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">Data Sharing</h2>
        <p className="mb-4">Your data will not be shared with third parties except:</p>
        <ul className="list-disc list-inside mb-4">
          <li>To service providers (e.g., hosting, payment systems)</li>
          <li>When legally required by authorities</li>
          <li>To protect the rights and safety of our company or users</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">International Data Transfers</h2>
        <p className="mb-4">
          Data may be transferred outside Netherlands, such as to servers of services like
          getresponse.com. We comply with GDPR and ensure proper safeguards.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Cookies and Analytics</h2>
        <p className="mb-4">
          We use cookies to enhance site performance. Analytics may be shared with services like
          Google Analytics. You can disable cookies in your browser, though this may affect
          functionality.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Data Retention</h2>
        <p className="mb-4">
          We retain your personal data only as long as necessary to provide our services or until
          consent is withdrawn.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
        <ul className="list-disc list-inside mb-4">
          <li>- Access your data</li>
          <li>- Correct inaccurate data</li>
          <li>- Request deletion (right to be forgotten)</li>
          <li>- Restrict processing</li>
          <li>- Data portability</li>
          <li>- Object to processing</li>
          <li>- Withdraw consent at any time</li>
        </ul>
        <p className="mb-4">
          To exercise your rights, contact us at:{' '}
          <a href="mailto:info@upladomyr.com" className="text-blue-600 underline">
            info@upladomyr.com
          </a>
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Data Protection</h2>
        <p className="mb-4">
          We implement administrative, technical, and organizational measures to ensure your data is
          secure. However, no internet system is 100% secure. We recommend users also be cautious
          online.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Policy Updates</h2>
        <p className="mb-4">
          We reserve the right to modify this policy. Updates will be posted here and communicated
          via email or on our website.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Contact Information</h2>
        <p className="mb-4">
          For questions or suggestions, please contact us at:{' '}
          <a href="mailto:info@upladomyr.com" className="text-blue-600 underline">
            info@upladomyr.com
          </a>
        </p>

        <p className="text-sm text-gray-500 mt-10">Last updated: July 15, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPage;
