import Form from './Form';
import TextField from '@shared/TextField';
import Spacing from '@shared/Spacing';
import FixedBottomButton from '@shared/FixedBottomButton';
import { validate } from '@lib/utils/validator';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { type UserSignupType } from '@/lib/types/types';
import { signupMutation } from '@/lib/api/useMutation';
import { useDispatch } from 'react-redux';
import { notify } from '@/store/notify/actions';
import { NewUserResponseType } from '@/lib/api/types';

type SignupFormProps = {
  signupSuccessHandler: (result: NewUserResponseType) => void;
  // submitHandler: (form: UserSignupType) => void;
};

const SignupForm = ({ signupSuccessHandler }: SignupFormProps) => {
  const [form, setForm] = useState({
    nickName: '',
    password: '',
    rePassword: ''
  });

  const [dirty, setDirty] = useState<Partial<UserSignupType>>({});
  const idRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const { mutate } = signupMutation(
    form,
    (data) => {
      const { result } = data;
      signupSuccessHandler(result);
    },
    (err) => {
      const { message, status } = err;
      if (status === 400) {
        if (!idRef.current) return;
        setForm((prev) => ({ ...prev, nickName: '' }));
        idRef.current.focus();
      }
      console.log(status);
      return dispatch(notify(message, 'error'));
    }
  );

  const formChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [form]
  );

  const onSubmitHandler = useCallback(() => {
    if (
      !form.nickName.length &&
      !form.password.length &&
      !form.rePassword.length
    )
      return dispatch(notify('값을 입력하지 않았습니다.', 'error'));
    mutate();
  }, [form]);

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value.length) return setDirty((prev) => ({ ...prev, [name]: false }));
    setDirty((prev) => ({ ...prev, [name]: true }));
  }, []);

  const error = useMemo(() => validate(form, 'signup'), [form]);
  const readyToSubmit = !!Object.keys(error).length;

  return (
    <Form>
      <TextField
        label="Nickname"
        placeholder="Nickname"
        name="nickName"
        value={form.nickName}
        onChange={formChangeHandler}
        onBlur={handleBlur}
        hasError={Boolean(dirty.nickName) && Boolean(error.nickName)}
        helpMsg={
          Boolean(dirty.nickName) && Boolean(error.nickName)
            ? error.nickName
            : ''
        }
        ref={idRef}
      />
      <Spacing size={24} />
      <TextField
        label="Password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={formChangeHandler}
        onBlur={handleBlur}
        type="password"
        hasError={Boolean(dirty.password) && Boolean(error.password)}
        helpMsg={
          Boolean(dirty.password) && Boolean(error.password)
            ? error.password
            : ''
        }
      />
      <Spacing size={24} />
      <TextField
        label="Repassword"
        placeholder="Repassword"
        name="rePassword"
        value={form.rePassword}
        onChange={formChangeHandler}
        onBlur={handleBlur}
        type="password"
        hasError={Boolean(dirty.rePassword) && Boolean(error.rePassword)}
        helpMsg={
          Boolean(dirty.rePassword) && Boolean(error.rePassword)
            ? error.rePassword
            : ''
        }
      />
      <Spacing size={36} />
      {/* <Button
        size="medium"
        $full
        disabled
        onClick={() => console.log('clickwd')}
      >
        회원가입
      </Button>

      <Spacing size={12} />
      <Link to="/login">
        <Text align="center" text="뒤로" color="blue" />
      </Link> */}
      <FixedBottomButton
        label="회원가입"
        type="button"
        onClick={onSubmitHandler}
        disabled={readyToSubmit}
      />
    </Form>
  );
};

export default SignupForm;
