import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/images/logo.png";
import noticeIcon from "@/public/images/icons/notice.png";
import bestIcon from "@/public/images/icons/best.png";
import eventIcon from "@/public/images/icons/event.png";

const Header: React.FC = () => {
  return (
    <header className="py-5">
      <div className="flex flex-raw max-lg:flex-col max-lg:items-center  justify-between mx-48 font-bold">
        <div className="items-center select-none border-b-4 border-y-orange-300">
          <Link href="/" title="홈으로" className="flex items-center">
            <div className="flex-col ml-4">
              <span className="block text-center text-3xl font-bold diphylleia">
                DogWhiz
              </span>
            </div>
            <Image src={logo} alt="logo" width={55} />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex space-x-1 justify-center max-lg:w-[60vw] max-lg:my-4">
            <input
              type="text"
              className="block w-96 px-4 py-2 bg-orange-50 border rounded-full focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="검색어를 입력하세요."
            />
            <button className="px-4 text-white bg-orange-300 rounded-full hover:bg-orange-400 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <ul className="flex flex-raw items-center space-x-2 select-none">
            <IconMenu title="공지사항" goto="#" icon={noticeIcon} />
            <Stripe />
            <IconMenu title="인기글" goto="#" icon={bestIcon} />
            <Stripe />
            <IconMenu title="이벤트" goto="#" icon={eventIcon} />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

function IconMenu({title, goto, icon} : {title : string, goto : string, icon : any}) {
  return (
    <Link href={goto}>
      <li className="flex flex-raw items-center hover:text-orange-500 transition duration-300">
        <Image src={icon} width={20} alt="icon" className="mr-2" />
        {title}
      </li>
    </Link>
  );
}

function Stripe() {
  return <span className="mx-2 text-xs text-gray-300">|</span>;
}
