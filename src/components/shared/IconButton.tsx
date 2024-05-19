import styled, { css } from 'styled-components';
import React, { PropsWithChildren } from 'react';

type PropsType = PropsWithChildren & {
  onClick?: () => void;
  style?: React.CSSProperties;
  $chatBtn?: boolean;
};

const Iconbutton = ({ children, onClick, style, $chatBtn }: PropsType) => {
  return (
    <IconBtn
      onClick={onClick}
      style={style}
      role="button"
      aria-label="button"
      $chatBtn={$chatBtn}
    >
      {children}
    </IconBtn>
  );
};

export default Iconbutton;

const ChatBtnStyles = css`
  position: fixed;
  bottom: 1rem;
  /* right: 1rem; */
  left: 1rem;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid var(--black); */
  z-index: ${({ theme }) => theme.zIndex.chatBtn};

  &:hover {
    background-color: var(--teal);
    border-color: var(--teal);
    svg {
      fill: var(--purple);
    }
  }
`;

const IconBtn = styled.button<Pick<PropsType, '$chatBtn'>>`
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;

  &:hover {
    background-color: var(--teal);
    svg {
      color: var(--purple);
    }
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

  ${({ $chatBtn }) =>
    $chatBtn &&
    css`
      ${ChatBtnStyles};
    `}
`;
