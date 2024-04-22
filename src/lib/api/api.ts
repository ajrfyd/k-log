import axios, { AxiosError } from 'axios';
import { PostListType } from './types';
const { VITE_API_URL } = import.meta.env;

const basicInstance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getPostsData = async <T = PostListType>(
  id?: string | null
): Promise<T> => {
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
