import Link from 'next/link';

export default function HeaderBottom() {
  return (
    <div className="select-none bg-[#FFF5E4]">
      <div className="flex justify-between mx-48">
        <nav className="flex items-center space-x-8">
          <Menu title="홈" push="/" />
          <Menu title="공지사항" push="#" />
          <Menu title="커뮤니티" push="#" />
          <Menu title="산책친구" push="#" />
          <Menu title="개과사전" push="#" />
          <Menu title="동반여행" push="#" />
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
