import { TfiSearch } from 'react-icons/tfi';

export default function SearchPost({ category }: { category: string }) {
  return (
    <div className='flex justify-between'>
      <div className="flex space-x-2 py-4 text-sm">
        <select
          name="search_by"
          className="p-2 pe-4 w-20 text-gray-600 outline-none border appearance-none bg-no-repeat bg-right"
          style={{
            backgroundImage: `url('/images/icons/select_down.png')`,
            backgroundSize: '23px',
          }}
        >
          <option value="title">제목</option>
          <option value="nickname">닉네임</option>
          <option value="tag">태그</option>
        </select>

        <div className="relative">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-80 rounded-md border p-2 pe-10 focus:outline-none"
          />
          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700 text-2xl">
              <TfiSearch />
            </button>
          </span>
        </div>
      </div>
      <div className='flex items-center'>
        <button className='hover_btn text-sm'>글쓰기</button>
      </div>
    </div>
  );
}
