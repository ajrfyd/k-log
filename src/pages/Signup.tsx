import { useEffect, useState } from 'react';
import SignupForm from '@components/user/SignupForm';
import { useNavigate } from 'react-router-dom';
import { type NewUserResponseType } from '@/lib/api/types';
import { useUserState } from '@/lib/hooks/useStore';
import { useDispatch } from 'react-redux';
import { notify } from '@/store/notify/actions';

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const user = useUserState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupSuccessHandler = (_: NewUserResponseType) => {
    setSuccess(true);
  };

  useEffect(() => {
    if (!success) return;
    dispatch(notify('가입완료. 로그인 부탁합니다.', 'info'));
    navigate('/', { replace: true });
  }, [success]);

  useEffect(() => {
    if (!user.isLogin) return;
    navigate('/', { replace: true });
  }, [user]);

  return <SignupForm signupSuccessHandler={signupSuccessHandler} />;
};

export default Signup;
