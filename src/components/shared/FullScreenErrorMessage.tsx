import { FallbackProps } from 'react-error-boundary';
import BackDrop from './BackDrop';
import styled from 'styled-components';
import Button from '@shared/Button';

const FullScreenErrorMessage = ({ error }: FallbackProps) => {
  if (!error)
    return (
      <BackDrop>
        <MessageTitle>서버가 재실행 중입니다.</MessageTitle>
        <Button size="large" onClick={() => location?.reload()}>
          홈으로
        </Button>
      </BackDrop>
    );
  return (
    <BackDrop>
      <MessageTitle>{error.name}</MessageTitle>
      <MessageDesc>{error.message}</MessageDesc>
      <Button size="large" onClick={() => location?.replace('/')}>
        홈으로
      </Button>
    </BackDrop>
  );
};

export default FullScreenErrorMessage;

const MessageTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: var(--red);
  text-align: center;
`;

const MessageDesc = styled.p`
  font-size: 2rem;
  font-weight: 500;
  color: var(--purple);
`;
