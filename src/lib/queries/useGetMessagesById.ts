import { useQuery } from '@tanstack/react-query';
import { UseQueryCustomOptions } from '../types/common';
import { getMessagesById } from '../api/chat';
import { queryKeys } from '../constants/queryKeys';
import { Msg } from '../api/types';

const useGetMessagesById = (
  id: string | null,
  queryOptions?: UseQueryCustomOptions<Msg[]>
) =>
  useQuery({
    queryKey: [queryKeys.GET_MESSAGES_BY_ID, id],
    queryFn: () => getMessagesById(id),
    enabled: !!id,
    ...queryOptions
  });

export default useGetMessagesById;
