import axios, { AxiosError } from 'axios';
import { ServerDefaultResponseType } from './types';
const { VITE_API_URL } = import.meta.env;

const basicInstance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getPostsData = async <T>(id?: string | null) => {
  // console.log('api request', id);
  try {
    const { data } = await basicInstance.get<T>(
      `/klog/post${id ? `/tag/${id}` : ''}`
    );
    return data;
  } catch (e) {
    const { message } = e as AxiosError;
    throw new Error(message);
  }
};

export const getPostById = async <T>(id: string) => {
  try {
    const { data } = await basicInstance.get<ServerDefaultResponseType<T>>(
      `/klog/post/${id}`,
      { withCredentials: true }
    );
    return data;
  } catch (e) {
    const { message } = e as AxiosError;
    throw new Error(message);
  }
};
