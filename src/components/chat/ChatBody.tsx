import { useEffect } from 'react';
import Flex from '../shared/Flex';
import styled from 'styled-components';
import InsertArea from './InsertArea';
import Message from './Message';
import Text from '../shared/Text';
import { useUserState } from '../../lib/hooks/useStore';
import useChat from '@/lib/hooks/useChat';
// import useUser from '@/lib/hooks/useUser';
// import { useDispatch } from 'react-redux';
// import { setMessages } from '@/store/chat/action';
// import useSocket from '@/lib/hooks/useSocket';
// import { useDispatch } from 'react-redux';
// import { close } from '@/store/chat/action';
// import { useNavigate } from 'react-router-dom';
// import { notify } from '@/store/notify/actions';

type ChatBodyProps = {
  roomId?: string;
};

const ChatBody = ({ roomId }: ChatBodyProps) => {
  const { msgs, socket, isAdmin } = useChat();
  const user = useUserState();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (!socket || !roomId || isAdmin) return;
    // if (!isAdmin) return;
    socket.emit('readMsgs', { createUserId: user.id, roomId });
  }, [socket, user, roomId]);

  useEffect(() => {
    if (!socket) return;
    socket.on('zzz', console.log);
  }, [socket]);

  // console.log('Chat Body');
  return (
    <OvFlex>
      <Container>
        {!msgs.length && (
          <Text text="아직 메시지가 없습니다." color="purple" size="large" />
        )}
        {msgs &&
          msgs.map((msg) => (
            <Message key={`${msg.msgId}-${msg.createdAt}`} {...msg} />
          ))}
      </Container>
      <InsertArea roomId={roomId} />
    </OvFlex>
  );
};

export default ChatBody;

const OvFlex = styled(Flex)`
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  display: flex;
  padding-bottom: 2px;
`;

const Container = styled.section`
  overflow-y: scroll;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0.6rem;
`;
