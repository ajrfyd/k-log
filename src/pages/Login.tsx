import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@components/user/LoginForm';
import { type ResponseUserType } from '@store/user/types';
import { notify } from '@store/notify/actions';
import { useSocketState } from '@lib/hooks/useStore';
import useUser2 from '@/lib/hooks/useUser2';
import { useUserState2 } from '@lib/hooks/useStore';

const Login = () => {
  const [success, setSuccess] = useState(false);
  const user = useUserState2();

  const { loginHandler } = useUser2();
  const socket = useSocketState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { changeUserInfoHandler, setUserRole } = useChatUser();
  // const { setUser } = useSocketT();

  useEffect(() => {
    if (!success) return;
    navigate('/', { replace: true });
  }, [success]);

  useEffect(() => {
    if (!user.isLogin) return;
    navigate('/', { replace: true });
  }, [user]);

  const loginSuccessHandler = (data: ResponseUserType) => {
    loginHandler({
      nickName: data.nickName,
      role: data.role,
      roomId: data.roomId,
      isLogin: true,
      id: data.id,
      socketId: socket.socketId as string
    });

    dispatch(notify(`${data.nickName}님 환영합니다.`));

    setSuccess(true);
  };

  return <LoginForm loginSuccessHandler={loginSuccessHandler} />;
};

export default Login;
