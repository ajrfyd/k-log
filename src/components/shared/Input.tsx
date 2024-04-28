import { Ref } from 'react';
import styled from 'styled-components';
import { FocusEventHandler } from 'react';

type InputProps = {
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
};

const Input = ({ placeholder, ref, onBlur, onFocus }: InputProps) => (
  <InputTag
    placeholder={placeholder}
    aria-invalid="true"
    ref={ref}
    onFocus={onFocus}
    onBlur={onBlur}
  />
);

export default Input;

const InputTag = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  font-weight: 500;
  border: ${({ theme: { colors } }) => colors.grey};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme: { colors } }) => colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme: { colors } }) => colors.red};
  }
`;
