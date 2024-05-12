import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import styled, { CSSProperties } from 'styled-components';
// import { FocusEventHandler } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  // placeholder?: string;
  // ref?: Ref<HTMLInputElement>;
  // onFocus?: FocusEventHandler;
  // onBlur?: FocusEventHandler;
  style?: CSSProperties;
  value?: string;
  invalid?: boolean;
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef(
  (
    {
      invalid,
      placeholder,
      onBlur,
      onFocus,
      style,
      name,
      value,
      onChange,
      type
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <InputTag
      placeholder={placeholder}
      aria-invalid={invalid}
      ref={ref}
      name={name}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      style={style}
      type={type}
    />
  )
);

export default Input;

const InputTag = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 3rem;
  font-weight: 500;
  border: 1px solid ${({ theme: { colors } }) => colors.grey};
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
