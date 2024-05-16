import axios, { AxiosError } from 'axios';
import {
  type ServerDefaultResponseType,
  type NewPostType,
  type PostType,
  type createUserApiType,
  type loginUserApiType,
  type UserRole,
  type Msg
} from './types';
import { Room } from '@/store/chat/types';
const { VITE_API_URL, VITE_ENV } = import.meta.env;

const basicInstance = axios.create({
  baseURL: VITE_ENV === 'production' ? VITE_API_URL : 'http://localhost:8800',
  // baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

basicInstance.interceptors.response.use(
  (res) => (console.log(), res),
  (e) => {
    console.log('%cInterceptor', 'color: red');
    if (e instanceof AxiosError) {
      // console.log('AxiosError', e);
      // const Err = new Error(e.message);
      // Err.name = e.name;
      // console.log(e.response, '<<<<');
      // throw Err;
      return Promise.reject(e.response?.data);
    }
    if (e instanceof Error) {
      console.log('Normal Error', e);
    }

    throw new Error(e);
  }
);

export const getPostsData = async <T>(id?: string | null) => {
  // console.log('api request', id);
  // try {
  const { data } = await basicInstance.get<T>(
    `/klog/post${id ? `/tag/${id}` : ''}`
    // `/blog/${id ? 'tag' : 'posts'}${id ? `/${id}` : ''}`
  );

  // console.log(data, 'PostsDatas');

  return data;
  // } catch (e) {
  // if (e instanceof AxiosError) {
  //   console.log(e, '???????');
  //   throw new Error(e.message);
  // }
  // if (e instanceof Error) {
  //   console.log('>>>>', e, '<<<');
  //   throw new Error(e.message);
  // }
  // console.log(e, '::::::::::');
  // }
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

export const createPost = async <T>(post: NewPostType) => {
  try {
    const { data } = await basicInstance.post<ServerDefaultResponseType<T>>(
      // '/klog/post/create',
      '/blog/write',
      { ...post },
      {
        withCredentials: true
      }
    );
    // const { data } = await testApi.post<ServerDefaultResponseType<T>>("/klog/post/create", { data: post });

    return data;
  } catch (e) {
    const { message } = e as AxiosError;
    throw new Error(message);
  }
};

// export const createPost2 = async() =

export const editPost = async <T>(post: Omit<PostType, 'createdAt'>) => {
  try {
    const { data } = await basicInstance.post<ServerDefaultResponseType<T>>(
      '/klog/post/edit',
      // `/blog/post/${post.id}`,
      post
    );
    return data;
  } catch (e) {
    console.log(e, 'Edit Zone');
    const { message } = e as AxiosError;
    throw new Error(message);
  }
};

export const reqSavedTagDatas = async <T>() => {
  try {
    const { data } =
      await basicInstance.get<ServerDefaultResponseType<T>>('/klog/tags');

    return data;
  } catch (e) {
    const { message } = e as AxiosError;
    throw new Error(message);
  }
};

export const createUser: createUserApiType = async (userInfo) => {
  const result = await basicInstance.post('/user/create', userInfo);
  return result.data;
};

export const loginUser: loginUserApiType = async (userInfo: {
  nickName: string;
  password: string;
}) => {
  const result = await basicInstance.post('/user', userInfo, {
    withCredentials: true
  });
  return result.data;
};

export const getUserInfo = async (): Promise<
  ServerDefaultResponseType<{ nickName: string; role: UserRole; id: string }>
> => {
  const result = await basicInstance.get('/user', {
    withCredentials: true
  });

  return result.data;
};

export const getMessages = async (): Promise<
  ServerDefaultResponseType<Msg[]>
> => {
  const result = await basicInstance.get('/msg', {
    withCredentials: true
  });

  return result.data;
};

export const sendMsg = async (
  msg: string,
  roomId?: string
): Promise<ServerDefaultResponseType<Msg>> => {
  console.log(roomId, ' < , <<');
  const result = await basicInstance.post(
    `/msg${roomId ? `/room/${roomId}` : ''}`,
    { msg },
    {
      withCredentials: true
    }
  );
  return result.data;
};

export const getRooms = async (): Promise<
  ServerDefaultResponseType<Room[]>
> => {
  const result = await basicInstance.get('/msg/room', {
    withCredentials: true
  });

  return result.data;
};

export const getMessagesByRoomId = async (
  roomId: string
): Promise<ServerDefaultResponseType<Msg[]>> => {
  const result = await basicInstance.get(`/msg/${roomId}`, {
    withCredentials: true
  });
  return result.data;
};
