import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
import {
  getPostsData,
  getPostById,
  reqSavedTagDatas,
  getMessages,
  getRooms,
  getMessagesByRoomId
} from './api';
import { PostListType, TagType, PostType, ServerTagType } from './types';

export const useReqPostQuery = (tag: Partial<TagType> = { label: 'All' }) => {
  // 계속 fetching 일어 난다
  // Todo staleTime or gcTime 설정 하여 필터링 하자 !
  const { data, isError, isLoading } = useSuspenseQuery({
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

  return { data, isError, isLoading };
};

export const useReqPostById = (id: string) => {
  const { data, isError, isLoading } = useSuspenseQuery({
    queryKey: ['getPostById', id],
    queryFn: () => getPostById<PostType>(id),
    select: (res) => res.result
  });
  return { data, isError, isLoading };
};

// export const useMutatePost = (
//   post: NewPostType,
//   successFn: (data: string) => void,
//   errorFn: (
//     error: AxiosError<{ status: number; message: string; result: null }>
//   ) => void,
//   isEdit: boolean,
//   id: string,
//   token: string
// ) => {
//   alert(id);
//   return useMutation({
//     mutationFn: () =>
//       isEdit
//         ? editPost<string>({ ...post, id }, token)
//         : createPost<string>(post),
//     onSuccess: (data) => successFn(data.result),
//     onError: (
//       error: AxiosError<{ status: number; message: string; result: null }>
//     ) => errorFn(error)
//   });
// };

export const useReqSavedTagDatas = () => {
  const { data: tagList, isLoading } = useQuery({
    queryKey: [],
    queryFn: reqSavedTagDatas<ServerTagType[]>,
    select: (res) => res.result
  });

  return { tagList, isLoading };
};

export const useMessages = (isLogin: boolean) => {
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ['getMessages'],
    queryFn: getMessages,
    select: (res) => res.result,
    enabled: isLogin
  });

  return { data, isLoading, isSuccess };
};

export const useGetRooms = () => {
  const { data, isError } = useQuery({
    queryKey: ['getRooms'],
    queryFn: getRooms,
    select: (res) => res.result
  });

  return { data, isError };
};

export const useGetMessagesByRoomId = (id: string, clicked: boolean) => {
  console.log(id, '<<<<<<<<<<');
  const { data, isError } = useQuery({
    queryKey: ['getMessagesFromRoomId', id],
    queryFn: () => getMessagesByRoomId(id),
    select: (res) => res.result,
    enabled: clicked
  });

  return { data, isError };
};
