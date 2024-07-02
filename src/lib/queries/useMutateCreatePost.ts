import { useMutation } from '@tanstack/react-query';
import { createPost } from '@lib/api/post';
import { UseMutationCustomOptions } from '../types/common';
import { queryClient } from '../api/queryClient';
import { queryKeys } from '../constants/queryKeys';

const useMutateCreatePost = (mutationOptions?: UseMutationCustomOptions) =>
  useMutation({
    mutationFn: createPost,
    onSuccess: ({ result: { id } }) => {
      console.log(1);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, id]
      });
    },
    ...mutationOptions
  });

export default useMutateCreatePost;
