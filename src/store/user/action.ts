import { type ResponseUserType } from './types';

export const USER_LOGIN = 'user_LOGIN' as const;
export const USER_LOGOUT = 'user_LOGOUT' as const;

export const userLogin = (userInfo: ResponseUserType) => ({
  type: USER_LOGIN,
  payload: userInfo
});

export const userLogout = () => ({ type: USER_LOGOUT });
