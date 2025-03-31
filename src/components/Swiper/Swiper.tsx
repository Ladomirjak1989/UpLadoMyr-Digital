'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFlip, Pagination, Navigation, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';

interface ISliderConfig {
  id: string;
  imgUrl: string;
  title?: string;
  text?: string;
}

interface SliderProps {
  id: string;
}
// interface Ipagination {
//     [key: string]: boolean
// }

interface ISwiperConfig {
  [key: string]: {
    slides: ISliderConfig[];
    navigation?: boolean;
    // pagination?: boolean | Ipagination;
    modules?: Array<
      typeof EffectFlip | typeof Pagination | typeof Navigation | typeof FreeMode | typeof Thumbs
    >;
    className: string;
    effect?: string;
    grabCursor?: boolean;
    loop?: boolean;
    spaceBetween?: number;
    slidesPerView?: number;
    thumbs?: boolean;
  };
}

// Конфігурація Swiper
const swiperConfig: ISwiperConfig = {
  flip: {
    effect: 'flip',
    grabCursor: true,
    // pagination: { clickable: true },
    navigation: true,
    modules: [EffectFlip, Pagination, Navigation],
    className: 'mySwiper',
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    slides: [
      {
        id: 'Amsterdam-Oost',
        imgUrl:
          'https://stroiteli.dp.ua/wp-content/uploads/2015/10/1345135591_kapitalnyy-remont-kvartiry-2-1-850x500.jpg',
        title: 'Amsterdam-Oost',
        text: 'In Amsterdam–Oost leidde een lokale projectontwikkelaar de transformatie van drie appartementen met ons bekwame beheer, waarbij we toezicht hielden op hun volledige renovatie.',
      },

      {
        id: 'Amsterdam Helmersbuurt',
        imgUrl: 'https://nash-mayster.lviv.ua/images/top/0396.jpg',
        title: 'Amsterdam- Helmersbuurt',
        text: 'In de Helmersbuurt in Amsterdam onderging een indrukwekkende badkamerrenovatie een prachtige toepassing van koud Mortex, wat resulteerde in een boeiende afwerking voor zowel de muren als de vloeren.',
      },
      {
        id: 'Wassenaar',
        imgUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSACCZ8z9atxMuKC-ifbPTFSyzvF54L-4qQS5SB7j_UIF_ZGk7282PRYOUwq5RqunoWbwI&usqp=CAU',
        title: 'Wassenaar',
        text: 'We leverden een bijdrage aan het ontwerp en beheer van een keukenrenovatie op de begane grond in Wassenaar.',
      },
      {
        id: 'Amsterdam-Oostt',
        imgUrl:
          'https://masteron.ge/files/2019/03/30/1553933122-2012-%E1%83%A0%E1%83%94%E1%83%9B%E1%83%9D%E1%83%9C%E1%83%A2%E1%83%98.jpg',
        title: 'Amsterdam-Oost',
        text: 'In Amsterdam–Oost hebben we een renovatieproject georkestreerd door een nieuwe uitbreiding op de 3e verdieping toe te voegen, waardoor een enkel appartement effectief werd omgezet in twee.',
      },
      {
        id: 'Amsterdam-Zuid',
        imgUrl:
          'https://жкприбрежный.рф/800/600/https/bigfoto.name/uploads/posts/2021-12/1639856972_28-bigfoto-name-p-vnutrennyaya-otdelka-kvartiri-rastsenki-80.jpg',
        title: 'Amsterdam-Zuid',
        text: 'We speelden een cruciale rol bij het toezicht op de renovatie voor een projectontwikkelaar, waarbij we naadloos een enkel huis transformeerden in twee appartementen aan de zuidkant van Amsterdam.',
      },
      {
        id: 'Den Haag',
        imgUrl: 'https://remont-otdelka.ru/wp-content/uploads/2024/03/article_49.jpg',
        title: 'Den Haag',
        text: 'We beheerden een uitgebreide renovatie op de tweede verdieping, waarbij we zorgden voor een naadloze uitvoering terwijl we de klassieke stijl behielden.',
      },
    ],
  },

  thumbs: {
    loop: true,
    thumbs: true,
    spaceBetween: 10,
    navigation: true,
    modules: [FreeMode, Navigation, Thumbs],
    className: 'mySwiper2',
    slides: [
      {
        id: '101',
        imgUrl:
          'https://remont-f.ru/upload/iblock/f78/remont-3-komnatnoy-kvartiry-144-kv-m-20-3678.jpg',
      },
    ],
  },
};

export default function Slider({ id }: SliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const { slides, thumbs } = swiperConfig[id];

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Основний слайдер */}
      <div className="w-full">
        <Swiper
          loop={true}
          navigation={true}
          thumbs={thumbs ? { swiper: thumbsSwiper } : undefined}
          modules={[Navigation, Thumbs]}
          className="relative pb-10"
        >
          {slides.map(({ id, imgUrl, title, text }, index) => (
            <SwiperSlide
              key={id}
              className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative w-full h-64 sm:h-80 md:h-96">
                <Image
                  src={imgUrl}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="w-full h-full object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 text-center">
                {title && <h4 className="text-lg font-semibold text-green-900">{title}</h4>}
                {text && <p className="mt-2 text-gray-600">{text}</p>}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Мініатюри (thumbs) */}
      {id === 'thumbs' && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 mt-4"
        >
          {slides.map(({ id, imgUrl }, index) => (
            <SwiperSlide key={id + index} className="cursor-pointer">
              <Image
                src={imgUrl}
                alt={`Slide ${index + 1}`}
                className="w-full h-20 object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
