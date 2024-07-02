export type PostType = {
  id: string;
  title: string;
  body: string;
  tags: TagType[];
  createdAt: Date;
};

export type TagType = {
  id: string;
  label: string;
};

export type NewPostData = {
  title: string;
  body: string;
  tags?: TagType[];
};
