import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useUserState, useChatState } from './useStore';
import { setSocket, pushMsg } from '@/store/chat/action';
import { useDispatch } from 'react-redux';
import { notify } from '@/store/notify/actions';
// import '/assets/sounds/notification.mp3';

const { VITE_ENV, VITE_API_URL } = import.meta.env;

const useSocket = () => {
  const dispatch = useDispatch();
  const user = useUserState();
  const chat = useChatState();

  useEffect(() => {
    if (user.isLogin) {
      const socket = io(
        VITE_ENV !== 'development' ? VITE_API_URL : 'http://localhost:8800',
        {
          transports: ['websocket'],
          auth: {
            id: user.id
          }
        }
      );

      socket.on('onlineMsg', (res) => {
        dispatch(notify('새로운 메시지가 있습니다.', 'info'));
        const s = new Audio('/assets/sounds/notification.mp3');
        s.play();
        dispatch(pushMsg(res));
      });

      dispatch(setSocket(socket));
    } else {
      if (chat.socket) {
        chat.socket.close();
      }
    }
  }, [dispatch, user]);

  return { socket: chat.socket };
};

export default useSocket;
