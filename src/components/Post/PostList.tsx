import TagCategories from '@/components/categories/TagCategories';
import { Container, Col } from 'react-bootstrap';
import NoResults from '@shared/NoResults';
import GridItemContainer from '@shared/GridItemContainer';
import PostCard from '@/components/Post/PostCard';
import { type TagType } from '@/lib/api/types';
import { useReqPostQuery } from '@/lib/api/useQueries';
import { useState } from 'react';

const PostList = () => {
  const [tag, setTag] = useState<Partial<TagType>>({ label: 'All' });
  const { data } = useReqPostQuery(tag);
  const tagSearchHandler = (tag: TagType) => setTag(tag);

  if (!data) return null;

  return (
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
  );
};

export default PostList;
