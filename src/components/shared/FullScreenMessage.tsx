import styled from 'styled-components';
import BackDrop from './BackDrop';

type FullScreenMessageProps = {
  type: 'loading' | 'error';
};

const FullScreenMessage = ({ type }: FullScreenMessageProps) => {
  return (
    <BackDrop>
      {type === 'loading' ? (
        <MessageTitle>Loading....</MessageTitle>
      ) : (
        <MessageTitle>Error!</MessageTitle>
      )}
    </BackDrop>
  );
};

export default FullScreenMessage;

const MessageTitle = styled.p`
  font-size: 4rem;
  font-weight: bold;
`;
