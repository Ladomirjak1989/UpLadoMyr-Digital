'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectDetailsProps {
  title: string;
  imageUrl: string;
  description: string;
  features: string[];
  website: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  title,
  imageUrl,
  description,
  features,
  website,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8">
      {/* Left Side: Project Image */}
      <div className="relative h-[400px] w-full shadow-xl rounded-lg overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* Right Side: Text Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">Project Details</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features:</h3>
        <ul className="flex flex-wrap gap-2 mb-6">
          {features.map((feature, index) => (
            <li
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium border border-gray-300"
            >
              {feature}
            </li>
          ))}
        </ul>

        <p className="text-lg">
          <span className="font-bold text-gray-800">Website: </span>
          <Link href={website} target="_blank" className="text-blue-600 underline">
            {website}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProjectDetails;
