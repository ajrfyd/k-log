import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useUserState, useChatState } from './useStore';
import { setSocket } from '@/store/chat/action';
import { useDispatch } from 'react-redux';

const { VITE_ENV, VITE_API_URL } = import.meta.env;

const useSocket = () => {
  const dispatch = useDispatch();
  const user = useUserState();
  const { socket } = useChatState();

  useEffect(() => {
    const socket = io(
      VITE_ENV !== 'development' ? VITE_API_URL : 'http://localhost:8800',
      {
        transports: ['websocket'],
        auth: {
          nickName: user.nickName
        }
      }
    );

    if (!socket) return;
    if (socket) dispatch(setSocket(socket));

    socket.on('connected', (socket) => {
      console.log(socket);
    });

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user, dispatch, setSocket]);

  return { socket };
};

export default useSocket;
