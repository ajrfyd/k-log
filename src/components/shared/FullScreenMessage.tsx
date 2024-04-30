import styled from 'styled-components';
import BackDrop from './BackDrop';
import Helmet from '@shared/Helmet';
type FullScreenMessageProps = {
  type: 'loading' | 'error' | '404';
};

const FullScreenMessage = ({ type }: FullScreenMessageProps) => {
  const title =
    type === 'loading'
      ? 'Loading...'
      : type === 'error'
        ? 'Error Page'
        : '404 Page';

  return (
    <BackDrop>
      <Helmet title={title} desc={title} url="/" />
      {type === 'loading' ? (
        <MessageTitle>Loading....</MessageTitle>
      ) : type === 'error' ? (
        <MessageTitle>Error!</MessageTitle>
      ) : (
        <MessageTitle>404 NotFound!</MessageTitle>
      )}
    </BackDrop>
  );
};

export default FullScreenMessage;

const MessageTitle = styled.p`
  font-size: 4rem;
  font-weight: bold;
`;
