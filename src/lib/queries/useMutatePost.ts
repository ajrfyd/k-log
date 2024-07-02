import { useMutation } from '@tanstack/react-query';
import { createPost, updatePost } from '@lib/api/post';
import { UseMutationCustomOptions } from '../types/common';
import { queryClient } from '../api/queryClient';
import { queryKeys } from '../constants/queryKeys';
import { type NewPostData } from '@/lib/types/post';

const useMutatePost = (
  post: NewPostData,
  id?: string,
  mutationOptions?: UseMutationCustomOptions
) =>
  useMutation({
    mutationFn: () => (id ? updatePost({ ...post, id }) : createPost(post)),
    onSuccess: ({ result: { id } }) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, id]
      });
    },
    ...mutationOptions
  });

export default useMutatePost;
