import { AxiosTryCatch } from '@/modules/api/AxiosTryCatch';
import * as Yup from 'yup';

export const ResisterValidation = Yup.object().shape({
  email: Yup.string()
    .email('올바른 형식의 이메일을 입력해주세요.')
    .required('이메일은 필수항목입니다.')
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      '올바른 형식의 이메일을 입력해주세요.'
    ),
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

export function checkEmail(email: string, setAbleEmail: Function) {
  return AxiosTryCatch(
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
}

export function checkNickname(nickname: string, setAbleNickname: Function) {
  return AxiosTryCatch(
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
}
