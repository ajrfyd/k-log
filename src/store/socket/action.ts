import { type SocketStore } from './type';

export const INIT_SOCKET = 'socket_INIT_SOCKET' as const;
export const SOCKET_DISCONNECT = 'socket_SOCKET_DISCONNECT' as const;
export const SET_SOCKET = 'socket_SET_SOCKET' as const;

export const SET_ONLINE_USER = 'socket_SET_ONLINE' as const;

// export const CHAT_OPEN = 'socket_CHAT_OPEN' as const;
// export const CHAT_CLOSE = 'socket_CHAT_CLOSE' as const;
// export const SET_MSGS = 'socket_SET_MSGS' as const;
// export const SET_MSG = 'socket_SET_MSG' as const;

export const initSocket = () => ({
  type: INIT_SOCKET
});
export const socketDisconnect = () => ({ type: SOCKET_DISCONNECT });

export const setSocket = (socketStoreInfo: Partial<SocketStore>) => ({
  type: SET_SOCKET,
  payload: socketStoreInfo
});

export const setOnlineUser = (users: Record<string, string>[]) => ({
  type: SET_ONLINE_USER,
  payload: users
});

// export const chatOpen = () => ({ type: CHAT_OPEN });
// export const chatClose = () => ({ type: CHAT_CLOSE });

// export const setMsgs = (msgs: Msg[]) => ({
//   type: SET_MSGS,
//   payload: msgs
// });
// export const setMsg = (msg: Msg) => ({ type: SET_MSG, payload: msg });
