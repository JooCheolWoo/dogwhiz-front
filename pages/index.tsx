import { MainBanner } from '@/components/banner/MainBanner';
import { useAxiosSWR } from '@/modules/api/useAxiosSWR';
import { useState, useEffect } from 'react';

export default function Home() {
  const { res } = useAxiosSWR('/banners', { method: 'get' }, { refreshInterval: false, revalidateOnFocus: false });

  const [banners, setBanners] = useState(res?.data || []);

  useEffect(() => {
    if (res?.success) {
      setBanners(res.data);
    }
  }, [res])

  return (
    <div className="w-full">
      <MainBanner banners={banners} />
      <div className="mx-res py-4">
        <div className="w-full h-screen bg-slate-400">
        </div>
        <div className="w-full h-screen bg-slate-600">
        </div>
      </div>
    </div>
  );
}
