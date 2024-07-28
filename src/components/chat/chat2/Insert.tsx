import styled from 'styled-components';
import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from 'react';

type InsertProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {};

const Insert = forwardRef(
  (
    { value, onChange }: InsertProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => (
    <TextArea
      value={value}
      onChange={onChange}
      ref={ref}
      placeholder="메세지 입력"
      // wrap="hard"
      // cols={5}
    />
  )
);

export default Insert;

const TextArea = styled.textarea`
  resize: none;
  box-sizing: border-box;
  flex: 1;
  border-radius: 5px;
  padding: 6px 8px;
`;
