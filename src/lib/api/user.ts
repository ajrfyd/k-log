import { BaseServerResponse } from '../types/common';
import { axiosInstance } from './axios';
import { ServerResponseLoginUserInfo } from './types';

export const userLogin = async (
  userInfo: { nickName: string; password: string },
  socketId: string
): Promise<BaseServerResponse<ServerResponseLoginUserInfo>> => {
  const result = await axiosInstance.post<
    BaseServerResponse<ServerResponseLoginUserInfo>
  >('/user', userInfo, {
    withCredentials: true,
    headers: {
      'X-Socket-Id': socketId
    }
  });

  return result.data;
};

export const createNickName = async (nickName: string, socketId: string) => {
  const result = await axiosInstance.post('/user/create/nickname', {
    nickName,
    socketId
  });
  return result.data;
};
