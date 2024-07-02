import { PostType } from '@/lib/types/post';
import { type Tag } from './type';

export const POST_GET_TAGS = 'post_GET_TAGS' as const;
export const POST_SET_TAGS = 'post_SET_TAGS' as const;
export const POST_SET_ALL = 'post_SET_ALL' as const;

export const getTags = () => ({ type: POST_GET_TAGS });

export const setTags = (tags: Tag[]) => ({
  type: POST_SET_TAGS,
  payload: tags
});

export const setAll = (data: { posts: PostType[]; tags: Tag[] }) => ({
  type: POST_SET_ALL,
  payload: data
});
