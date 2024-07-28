import { useParams } from 'react-router-dom';
import Flex from '@shared/Flex';
import Text from '@shared/Text';
import Post from '@/components/Post/Post';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState2 } from '@/lib/hooks/useStore';
// import useUser from '@/lib/hooks/useUser';

const ManagePost = () => {
  const { id } = useParams();
  const user = useUserState2();
  // const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) return;
    console.log(user);
    if (user && user.role === 'user') return navigate('/', { replace: true });
  }, [user, id]);

  return (
    <main>
      <Container>
        <Flex direction="column">
          <Text
            text={`${id ? 'Edit' : 'New'} Post`}
            size="big"
            color="purple"
          />
          <Post />
        </Flex>
      </Container>
    </main>
  );
};

export default ManagePost;
