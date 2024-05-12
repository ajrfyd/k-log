export type UserRole = 'user' | 'admin';

export type UserStateType = {
  name: string;
  role: UserRole;
  isLogin?: boolean;
};

export type ResponseUserType = {
  name: string;
  role: UserRole;
  access_token: string;
  id: string;
};

export type UserLoginType = {
  nickName: string;
  password: string;
};

export type UserSignupType = UserLoginType & {
  rePassword: string;
};
