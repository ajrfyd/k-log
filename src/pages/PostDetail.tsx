import { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Helmet from '@shared/Helmet';
import MDEditor from '@uiw/react-md-editor';
import { Container } from 'react-bootstrap';
import { useUserState2 } from '@/lib/hooks/useStore';
import Banner from '@shared/Banner';
import Iconbutton from '@shared/IconButton';
import ModifyIcon from '@/components/iconComponents/ModifyIcon';
import useGetPost from '@/lib/queries/useGetPost';
import Loading from '@/components/shared/Loading';
// import { useReqPostById } from '@lib/api/useQueries';
// import useUser from '@/lib/hooks/useUser';
// import { Suspense } from 'react';
// import FullScreenMessage from '@/components/shared/FullScreenMessage';

const PostDetail = () => {
  const { id } = useParams();
  const { data: postData, isLoading, error } = useGetPost(id as string);
  const navigate = useNavigate();
  const { role } = useUserState2();
  // const { user } = useUser();
  // const { data, isLoading } = useReqPostById(id as string);

  if (isLoading) <Loading />;

  if (error) {
    const err = new Error(error.message);
    err.name = err.name || 'Unexpected Error';
    throw err;
  }
  if (!postData) return null;

  return (
    <main>
      <Helmet
        title={postData.title}
        desc={`${postData.title} - ${postData.tags.map(
          (tag: { id: string; label: string }) => tag.label
        )}`}
        url={`/post/${postData.id}`}
        keywords={postData.tags.map(({ label }) => label).join(', ')}
      />
      <Banner title={postData.title} />
      {postData && (
        <Container className="position-relative">
          <MDEditor.Markdown
            source={postData.body}
            style={{
              marginTop: '1rem',
              whiteSpace: 'pre-wrap',
              minHeight: '300px',
              borderRadius: '5px',
              padding: '4rem 1rem',
              background: 'var(--white)',
              color: 'var(--purple)'
            }}
          />
          {role === 'admin' && (
            <Iconbutton
              onClick={() =>
                navigate(`/write/${postData.id}`, {
                  state: postData,
                  replace: true
                })
              }
              style={{
                position: 'absolute',
                right: '1.5rem',
                top: '1rem'
              }}
              mode="right"
            >
              <ModifyIcon />
            </Iconbutton>
          )}
        </Container>
      )}
    </main>
  );
};

export default memo(PostDetail);
