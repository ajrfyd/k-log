import { io, Socket } from 'socket.io-client';
import { useEffect, useState, useCallback } from 'react';

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
