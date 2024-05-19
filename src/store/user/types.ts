import { userLogin, userLogout } from './action';
import { UserRole } from '@/lib/types/types';

export type InitialStateType = {
  nickName: string;
  token: string;
  isLogin: boolean;
  loginType: LoginType;
  role: UserRole;
  id: string;
  roomId: string;
};

export type LoginType = 'k' | 'g' | 'n' | 'i';
export type ResponseUserType = {
  token: string;
  nickName: string;
  role: UserRole;
  id: string;
  roomId: string;
};

export type ActionType =
  | ReturnType<typeof userLogin>
  | ReturnType<typeof userLogout>;
