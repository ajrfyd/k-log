import { useMutation } from '@tanstack/react-query';
import { BaseServerResponse, UseMutationCustomOptions } from '../types/common';
import { LoginUserInfoType, ServerResponseLoginUserInfo } from '../api/types';
import { queryKeys } from '../constants/queryKeys';
import { userLogin } from '../api';

const useMutateLogin = (
  mutationOptions?: UseMutationCustomOptions<
    BaseServerResponse<ServerResponseLoginUserInfo>
  >
) =>
  useMutation({
    mutationKey: [queryKeys.REQ_LOG_IN],
    mutationFn: ({
      userInfo,
      socketId
    }: {
      userInfo: LoginUserInfoType;
      socketId: string;
    }) => userLogin(userInfo, socketId),
    ...mutationOptions
  });

export default useMutateLogin;
