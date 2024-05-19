import styled, { css } from 'styled-components';
import { useEffect, useRef } from 'react';
import { type Msg } from '@/store/chat/types';
import Flex from '../shared/Flex';
import Text from '../shared/Text';
import { useUserState } from '@/lib/hooks/useStore';

type MsgProps = Partial<Msg> & {};

const Message = ({ msg, createUserId, createdAt, msgState }: MsgProps) => {
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const user = useUserState();
  const me = user.id === createUserId;
  const date = new Intl.DateTimeFormat('KO-KR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(createdAt as Date));

  useEffect(() => {
    if (!msgRef.current) return;
    const { scrollHeight } = msgRef.current;
    msgRef.current.style.height = `${scrollHeight}px`;
    msgRef.current.scrollIntoView();
  }, []);

  return (
    <Flex direction="column">
      {/* <MsgBox ref={msgRef}> */}
      {/* {msg} */}
      {/* </MsgBox> */}

      <MsgBox value={msg} readOnly ref={msgRef} $me={me} />

      <Ovflex $me={me}>
        <Text text={date} color="brown" />
        <Text
          text={msgState === 'A' ? '읽음' : '안읽음'}
          size="small"
          color="black"
        />
      </Ovflex>
    </Flex>
  );
};

export default Message;

const MsgBox = styled.textarea<{ $me: boolean }>`
  resize: none;
  overflow: hidden;
  width: 50%;
  border-radius: 10px;
  padding: 5px 10px;
  border: none;
  background-color: var(--purple);
  outline: none;
  /* box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4); */
  /* align-self: ${({ $me }) => ($me ? 'flex-end' : 'flex-start')}; */
  ${({ $me }) =>
    $me &&
    css`
      align-self: ${$me ? 'flex-end' : 'flex-start'};
      box-shadow: ${$me
        ? '3px 3px 3px rgba(0, 0, 0, 0.4)'
        : '-3px 3px 3px rgba(0, 0, 0, 0.4)'};
    `}
`;

const Ovflex = styled(Flex)<{ $me: boolean }>`
  /* justify-content: ${({ $me }) => ($me ? 'flex-end' : 'flex-start')}; */
  justify-content: flex-start;
  flex-direction: ${({ $me }) => $me && 'row-reverse'};
  gap: 5px;
  align-items: center;
`;
