import { io, Socket } from 'socket.io-client';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useUserState2 } from './useStore';
import { setUser } from '@/store/userr/action';
// import { getCheckUser } from '../api/chat';

interface SocketObj {
  socket: Socket | null;
  connected: boolean;
  addEventListener: (
    event: string,
    callback: (data: any) => void
  ) => () => void;
}

const { VITE_ENV, VITE_API_URL } = import.meta.env;

const useSocketT = (): SocketObj => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const user = useUserState2();
  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    // const user = await getCheckUser();
    // if (!user)
    //   return setUserInfo((prev) => ({
    //     ...prev,
    //     recentConnect: new Date(Date.now())
    //   }));
  }, []);

  useEffect(() => {
    const socketInstance = io(
      VITE_ENV !== 'development' ? VITE_API_URL : 'http://localhost:8800',
      {
        transports: ['websocket'],
        auth: {
          nickName: user.nickName
        }
      }
    );

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log(`%cConnected socketId: ${socketInstance.id}`, 'color: green');
      setConnected(true);
      // setUserInfo((prev) => ({
      //   ...prev,
      //   socketId: socketInstance.id as string
      // }));
      dispatch(setUser({ socketId: socketInstance.id }));
    });

    socketInstance.on('disconnect', () => {
      setConnected(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!user.token) {
      getUser();
    }
  }, []);

  // useEffect(() => {
  // & 기존 로그인 시 setUserInfo 해 줘야함
  // 상태에 유저 정보가 없을때
  // 브라우저 재 시작
  // const cookie = getCookie('jwt');
  // if (cookie && !userInfo.token) {
  //   getUser();
  // }
  // console.log(userInfo);
  // }, [userInfo]);

  const addEventListener = useCallback(
    (event: string, callback: (data: any) => void) => {
      if (socket) {
        socket.on(event, callback);
        return () => {
          socket.off(event, callback);
        };
      }
      return () => {};
    },
    [socket]
  );

  return { socket, connected, addEventListener };
};

export default useSocketT;

// Explanation
// Custom Hook (useSocket):

// Types:
// UseSocketOptions for hook options (URL and socket options).
// UseSocketReturn for the return values from the hook.
// State Management: Uses useState to manage the socket instance and connection status.
// Effect Hook: Uses useEffect to initialize the socket connection and clean it up on unmount.
// Event Handlers: Provides methods to send messages and add event listeners using useCallback to memoize the functions.
// Component Usage:

// Connection Status: Displays the connection status.
// Send Message: Uses the sendMessage function to emit messages.
// Event Listener: Uses the addEventListener function to handle incoming messages and clean up the listener on component unmount.
// This setup ensures a type-safe, clean, and reusable way to manage Socket.IO connections in your React components with TypeScript.
