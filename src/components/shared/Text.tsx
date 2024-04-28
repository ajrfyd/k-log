import { CSSProperties } from 'styled-components';
import { colorKeys, fontSizeKeys } from '@/styles/themes';
import styled, { css } from 'styled-components';

type TextProps = {
  size?: fontSizeKeys;
  color?: colorKeys;
  display?: CSSProperties['display'];
  align?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  bold?: boolean;
  text: React.ReactNode;
  style?: CSSProperties;
};

const Text = ({
  text,
  size = 'regular',
  color = 'grey',
  display,
  align,
  fontWeight,
  bold,
  style
}: TextProps) => {
  return (
    <TextSpan
      size={size}
      color={color}
      display={display}
      align={align}
      fontWeight={fontWeight}
      bold={bold}
      style={style}
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
  text-align: ${({ align }) => align};
  font-weight: ${({ fontWeight }) => fontWeight};
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`;
