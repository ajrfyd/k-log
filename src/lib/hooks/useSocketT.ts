import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

interface SocketObj {
  socket: Socket | null;
  connected: boolean;
}

const { VITE_ENV, VITE_API_URL } = import.meta.env;

const useSocketT = (): SocketObj => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(
      VITE_ENV !== 'development' ? VITE_API_URL : 'http://localhost:8800',
      {
        transports: ['websocket']
        // auth: {
        //   id: user.id
        // }
      }
    );

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected', 'useSocket T');
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setConnected(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, connected };
};

export default useSocketT;
