import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '@/public/images/logo.png';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineLogin, MdOutlineLogout } from 'react-icons/md';
import { useLoginContext } from '@/modules/context/IsLoginContext';
import { useEffect } from 'react';

const HeaderMiddle: React.FC = () => {
  const { isLogin, setIsLogin } = useLoginContext();

  useEffect(() => {}, [isLogin]);

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
  }


  return (
    <header className="py-1 select-none bg-white">
      <div className="flex justify-between mx-48 font-bold">
        <div className="items-center">
          <Link href="/" className="flex items-center space-x-1">
            <div className="flex-col ml-4">
              <span className="text-center text-4xl caveat">DogWhiz</span>
            </div>
            <Image src={logo} alt="logo" width={55} />
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-2">
          <input
            type="text"
            className="w-96 px-4 py-1 bg-[#FFF5E4] rounded-full focus:ring-[#FF9494] focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="검색어를 입력하세요."
          />
          <button className="flex items-center justify-center w-8 h-8 text-white bg-[#FFD1D1] rounded-[50%] hover:bg-[#FF9494] transition duration-300">
            <FaSearch />
          </button>
          {!isLogin && (
            <Link
              href="/members/login"
              className="items-center p-1 py-2 rounded-lg text-2xl hover:bg-[#FFF5E4] transition duration-300"
            >
              <MdOutlineLogin />
            </Link>
          )}
          {isLogin && (
            <button
              onClick={logout}
              className="items-center p-1 py-2 rounded-lg text-2xl hover:bg-[#FFF5E4] transition duration-300"
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
