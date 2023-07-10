import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/images/logo.png";

const HeaderMiddle: React.FC = () => {
  return (
    <header className="py-1 select-none bg-white">
      <div className="flex justify-between mx-48 font-bold">
        <div className="items-center">
          <Link href="/" className="flex items-center space-x-1">
            <div className="flex-col ml-4">
              <span className="text-center text-4xl caveat">
                DogWhiz
              </span>
            </div>
            <Image src={logo} alt="logo" width={55} />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex justify-center space-x-2">
            <input
              type="text"
              className="w-96 px-4 py-1 bg-[#FFF5E4] rounded-full focus:ring-[#FF9494] focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="검색어를 입력하세요."
            />
            <button className="px-2 text-white bg-[#FFD1D1] rounded-[50%] hover:bg-[#FF9494] transition duration-300">
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
      </div>
    </header>
  );
};

export default HeaderMiddle;

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
