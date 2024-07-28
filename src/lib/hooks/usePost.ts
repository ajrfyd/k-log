import { useCallback, useEffect, useState } from 'react';
import useGetPostsData from '@/lib/queries/useGetPosts';
import useGetPostsByTagId from '@lib/queries/useGetPostsByTagId';
import { type TagType, type PostType } from '@lib/types/post';
import { PostsDataType } from '../api';
// import { setTags } from '@/store/post/action';

const usePost = () => {
  const [postsData, setPostsData] = useState<PostsDataType>({
    posts: [],
    tags: []
  });

  const [selectedTag, setSelectedTag] = useState<TagType>({
    id: 'a8c69f24-d448-4d23-aef7-22f4b62415b5',
    label: 'All'
  });

  const [trigger, setTrigger] = useState(false);

  const setPosts = (postData: PostType[]) =>
    setPostsData((prev) => ({ ...prev, posts: postData }));

  const setSelectHandler = useCallback(
    (tag: { label: string; value: string }) => {
      if (!postsData) return;
      const { tags } = postsData;
      const filteredTag = tags.filter((oTag) => oTag.label === tag.label);

      setSelectedTag((prev) => ({
        ...prev,
        id: filteredTag[0].id,
        label: tag.label
      }));
      setTrigger(true);
    },
    [postsData]
  );

  const { data: initialData } = useGetPostsData();
  // 태그 포스트 모두 조회 쿼리
  // 포스트 by 태그아이디 조회 쿼리
  // ! length 0 일때 고려
  // ! but Defatul { id: "", label: "All" } 설정 해 줬는데 왜?

  const { data: postsDataByTagId } = useGetPostsByTagId(selectedTag.id, {
    enabled: trigger
  });

  useEffect(() => {
    if (!initialData) return;
    const { result } = initialData;
    // console.log('useEffect!');

    setPostsData((prev) => ({
      ...prev,
      posts: result.posts,
      tags: result.tags
    }));
  }, [initialData]);

  useEffect(() => {
    //* trigger > true 일때 태그가 바뀐것
    //* setSelectedTag 에서 state 변경
    if (trigger) {
      setTrigger(false);
    }
    if (!trigger && postsDataByTagId) {
      setPosts(postsDataByTagId.result);
    }
  }, [trigger, postsDataByTagId]);

  // console.log(postsDataByTagId, 'postsDataByTagId');
  return { setSelectedTag, selectedTag, postsData, setSelectHandler };
};

export default usePost;
