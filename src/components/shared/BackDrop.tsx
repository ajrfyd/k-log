import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

const BackDrop = ({ children }: PropsWithChildren) => {
  return <Dimmed>{children}</Dimmed>;
};

export default BackDrop;

const Dimmed = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  /* background-color: transparent; */
  /* opacity: 0.5; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ theme }) =>
    theme &&
    css`
      z-index: ${theme.zIndex.backDrop};
    `};
`;
