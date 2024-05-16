import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useNotifyMessages } from '@/lib/hooks/useStore';
import Toast from './Toast';

const NotifySection = () => {
  const rootPortal = document.getElementById('alert-portal');
  if (!rootPortal) return null;

  const msgs = useNotifyMessages();

  return createPortal(
    <Section>
      {msgs.map((msg) => (
        <Toast key={msg.uuid} {...msg} />
      ))}
    </Section>,
    rootPortal
  );
};

export default NotifySection;

const Section = styled.section`
  position: fixed;
  top: 10%;
  right: 1rem;
  z-index: ${({ theme }) => theme.zIndex.toast};
`;
