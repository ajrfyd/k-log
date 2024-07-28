import { CSSProperties, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import {
  buttonSizeKeys,
  buttonColorKeys,
  buttonColorMap,
  buttonWeakMap
} from '@styles/button';

type ButtonProps = PropsWithChildren & {
  color?: buttonColorKeys;
  size?: buttonSizeKeys;
  $weak?: boolean;
  $full?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  style?: CSSProperties;
};

const Button = ({
  color = 'primary',
  size = 'small',
  $weak,
  $full,
  disabled,
  children,
  onClick,
  type = 'button',
  style
}: ButtonProps) => {
  return (
    <ButtonContainer
      color={color}
      size={size}
      $weak={$weak}
      $full={$full}
      type={type}
      aria-disabled={disabled}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<ButtonProps>`
  cursor: pointer;
  font-weight: bold;
  border-radius: 6px !important;
  ${({ size, theme }) => size && theme.buttonSize[size]};
  /* ${({ color, theme }) => color && theme.buttonColor[color]}; */
  ${({ $weak, color }) =>
    $weak
      ? buttonWeakMap[color as buttonColorKeys]
      : buttonColorMap[color as buttonColorKeys]}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.26;
      cursor: initial;
    `}

  ${({ $full }) =>
    $full &&
    css`
      display: block;
      width: 100%;
      border-radius: 0;
    `}
`;
