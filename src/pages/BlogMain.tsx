import { useState } from 'react';
import { useReqPostQuery } from '@/lib/api/useQueries';
import Helmet from '@shared/Helmet';
import TagCategories from '@/components/categories/TagCategories';
import { Container, Col } from 'react-bootstrap';
import GridItemContainer from '@shared/GridItemContainer';
import PostCard from '@/components/Post/PostCard';
import NoResults from '@shared/NoResults';
import { TagType } from '@/lib/api/types';
// import FullScreenMessage from '@shared/FullScreenMessage';
// import Banner from '@shared/Banner';

const BlogMain = () => {
  const [tag, setTag] = useState<Partial<TagType>>({ label: 'All' });
  const { data, isError } = useReqPostQuery(tag);

  const tagSearchHandler = (tag: TagType) => setTag(tag);

  // if (isLoading) return <div style={{ fontSize: '5rem' }}>Loading....</div>;
  // if (!data) return null;
  if (isError) return null;
  // if(!data) return null;
  return (
    <main>
      <Helmet
        title="Welcome to hk's blog"
        desc="2년차 개발자의 기술 블로그 입니다."
        url="/"
        keyword="klog, blog, tech, list, posts, 포스트 목록"
      />
      {/* <Banner title="hk's Blog" subTitle="Welcome my page!" $shadow /> */}

      {data && (
        <>
          <TagCategories tags={data.tags} tagSearchHandler={tagSearchHandler} />
          <Container className="pb-3">
            <GridItemContainer>
              {data.posts.length >= 1 ? (
                data.posts.map((post) => (
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
