export type TagType = {
  value: string;
  label: string;
};

export type ServerTagType = {
  id: string;
  label: string;
};

export type PostType = {
  id: string;
  title: string;
  body: string;
  tags: ServerTagType[];
  createdAt: Date;
};

export type PostDataType = {
  status: number;
  result: PostType[];
  message: string;
};

type PostListResultType = {
  posts: PostType[];
  tags: ServerTagType[];
};

export type PostListType = {
  status: string;
  result: PostListResultType;
  message: string;
};

export type TagListResultType = {
  status: string;
  result: ServerTagType[];
  message: string;
};

export type ServerDefaultResponseType<T> = {
  status: number;
  message: string;
  result: T;
};

export type NewPostType = {
  title: string;
  body: string;
  tags: ServerTagType[];
};
