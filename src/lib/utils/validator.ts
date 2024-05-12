import validator from 'validator';
import { type UserSignupType } from '@/lib/types/types';

// Todo Record type을 사용하는게 맞나 싶음
//! 추후 수정 요망
export const validate = (
  data: Record<string, string>,
  type?: 'login' | 'signup'
) => {
  let errors: Partial<UserSignupType> = {};
  if (data.nickName.length < 5) errors.nickName = '아이디는 5자 이상 입니다.';
  if (data.password.length < 8) errors.password = '비밀번호는 8자 이상 입니다.';
  if (type === 'signup') {
    if (!validator.equals(data.password, data.rePassword))
      errors.rePassword = '비밀번호가 일치하지 않습니다.';
  }
  return errors;
};

export const validate2 = (
  data: Record<string, string>,
  type?: 'login' | 'signup'
) => {
  let errors: Partial<UserSignupType> = {};
  if (data.nickName.length < 5) errors.nickName = '아이디는 5자 이상 입니다.';
  if (data.password.length < 8) errors.password = '비밀번호는 8자 이상 입니다.';
  if (type === 'signup') {
    if (!validator.equals(data.password, data.rePassword))
      errors.rePassword = '비밀번호가 일치하지 않습니다.';
  }
  return errors;
};
