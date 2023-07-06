import { MainBanner } from '@/components/banner/MainBanner';
import { AxiosTryCatch } from '@/modules/api/AxiosTryCatch';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    AxiosTryCatch(
      {
        url: '/banners',
      },
      (res : any) => {
        setBanners(res.data)
      },
      (err : any) => {
        console.log(err.data);
      }
    );
  }, []);

  return (
    <div className="w-full">
      <MainBanner banners={banners} />
      <div className="mx-48">
        <div className="w-full h-screen bg-slate-300">
          <h1>인덱스</h1>
        </div>
        <div className="w-full h-screen bg-slate-600">
          <h1>인덱스2</h1>
        </div>
      </div>
    </div>
  );
}
