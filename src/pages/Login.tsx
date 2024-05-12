import { useEffect, useState } from 'react';
import LoginForm from '@components/user/LoginForm';
import { type ServerResponseLoginUserInfo } from '@/lib/api/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '@/store/user/action';
import { notify } from '@/store/notify/actions';

const Login = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!success) return;
    navigate('/', { replace: true });
  }, [success]);

  const loginSuccessHandler = (data: ServerResponseLoginUserInfo) => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) localStorage.clear();
    localStorage.setItem('token', JSON.stringify(data.token));
    dispatch(
      userLogin({ token: data.token, nickName: data.nickName, role: data.role })
    );
    dispatch(notify(`${data.nickName}님 환영합니다.`));
    setSuccess(true);
  };

  return <LoginForm loginSuccessHandler={loginSuccessHandler} />;
};

export default Login;
