import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { CSSProperties } from 'styled-components';
import React from 'react';

type FlexProps = PropsWithChildren & {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
  style?: CSSProperties;
};

const Flex = ({ children, style, ...rest }: FlexProps) => {
  return (
    <FlexBox {...rest} style={style}>
      {children}
    </FlexBox>
  );
};

export default React.memo(Flex);

const FlexBox = styled.div<FlexProps>`
  display: flex;
  ${({ align }) =>
    align &&
    css`
      align-items: ${align};
    `}
  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `}
  ${({ direction }) =>
    direction &&
    css`
      flex-direction: ${direction};
    `}
`;
