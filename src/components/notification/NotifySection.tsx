import styled from 'styled-components';
import { useNotifyMessages } from '@/lib/hooks/useStore';
import Toast from './Toast';

const NotifySection = () => {
  const msgs = useNotifyMessages();
  return (
    <Section>
      {msgs.map((msg) => (
        <Toast key={msg.uuid} {...msg} />
      ))}
    </Section>
  );
};

export default NotifySection;

const Section = styled.section`
  position: fixed;
  top: 10%;
  right: 1rem;
`;
