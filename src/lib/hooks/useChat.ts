import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useChatState, useUserState } from './useStore';
import { open as op, close as cl } from '@/store/chat/action';
import { useNavigate } from 'react-router-dom';
import { notify } from '@/store/notify/actions';
// import { useGetRooms } from '../api/useQueries';

const useChat = () => {
  const chat = useChatState();
  const user = useUserState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const

  const open = useCallback(() => {
    if (!user.isLogin) {
      dispatch(notify('회원 정보가 필요한 페이지 입니다.', 'info'));
      navigate('/login', { replace: true });
      return;
    }
    dispatch(op());
  }, [dispatch, user]);

  const close = useCallback(() => dispatch(cl()), [dispatch]);

  useEffect(() => {}, []);

  return {
    show: chat.show,
    isAdmin: chat.isAdmin,
    open,
    close,
    socket: chat.socket,
    currentPage: chat.currentPage,
    msgs: chat.msgs,
    onlineUser: chat.onlineUser
  };
};

export default useChat;
