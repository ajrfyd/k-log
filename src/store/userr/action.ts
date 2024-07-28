import { InitialStateType, UserRole } from './types';

export const INIT_USER = 'user_INIT_USER' as const;
export const USER_LOGIN = 'user_USER_LOGIN' as const;
export const USER_LOGOUT = 'user_USER_LOGOUT' as const;
export const SET_USER_INFO = 'user_SET_USERINFO' as const;
export const SET_USER_NICKNAME = 'user_SET_NICKNAME' as const;

export const initUser = (initUserInfo: {
  nickName: string;
  role: UserRole;
  roomId: string | null;
  socketId: string;
  id: string | null;
}) => ({
  type: INIT_USER,
  payload: initUserInfo
});

export const login = (loginInfo: {
  nickName: string;
  role: UserRole;
  socketId: string;
  id: string;
  roomId: string | null;
}) => ({ type: USER_LOGIN, payload: loginInfo });

export const logout = () => ({ type: USER_LOGOUT });

export const setUser = (userInfo: Partial<InitialStateType>) => ({
  type: SET_USER_INFO,
  payload: userInfo
});
