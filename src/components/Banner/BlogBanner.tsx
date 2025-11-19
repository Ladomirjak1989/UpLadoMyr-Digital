'use client';

import Image from 'next/image';

const BlogBanner = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-b-[40px]">
      {/* Фон: можна підмінити файл на свій темний патерн */}
      <Image
        src="/img/bannerblog/blog-banner.jpg"
        alt="Exclusive Website Tips"
        fill
        className="object-cover w-full h-full"
        priority
      />

      {/* Контент у центрі */}
      <div className="relative mx-auto flex h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] max-w-6xl items-center px-4 sm:px-8">
        <div className="w-full text-center">
          <h1 className="text-white font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Exclusive Website Tips
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-100 max-w-3xl mx-auto">
            Stay ahead of the curve &amp; get weekly updates on the latest industry trends, tips
            &amp; news.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogBanner;
