import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Flex from '@components/shared/Flex';
import Home from './Home';
import useChatUser from '@lib/hooks/useChatUser';
// import Room from './Room';
// import Nav from './Nav';
// import useUser from '@/lib/hooks/useUser';

type ChatContainerProps = {
  show: boolean;
};

const ChatContainer = ({ show }: ChatContainerProps) => {
  // if (!show) return null;
  const { user, userRole } = useChatUser();
  const [animate, setAnimate] = useState(false);
  const [willUnmount, setWillUnmount] = useState(!show);
  // console.log(user);

  useEffect(() => {
    //! Parent state true > false
    if (!willUnmount && !show) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }

    // if (show !== !willUnmount) {
    // }
    setWillUnmount(!show);
    // if (show && !animate) {
    //   setAnimate(true);

    //   setTimeout(() => {
    //     setWillUnmount(true);
    //   }, 500);
    // }

    // setWillUnmount(!show);

    // return () => {
    //   console.log(show, willUnmount);
    //   if (show && animate && willUnmount) {
    //     console.log(willUnmount, '>3<', show);
    //     setAnimate(false);
    //   }
    // };
  }, [show, willUnmount]);

  // if (!show) return null;
  if (willUnmount && !animate) return null;
  // if (!willUnmount && !animate) return null;

  console.log(userRole, '!!!!!!!!!');
  return (
    <Container $show={show} $animate={animate} $willUnmount={willUnmount}>
      {/* <Room /> */}
      <Flex direction="column" style={{ height: '100%' }}>
        <ChatBody style={{ flex: 1 }}>
          <Home nickName={user.nickName} />
        </ChatBody>
        <Flex direction="column">
          {/* <Nav /> */}
          {user && userRole === 'admin' && <p>lorem</p>}
        </Flex>
      </Flex>
    </Container>
  );
};

export default ChatContainer;

const slideUp = keyframes`
  from {
    height: 0;
    opacity: 0;
    visibility: hidden;
  }
  
  to {
    height: 600px;
    opacity: 1;
    visibility: visible;
  }
`;

const slideDown = keyframes`
  from {

    height: 600px;
    opacity: 1;
    visibility: visible;
  }
  to {
    height: 0;
    opacity: 0;
    visibility: hidden;
  }
`;

const Container = styled.div<{
  $show: boolean;
  $animate: boolean;
  $willUnmount: boolean;
}>`
  width: 420px;
  height: 600px;
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  opacity: 0;
  visibility: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 9px;
  z-index: ${({ theme }) => theme.zIndex.chatBody};
  animation: ${slideUp} 0.5s ease forwards;
  ${({ $animate }) =>
    $animate &&
    css`
      animation-name: ${slideDown};
    `}
`;

// ${({ $show, $animate }) =>
//   $show &&
//   $animate &&
//   css`
//     transition: all 0.4s 0.1s ease;
//     height: 600px;
//     opacity: 1;
//     visibility: visible;
//   `}

// ${({ $show, $animate }) =>
//   $show &&
//   !$animate &&
//   css`
//     height: 0%;
//     opacity: 0;
//     visibility: hidden;
//   `};

const ChatBody = styled.div`
  flex: 1;
  height: 100%;
`;
