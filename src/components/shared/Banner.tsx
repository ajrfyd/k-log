import { PropsWithChildren, forwardRef, ForwardedRef, memo } from 'react';
import styled from 'styled-components';
type BannerProps = PropsWithChildren & {
  title: string;
  $shadow?: boolean;
  subTitle?: string;
};

const Banner = forwardRef(
  (
    { title, $shadow = false, subTitle }: BannerProps,
    ref: ForwardedRef<HTMLHeadingElement>
  ) => {
    return (
      <BannerSection>
        <Title $shadow={$shadow} ref={ref}>
          {title}
        </Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </BannerSection>
    );
  }
);

export default memo(Banner);

const BannerSection = styled.section`
  width: 100%;
  height: 250px;
  background-color: var(--teal);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1<{ $shadow?: boolean }>`
  font-size: 5rem;
  color: var(--white);
  text-shadow: ${({ $shadow }) =>
    $shadow ? '5px 5px 3px rgba(0, 0, 0, .9)' : 'none'};

  &.fade {
    color: red;
  }

  @media (max-width: 400px) {
    font-size: 3.5rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  margin-top: 1.2rem;
`;
