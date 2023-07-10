import { MainBanner } from '@/components/banner/MainBanner';
import { useAxiosSWR } from '@/modules/api/useAxiosSWR';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {

  const [banners, setBanners] = useState([]);

  const { res } = useAxiosSWR('/banners', { method: 'get' });

  useEffect(() => {
    if (res?.success === true) {
      setBanners(res.data);
    }
  }, [])


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
