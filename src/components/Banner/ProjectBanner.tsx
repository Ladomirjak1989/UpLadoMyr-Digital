import Image from 'next/image';

const ProjectBanner = () => {
  return (
    <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-b-[40px]">
      <Image
        src="/img/bannerproject/project-banner-img.jpg"
        alt="Projects Banner"
        fill
        className="object-cover w-full h-full"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex items-end justify-end p-1 sm:p-12">
        <div className="text-center px-4 mb-32 max-w-xl">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-2">
            Explore Our Portfolio
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg font-light italic">
            Modern. Creative. Technically refined. Discover how we turn ideas into visually stunning
            and effective solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectBanner;
