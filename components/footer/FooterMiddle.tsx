import Image from "next/image";
import Link from "next/link";

export default function FooterMiddle() {
  const links = [
    { href: "/", text: "홈" },
    { href: "#", text: "개발자소개" },
    { href: "#", text: "개인정보처리방침" },
    { href: "#", text: "이용약관" },
    { href: "#", text: "이용안내" },
    { href: "#", text: "문의사항" },
  ];

  return (
    <div className="bg-orange-100 text-stone-600 border-y border-orange-100 font-bold">
      <div className="py-1 mx-48">
        <ul className="flex flex-raw justify-center items-center space-x-8">
          {links.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className="hover:text-orange-500 transition duration-300"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
