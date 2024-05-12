import { createPortal } from 'react-dom';
import Button from './Button';
import styled, { keyframes } from 'styled-components';
import { memo } from 'react';

type FixedBottomButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
};

const FixedBottomButton = ({
  label,
  onClick,
  disabled,
  type
}: FixedBottomButtonProps) => {
  const $portal = document.getElementById('fixed-bottom-portal');
  if (!$portal) return null;
  return createPortal(
    <Container>
      <Button
        $full
        size="medium"
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {label}
      </Button>
    </Container>,
    $portal
  );
};

export default memo(FixedBottomButton);

const slideup = keyframes`
  to {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: var(--white);
  padding: 10px 10px 8px;
  transform: translateY(100%);

  animation: ${slideup} 0.5s ease-in-out forwards;
`;
