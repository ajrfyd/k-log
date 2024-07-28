import { useQuery } from '@tanstack/react-query';
import { getMessages } from '../api';
import { BaseServerResponse, UseQueryCustomOptions } from '../types/common';
import { Msg } from '../api/types';
import { queryKeys } from '../constants/queryKeys';

const useGetMessages = (
  queryOptions?: UseQueryCustomOptions<BaseServerResponse<Msg[]>, Msg[]>
) =>
  useQuery({
    queryKey: [queryKeys.GET_MESSAGES],
    queryFn: getMessages,
    select: (res) => res.result,
    gcTime: 0,
    ...queryOptions
  });

export default useGetMessages;
