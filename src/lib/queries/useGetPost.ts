import { useQuery } from '@tanstack/react-query';
import { UseQueryCustomOptions } from '../types/common';
import { getPostById } from '@lib/api/post';
import { queryKeys } from '../constants/queryKeys';
import { type PostType } from '../types/post';
import { type BaseServerResponse } from '../types/common';

const useGetPost = (
  id: string,
  queryOptions?: UseQueryCustomOptions<BaseServerResponse<PostType>, PostType>
) =>
  useQuery({
    queryKey: [queryKeys.POST, id],
    queryFn: () => getPostById(id),
    select: (res) => res.result,
    ...queryOptions
  });

export default useGetPost;
