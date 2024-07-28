import styled, { css, keyframes } from 'styled-components';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useUserState2 } from '@/lib/hooks/useStore';
import Flex from '@/components/shared/Flex';
import Nav from '@/components/chat/chat2/Nav';
import Home from '@/components/chat/chat2/Home';
import Room from '@/components/chat/chat2/Room';
import NickNameSelect from '@/components/chat/chat2/NickNameSelect';
import SelectRoom from '@/components/chat/chat2/SelectRoom';

type ChatViewProps = {
  show: boolean;
  // setShow: () => React.SetStateAction<boolean>;
  // setClose: () => React.SetStateAction<boolean>;
};

export type Menu = 'home' | 'room';

const chatView2 = ({ show }: ChatViewProps) => {
  const $container = document.getElementById('chat-portal2');
  if (!$container) return null;
  const user = useUserState2();
  const [menu, setMenu] = useState<Menu>('home');

  const selectHomeHandler = useCallback(() => setMenu('home'), []);
  const selectRoomHandler = useCallback(() => setMenu('room'), []);

  return createPortal(
    <>
      <Container $show={show}>
        <Flex direction="column" style={{ height: '100%' }}>
          <ChatBody>
            {menu === 'home' && user.role === 'user' && (
              <Home nickName={user.nickName as string} />
            )}
            {menu === 'home' && user.role === 'admin' && (
              <SelectRoom roomSelectHandler={selectRoomHandler} />
            )}
            {menu === 'room' && !user.isLogin && (
              <NickNameSelect nickName={user.nickName as string} />
            )}
            {menu === 'room' && user.isLogin && <Room />}
            {/* <Home /> */}
          </ChatBody>
          {/* 로그인 및 로그아웃이 상태 변경 안해줘서 리랜더링 안일어 남? */}
          {/* <Flex direction="column"> */}
          <Nav
            menu={menu}
            selectHomeHandler={selectHomeHandler}
            selectRoomHandler={selectRoomHandler}
            // menuChangeHandler={menuChangeHandler}
            role={user.role}
          />
        </Flex>
        {/* <ChatContainer show={show} /> */}
      </Container>
    </>,
    $container
  );
};

export default chatView2;

const Tt = keyframes`
  from {
    visibility: hidden;
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    visibility: visible;
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div<{ $show: boolean }>`
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  width: 420px;
  /* min-height: 640px; */
  /* max-height: 640px; */
  height: 640px;
  overflow: hidden;
  /* visibility: hidden; */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 9px;
  z-index: ${({ theme }) => theme.zIndex.chatBody};
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

  ${({ $show }) =>
    $show &&
    css`
      animation: ${Tt} 0.4s;
    `}
`;

const ChatBody = styled.div`
  flex: 1;
`;
