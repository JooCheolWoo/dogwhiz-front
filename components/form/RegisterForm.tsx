import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Formik, FormikProps, Field, Form, ErrorMessage } from 'formik';
import { ErrorMsg, WarningMsg, SuccessMsg } from './../../modals/SimpleMsgModal';
import { AxiosTryCatch } from '@/modules/api/AxiosTryCatch';
import { ResisterValidation, checkEmail, checkNickname } from '@/model/Validation';
import { ReqResisterDto } from '@/model/Member';
import useImageCompress from './../imageCrop/useImageCompress';
import { dataURItoFile } from '@/modules/util/common';
import ImageCropper from '../imageCrop/ImageCropper';

export default function RegisterForm() {
  const [ableEmail, setAbleEmail] = useState<null | boolean>(null);
  const [ableNickname, setAbleNickname] = useState<null | boolean>(null);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const { isLoading: isCompressLoading, compressImage } = useImageCompress();
  const [file, setFile] = useState<File>();

  const handleUploadImage = (image: string) => {
    setUploadImage(image);
  };

  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    const compressedImage = await compressImage(200, imageFile);

    // 이미지 서버 저장 로직
    if (!compressedImage) return;
    const imageUrl = URL.createObjectURL(compressedImage);
    setCompressedImage(imageUrl);
    const file = new File([compressedImage], 'profile.png', { type: 'image/png' });
    setFile(file);
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage]);

  // 최종 submit 버튼 클릭 시
  const handleSubmit = async (values: ReqResisterDto) => {
    const request = {
      email: values.email,
      password: values.password,
      rePassword: values.rePassword,
      nickname: values.nickname,
    };

    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }

    await AxiosTryCatch(
      {
        method: 'post',
        url: '/members',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      },
      (SuccessRes: any) => {
        Router.replace('/');
        SuccessMsg({ title: `환영합니다`, text: `등록하신 이메일로 인증메일이 전송되었습니다` });
      },
      (failRes: any) => ErrorMsg({ title: `회원가입(${failRes.status})`, text: `${failRes.message}` })
    ).catch((errData) => {
      ErrorMsg({ title: `회원가입(${errData.status})`, text: `${errData.message}` });
    });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rePassword: '',
        nickname: '',
      }}
      validationSchema={ResisterValidation}
      onSubmit={(values: ReqResisterDto, { setSubmitting }) => {
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
        } else if (isCompressLoading) {
          WarningMsg({
            title: 'Oops...',
            text: '프로필 이미지 변환중입니다. 잠시만 기다려주세요.',
          });
          setSubmitting(false);
        } else {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
        }
      }}
    >
      {(props: FormikProps<ReqResisterDto>) => {
        const { values, touched, errors, handleBlur, handleChange, isSubmitting, setFieldValue } = props;
        return (
          <div className="flex justify-center">
            <Form className="flex flex-col px-4 space-y-12 w-full max-w-[450px]">
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
                      onClick={() => {
                        checkEmail(values.email, setAbleEmail);
                      }}
                      disabled={(errors.email && touched.email) || values.email.length == 0}
                      className="w-44 hover_btn"
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
                {!errors.password && values.password.length == 0 && (
                  <p className="text-xs text-blue-500 py-1 text-center">
                    영소문자, 숫자, 특수문자 각 1개 이상 포함, 9자 이상이어야 합니다.
                  </p>
                )}
                {!errors.password && values.password.length > 0 && (
                  <p className="text-xs text-green-500 py-1 text-center">사용 가능한 비밀번호 입니다.</p>
                )}
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
                  <div className="flex space-x-2">
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
                        checkNickname(values.nickname, setAbleNickname);
                      }}
                      disabled={(errors.nickname && touched.nickname) || values.nickname.length == 0}
                      className="w-44 hover_btn"
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
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <img
                        src={compressedImage ? compressedImage : '/images/blank.png'}
                        width={200}
                        height={200}
                        alt="avatar"
                        className="border-2"
                      />
                      <span className="text-sm font-bold text-blue-400 h-4">
                        {isCompressLoading ? '이미지 압축 중..' : ''}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <ImageCropper aspectRatio={1 / 1} onCrop={handleUploadImage}>
                        <button type="button" className="hover_btn">
                          사진등록
                        </button>
                      </ImageCropper>
                      <button
                        type="button"
                        onClick={() => {
                          setCompressedImage(null);
                          setUploadImage(null);
                        }}
                        className="hover_btn"
                      >
                        등록취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button className="w-40 hover_btn" type="submit" disabled={isSubmitting}>
                  회원가입
                </button>
                <Link href="/members/login" className="text-blue-500 py-8 hover:font-semibold">
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
