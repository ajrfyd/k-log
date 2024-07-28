import React from 'react';
import styled from 'styled-components';
import Spacing from '@/components/shared/Spacing';
import Text from '@components/shared/Text';

const desc = [
  '궁금한 점 혹은 버그 제보 감사합니다.',
  '버그는 상황을 자세하게 부탁 드립니다.',
  '서버 로직과 클라이언트 리팩토링으로',
  '메시지는 전송하실 수 있으나 일부기능',
  '(실시간 전송 등)은 작업 중입니다.',
  '양해 부탁 드립니다.'
];

const Home = ({ nickName }: { nickName: string }) => {
  return (
    <Container>
      <Text text="Welcome" size="big" color="blue" />
      <Spacing size={32} />
      <Text text="반갑습니다." size="large" color="purple" />
      <Spacing size={16} />
      <Text text={`${nickName}님.`} size="medium" color="purple" />
      <Spacing size={16} />

      {desc.map((p) => (
        <React.Fragment key={p}>
          <Text text={p} size="medium" color="purple" />
          <Spacing size={16} />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding: 1rem 2rem;
`;
