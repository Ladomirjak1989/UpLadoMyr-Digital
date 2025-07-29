import AboutBanner from '../../../components/Banner/AboutBanner';
import Header from '../../../components/Header/Header';
import AboutUsPage from '../../../components/Pages/AboutUsPage/AboutUsPage';
import React from 'react';

const page = () => {
  return (
    <div>
      {/* <Header /> */}
      <AboutBanner />
      <AboutUsPage />
    </div>
  );
};

export default page;
