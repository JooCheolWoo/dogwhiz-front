import { SearchInfoType } from '@/model/SearchInfo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TfiSearch } from 'react-icons/tfi';

export default function SearchPost({ searchInfo, setSearchInfo }: { searchInfo: SearchInfoType, setSearchInfo: Function }) {
  const [type, setType] = useState('title');
  const [search, setSearch] = useState('');
  const router = useRouter();


  const executeSearch = () => {
    const newSearchInfo = {
      ...searchInfo,
      page: 1,
      type: type,
      search: search,
    };
  
    setSearchInfo(newSearchInfo);
  
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...newSearchInfo }
    });
  };

  useEffect(() => {
    if (router.query.type) {
      setType(String(router.query.type));
    }
    if (router.query.search) {
      setSearch(String(router.query.search));
    }
  }, [router.query.type, router.query.search]);
  
  
  
  

  return (
    <div className="flex justify-between">
      <div className="flex space-x-2 py-4 text-sm">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 pe-4 w-20 text-gray-600 outline-none border appearance-none bg-no-repeat bg-right"
          style={{
            backgroundImage: `url('/images/icons/select_down.png')`,
            backgroundSize: '23px',
          }}
        >
          <option value="title">제목</option>
          <option value="writer">작성자</option>
          <option value="content">내용</option>
        </select>

        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                executeSearch();
              }
            }}
            placeholder="검색어를 입력하세요"
            className="w-80 rounded-md border p-2 pe-10 focus:outline-none"
          />
          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" onClick={executeSearch} className="text-gray-600 hover:text-gray-700 text-2xl">
              <TfiSearch />
            </button>
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <button className="hover_btn text-sm">글쓰기</button>
      </div>
    </div>
  );
}
