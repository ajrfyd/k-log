import {
  setMsg,
  setMsgs,
  open,
  close,
  selectRoom,
  visibleHandler,
  initChatStore,
  chatLogoutHandler
} from './action';

export type Char1 = 'A' | 'B';

export type Msg = {
  msgId: number;
  msgType: Char1;
  msg: string;
  contactIp: string;
  msgState: Char1;
  createUserId: string;
  roomId: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
  deleteUserId: string;
};

export type Room = {
  createUserId: string;
  createdAt: Date;
  currentState: Char1;
  deleteUserId: string;
  deletedAt: Date;
  imgUrl: string;
  roomId: string;
  updatedAt: Date;
  nickName: string;
};

export type InitialState = {
  msgs: Msg[];
  show: boolean;
  onlineUser: Record<string, string> | null;
  selectedRoom: string | null;
  visible: boolean;
  // socket: Socket | null;
};

export type ActionType =
  | ReturnType<typeof setMsg>
  | ReturnType<typeof setMsgs>
  | ReturnType<typeof open>
  | ReturnType<typeof close>
  | ReturnType<typeof selectRoom>
  | ReturnType<typeof visibleHandler>
  | ReturnType<typeof initChatStore>
  | ReturnType<typeof chatLogoutHandler>;
// | ReturnType<typeof setSocket>
// | ReturnType<typeof setNickName>;
// | ReturnType<typeof setShow>
// | ReturnType<typeof setClose>;
