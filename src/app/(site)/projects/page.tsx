import ProjectBanner from '@/components/Banner/ProjectBanner';
import ProjectsPage from '@/components/Pages/ProjectsPage/ProjectsPage';
// import React from 'react';
// ProjectsPage всередині вже "use client" і ходить у /api/projects

const page = () => {
  return (
    <div>
      <ProjectBanner />
      <ProjectsPage />
    </div>
  );
};

export default page;
