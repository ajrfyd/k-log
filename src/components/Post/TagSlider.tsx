import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Badge from 'react-bootstrap/Badge';
import { ServerTagType } from '@lib/api/types';
import Marquee from 'react-fast-marquee';

type SliderProp = {
  items?: ServerTagType[];
  $hovered: boolean;
  style?: React.CSSProperties;
  $h?: number;
};

const TagSlider = ({ items, $hovered, style, $h = 2 }: SliderProp) => {
  return (
    <Container style={style} $h={$h}>
      <SlideContainer>
        <SlideComponent $hovered={$hovered}>
          <MarqueeComp play={$hovered} gradient gradientWidth={16}>
            {items
              ? items.map((item) => (
                  <Item key={item.id} bg="info">
                    {item.label}
                  </Item>
                ))
              : '등록되지 않았습니다.'}
          </MarqueeComp>
        </SlideComponent>
      </SlideContainer>
    </Container>
  );
};

export default TagSlider;

const Container = styled.div<Omit<SliderProp, '$hovered'>>`
  height: ${({ $h }) => $h + 'rem'};
  margin-bottom: 5px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* overflow: hidden; */
`;

const SlideContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const SlideComponent = styled.div<Pick<SliderProp, '$hovered'>>`
  display: flex;
  align-items: center;
  transition: 1s;

  /* ${({ $hovered }) =>
    $hovered &&
    css`
      animation: ${Move} 3s forwards infinite;
    `} */
`;

const MarqueeComp = styled(Marquee)`
  .rfm-marquee {
    .rfm-child {
      margin-left: 0.5rem;
    }
  }
`;

const Item = styled(Badge)`
  & + & {
    margin-left: 0.5rem;
  }
`;

const Move = keyframes`
  0% {
    transform: translateX(0);
  }
  /* 25% {
    transform: translateX(-120%);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(-120%);
  } */
  100% {
    transform: translateX(-200%);
  }
`;
