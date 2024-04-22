import { useQuery } from '@tanstack/react-query';
import { getPostsData } from './api';
import { PostListType, TagType } from './types';

export const useReqPostQuery = (isFetching: boolean, tag?: TagType) => {
  const { data, isLoading, isError } = useQuery<PostListType>({
    queryKey: ['GetPosts'],
    queryFn: () => getPostsData(tag ? tag.value : null),
    enabled: isFetching
  });

  return { data, isLoading, isError };
};
