import { axiosInstance } from './axios';
import { type BaseServerResponse } from '../types/common';
import { type Room } from '@/store/chatt/types';
import { type Msg } from './types';

export const getUserRole = async (): Promise<
  BaseServerResponse<{ role: 'admin' | 'user' }>
> => {
  const { data } = await axiosInstance.get(`/user/role`);

  return data;
};

export const getCheckUser = async (): Promise<{
  id: string;
  nickName: string;
  role: 'admin' | 'user';
  roomId: string;
} | null> => {
  const { data } = await axiosInstance.get('/user/check');

  return data.result;
};

export const getRooms = async (): Promise<BaseServerResponse<Room[]>> => {
  const { data } =
    await axiosInstance.get<BaseServerResponse<Room[]>>('/msg/room');
  return data;
};

export const getMessages = async (): Promise<BaseServerResponse<Msg[]>> => {
  const { data } = await axiosInstance.get<BaseServerResponse<Msg[]>>('/msg');
  return data;
};

export const getMessagesById = async (
  roomId: string | null
): Promise<Msg[]> => {
  const { data } = await axiosInstance.get<BaseServerResponse<Msg[]>>(
    `/msg/${roomId}`
  );
  return data.result;
};

export const sendMsg = async (
  msg: string,
  roomId: string | null = null
): Promise<BaseServerResponse<Msg>> => {
  const { data } = await axiosInstance.post<BaseServerResponse<Msg>>(
    `/msg${roomId ? `/room/${roomId}` : ''}`,
    { msg }
  );

  return data;
};
