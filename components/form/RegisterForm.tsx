import React, { useEffect, useRef, useState } from 'react';
import { Formik, FormikProps, Field, Form, ErrorMessage } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';
import { ErrorMsg, WarningMsg, SuccessMsg } from './../../modals/SimpleMsgModal';
import Router from 'next/router';
import Link from 'next/link';
import { AxiosTryCatch } from '@/modules/api/AxiosTryCatch';

// Input 받는 자료 형식 정의
interface Member {
  email: string;
  password: string;
  rePassword: string;
  nickname: string;
}

// Validation 설정
const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('올바른 형식의 이메일을 입력해주세요.').required('이메일은 필수항목입니다.'),
  password: Yup.string()
    .required('비밀번호는 필수항목입니다.')
    .matches(
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
      '영소문자, 숫자, 특수문자 각 1개 이상 포함, 9자 이상이어야 합니다.'
    ),
  rePassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수항목입니다.'),
  nickname: Yup.string().required('닉네임은 필수항목입니다.'),
});

export default function RegisterForm() {
  const [image, setImage] = useState('/images/blank.png');
  const [sendFile, setSendFile] = useState<FileList | null>(null);

  useEffect(() => {
    if (!sendFile?.[0]) {
      setImage('/images/blank.png');
    }
  }, [sendFile, image]);

  const handleImage = (e: any) => {
    // 내가 받을 파일은 하나기 때문에 index 0값의 이미지를 가짐
    const file = e.target.files[0];
    if (!file) return;

    // 이미지 화면에 띄우기
    const reader = new FileReader();
    // 파일을 불러오는 메서드, 종료되는 시점에 readyState는 Done(2)이 되고 onLoad 시작
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        // 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
        setImage(e.target.result);
      }
    };
  };

  // 중복확인 여부
  const [ableEmail, setAbleEmail] = useState<null | boolean>(null);
  const [ableNickname, setAbleNickname] = useState<null | boolean>(null);

  // 이메일 중복 확인
  const emailCheck = (email: string) => {
    AxiosTryCatch(
      {
        method: 'get',
        url: `/members/valid/email?email=${email}`,
      },
      () => {
        setAbleEmail(true);
      },
      () => {
        setAbleEmail(false);
      }
    );
  };

  const nicknameCheck = (nickname: string) => {
    AxiosTryCatch(
      {
        method: 'get',
        url: `/members/valid/nickname?nickname=${nickname}`,
      },
      () => {
        setAbleNickname(true);
      },
      () => {
        setAbleNickname(false);
      }
    );
  };

  // 최종 submit 버튼 클릭 시
  const handleSubmit = async (values: Member) => {
    const request = {
      email: values.email,
      password: values.password,
      rePassword: values.rePassword,
      nickname: values.nickname,
    };

    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (sendFile) {
      formData.append('file', sendFile[0]);
    }

    await AxiosTryCatch(
      {
        method: 'post',
        url: '/members',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      },
      (res: any) => {
        Router.replace('/');
        SuccessMsg({ title: `환영합니다`, text: `등록하신 이메일로 인증메일이 전송되었습니다` });
      },
      (err: any) => ErrorMsg({ title: `회원가입(${err.status})`, text: `${err.message}` })
    );
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rePassword: '',
        nickname: '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={(data: Member, { setSubmitting }) => {
        if (!ableEmail) {
          WarningMsg({
            title: 'Oops...',
            text: '이메일 중복확인을 해주세요.',
          });
          setSubmitting(false);
        } else if (!ableNickname) {
          WarningMsg({
            title: 'Oops...',
            text: '닉네임 중복확인을 해주세요.',
          });
          setSubmitting(false);
        } else {
          setSubmitting(true);
          handleSubmit(data);
          setSubmitting(false);
        }
      }}
    >
      {(props: FormikProps<Member>) => {
        const { values, touched, errors, handleBlur, handleChange, isSubmitting, setFieldValue } = props;
        return (
          <div className="flex justify-center">
            <Form className="flex flex-col py-16 px-4 space-y-12 w-full max-w-[450px]">
              <div className="text-center">
                <h2 className="text-stone-600 font-bold text-4xl">회원가입</h2>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold">이메일</label>
                <div className="flex flex-col h-10">
                  <div className="flex space-x-2">
                    <Field
                      name="email"
                      type="email"
                      placeholder="이메일을 입력하세요."
                      onChange={(e: any) => {
                        handleChange(e);
                        setAbleEmail(null);
                      }}
                      onBlur={handleBlur}
                      className="p-2 bg-slate-100 rounded-lg w-full"
                    />
                    <button
                      type="button"
                      onClick={() => emailCheck(values.email)}
                      disabled={(errors.email && touched.email) || undefined}
                      className={`p-2 rounded-lg transition duration-300 w-44 font-semibold ${
                        !errors.email && touched.email
                          ? 'bg-[#FFD1D1] hover:bg-[#FF9494]'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      중복확인
                    </button>
                  </div>
                  {ableEmail !== null && (
                    <p className={`text-xs ${!ableEmail ? 'text-red-500' : 'text-green-500'} py-1 text-center`}>
                      {!ableEmail ? '이미 가입된 이메일 입니다.' : '사용 가능한 이메일 입니다.'}
                    </p>
                  )}
                  <ErrorMessage name="email" component="div" className="text-xs text-red-500 py-1 text-center" />
                </div>
              </div>
              <div className="flex flex-col space-y-2 h-14">
                <label className="text-xs font-bold">비밀번호</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  onChange={handleChange}
                  className="p-2 bg-slate-100 rounded-lg"
                />
                <ErrorMessage name="password" component="div" className="text-xs text-red-500 py-1 text-center" />
              </div>
              <div className="flex flex-col space-y-2 h-14">
                <label className="text-xs font-bold">비밀번호 확인</label>
                <Field
                  name="rePassword"
                  type="password"
                  placeholder="비밀번호 확인을 입력하세요."
                  onChange={handleChange}
                  className="p-2 bg-slate-100 rounded-lg"
                />
                <ErrorMessage name="rePassword" component="div" className="text-xs text-red-500 py-1 text-center" />
              </div>
              <div className="flex flex-col space-y-2 h-14">
                <label className="text-xs font-bold">닉네임</label>
                <div className="flex flex-col">
                  <div className="flex flex-raw">
                    <Field
                      name="nickname"
                      type="nickname"
                      placeholder="닉네임을 입력하세요."
                      onChange={(e: any) => {
                        handleChange(e);
                        setAbleNickname(null); // reset emailCheck state when the user types something in the email field
                      }}
                      onBlur={handleBlur}
                      className="p-2 bg-slate-100 rounded-lg w-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        nicknameCheck(values.nickname);
                      }}
                      disabled={(errors.nickname && touched.nickname) || undefined}
                      className={`p-2 rounded-lg transition duration-300 ml-2 w-44 font-semibold ${
                        !errors.nickname && touched.nickname
                          ? 'bg-[#FFD1D1] hover:bg-[#FF9494]'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      중복확인
                    </button>
                  </div>
                  {ableNickname !== null && (
                    <p className={`text-xs ${!ableNickname ? 'text-red-500' : 'text-green-500'} py-1 text-center`}>
                      {!ableNickname ? '이미 가입된 닉네임 입니다.' : '사용 가능한 닉네임 입니다.'}
                    </p>
                  )}
                  <ErrorMessage name="nickname" component="div" className="text-xs text-red-500 py-1 text-center" />
                </div>
              </div>
              <div className="flex flex-col space-y-6 h-60">
                <label className="text-xs font-bold">프로필 사진</label>
                <div className="flex flex-raw items-center justify-around">
                  <label htmlFor="file">
                    <Image
                      src={image}
                      width={200}
                      height={200}
                      alt="profile image"
                      className="w-[200px] h-[200px] rounded-[50%] object-cover border-2 border-[#FFD1D1] ring-4 ring-[#FFE3E1]"
                    />
                  </label>
                  <div className="flex flex-col items-center space-y-4">
                    <label
                      htmlFor="file"
                      className="p-2 bg-[#FFD1D1] rounded-lg hover:bg-[#FF9494] hover:ring-4 ring-[#FFE3E1] hover:cursor-pointer transition duration-300 font-bold text-sm"
                    >
                      이미지 선택
                    </label>
                    {sendFile?.[0] ? (
                      <span
                        className="text-center text-sm w-48 bg-slate-100 p-1 rounded-lg"
                        style={{ wordWrap: 'break-word' }}
                      >
                        {sendFile[0].name.length > 50 ? sendFile[0].name.substring(0, 50) + '...' : sendFile[0].name}
                      </span>
                    ) : (
                      <span className="text-center text-sm w-48 bg-slate-100 p-1 rounded-lg">
                        선택된 이미지가 없습니다.
                      </span>
                    )}
                  </div>
                </div>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(e) => {
                    handleChange(e);
                    handleImage(e);
                    setSendFile(e.target.files);
                  }}
                  className="hidden"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <button
                  className="p-2 w-40 bg-[#FFD1D1] rounded-lg hover:bg-[#FF9494] hover:ring-4 ring-[#FFE3E1] transition duration-300 my-10 mx-4 text-blueGray-600 font-bold"
                  type="submit"
                  disabled={isSubmitting}
                >
                  회원가입
                </button>
                <Link href="/members/login" className="text-blue-500 hover:font-semibold">
                  이미 계정이 있으신가요?
                </Link>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
