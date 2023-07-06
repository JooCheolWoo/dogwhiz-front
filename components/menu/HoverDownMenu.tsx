import Link from "next/link";
import { useState } from "react";

export default function HoverDownMenu({ title, titleLink, items }: { title: string; titleLink : string; items: { title: string; link: string }[] }) {

    return (
      <div className="relative group">
      <Link
        href={titleLink}
        className="px-2 py-1"
      >
        <li className="group-hover:text-orange-500 group-hover:border-b-2 group-hover:border-b-orange-500">{title}</li>
      </Link>
      <ul className="absolute -left-4 top-[60px] w-24 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-500 font-normal">
      {items.map((item, index) => (
          <Link key={index} href={item.link}>
            <li
              className={`py-1 px-4 hover:bg-gray-200 hover:text-black hover:font-bold ${
                index === 0 ? 'rounded-t-lg' : index === items.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
    );
  }
