// components/ServiceBanner.tsx
import Image from 'next/image';

const ServiceBanner = () => {
  return (
    <section className="mb-5  relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-b-[40px]">
      <Image
        src="/img/bannerservice/servicebanner.jpg"
        alt="Services Banner"
        fill
        className="object-cover w-full h-full"
        priority
      />

      <div className="absolute inset-0 bg-black/40 flex mt-20 p-1 sm:p-12">
        <div className="text-center px-4 mb-32 max-w-xl">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-2">
            Web Development Services
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg font-light italic">
            Fast, modern and mobile-friendly websites tailored for ZZP professionals and small
            businesses — built to look great and convert.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;
