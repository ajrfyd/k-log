import { CSSProperties } from 'styled-components';
import { fontSizeKeys } from '@/styles/fonts';
import { colorKeys } from '@styles/colors';
import styled, { css } from 'styled-components';

type TextProps = {
  size?: fontSizeKeys;
  color?: colorKeys;
  display?: CSSProperties['display'];
  $align?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  bold?: boolean;
  text: React.ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
};

const Text = ({
  text,
  size = 'regular',
  color = 'grey',
  display,
  $align,
  fontWeight,
  bold,
  style,
  onClick
}: TextProps) => {
  return (
    <TextSpan
      size={size}
      color={color}
      display={display}
      $align={$align}
      fontWeight={fontWeight}
      bold={bold}
      style={style}
      onClick={onClick}
    >
      {text}
    </TextSpan>
  );
};

export default Text;

const TextSpan = styled.span<Omit<TextProps, 'text'>>`
  font-size: ${({ size, theme }) =>
    size &&
    // `${theme.fontSize[fontSize as fontSizeKeys]}rem`};
    css`
      ${theme.fontSize[size] + 'rem'};
    `};
  color: ${({ color, theme: { colors } }) =>
    color &&
    css`
      ${colors[color]}
    `};
  display: ${({ display }) => display};
  font-weight: ${({ fontWeight }) => fontWeight};
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
  ${({ $align }) =>
    $align &&
    css`
      display: inline-block;
      /* align: ${$align} !important; */
      width: 100%;
      margin: 0 auto !important;
    `}
`;
