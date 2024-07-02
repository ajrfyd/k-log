import styled from 'styled-components';
import BackDrop from './BackDrop';
import Helmet from '@shared/Helmet';
import Button from '@shared/Button';
import { useNavigate } from 'react-router-dom';
// import Loading from './Loading';
// import { FallbackProps } from 'react-error-boundary';

type FullScreenType = 'info' | 'error' | 'loading';

type FullScreenMessageProps = {
  type?: FullScreenType;
  title?: string;
};

const FullScreenMessage = ({
  type = 'error',
  title
}: FullScreenMessageProps) => {
  // const title = type === 'error' ? 'Error Page' : '404 Page';
  const navigate = useNavigate();

  return (
    <BackDrop>
      <Helmet title={title || ''} desc={title || ''} url="/" />
      <MessageTitle type={type}>{title}</MessageTitle>
      {/* <MessageTitle type={type}>{title}</MessageTitle> */}
      {/* {type !== 'loading' && (
        <Button
          size="large"
          disabled={type !== 'down'}
          onClick={() => (type !== 'down' ? navigate(-1) : alert('!!'))}
        >
          Back
        </Button>
      )} */}
      <Button
        size="large"
        disabled={type === 'info'}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </BackDrop>
  );
};

export default FullScreenMessage;

const MessageTitle = styled.p<Pick<FullScreenMessageProps, 'type'>>`
  font-size: 4rem;
  font-weight: bold;
  color: var(--purple);
  ${({ type, theme }) =>
    type === 'error' ? theme.colors.red : theme.colors.purple};
`;
