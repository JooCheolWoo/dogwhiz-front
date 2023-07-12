import { ErrorMsg, SuccessMsg } from "@/modals/SimpleMsgModal";
import { AxiosTryCatch } from "@/modules/api/AxiosTryCatch";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import Home from "..";

export default function Verification() {
    const router = useRouter();
    const { email, emailKey } = router.query;

    useEffect(() => {
      AxiosTryCatch({
        url: `/members/verification?email=${email}&emailKey=${emailKey}`,
        method: 'get'
      }, () => {
        SuccessMsg({ title: '이메일 인증 성공', text: '환영합니다. 이제 로그인이 가능합니다.' });
        Router.push('/');
      }, (failRes : any) => {
        ErrorMsg({ title: `이메일 인증 오류(${failRes.status})`, text: failRes.message });
        Router.push('/');
      });
    
    }, [email, emailKey])
    
    
    return (
        <div>
            <Home />
        </div>
    );
}