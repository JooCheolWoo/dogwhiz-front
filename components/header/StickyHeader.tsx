import Link from 'next/link';
import HoverDownMenu from '../menu/HoverDownMenu';
import { useAuth } from '@/modules/context/AuthContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function StickyHeader() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [nickname, setNickname] = useState('');
  const [profile, setProfile] = useState('/public/images/logo.png');
  const [ LoggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    const loginInfo = localStorage.getItem('loginInfo');
    const LoggedIn =  localStorage.getItem('LoggedIn');
    if ( LoggedIn && loginInfo) {
      setLoggedIn(LoggedIn == 'true');
      const nickname = JSON.parse(loginInfo).nickname;
      setNickname(nickname);
      if (JSON.parse(loginInfo).memberImage !== null) {
        const profile = JSON.parse(loginInfo).memberImage.url;
        setProfile(profile);
      }
    }
  }, [isLoggedIn, LoggedIn]);

  return (
    <div className="bg-orange-50 border-y border-orange-100 font-bold text-slate-600 select-none">
      <div className="flex flex-raw justify-between mx-48 h-12">
        <ul className="flex flex-raw items-center space-x-4">
          <Menu title="홈" goto="/" />
          <Stripe />
          <Menu title="공지사항" goto="#" />
          <Stripe />
          <HoverDownMenu title="커뮤니티" titleLink="#" items={comunityItems} />
          <Stripe />
          <HoverDownMenu title="산책친구" titleLink="#" items={walkItems} />
          <Stripe />
          <HoverDownMenu title="개과사전" titleLink="#" items={dictionaryItems} />
          <Stripe />
          <HoverDownMenu title="동반여행" titleLink="#" items={travelItems} />
          <Stripe />
          <Menu title="병원검색" goto="#" />
        </ul>
        <div>
          { LoggedIn && (
            <div  className="flex felx-raw items-center space-x-3">
              <Image src={profile} width={45} height={45} alt={'profile image'} className='w-[45px] h-[45px] rounded-[50%]' />
              <div>{nickname}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Menu({ title, goto }: { title: string; goto: string }) {
  return (
    <Link href={goto} className="px-2 py-1 hover:text-orange-500 transition duration-300">
      <li className="hover:border-b-2 border-b-orange-500">{title}</li>
    </Link>
  );
}

function Stripe() {
  return <span className="mx-2 text-xs text-orange-300">|</span>;
}

const comunityItems = [
  { title: '홈', link: '#' },
  { title: '인기글', link: '#' },
  { title: '일상', link: '#' },
  { title: '재미', link: '#' },
  { title: '질문', link: '#' },
  { title: '정보공유', link: '#' },
];

const walkItems = [
  { title: '산책기록', link: '#' },
  { title: '경로공유', link: '#' },
  { title: '친구찾기', link: '#' },
];

const dictionaryItems = [
  { title: '상식', link: '#' },
  { title: '건강', link: '#' },
  { title: '견종백과', link: '#' },
];

const travelItems = [
  { title: '카페', link: '#' },
  { title: '음식점', link: '#' },
  { title: '운동장', link: '#' },
  { title: '여행코스', link: '#' },
];
