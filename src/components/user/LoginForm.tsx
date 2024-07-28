import Form from './Form';
import TextField from '@shared/TextField';
import Spacing from '@shared/Spacing';
import Button from '@shared/Button';
import { ChangeEvent, useCallback, useMemo, useState, useRef } from 'react';
import { validate } from '@lib/utils/validator';
import { useDispatch } from 'react-redux';
import { notify } from '@/store/notify/actions';
import { type ResponseUserType } from '@/store/user/types';
import { useUserState2 } from '@/lib/hooks/useStore';
import useMutateLogin from '@/lib/queries/useMutateLogin';

type LoginProps = {
  loginSuccessHandler: (data: ResponseUserType) => void;
};

const LoginForm = ({ loginSuccessHandler }: LoginProps) => {
  const [form, setForm] = useState({
    nickName: '',
    password: ''
  });
  const nickNameRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const { socketId } = useUserState2();

  const { mutate } = useMutateLogin({
    onSuccess: (data) => loginSuccessHandler(data.result),
    onError: (err) => {
      if (!nickNameRef.current) return;
      if (!pwdRef.current) return;
      dispatch(notify(err.message, 'error'));
      if (err.message.includes('비밀번호')) pwdRef.current.focus();
      if (err.message.includes('닉네임')) nickNameRef.current.focus();
      return;
    }
  });

  // (data) => loginSuccessHandler(data.result),
  //   (err) => {
  //     if (!nickNameRef.current) return;
  //     if (!pwdRef.current) return;
  //     dispatch(notify(err.message, 'error'));
  //     if (err.message.includes('비밀번호')) pwdRef.current.focus();
  //     if (err.message.includes('닉네임')) nickNameRef.current.focus();
  //     return;
  //   }

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (Object.keys(error).length)
        return dispatch(notify('비정상적 접근입니다.', 'error'));
      mutate({
        userInfo: form,
        socketId: socketId as string
      });
    },
    [form]
  );

  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [form]
  );

  const error = useMemo(() => validate(form), [form]);

  const readyToSubmit = useMemo(() => !Object.keys(error).length, [error]);

  return (
    <Form onSubmit={onSubmit}>
      <TextField
        label="Nickname"
        placeholder="Nickname"
        name="nickName"
        value={form.nickName}
        onChange={onChangeValue}
        ref={nickNameRef}
      />
      <Spacing size={24} />
      <TextField
        label="Password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={onChangeValue}
        type="password"
        ref={pwdRef}
      />
      <Spacing size={36} />
      <Button size="medium" $full type="submit" disabled={!readyToSubmit}>
        로그인
      </Button>

      <Spacing size={12} />

      {/* <Link to="/signup">
        <Text
          $align="center"
          text="아직 계정이 없으신가요?"
          color="blue"
          size="small"
        />
      </Link> */}
    </Form>
  );
};

export default LoginForm;
