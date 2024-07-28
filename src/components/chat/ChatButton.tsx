import styled from 'styled-components';
import ChatBalloon from '../iconComponents/ChatBalloon';

type ChatButtonProps = {
  onClick: () => void;
};

const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <ChatBalloonContainer onClick={onClick}>
      <ChatBalloon />
    </ChatBalloonContainer>
  );
};

export default ChatButton;

const ChatBalloonContainer = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 15rem;
  width: 36px;
  height: 36px;
  cursor: pointer;
`;
