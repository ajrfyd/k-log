import { useParams } from 'react-router-dom';
import Helmet from '@shared/Helmet';
import MDEditor from '@uiw/react-md-editor';
import FullScreenMessage from '@shared/FullScreenMessage';
import { Container } from 'react-bootstrap';
import { useReqPostById } from '@lib/api/useQueries';
import Banner from '@shared/Banner';
// import { Suspense } from 'react';
// import { PostType } from '@/lib/api/types';
// import { MutableRefObject } from 'react';
// import Iconbutton from '@shared/IconButton';
// import { Undo2Icon, FileEditIcon } from 'lucide-react';

const Post = () => {
  const { id } = useParams();
  const { data, isError } = useReqPostById(id as string);
  // const location = useLocation();
  // const state = location.state as PostType;
  // const { title } = useOutletContext<{ title: MutableRefObject<string> }>();
  // console.log(title);
  // title.current = data.title;
  // if (isLoading) return <FullScreenMessage type="loading" />;
  if (!data) return null;
  if (isError) return <FullScreenMessage type="error" />;

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
        </Container>
      )}
    </main>
  );
};

export default Post;
