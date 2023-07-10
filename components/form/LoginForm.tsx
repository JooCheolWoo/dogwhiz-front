import React, { useContext } from 'react';
import { useAxiosSWR } from '@/modules/api/useAxiosSWR';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { ErrorMsg, WarningMsg } from './../../modals/SimpleMsgModal';
import Router from 'next/router';
import { encryptData } from '@/modules/cryptoUtils';
import { useLoginContext } from '@/modules/context/IsLoginContext';
import { AxiosTryCatch } from '@/modules/api/AxiosTryCatch';

type Member = {
  email: string;
  password: string;
};

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('올바른 형식의 이메일을 입력해주세요.').required('이메일을 입력해주세요.'),
  password: Yup.string().required('비밀번호를 입력해주세요.'),
});

export const LoginForm = () => {
  const { setIsLogin } = useLoginContext();


  const handleSubmit = (values: Member) => {
    AxiosTryCatch({
      url: '/login',
      method: 'post',
      data: values
    }, (successRes : any) => {
      setIsLogin(true);
      localStorage.setItem('loginInfo', encryptData(successRes.data));
      Router.push('/');
    }, (failRes : any) => {
      setIsLogin(false);
      localStorage.clear();
      WarningMsg({ title: `로그인 실패(${failRes.status})`, text: failRes.message });
    })

  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={(data: Member, { setSubmitting }) => {
        setSubmitting(true);
        handleSubmit(data);
        setSubmitting(false);
      }}
    >
      {(props: FormikProps<Member>) => {
        const { handleBlur, handleChange, isSubmitting } = props;
        return (
          <div className="flex justify-center">
            <Form className="flex flex-col py-16 px-4 space-y-12 w-full max-w-[450px]">
              <div className="text-center">
                <h2 className="text-stone-600 font-bold text-4xl">로그인</h2>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold">이메일</label>
                <div className="flex flex-col h-10">
                  <Field
                    name="email"
                    type="email"
                    placeholder="이메일을 입력하세요."
                    onChange={(e: any) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    className="p-2 bg-slate-100 rounded-lg w-full"
                  />
                  <ErrorMessage name="email" component="div" className="text-xs text-red-500 text-center" />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold">비밀번호</label>
                <div className="flex flex-col h-10">
                  <Field
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    onChange={handleChange}
                    className="p-2 bg-slate-100 rounded-lg"
                  />
                  <ErrorMessage name="password" component="div" className="text-xs text-red-500 text-center" />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="p-2 bg-orange-400 rounded-lg w-40 hover:bg-orange-600 hover:ring-4 ring-orange-200 transition duration-300 font-bold"
                  type="submit"
                  disabled={isSubmitting}
                >
                  로그인
                </button>
              </div>
              <div className="flex flex-col text-center space-y-2">
                <Link href="#" className="h-6 ">
                  <span className="text-blue-500 hover:font-bold hover:border-b-2">
                    아이디 또는 비밀번호를 잊으셨나요?
                  </span>
                </Link>
                <Link href="/members/register" className="h-6 ">
                  <span className="text-blue-500 hover:font-bold hover:border-b-2">회원가입</span>
                </Link>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
