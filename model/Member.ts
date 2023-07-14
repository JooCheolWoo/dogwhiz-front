export interface ReqResisterDto {
  email: string;
  password: string;
  rePassword: string;
  nickname: string;
}

export interface ReqLoginDto {
  email: string;
  password: string;
}

export interface ResLoginDto {
  id: number;
  email: string;
  nickname: string;
  imageUrl: string;
  emailAuth: boolean;
  roles: Array<Role>;
  status: string;
  loginIp: string;
  lastLoginDate: Date;
  updatePwdDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  tokenInfo: TokenInfo;
};

interface TokenInfo {
  accessToken: string,
  expiredDate: number
}

interface Role {
  id: number,
  role: string
}
