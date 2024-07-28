import { useCallback, useEffect } from 'react';
import { useChatTState } from '@/lib/hooks/useStore';
import styled from 'styled-components';
import { useSocketState, useUserState2 } from '@/lib/hooks/useStore';
import { useDispatch } from 'react-redux';
import useChat2 from '@/lib/hooks/useChat2';
import Flex from '@/components/shared/Flex';
import InsertArea from './InsertArea';
import Msg from './Msg';
import Text from '@/components/shared/Text';
import { Msg as MsgType } from '@/store/chatt/types';
import { visibleHandler } from '../../../store/chatt/action';

const Room = () => {
  const { socket } = useSocketState();
  const { id, roomId, role } = useUserState2();
  const { saveMsg, msgs, selectedRoom } = useChat2();
  const { visible } = useChatTState();
  const dispatch = useDispatch();

  const msgPushHandler = useCallback(
    (msg: MsgType) => {
      const { createUserId } = msg;
      if (createUserId === id) return;
      saveMsg(msg);
    },
    [socket, id]
  );

  useEffect(() => {
    if (!socket) return;
    // socket.socket.emit('giveMsgs', (msgs: any) => {});

    socket.on('receiveMsg', msgPushHandler);
    socket.emit('viewControll', {
      id,
      roomId: role === 'admin' ? selectedRoom : roomId,
      role
    });

    () => {
      if (!socket) return;
      socket.off('receiveMsg', msgPushHandler);
    };
  }, [socket]);

  useEffect(() => {
    if (!visible) {
      dispatch(visibleHandler(true));
    }
    return () => {
      if (visible) {
        dispatch(visibleHandler(false));
      }
    };
  }, [visible]);

  if (!msgs) return;

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      <MsgArea>
        <Container>
          {!msgs.length && (
            <Text text="아직 메시지가 없습니다." color="purple" size="large" />
          )}
          {msgs.map((msg) => (
            <Msg key={msg.msgId} {...msg} />
          ))}
        </Container>
      </MsgArea>
      <InsertArea />
    </Flex>
  );
};

export default Room;

const MsgArea = styled.div`
  overflow: hidden;
  padding: 0.5rem;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border: 5px solid blue;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
  gap: 1rem;
  height: 500px;
  padding: 0.7rem 0.5rem;
`;

// {(role === 'admin' && !selectedRoom) ||
//   (!msgs.length && (
//     <Text
//       text="아직 메시지가 없습니다."
//       color="purple"
//       size="large"
//     />
//   ))}
