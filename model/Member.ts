export type LoginDto = {
  id: number;
  email: string;
  nickname: string;
  imageUrl: string;
  emailAuth: boolean;
  loginIp: string;
  lastLoginDate: Date;
  updatePwdDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  tokenInfo: TokenInfo;
};

type TokenInfo = {
  accessToken: string,
  expiredDate: number
}
