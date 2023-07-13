import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '@/public/images/logo.png';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineLogin, MdOutlineLogout } from 'react-icons/md';
import { useLoginContext } from '@/modules/context/IsLoginContext';
import { useEffect } from 'react';
import { ConfirmOrCancelMsg } from '@/modals/SimpleMsgModal';


const HeaderMiddle: React.FC = () => {
  const { isLogin, setIsLogin } = useLoginContext();

  useEffect(() => {}, [isLogin]);

  const logout = () => {
    ConfirmOrCancelMsg( { icon : 'warning', title : '로그아웃', text : '정말 로그아웃 하시겠습니까?'})
    .then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        setIsLogin(false);
      }
    })
  }


  return (
    <header className="py-1 select-none">
      <div className="flex justify-between font-bold mx-res">
        <div className="items-center">
          <Link href="/" className="flex items-center space-x-1">
            <div className="ml-4">
              <span className="text-center text-4xl caveat">DogWhiz</span>
            </div>
            <Image src={logo} alt="logo" width={55} />
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-2">
          <input
            type="text"
            className="w-60 border-b-2 focus:border-base-hover transition duration-300 focus:outline-none"
            placeholder="검색어를 입력하세요."
          />
          <button className="flex items-center justify-center w-6 h-8 rounded-lg hover:bg-base-normal transition duration-300">
            <FaSearch />
          </button>
          {!isLogin && (
            <Link
              href="/members/login"
              className="flex items-center justify-center w-6 h-8 rounded-lg text-2xl hover:bg-base-normal transition duration-300"
            >
              <MdOutlineLogin />
            </Link>
          )}
          {isLogin && (
            <button
              onClick={logout}
              className="flex items-center justify-center w-6 h-8 rounded-lg text-2xl hover:bg-base-normal transition duration-300"
            >
              <MdOutlineLogout />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderMiddle;

function IconMenu({ title, goto, icon }: { title: string; goto: string; icon: any }) {
  return (
    <Link href={goto}>
      <li className="flex flex-raw items-center hover:text-orange-500 transition duration-300">
        <Image src={icon} width={20} alt="icon" className="mr-2" />
        {title}
      </li>
    </Link>
  );
}
