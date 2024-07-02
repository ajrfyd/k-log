import { useQuery } from '@tanstack/react-query';
import { getPostsByTag } from '@lib/api/post';
import { BaseServerResponse, UseQueryCustomOptions } from '../types/common';
import { PostType } from '../types/post';

const useGetPostsByTagId = (
  id: string,
  queryOptions?: UseQueryCustomOptions<BaseServerResponse<PostType[]>>
) =>
  useQuery({
    queryKey: [],
    queryFn: () => getPostsByTag(id),
    ...queryOptions
  });

export default useGetPostsByTagId;
