import CryptoJS from "crypto-js";
import LoginDto from "@/model/Member";

const SECRET_KEY = 'secret_key';


// 암호화
export const encryptData = (data: LoginDto): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

// 복호화
export const decryptData = (cipherText: string): LoginDto => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}


