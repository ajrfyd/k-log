import { ChangeEvent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import Flex from '@shared/Flex';

type FormProps = PropsWithChildren & {
  type?: 'login' | 'signup';
  onSubmit?: (e: ChangeEvent<HTMLFormElement>) => void;
};

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <Flex direction="column" style={{ padding: '2rem' }}>
      <FormContainer onSubmit={onSubmit}>{children}</FormContainer>
    </Flex>
  );
};

export default Form;

const FormContainer = styled.form``;
