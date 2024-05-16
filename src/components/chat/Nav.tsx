import Flex from '../shared/Flex';
import Button from '../shared/Button';
import { useDispatch } from 'react-redux';
import { showHome, showRoom } from '@/store/chat/action';
import { useChatState } from '@/lib/hooks/useStore';

const Nav = () => {
  const dispatch = useDispatch();
  const { currentPage } = useChatState();

  return (
    <Flex>
      <Button
        size="large"
        $weak={currentPage !== 'home'}
        style={{ flex: 1 }}
        onClick={() => dispatch(showHome())}
      >
        Home
      </Button>
      <Button
        size="large"
        $weak={currentPage !== 'room'}
        style={{ flex: 1 }}
        onClick={() => dispatch(showRoom())}
      >
        ChatRoom
      </Button>
    </Flex>
  );
};

export default Nav;
