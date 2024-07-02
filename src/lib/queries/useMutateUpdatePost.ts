import { updatePost } from '@lib/api/post';

import { useMutation } from '@tanstack/react-query';
import { UseMutationCustomOptions } from '../types/common';
import { queryClient } from '../api/queryClient';
import { queryKeys } from '../constants/queryKeys';

const useMutateUpdatePost = (queryOptions?: UseMutationCustomOptions) =>
  useMutation({
    mutationFn: updatePost,
    onSuccess: ({ result: { id } }) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, id]
      });
    },
    ...queryOptions
  });

export default useMutateUpdatePost;
