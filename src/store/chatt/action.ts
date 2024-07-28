import { Msg } from './types';

export const SET_MSG = 'chat_CHAT_SET_MSG' as const;
export const SET_MSGS = 'chat_CHAT_SET_MSGS' as const;
export const CHAT_OPEN = 'chat_CHAT_OPEN' as const;
export const CHAT_CLOSE = 'chat_CHAT_CLOSE' as const;
export const CHAT_SELECT_ROOM = 'chat_CHAT_SELECT_ROOM' as const;
export const SET_VISIBLE = 'chat_SET_VISIBLE' as const;
export const CHAT_INIT = 'chat_CHAT_INIT' as const;
export const CHAT_LOG_OUT = 'chat_CHAT_LOGOUT' as const;
// export const SET_SOCKET = 'chat_CHAT_SET_SOCKET' as const;
// export const SET_NICKNAME = 'chat_SET_NICKNAME' as const;

export const setMsg = (msg: Msg) => ({ type: SET_MSG, payload: msg });
export const setMsgs = (msgs: Msg[]) => ({ type: SET_MSGS, payload: msgs });

export const open = () => ({ type: CHAT_OPEN });
export const close = () => ({ type: CHAT_CLOSE });

export const selectRoom = (id: string) => ({
  type: CHAT_SELECT_ROOM,
  payload: id
});

export const visibleHandler = (visible: boolean) => ({
  type: SET_VISIBLE,
  payload: visible
});

export const initChatStore = () => ({ type: CHAT_INIT });

export const chatLogoutHandler = () => ({ type: CHAT_LOG_OUT });
// export const setSocket = (socket: Socket) => ({
//   type: SET_SOCKET,
//   payload: socket
// });

// export const setNickName = (nickName: string) => ({
//   type: SET_NICKNAME,
//   payload: nickName
// });
