import HeaderTop from './HeaderTop';
import HeaderMiddle from './HeaderMiddle';
import HeaderBottom from './HeaderBottom';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isSticky, setIsStick] = useState(false);

  const handleScroll = () => {
    setIsStick(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <HeaderTop />
      <div className={`sticky top-0 z-20 bg-white ${isSticky ? 'shadow-bottom' : ''}`}>
        <HeaderMiddle />
        <HeaderBottom />
      </div>
    </>
  );
}
