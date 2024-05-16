import Flex from '../shared/Flex';
import Button from '../shared/Button';
import Insert from './Insert';
import useSendMessage from '@/lib/hooks/useSendMessage';
import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { pushMsg } from '@/store/chat/action';
import { notify } from '@/store/notify/actions';

type InsertAreaProps = {
  roomId?: string;
};

const InsertArea = ({ roomId }: InsertAreaProps) => {
  const dispatch = useDispatch();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [msg, setMsg] = useState('');

  const { mutate } = useSendMessage(
    msg,
    ({ result }) => {
      dispatch(pushMsg(result));
      setMsg('');
    },
    (e) => {
      dispatch(notify(e.message));
    },
    roomId
  );

  const sendMsgHandler = useCallback(async () => {
    if (!textRef.current) return;
    if (!msg.length) {
      textRef.current.focus();
      dispatch(notify('메세지를 입력해 주세요.', 'error'));
      return;
    }
    mutate();
    textRef.current.focus();
  }, [msg, dispatch]);

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
