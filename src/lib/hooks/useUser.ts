import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin, userLogout } from '@/store/user/action';
import { notify } from '@/store/notify/actions';
import { useUserState } from './useStore';
import { getUserInfo } from '../api/api';
import { ServerDefaultResponseType } from '../api/types';
import { useNavigate } from 'react-router-dom';

const useUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUserState();

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('token');
    dispatch(userLogout());
    dispatch(notify('로그아웃 되었습니다.'));
  }, [user]);

  const reqUserInfo = useCallback(
    async (token: string, type: 'normal' | 'check' = 'normal') => {
      try {
        const { result } = await getUserInfo();
        if (type === 'check' && result.role !== 'admin')
          return dispatch(notify('권한이 없습니다.💡', 'info'));
        if (type === 'check' && result.role === 'admin')
          return navigate('/write');

        dispatch(
          userLogin({ nickName: result.nickName, token, role: result.role })
        );
      } catch (e) {
        const { status, message } = e as ServerDefaultResponseType<null>;
        if (status === 403) {
          localStorage.removeItem('token');
          dispatch(notify(message, 'error'));
          dispatch(userLogout());
        }
        console.log(message);
      }
    },
    []
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    if (token && user.token) {
      const isOwner = JSON.parse(token) === user.token;
      if (!isOwner) {
        localStorage.removeItem('token');
        dispatch(userLogout());
        return dispatch(notify('잘못된 접근입니다.', 'error'));
      }
    }

    if (token && !user.isLogin) {
      reqUserInfo(JSON.parse(token));
    }

    // console.log('%cuseUserHooks', 'color: red');
  }, [user]);

  return { user, logoutHandler, reqUserInfo };
};

export default useUser;
