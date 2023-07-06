import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { FcNext } from 'react-icons/fc'
import { FcPrevious } from 'react-icons/fc';

type Banner = {
  id: number;
  title: string;
  url: string;
  bannerFile: any;
  createdAt: Date;
  updatedAt: Date;
};

type BannerProps = {
  banners: Banner[];
};

export const MainBanner: React.FC<BannerProps> = ({ banners }) => {
  const [current, setCurrent] = useState(0);
  const length = banners ? banners.length : 0;

  const nextSlide = useCallback(() => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }, [current, length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const selectSlide = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (length > 1) {
      const timer = setTimeout(nextSlide, 8000);
      return () => clearTimeout(timer);
    }
  }, [current, length, nextSlide]);

  if (!Array.isArray(banners) || banners.length <= 0) {
    return null;
  }

  return (
    <div className="select-none">
      <div className="relative bg-orange-200 w-screen overflow-hidden">
        {banners.map((slide, index) => (
          <div
            className={
              'flex items-center justify-center ' +
              (index === current ? 'opacity-100 duration-1000' : 'opacity-0 duration-1000 ease-out')
            }
            key={index}
          >
            {index === current && (
              <Link href={slide.url} target="_blank" rel="noopener noreferrer">
                <img src={slide.bannerFile.url} alt={slide.title + ' image'} className="object-cover w-full h-full min-h-[300px]" />
              </Link>
            )}
          </div>
        ))}
        {length > 1 && (
          <>
            <button
              className="absolute z-10 top-1/2 left-12 p-2 rounded-full bg-slate-50 opacity-50 hover:opacity-80 text-4xl"
              onClick={prevSlide}
            >
              <FcPrevious />
            </button>
            <button
              className="absolute z-10 top-1/2 right-12 p-2 rounded-full bg-slate-50 opacity-50 hover:opacity-80 text-4xl"
              onClick={nextSlide}
            >
              <FcNext />
            </button>
          </>
        )}
      </div>
      <div className="w-full p-2 flex justify-center space-x-4 border-y border-orange-100">
        {banners.map((slide, index) => (
          <button
            key={index}
            onClick={() => selectSlide(index)}
            className={
              (index === current ? 'text-pink-500 font-bold border-b-pink-500 border-b-2' : 'text-black border-b-2')
            }
          >
            {slide.title}
          </button>
        ))}
      </div>
    </div>
  );
};
