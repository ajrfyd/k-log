import { createPortal } from 'react-dom';
import ChatOutter from '@/components/chat/ChatOutter';
import styled, { css } from 'styled-components';
import Iconbutton from '@components/shared/IconButton';
import ChatBalloon from '@components/iconComponents/ChatBalloon';
import { useChatState } from '@/lib/hooks/useStore';
import { useDispatch } from 'react-redux';
import { open, close } from '@store/chat/action';
import useUser from '@/lib/hooks/useUser';
import { useMessages } from '@/lib/api/useQueries';
import { useNavigate } from 'react-router-dom';
import { notify } from '@/store/notify/actions';
import { useCallback, useEffect } from 'react';
import { setMessages } from '@store/chat/action';

const ChatView = () => {
  const { show, currentPage, socket } = useChatState();
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useMessages(user.isLogin);

  const needToLoginHandler = useCallback(() => {
    dispatch(notify('회원 정보가 필요한 페이지 입니다.', 'info'));
    navigate('/login', { replace: true });
  }, [dispatch]);

  useEffect(() => {
    if (!data || !user.isLogin) return;
    dispatch(setMessages(data));
  }, [data, dispatch]);

  const $container = document.getElementById('chat-portal');
  if (!$container) return null;
  if (!socket) return null;

  return createPortal(
    <>
      <Container $show={show}>
        <ChatOutter currentPage={currentPage} />
      </Container>
      <Iconbutton
        $chatBtn
        // onClick={() => (show ? dispatch(close()) : dispatch(open()))}
        onClick={() =>
          user.nickName === '' && user.token === ''
            ? needToLoginHandler()
            : show
              ? dispatch(close())
              : dispatch(open())
        }
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
