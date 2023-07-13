import { LoginForm } from '@/components/form/LoginForm';
import Router from 'next/router';

export default function LoginPage() {
  return (
    <div className="flex items-center py-20 justify-center tablet:space-x-10 laptop:space-x-20">
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
      className="w-52 hover_btn"
      type="button"
      onClick={() => {Router.push(push)}}
    >
      {title}
    </button>
  );
}
