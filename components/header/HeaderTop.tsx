import { useLoginContext } from '@/modules/context/IsLoginContext';
import Router from 'next/router';
import { useEffect } from 'react';

export default function HeaderTop() {
  const { isLogin } = useLoginContext();

  useEffect(() => {

  }, [isLogin]);

  const links = [
    { href: '#', text: '즐겨찾기' },
    { href: '#', text: '알림' },
    { href: '#', text: '마이페이지' },
  ];

  return (
    <div className="flex justify-end py-2 select-none">
      {!isLogin && (
        <div className="flex flex-row mx-48 text-xs font-bold space-x-2">
          <button
            onClick={() => Router.push('/members/login')}
            className="hover:text-[#FF9494] transition duration-300"
          >
            로그인
          </button>
          <button
            onClick={() => Router.push('/members/register')}
            className="hover:text-[#FF9494] transition duration-300"
          >
            회원가입
          </button>
        </div>
      )}
      {isLogin && (
        <ul className="flex flex-row mx-48 text-xs font-bold">
          {links.map((link, i) => (
            <li key={i}>
              {i !== 0 && <Stripe />}
              <a href={link.href} className="hover:text-orange-500 transition duration-300">
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stripe() {
  return <span className="mx-2 text-gray-300">|</span>;
}
