import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../constants/queryKeys';
import { BaseServerResponse, UseQueryCustomOptions } from '../types/common';
import { getRooms } from '../api/chat';
import { Room } from '@/store/chatt/types';

const useGetRooms = (
  queryOptions?: UseQueryCustomOptions<BaseServerResponse<Room[]>, Room[]>
) =>
  useQuery({
    queryKey: [queryKeys.GET_ROOMS],
    queryFn: getRooms,
    select: (res) => res.result,
    ...queryOptions
  });

export default useGetRooms;
