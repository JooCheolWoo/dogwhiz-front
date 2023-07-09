import CryptoJS from "crypto-js";

const SECRET_KEY = 'secret_key';

interface Member {
    id: number;
    email: string;
    nickname: string;
    roles: any;
    loginIp: string;
    lastLoginDate: Date;
    updatePwdDate: Date;
    emailAuth: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    memberImage: any;
    accessToken: string;
}

// 암호화 함수
export const encryptData = (data: Member): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

// 복호화 함수
export const decryptData = (cipherText: string): Member => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}


