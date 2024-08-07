import TagCategories from '@/components/categories/TagCategories';
import { Container, Col } from 'react-bootstrap';
import GridItemContainer from '@shared/GridItemContainer';
import PostCard from '@/components/Post/PostCard';
import usePost from '@/lib/hooks/usePost';
// import NoResults from '@shared/NoResults';

const PostList = () => {
  // const [tag] = useState<Partial<TagType>>({ label: 'All' });
  // const { data } = useReqPostQuery(tag);
  const { postsData, setSelectHandler } = usePost();

  // const tagSearchHandler = (tag: TagType) => setTag(tag);
  // if (!data) return null;
  if (!postsData) return null;

  return (
    <>
      {/* <TagCategories tags={data.tags} tagSearchHandler={tagSearchHandler} /> */}
      {postsData.tags.length ? (
        <TagCategories
          tags={postsData.tags}
          tagSearchHandler={setSelectHandler}
        />
      ) : null}
      <Container className="pb-3">
        <GridItemContainer>
          {postsData.posts.map((post) => (
            <Col key={post.id}>
              <PostCard post={post} />
            </Col>
          ))}
          {/* {postsData.posts.length >= 1 ? (
            postsData.posts.map((post) => (
              <Col key={post.id}>
                <PostCard post={post} />
              </Col>
            ))
          ) : (
            <NoResults />
          )} */}
        </GridItemContainer>
      </Container>
    </>
  );
};

export default PostList;
