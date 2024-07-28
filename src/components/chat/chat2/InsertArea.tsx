import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSocketState, useUserState2 } from '@/lib/hooks/useStore';
import useChat2 from '@/lib/hooks/useChat2';
import useSendMessage from '@/lib/queries/useSendMessage';
import { notify } from '@/store/notify/actions';
import Flex from '@shared/Flex';
import Button from '@shared/Button';
import Insert from './Insert';
// import useSendMessage from '@/lib/hooks/useSendMessage';
// import { pushMsg } from '@/store/chat/action';

// type InsertAreaProps = {
//   roomId?: string;
// };

const InsertArea = () => {
  const dispatch = useDispatch();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [msg, setMsg] = useState('');
  const socket = useSocketState();
  const user = useUserState2();
  const { saveMsg, selectedRoom } = useChat2();

  const { mutate } = useSendMessage({
    onSuccess: ({ result }) => {
      saveMsg(result);
      setMsg('');
    },
    onError: (e) => dispatch(notify(e.message))
  });

  const sendMsgHandler = useCallback(async () => {
    if (!textRef.current) return;
    if (!msg.length) {
      textRef.current.focus();
      dispatch(notify('메세지를 입력해 주세요.', 'error'));
      return;
    }
    if (!socket.socket) return;
    mutate({
      msg,
      roomId: user.role === 'admin' ? selectedRoom : null
    });
    textRef.current.focus();
  }, [msg, dispatch, socket]);

  return (
    <Flex style={{ marginTop: '1rem', gap: '8px' }}>
      {/* <Input style={{ flex: 1 }} disabled /> */}
      <Insert
        ref={textRef}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        maxLength={1000}
      />
      <Button size="medium" onClick={sendMsgHandler}>
        전 송
      </Button>
    </Flex>
  );
};

export default InsertArea;
