import styled, { css } from 'styled-components';

type SpacingProps = {
  size: number;
  direction?: 'vertical' | 'horizontal';
};

const Spacing = ({ size, direction = 'vertical' }: SpacingProps) => (
  <Space size={size} direction={direction} />
);

export default Spacing;

const Space = styled.div<SpacingProps>`
  ${({ size, direction }) =>
    size &&
    css`
      ${direction === 'vertical' ? `height: ${size}px` : `width: ${size}px`}
    `};
`;
