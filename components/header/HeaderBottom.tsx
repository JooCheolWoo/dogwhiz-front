import Link from 'next/link';
import HeaderOpenMenu from '../menu/HeaderOpenMenu';

export default function HeaderBottom() {
  return (
    <div className="select-none bg-[#FFF5E4]">
      <div className="flex justify-between mx-48">
        <nav className="flex items-center space-x-8">
          <Menu title="홈" push="/" />
          <Menu title="공지사항" push="/notice" />
          <HeaderOpenMenu title='커뮤니티' items={comunityItems} />
          <HeaderOpenMenu title='산책친구' items={walkItems} />
          <HeaderOpenMenu title='개과사전' items={dictionaryItems} />
          <HeaderOpenMenu title='동반여행' items={travelItems} />
          <Menu title="병원검색" push="#" />
        </nav>
      </div>
    </div>
  );
}

function Menu({ title, push }: { title: string; push: string }) {
  return (
    <Link href={push} className="px-2 py-1 text-gray-700 hover:text-[#FF9494] transition duration-300 font-semibold text-lg gaegu">
      {title}
    </Link>
  );
}

const comunityItems = [
  { title: '전체글', push: '#' },
  { title: '인기글', push: '#' },
  { title: '일상', push: '#' },
  { title: '재미', push: '#' },
  { title: '질문', push: '#' },
  { title: '정보공유', push: '#' },
];

const walkItems = [
  { title: '산책기록', push: '#' },
  { title: '경로공유', push: '#' },
  { title: '친구찾기', push: '#' },
];

const dictionaryItems = [
  { title: '상식', push: '#' },
  { title: '건강', push: '#' },
  { title: '견종백과', push: '#' },
];

const travelItems = [
  { title: '카페', push: '#' },
  { title: '음식점', push: '#' },
  { title: '운동장', push: '#' },
  { title: '여행코스', push: '#' },
];
