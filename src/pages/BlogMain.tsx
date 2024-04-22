import { useReqPostQuery } from '@/lib/api/useQueries';
import { useState } from 'react';
import Helmet from '@shared/Helmet';
import Banner from '@shared/Banner';
import Categories from '@/components/categories/Categories';
import { Container, Col } from 'react-bootstrap';
import GridItemContainer from '@shared/GridItemContainer';
import PostCard from '@/components/Post/PostCard';
import NoResults from '@shared/NoResults';
import { TagType } from '@/lib/api/types';

const BlogMain = () => {
  const [tag, setTag] = useState<TagType | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const { data, isError, isLoading } = useReqPostQuery(isFetching);
  console.log(data);
  console.log(isLoading);

  const tagSearchHandler = (tag: TagType) => {
    setIsFetching(true);
    setTag(tag);
  };

  if (!data) return null;
  if (isLoading) return <div style={{ fontSize: '5rem' }}>Loading....</div>;
  return (
    <main>
      <Helmet
        title="Welcome to hk's blog"
        desc="2년차 개발자의 기술 블로그 입니다."
        url="/"
        keyword="klog, blog, tech, list, posts, 포스트 목록"
      />
      <Banner title="hk's Blog" subTitle="Welcome my page!" $shadow />
      {data && (
        <>
          <Categories
            tags={data.result.tags}
            tagSearchHandler={tagSearchHandler}
          />
          <Container>
            <GridItemContainer>
              {data.result.posts.length >= 1 ? (
                data.result.posts.map((post) => (
                  <Col key={post.id}>
                    <PostCard post={post} />
                  </Col>
                ))
              ) : (
                <NoResults />
              )}
            </GridItemContainer>
          </Container>
        </>
      )}
    </main>
  );
};

export default BlogMain;
