import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notify } from '@/store/notify/actions';
import { ServerDefaultResponseType } from '../api/types';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../api/chat';

interface ChatUserType {
  nickName: string;
  token: string;
  recentConnect: Date | null;
}

export const storageUserKey = 'chatUser' as const;

const useChatUser = () => {
  const [user, setUser] = useState<ChatUserType>({
    nickName: '',
    token: '',
    recentConnect: null
  });
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');

  // const changeUserInfoHandler = ({ ...args }: Partial<ChatUserType>) =>
  //   setUser((prev) => ({ ...prev, ...args }));
  const changeUserInfoHandler = useCallback(
    ({ ...args }: Partial<ChatUserType>) =>
      setUser((prev) => ({ ...prev, ...args })),
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useUserState();

  const logoutHandler = useCallback(() => {
    // localStorage.removeItem('token');
    // dispatch(userLogout());
    // dispatch(initialize());
    dispatch(notify('로그아웃 되었습니다.'));
  }, [dispatch]);

  const reqChatUserRole = useCallback(async () => {
    try {
      const { result } = await getUserRole();
      setUserRole(result.role);
    } catch (e) {
      const { status, message } = e as ServerDefaultResponseType<null>;
      if (status === 403 || status === 401) {
        localStorage.removeItem('token');
        dispatch(notify(message, 'error'));
      }
    }
  }, [setUserRole]);

  const authChecker = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(notify('로그인이 필요한 서비스 입니다.', 'info'));
        navigate('/login', { replace: true });
        return;
      }

      // const { result } = await getUserInfo();
    } catch (e) {
      const { status, message } = e as ServerDefaultResponseType<null>;
      if (status === 403 || status === 401) {
        dispatch(notify('로그인이 필요한 서비스 입니다.', 'info'));
        navigate('/login', { replace: true });
        return;
      }
      console.log(message, 'authCheckeer');
    }
  }, []);

  useEffect(() => {
    if (!window) return;
    const storageValueHandler = (e: StorageEvent) => {
      const { key, oldValue } = e;
      if (key === storageUserKey) {
        dispatch(notify('LocalStorage의 변경이 감지 되었습니다.', 'error'));
        localStorage.setItem(key, oldValue as string);
      }
    };

    window.addEventListener('storage', storageValueHandler);

    return () => {
      window.removeEventListener('storage', storageValueHandler);
    };
  }, []);

  return {
    user,
    changeUserInfoHandler,
    logoutHandler,
    reqChatUserRole,
    authChecker,
    setUser,
    userRole,
    setUserRole
  };
};

export default useChatUser;
