import Image from "next/image";
import Link from "next/link";
import { BsBalloonHeartFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai"
import { BiCoffeeTogo } from "react-icons/bi"
import { useState } from "react";

export default function FooterTop() {
  const links = [
    { href: "#", text: "성공하는 습관 : 5분 일기" },
    { href: "#", text: "수강신청&티켓팅 서버시간" },
    { href: "#", text: "" },
    { href: "#", text: "" },
    { href: "#", text: "" },
  ];

  return (
    <div className="w-full h-60 py-4">
      <div className="flex flex-row justify-around mx-res">
        <div className="flex flex-col">
          <span className="font-bold">Contact us</span>
          <div className="flex flex-row space-x-2 items-end py-6">
            <AiOutlineMail className="text-2xl"/>
            <span className="font-bold text-lg">galaxypoby@gmail.com</span>
          </div>
          <div className="flex flex-col space-y-1 text-sm">
            <span className="font-bold">답장가능 시간</span>
            <span>평일 : when my baby sleeps...</span>
            <span>주말 : when my baby sleeps...</span>
            <span>가능한 빠른 시일 내 답장드리겠습니다.</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Buy Me a Coffee</span>
          <div className="flex flex-row space-x-2 items-center py-6">
            <BiCoffeeTogo className="text-2xl" />
            <Link
              href="https://www.buymeacoffee.com/galaxypoby"
              target="_blank"
              className="font-bold text-lg hover:text-[#FF9494] transition duration-300"
            >
              커피 사주기
            </Link>
          </div>
          <div className="flex flex-col space-y-1 text-sm">
            <span className="font-bold">후원 감사합니다</span>
            <span>일부 금액은 유기견을 위해 기부됩니다.</span>
            <span>더 좋은 서비스를 위해 노력하겠습니다.</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Other Sites</span>
          <ul className="flex flex-col space-y-2 py-6">
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="hover:text-blue-700 hover:font-bold hover:border-b-2 transition duration-300"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
