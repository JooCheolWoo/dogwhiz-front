import React from 'react';
import Image from 'next/image';

const NoticeList: React.FC = () => (
  <div className="flex justify-between items-center w-max-[1024px] p-4 border-b">
    <div className="text-center w-[5%]">25</div>
    <span className="border-l" />
    <div className="flex flex-col space-y-4 w-[50%]">
      <div className="font-bold">제목제목</div>
      <div className="flex space-x-2 items-center">
        <Image alt="avatar" src="/images/logo.png" width={25} height={25}/>
        <span>닉네임</span>
        <span>2023.07.13 14:00</span>
      </div>
    </div>
    <div className="flex flex-col text-center w-[10%]">
      <div className="text-2xl text-gray-400 font-bold pb-4">1210</div>
      <div className="text-gray-400">조회</div>
    </div>
    <div className="flex flex-col text-center w-[10%]">
      <div className="text-2xl text-gray-400 font-bold pb-4">1</div>
      <div className="text-gray-400">좋아요</div>
    </div>
    <div className="flex flex-col text-center w-[10%]">
      <div className="text-2xl text-gray-400 font-bold pb-4">2</div>
      <div className="text-gray-400">댓글</div>
    </div>
  </div>
);

export default NoticeList;
