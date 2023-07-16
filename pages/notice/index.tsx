import BoardHeader from '@/components/board/BoardHeader';
import NoticeList from '@/components/board/NoticeList';
import SearchPost from '@/components/board/SearchPost';
import { BoardDto } from '@/model/Board';
import { AxiosTryCatch } from '@/modules/api/AxiosTryCatch';
import { useEffect, useState } from 'react';
import { ConfigApi, getAuthorization } from '@/config/ConfigApi';
import { SearchInfoType } from '@/model/SearchInfo';
import { Pagination } from '@mui/material';
import Router, { useRouter } from 'next/router';

export default function Home() {
  const searchInfoInitData = {
    page: 1,
    size: 10,
    sort: 'createdAt,desc',
    category: 'DWB010',
    subCategory: 'DWB011',
    type: '',
    search: '',
  };

  const pagingInitData = {
    totalElements: 0,
    size: 10,
    number: 1,
    totalPages: 0,
  };

  const { searchInfo, setSearchInfo } = useRouterQuery(searchInfoInitData);
  const [paging, setPaging] = useState({ ...pagingInitData });
  const { boardList, fixedBoardList } = useBoardList(searchInfo, paging, setPaging);

  return (
    <>
      <BoardHeader title="공지사항" imageUrl="/images/board/2.png" />
      <div className="px-8 mx-auto py-10 max-w-[1024px]">
        <h2 className="text-2xl font-bold">공지사항</h2>
        {searchInfo && <SearchPost searchInfo={searchInfo} setSearchInfo={setSearchInfo} />}
        <div className="border-t border-[1.5px] border-base-darker" />
        <div className="flex-col items-center justify-center bg-red-100 bg-opacity-50 shadow">
          {fixedBoardList.map((boardDto: BoardDto) => (
            <div key={boardDto.id}>
              <NoticeList boardDto={boardDto} />
            </div>
          ))}
        </div>
        <div className="flex-col items-center justify-center">
          {boardList.map((boardDto: BoardDto) => (
            <div key={boardDto.id}>
              <NoticeList boardDto={boardDto} />
            </div>
          ))}
          {boardList.length == 0 && (
            <div className="flex items-center justify-center">
              <span className="font-bold text-2xl gaegu text-gray-400 pt-10">검색된 결과가 없습니다.</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center pt-10 pb-4">
          <Pagination
            count={paging.totalPages}
            page={paging.number}
            onChange={(event: React.ChangeEvent<unknown>, page: number) => {
              setSearchInfo({
                ...searchInfo,
                page: page,
              });
              Router.push({
                pathname: Router.pathname,
                query: { ...Router.query, page },
              });
            }}
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </>
  );
}

function useBoardList(searchInfo : SearchInfoType, paging : any, setPaging : Function) {
  const [boardList, setBoardList] = useState<BoardDto[]>([]);
  const [fixedBoardList, setFixedBoardList] = useState([]);

  useEffect(() => {
    AxiosTryCatch(
      {
        ...ConfigApi.BOARD.LIST,
        url: `${ConfigApi.BOARD.LIST.url}?page=${searchInfo.page}&size=${searchInfo.size}&sort=${searchInfo.sort}`,
        data: {
          category: searchInfo.category,
          subCategory: searchInfo.subCategory,
          type: searchInfo.type ?? '',
          search: searchInfo.search ?? '',
        },
        headers: {
          Authorization: getAuthorization(),
        },
      },
      (successRes: any) => {
        setBoardList(successRes.data.list.content);
        setFixedBoardList(successRes.data.fixedList);
        setPaging({
          ...paging,
          totalElements: successRes.data.list.totalElements,
          size: successRes.data.list.size,
          number: successRes.data.list.number + 1,
          totalPages: successRes.data.list.totalPages,
        })
      },
      (failRes: any) => {
        console.log(failRes);
      }
    );
  }, [searchInfo]);

  return { boardList, fixedBoardList };
}


function useRouterQuery(defaultSearchInfo : SearchInfoType) {
  const router = useRouter();
  const [searchInfo, setSearchInfo] = useState(defaultSearchInfo);

  useEffect(() => {
    if (!router.query.page) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: 1 }
      });
    }
    setSearchInfo({
      ...searchInfo,
      ...router.query,
    });
  }, [router.query]);

  return { searchInfo, setSearchInfo };
}
