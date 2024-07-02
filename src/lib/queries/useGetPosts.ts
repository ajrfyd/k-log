import { getPostsData } from '@lib/api/post';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/constants/queryKeys';
import { UseQueryCustomOptions } from '@lib/types/common';
import { BaseServerResponse } from '@lib/types/common';
// import { PostType, TagType } from '@lib/types/post';
import { PostsDataType } from '@lib/api/post';
// const useGetPostsData = (
//   queryOptions?: UseQueryCustomOptions,
//   tagId?: string
// ) =>
//   useQuery({
//     queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
//     queryFn: () => getPostsData(tagId),
//     // select: (res) => res
//     ...queryOptions
//   });

const useGetPostsData = (
  queryOptions?: UseQueryCustomOptions<BaseServerResponse<PostsDataType>>
) =>
  useQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    queryFn: () => getPostsData(),
    // select: (res) => (console.log(res), res),
    ...queryOptions
  });

export default useGetPostsData;
