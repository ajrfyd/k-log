import Flex from '../shared/Flex';
import Button from '../shared/Button';
import { useDispatch } from 'react-redux';
import { showHome, showRoom } from '@/store/chat/action';
import { useUserState } from '@/lib/hooks/useStore';
import { setMessages } from '@/store/chat/action';
import useChat from '@/lib/hooks/useChat';

const Nav = () => {
  const dispatch = useDispatch();
  // const { currentPage, msgs, isAdmin } = useChatState();
  const { currentPage, msgs, isAdmin, socket } = useChat();
  const { id, roomId } = useUserState();

  const onMoveChatRoomHandler = () => {
    if (!isAdmin && socket) {
      dispatch(
        setMessages(
          msgs.map((msg) => ({
            ...msg,
            msgState: msg.createUserId !== id ? 'A' : msg.msgState
          }))
        )
      );

      socket.emit('readMsgs', { createUserId: id, roomId });
    }

    dispatch(showRoom());
  };

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
        onClick={onMoveChatRoomHandler}
      >
        ChatRoom
      </Button>
    </Flex>
  );
};

export default Nav;
