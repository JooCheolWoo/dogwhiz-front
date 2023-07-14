import React from 'react';
import Image from 'next/image';
import { BoardDto } from '@/model/Board';

const NoticeList: React.FC<BoardDto> = (boardDto) => (
  <div className="flex justify-between items-center w-max-[1024px] p-4 border-b">
    <div className="text-center w-[5%]">{boardDto.id}</div>
    <span className="border-l" />
    <div className="flex flex-col space-y-4 w-[50%]">
      <div className="font-bold text-lg">{boardDto.title}</div>
      <div className="flex space-x-2 items-center">
        <Image alt="avatar" src={boardDto.memberImageUrl} width={25} height={25}/>
        <span>{boardDto.memberNickname}</span>
        <span>{boardDto.createdAt ? boardDto.createdAt.toLocaleString() : ''}</span>
      </div>
    </div>
    <div className="flex flex-col text-center w-[10%]">
      <div className="text-2xl text-gray-400 font-bold pb-4">{boardDto.viewCount}</div>
      <div className="text-gray-400">조회</div>
    </div>
    <div className="flex flex-col text-center w-[10%]">
      <div className="text-2xl text-gray-400 font-bold pb-4">{boardDto.likeCount}</div>
      <div className="text-gray-400">좋아요</div>
    </div>
    <div className="flex flex-col text-center w-[10%]">
      <div className="text-2xl text-gray-400 font-bold pb-4">2</div>
      <div className="text-gray-400">댓글</div>
    </div>
  </div>
);

export default NoticeList;
