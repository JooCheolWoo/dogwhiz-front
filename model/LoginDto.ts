type LoginDto = {
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
};

export default LoginDto;
