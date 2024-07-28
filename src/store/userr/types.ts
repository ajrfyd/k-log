import { setUser, initUser, login, logout } from './action';

export type UserRole = 'admin' | 'user';

export type InitialStateType = {
  nickName: string | null;
  token: string | null;
  role: UserRole;
  isLogin: boolean;
  id: string | null;
  roomId: string | null;
  socketId: string | null;
  recentConnect: Date | null;
};

export type LocalUserType = {
  id: string;
  isLogin: boolean;
  nickName: string;
  role: UserRole;
  roomId: string;
  socketId: string;
};

export type ActionType =
  | ReturnType<typeof initUser>
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof setUser>;
