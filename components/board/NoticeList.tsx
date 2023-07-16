import React from 'react';
import Image from 'next/image';
import { BoardDto } from '@/model/Board';
import { formatDate } from '@/modules/util/common';
import Link from 'next/link';

export function NoticeList({ boardDto }: { boardDto: BoardDto }) {
  return (
    <div className="flex flex-row justify-between items-center w-max-[1024px] p-4 border-b space-x-4">
      <div className="text-center flex-none w-10">{boardDto.id}</div>
      <span className="border-l" />
      <div className="flex flex-col space-y-3 grow">
        <Link href={`/notice/${boardDto.id}`}>
          <div className="font-bold text-lg w-[calc(60vw-150px)] laptop:w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
            {boardDto.title}
          </div>
        </Link>
        <div className="flex space-x-2 items-center">
          <Image alt="avatar" src={boardDto.writerImageUrl} width={25} height={25} className="rounded-md" />
          <span className="font-semibold">{boardDto.writer}</span>
          <span className="text-xs text-gray-600">
            {boardDto.createdAt ? formatDate(boardDto.createdAt.toLocaleString()) : ''}
          </span>
        </div>
      </div>
      <div className='flex'>
      <div className="flex flex-col text-center flex-none w-20 space-y-3">
        <div className="text-2xl text-gray-500 font-bold">{boardDto.viewCount}</div>
        <div className="text-gray-400">조회</div>
      </div>
      <div className="flex flex-col text-center flex-none w-20 space-y-3">
        <div className="text-2xl text-gray-500 font-bold">{boardDto.likeCount}</div>
        <div className="text-gray-400">좋아요</div>
      </div>
      <div className="flex flex-col text-center flex-none w-20 space-y-3">
        <div className="text-2xl text-gray-500 font-bold">2</div>
        <div className="text-gray-400">댓글</div>
      </div>
      </div>
    </div>
  );
}

export default NoticeList;
