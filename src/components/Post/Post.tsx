import { useLocation } from 'react-router-dom';
import { useReqSavedTagDatas } from '@/lib/api/useQueries';
import { ServerTagType } from '@/lib/api/types';
import PostForm from './PostForm';

type PostType = {
  title: string;
  body: string;
  localTags: ServerTagType[];
};

export type PostStateType = Omit<PostType, 'localTags'> & {
  id: string;
  tags: ServerTagType[];
  createdAt: Date;
};

// Todo input select 수정
const Post = () => {
  const { state } = useLocation() as { state: PostStateType };
  const { tagList } = useReqSavedTagDatas();
  if (!tagList) return null;

  return <PostForm state={state} tagList={tagList} />;
};

export default Post;
