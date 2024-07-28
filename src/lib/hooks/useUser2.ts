import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useChatTState } from './useStore';
import { login, logout } from '@/store/userr/action';
import { UserRole } from '@/store/userr/types';
import { chatLogoutHandler, initChatStore } from '@/store/chatt/action';
// import { getStorage } from '../utils/storage';
// import { queryKeys } from '../constants/queryKeys';
// import { queryClient } from '../api/queryClient';

const useUser2 = () => {
  const dispatch = useDispatch();
  const chat = useChatTState();
  // const user = useUserState2();
  // const socket = useSocketState();

  const logoutHandler = useCallback(() => {
    localStorage.clear();
    // queryClient.invalidateQueries({
    //   queryKey: [queryKeys.GET_MESSAGES]
    // });
    dispatch(logout());
    dispatch(chatLogoutHandler());
  }, [dispatch, chat]);

  const loginHandler = useCallback(
    (userInfo: {
      nickName: string;
      role: UserRole;
      socketId: string;
      id: string;
      roomId: string | null;
      isLogin: boolean;
    }) => {
      // setStorage('userInfo', userInfo);
      // 이전 스토어에 정보 있다면 초기화 chat?
      dispatch(initChatStore());
      dispatch(login(userInfo));
    },
    []
  );

  // useEffect(() => {
  //   const { isLogin, id, socketId, nickName } = user;
  //   const localUserInfo = getStorage('userInfo');
  // const { socket: socketObj } = socket;
  // Todo
  // 언노운 유저로 가입 후 로그인 처리

  //* 페이지가 새로고침 되었을때
  //* 스토리지에 유저 정보 존재하지 않고,
  // if (!id && !nickName && !socketId && !isLogin && localUserInfo) {
  // if (!socketObj) return;
  // const localUser = JSON.parse(localUserInfo) as LocalUserType;
  // const newUser = {
  //   ...localUser,
  //   socketId: socketObj.id as string
  // };
  // setStorage('userInfo', newUser);
  // loginHandler({ ...newUser });
  // }
  // }, [user, socket]);

  return { logoutHandler, loginHandler };
};

export default useUser2;
