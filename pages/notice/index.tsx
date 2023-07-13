import BoardHeader from '@/components/board/BoardHeader';
import NoticeList from '@/components/board/NoticeList';
import SearchPost from '@/components/board/SearchPost';

export default function Home() {
  return (
    <>
      <BoardHeader title="공지사항" imageUrl="/images/board/2.png" />
      <div className="mx-10 desktop:mx-auto py-10 max-w-[1024px]">
        <h2 className="text-2xl font-bold">공지사항</h2>
        <SearchPost category="DWC010" />
        <div className="border-t border-[1.5px] border-base-darker" />
        <div className='flex-col items-center justify-center'>
          <NoticeList />
          <NoticeList />
          <NoticeList />
          <NoticeList />
          <NoticeList />
          <NoticeList />
          <NoticeList />
          <NoticeList />
          <NoticeList />
          <NoticeList />
          <NoticeList />
        </div>
      </div>
    </>
  );
}
