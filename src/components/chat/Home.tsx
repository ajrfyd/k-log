import Text from '../shared/Text';
import Spacing from '../shared/Spacing';
import styled from 'styled-components';
import React from 'react';

const desc = [
  '궁금한 점 혹은 버그 제보 감사합니다.',
  '버그는 상황을 자세하게 부탁 드립니다.',
  '서버 로직과 클라이언트 리팩토링으로',
  '메시지는 전송하실 수 있으나 일부기능',
  '(실시간 전송 등)은 작업 중입니다.',
  '양해 부탁 드립니다.'
];

const Home = () => {
  return (
    <Continer>
      <Text text="Welcome" size="big" color="blue" />
      <Spacing size={32} />
      <Text text="반갑습니다." size="large" color="purple" />
      <Spacing size={16} />
      {desc.map((p) => (
        <React.Fragment key={p}>
          <Text text={p} size="medium" color="purple" />
          <Spacing size={16} />
        </React.Fragment>
      ))}
    </Continer>
  );
};

export default Home;

const Continer = styled.div`
  flex: 1;
  padding: 1rem 2rem;
`;
