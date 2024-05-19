import { useNavigate, useParams } from 'react-router-dom';
import Helmet from '@shared/Helmet';
import MDEditor from '@uiw/react-md-editor';
import { Container } from 'react-bootstrap';
import { useReqPostById } from '@lib/api/useQueries';
import Banner from '@shared/Banner';
import useUser from '@/lib/hooks/useUser';
import Iconbutton from '@shared/IconButton';
import ModifyIcon from '@/components/iconComponents/ModifyIcon';

const PostDetail = () => {
  const { id } = useParams();
  const { data } = useReqPostById(id as string);
  const navigate = useNavigate();
  const { user } = useUser();

  if (!data) return null;
  return (
    <main>
      <Helmet
        title={data.title}
        desc={`${data.title} - ${data.tags.map(
          (tag: { id: string; label: string }) => tag.label
        )}`}
        url={`/post/${data.id}`}
        keyword={data.tags.map(({ label }) => label).join(', ')}
      />
      <Banner title={data.title} />
      {data && (
        <Container className="position-relative">
          <MDEditor.Markdown
            source={data.body}
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
          {/* {user && user.role === 'admin' && (
            <Iconbutton
            style={{ position: 'absolute', top: '1rem', right: '1.5rem' }}
            onClick={() => navigate(`/write/${post.id}`, { state: post })}
            >
            <FileEditIcon />
            </Iconbutton>
          )} */}
          {user && user.role === 'admin' && (
            <Iconbutton
              onClick={() =>
                navigate(`/write/${data.id}`, { state: data, replace: true })
              }
              style={{
                position: 'absolute',
                right: '1.5rem',
                top: '1rem'
              }}
            >
              <ModifyIcon />
            </Iconbutton>
          )}
        </Container>
      )}
    </main>
  );
};

export default PostDetail;
