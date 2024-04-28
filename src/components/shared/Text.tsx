import { CSSProperties } from 'styled-components';
import { colorKeys, fontSizeKeys } from '@/styles/themes';
import styled, { css } from 'styled-components';

type TextProps = {
  size?: fontSizeKeys;
  color?: colorKeys;
  display?: CSSProperties['display'];
  textAlign?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  bold?: boolean;
  text: string;
};

const Text = ({
  text,
  size = 'regular',
  color = 'grey',
  display,
  textAlign,
  fontWeight,
  bold
}: TextProps) => {
  return (
    <TextSpan
      size={size}
      color={color}
      display={display}
      textAlign={textAlign}
      fontWeight={fontWeight}
      bold={bold}
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
  text-align: ${({ textAlign }) => textAlign};
  font-weight: ${({ fontWeight }) => fontWeight};
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`;
