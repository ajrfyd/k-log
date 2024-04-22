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
