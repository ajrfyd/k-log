import { axiosInstance } from './axios';
import { type BaseServerResponse } from '../types/common';
import { type TagType, type PostType, NewPostData } from '@/lib/types/post';

export type PostsDataType = {
  posts: PostType[];
  tags: TagType[];
};

export const getPostsData = async (): Promise<
  BaseServerResponse<PostsDataType>
> => {
  const { data } = await axiosInstance.get(`/blog/posts`);

  return data;
};

export const getPostById = async (
  id: string
): Promise<BaseServerResponse<PostType>> => {
  const { data } = await axiosInstance.get(`/blog/post/${id}`);
  return data;
};

export const getPostsByTag = async (
  id: string
): Promise<BaseServerResponse<PostType[]>> => {
  const { data } = await axiosInstance.get(`/blog?tagId=${id}`);

  return data;
};

export const createPost = async (
  newPost: NewPostData
): Promise<BaseServerResponse<{ id: string }>> => {
  const { data } = await axiosInstance.post('/blog/write', { ...newPost });

  return data;
};

export const updatePost = async (
  post: NewPostData & { id: string }
): Promise<BaseServerResponse<{ id: string }>> => {
  const { data } = await axiosInstance.post(`/blog/post/${post.id}`, post);
  return data;
};
