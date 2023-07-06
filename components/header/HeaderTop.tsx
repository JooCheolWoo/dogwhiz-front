import { useAuth } from "@/modules/context/AuthContext";
import Router from 'next/router';
import { useState, useEffect } from "react";

export default function HeaderTop() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const links = [
    { href: "#", text: "즐겨찾기" },
    { href: "#", text: "알림" },
    { href: "#", text: "장바구니" },
    { href: "#", text: "주문조회" },
    { href: "#", text: "마이페이지" },
  ];

  return (
    <div className="flex justify-end py-2 border-b border-b-orange-100 select-none">
      {!isLoggedIn && (
        <div className="flex flex-row text-gray-600 mx-48 text-xs font-bold space-x-2">
          <button
            onClick={() => Router.push('/members/login')}
            className="hover:text-orange-500 transition duration-300"
          >
            로그인
          </button>
          <button className="hover:text-orange-500 transition duration-300">
            회원가입
          </button>
        </div>
      )}
      {isLoggedIn && (
        <ul className="flex flex-row text-gray-600 mx-48 text-xs font-bold">
          {links.map((link, i) => (
            <li key={i}>
              {i !== 0 && <Stripe />}
              <a
                href={link.href}
                className="hover:text-orange-500 transition duration-300"
              >
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
