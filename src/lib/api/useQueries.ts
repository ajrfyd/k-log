import { useQuery } from '@tanstack/react-query';
import { getPostsData, getPostById } from './api';
import { PostListType, TagType, PostType } from './types';

export const useReqPostQuery = (tag: Partial<TagType> = { label: 'All' }) => {
  // 계속 fetching 일어 난다
  // Todo staleTime or gcTime 설정 하여 필터링 하자 !
  const { data, isError } = useQuery({
    // queryKey: ['GetPostsData'],
    // staleTime: 1000 * 60,
    queryFn: () => getPostsData<PostListType>(tag.value ? tag.value : null),
    // select: (res) =>
    //   tag.label === 'All'
    //     ? res.result
    //     : {
    //         ...res.result,
    //         posts: res.result.posts.filter((post) =>
    //           post.tags.some((pTag) => pTag.id === tag.value)
    //         )
    //       }

    // gcTime: 1000 * 1
    queryKey: ['GetPostsData', `${tag.value ? tag.value : 'All'}`],
    select: (res) => res.result
  });

  return { data, isError };
};

export const useReqPostById = (id: string) => {
  const { data, isError } = useQuery({
    queryKey: ['getPostById', id],
    queryFn: () => getPostById<PostType>(id),
    select: (res) => res.result
  });
  return { data, isError };
};

// export const useReqPostById = (state: PostType | null, id: string) => {
//   if (!state) {
//     const { data, isLoading, isError } = useSuspenseQuery({
//       queryKey: ['GetPostById'],
//       queryFn: () => getPostById<PostType>(id),
//       select: (res) => res.result
//       // staleTime: 5 * 60 * 1000
//     });

//     return { data, isLoading, isError };
//   }
//   return { data: { ...state }, isLoading: false, isError: false };
// };

// export const useReqPostByIdQuery = (id: string, hasData: boolean) => {
//   const { data, isLoading, isError, isSuccess } = useQuery({
//     queryKey: ['GetPostById'],
//     queryFn: () => getPostById<PostType>(id),
//     select: (res) => res.result,
//     enabled: !hasData
//   });

//   return { data, isLoading, isError, isSuccess };
// };
