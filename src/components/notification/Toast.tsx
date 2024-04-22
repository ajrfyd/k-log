import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { AlertTriangle, InfoIcon } from 'lucide-react';
import { NotifyMessageType } from '@/store/notify/types';

const Toast = ({ msg, disappearTime, msgType }: NotifyMessageType) => {
  const [isFading, setIsFading] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsFading(true), disappearTime);
  }, []);

  return (
    <ToastContainer className={isFading ? 'fadeOut' : ''}>
      {msgType === 'info' ? (
        <InfoIcon size={20} />
      ) : (
        <AlertTriangle size={20} />
      )}{' '}
      {msg}
    </ToastContainer>
  );
};

export default Toast;

const fadeInLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const ToastContainer = styled.div`
  font-weight: bold;
  color: #fff;
  background-color: var(--purple);
  opacity: 0.9;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  animation: ${fadeInLeft};
  animation-duration: 0.9s;
  transition: 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &.fadeOut {
    transform: scale(0);
    opacity: 0;

    /* transform: opacity 2s; */
  }
`;
