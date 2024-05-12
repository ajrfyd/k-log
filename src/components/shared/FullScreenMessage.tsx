import styled from 'styled-components';
import BackDrop from './BackDrop';
import Helmet from '@shared/Helmet';
import Button from '@shared/Button';
import { useNavigate } from 'react-router-dom';

type FullScreenMessageProps = {
  type: 'loading' | 'error' | '404';
  errorMessage?: string;
};

const FullScreenMessage = ({
  type,
  errorMessage = 'Error!!!'
}: FullScreenMessageProps) => {
  const title =
    type === 'loading'
      ? 'Loading...'
      : type === 'error'
        ? 'Error Page'
        : '404 Page';
  const navigate = useNavigate();

  return (
    <BackDrop>
      <Helmet title={title} desc={title} url="/" />
      {type === 'loading' ? (
        <MessageTitle type={type}>Loading....</MessageTitle>
      ) : type === 'error' ? (
        <MessageTitle type={type}>{errorMessage}</MessageTitle>
      ) : (
        <MessageTitle type={type}>404 NotFound!</MessageTitle>
      )}
      {type !== 'loading' && (
        <Button size="large" disabled onClick={() => navigate(-1)}>
          Back
        </Button>
      )}
    </BackDrop>
  );
};

export default FullScreenMessage;

const MessageTitle = styled.p<FullScreenMessageProps>`
  font-size: 4rem;
  font-weight: bold;
  color: var(--purple);
  ${({ type, theme }) =>
    type === 'error' ? theme.colors.red : theme.colors.purple};
`;
