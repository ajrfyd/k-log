import { useMutation } from '@tanstack/react-query';
import { editPost, createPost, createUser, loginUser } from './api';
import { AxiosError } from 'axios';
import {
  NewPostType,
  NewUserResponseType,
  ServerDefaultResponseType,
  LoginUserInfoType
} from './types';
import { type UserSignupType } from '../types/types';
import { type ResponseUserType } from '@/store/user/types';

// export const createOrUpdatePostMutation = (
//   post: NewPostType,
//   successFn: (data: string) => void,
//   errorFn: () => void,
//   isEdit: boolean,
//   id?: string
// ) => {
//   return useMutation({
//     mutationKey: [isEdit ? 'updatePost' : 'createPost', isEdit ? id : ''],
//     mutationFn: () => (isEdit ? editPost2(post) : createPost2(post)),
//     onSuccess: successFn,
//     onError: errorFn
//   });
// };

export const useMutatePost = (
  post: NewPostType,
  successFn: (data: string) => void,
  errorFn: (
    error: AxiosError<{ status: number; message: string; result: null }>
  ) => void,
  isEdit: boolean,
  id: string
) => {
  return useMutation({
    mutationKey: [isEdit ? 'updatePost' : 'writePost', isEdit ? id : ''],
    mutationFn: () =>
      isEdit ? editPost<string>({ ...post, id }) : createPost<string>(post),
    onSuccess: (data) => successFn(data.result),
    onError: (
      error: AxiosError<{ status: number; message: string; result: null }>
    ) => errorFn(error)
  });
};

export const signupMutation = (
  newUser: UserSignupType,
  onSuccessFn: (data: ServerDefaultResponseType<NewUserResponseType>) => void,
  onErrorFn: (err: ServerDefaultResponseType<null>) => void
) => {
  return useMutation({
    mutationKey: ['createUser', newUser.nickName],
    mutationFn: () => createUser(newUser),
    onSuccess: onSuccessFn,
    onError: onErrorFn
  });
};

export const loginMutation = (
  { userInfo, socketId }: { userInfo: LoginUserInfoType; socketId: string },
  onSuccessFn: (res: ServerDefaultResponseType<ResponseUserType>) => void,
  onErrorFn: (err: ServerDefaultResponseType<null>) => void
) => {
  return useMutation({
    mutationKey: ['loginUser', userInfo.nickName],
    mutationFn: () => loginUser(userInfo, socketId),
    onSuccess: onSuccessFn,
    onError: onErrorFn
  });
};
