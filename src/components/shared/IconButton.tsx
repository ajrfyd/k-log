import styled from 'styled-components';
import React, { PropsWithChildren } from 'react';

type PropsType = PropsWithChildren & {
  onClick?: () => void;
  style?: React.CSSProperties;
};

const Iconbutton = ({ children, onClick, style }: PropsType) => {
  return (
    <IconBtn onClick={onClick} style={style} role="button" aria-label="button">
      {children}
    </IconBtn>
  );
};

export default Iconbutton;

const IconBtn = styled.button`
  padding: 0.2rem 0.5rem;
  border: 2px solid var(--brown);
  border-radius: 2rem;
  position: relative;

  &:hover {
    border: 2px solid var(--purple);
    color: #075aca;
  }

  &:active {
    transform: scale(1.1);
  }

  & + & {
    margin-left: 0.5rem;
  }

  @media (max-width: 768px) {
    & {
      margin-top: 0.5rem;
    }

    & + & {
      margin-left: 0;
      margin-top: 0.5rem;
    }
  }
`;
