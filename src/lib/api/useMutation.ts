import { useMutation } from '@tanstack/react-query';
import { editPost, createPost, createUser, loginUser } from './api';
import { AxiosError } from 'axios';
import {
  NewPostType,
  NewUserResponseType,
  ServerDefaultResponseType,
  LoginUserInfoType,
  ServerResponseLoginUserInfo
} from './types';
import { type UserSignupType } from '../types/types';

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
  userInfo: LoginUserInfoType,
  onSuccessFn: (
    res: ServerDefaultResponseType<ServerResponseLoginUserInfo>
  ) => void,
  onErrorFn: (err: ServerDefaultResponseType<null>) => void
) => {
  return useMutation({
    mutationKey: ['loginUser', userInfo.nickName],
    mutationFn: () => loginUser(userInfo),
    onSuccess: onSuccessFn,
    onError: onErrorFn
  });
};
