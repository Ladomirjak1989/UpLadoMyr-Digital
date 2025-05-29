'use client';

import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | UpLadoMyr Digital',
  description: 'Read our privacy practices and how we handle your data.',
};

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At <strong>UpLadoMyr Digital</strong>, your privacy is important to us. This policy outlines
        how we collect, use, and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address, and IP address when
        you use our website or contact us.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Information</h2>
      <p className="mb-4">
        Your information is used to improve user experience, respond to inquiries, and provide
        updates. We never sell your data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Cookies</h2>
      <p className="mb-4">
        We use cookies to analyze traffic and personalize content. You can disable cookies in your
        browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We take reasonable steps to secure your data, but no internet transmission is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Contact</h2>
      <p className="mb-4">
        If you have questions about this policy, contact us at{' '}
        <a href="mailto:info@upladomyr.com" className="text-blue-600 underline">
          info@upladomyr.com
        </a>
        .
      </p>

      <p className="text-sm text-gray-500 mt-10">Last updated: May 29, 2025</p>
    </div>
  );
};

export default PrivacyPage;
