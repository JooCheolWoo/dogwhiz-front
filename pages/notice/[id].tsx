import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsSuitHeart, BsShare } from 'react-icons/bs';

export default function Detail() {
  const [board, setBoard] = useState();
  const router = useRouter();
  

  return (
    <div className="flex justify-center items-center py-16">
      <div className="space-y-8">
        <div>
          <h2 className="font-bold text-gray-500">공지사항</h2>
          <h1 className="font-bold text-3xl">{router.query.id}번 게시글</h1>
        </div>
        <div className="flex justify-between w-[1000px]">
          <div className="flex items-center space-x-2">
            <Image alt="avatar" src="/images/logo.png" width={25} height={25} className="rounded-md" />
            <span className="font-semibold">닉네임</span>
            <span className="h-4 border border-gray-400" />
            <span>작성일</span>
            <span className="font-semibold text-sm text-gray-500">2023.07.16 오후 5:25:32</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-500">조회 25</span>
            <span className="font-semibold text-gray-500">추천 2 </span>
            <BsSuitHeart className="text-lg hover:text-base-hover hover:cursor-pointer transition duration-300" />
            <BsShare className="text-lg hover:text-base-hover hover:cursor-pointer transition duration-300" />
          </div>
        </div>
        <div className="border-b-2 border-base-normal"></div>
        <div>본문</div>
        <div className="border-b-2 border-base-normal"></div>
        <button className='hover_btn' onClick={() => {router.push('/notice')}}>목록</button>
      </div>
    </div>
  );
}
