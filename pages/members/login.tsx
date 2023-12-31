import { LoginForm } from '@/components/form/LoginForm';
import Router from 'next/router';

export default function LoginPage() {
  return (
    <div className="flex py-36 justify-center space-x-20">
      <LoginForm />
      <div className="space-y-12">
        <div className='space-y-4'>
          <h3 className="text-xl font-bold text-gray-600">계정이 없으신가요?</h3>
          <Btn title="회원가입" push='/members/register'/>
        </div>
        <div className='space-y-4'>
          <h3 className="text-xl font-bold text-gray-600">소셜 계정으로 이용하기</h3>
          <Btn title="구글 계정으로 계속하기" push='#'/>
        </div>
        <div className='space-y-4'>
          <h3 className="text-xl font-bold text-gray-600">로그인에 문제가 있으신가요?</h3>
          <Btn title="비밀번호 재설정" push='#'/>
        </div>
      </div>
    </div>
  );
}

function Btn({ title, push }: { title: string, push: string }) {
  return (
    <button
      className="p-2 w-52 bg-[#FFD1D1] rounded-lg hover:bg-[#FF9494] hover:ring-4 ring-[#FFE3E1] transition duration-300 font-bold"
      type="button"
      onClick={() => {Router.push(push)}}
    >
      {title}
    </button>
  );
}
