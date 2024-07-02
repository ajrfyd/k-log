import { PostType } from '@lib/types/post';
import { getTags, setTags, setAll } from './action';

export type Tag = {
  id: string;
  label: string;
};

export type InitialState = {
  posts: PostType[];
  tags: Tag[];
};

export type ActionType =
  | ReturnType<typeof getTags>
  | ReturnType<typeof setTags>
  | ReturnType<typeof setAll>;
