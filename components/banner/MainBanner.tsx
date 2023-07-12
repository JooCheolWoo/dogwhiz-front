import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
      <div className="relative w-screen overflow-hidden shadow">
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
                <img
                  src={slide.bannerFile.url}
                  alt={slide.title + ' image'}
                  className="object-cover w-full h-full min-h-[350px]"
                />
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
              <span style={{ color: '#FF9494' }}>
                <FaArrowLeft />
              </span>
            </button>
            <button
              className="absolute z-10 top-1/2 right-12 p-2 rounded-full bg-slate-50 opacity-50 hover:opacity-80 text-4xl"
              onClick={nextSlide}
            >
              <span style={{ color: '#FF9494' }}>
                <FaArrowRight />
              </span>
            </button>
          </>
        )}
      </div>
      <div className="w-full py-2 flex justify-center space-x-6">
        {banners.map((slide, index) => (
          <button
            key={index}
            onClick={() => selectSlide(index)}
            className={
              index === current
                ? 'text-[#FF9494] font-bold border-b-[#FF9494] border-b-2'
                : 'text-gray-500 font-bold border-b-2'
            }
          >
            {slide.title}
          </button>
        ))}
      </div>
    </div>
  );
};
