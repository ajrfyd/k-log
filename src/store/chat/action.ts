import { Socket } from 'socket.io-client';
import { Msg, Room } from './types';

export const CHAT_SHOW = 'chat_CHAT_SHOW' as const;
export const CHAT_CLOSE = 'chat_CHAT_CLOSE' as const;
export const SHOW_HOME = 'chat_SHOW_HOME' as const;
export const SHOW_ROOM = 'chat_SHOW_ROOM' as const;
export const SET_MSGS = 'chat_SET_MSGS' as const;
export const PUSH_MSG = 'chat_PUSH_MSG' as const;
export const CHAT_CONNECTED = 'chat_CHAT_CONNECTED' as const;
export const CHAT_INITIALIZE = 'chat_CHAT_INITIALIZE' as const;
export const CHAT_SET_ROOMS = 'chat_SET_ROOMS' as const;
export const CHAT_NEW_MSG = 'chat_SET_NEW_MSG' as const;
export const CHAT_CHECK_MSG = 'chat_CHECK_MSG' as const;
export const CHAT_SELECT_ROOM = 'chat_SELCECT_ROOM' as const;
export const CHAT_ONLINE_USER = 'chat_ONLINE_USRE' as const;
export const CHAT_LEAVE_USER = 'chat_LEAVE_USER' as const;

export const open = () => ({ type: CHAT_SHOW });
export const close = () => ({ type: CHAT_CLOSE });
export const showHome = () => ({ type: SHOW_HOME });
export const showRoom = () => ({ type: SHOW_ROOM });
export const initialize = () => ({ type: CHAT_INITIALIZE });

export const setRooms = (rooms: Room[]) => ({
  type: CHAT_SET_ROOMS,
  paylaod: rooms
});

export const selectRoom = (roomId: string) => ({
  type: CHAT_SELECT_ROOM,
  payload: roomId
});

export const setNewMsg = (msg: Msg) => ({ type: CHAT_NEW_MSG, payload: msg });
export const checkNewMsg = (id: string) => ({
  type: CHAT_CHECK_MSG,
  payload: id
});

export const setSocket = (socket: Socket) => ({
  type: CHAT_CONNECTED,
  payload: socket
});

export const setMessages = (msgs: Msg[]) => ({ type: SET_MSGS, payload: msgs });

export const pushMsg = (msg: Msg) => ({ type: PUSH_MSG, payload: msg });

export const setOnlineUser = (user: Record<string, string>) => ({
  type: CHAT_ONLINE_USER,
  payload: user
});
export const setLeaveUser = (user: Record<string, string>) => ({
  type: CHAT_LEAVE_USER,
  payload: user
});
