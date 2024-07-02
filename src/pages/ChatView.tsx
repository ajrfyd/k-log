import { createPortal } from 'react-dom';
import ChatOutter from '@/components/chat/ChatOutter';
import styled, { css } from 'styled-components';
import Iconbutton from '@components/shared/IconButton';
import ChatBalloon from '@components/iconComponents/ChatBalloon';
import { useDispatch } from 'react-redux';
import useUser from '@/lib/hooks/useUser';
import { useMessages } from '@/lib/api/useQueries';
import { useEffect } from 'react';
import { setMessages } from '@store/chat/action';
import useChat from '@/lib/hooks/useChat';

const ChatView = () => {
  const { open, close, show, currentPage } = useChat();
  const { user } = useUser();
  const { data } = useMessages(user.isLogin);
  const dispatch = useDispatch();
  const { VITE_ENV } = import.meta.env;

  useEffect(() => {
    if (!data || !user.isLogin) return;
    dispatch(setMessages(data));
  }, [data, dispatch]);

  const $container = document.getElementById('chat-portal');
  if (!$container) return null;
  // if (!socket) return null;

  return createPortal(
    <>
      <Container $show={show}>
        <ChatOutter currentPage={currentPage} />
      </Container>
      <Iconbutton
        $chatBtn
        onClick={() => (show ? close() : open())}
        mode={VITE_ENV === 'development' ? 'left' : 'right'}
      >
        <ChatBalloon />
      </Iconbutton>
    </>,
    $container
  );
};

export default ChatView;

const Container = styled.div<{ $show: boolean }>`
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  width: 0;
  width: 420px;
  opacity: 0;
  visibility: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 9px;
  z-index: ${({ theme }) => theme.zIndex.chatBody};
  /* display: flex; */
  /* flex-direction: column; */
  transition: all 0.4s ease;

  ${({ $show }) =>
    $show &&
    css`
      height: 600px;
      opacity: 1;
      visibility: visible;
    `}
`;
