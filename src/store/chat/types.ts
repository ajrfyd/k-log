import { Socket } from 'socket.io-client';
import {
  close,
  open,
  showRoom,
  showHome,
  pushMsg,
  setSocket,
  setMessages,
  initialize,
  setRooms,
  setNewMsg,
  checkNewMsg,
  selectRoom,
  setOnlineUser,
  setLeaveUser
} from './action';

// type MsgType = 'normal' | 'secret' | 'info';
type Page = 'home' | 'room';
type Char1 = 'A' | 'B';

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

export type InitialState = {
  show: boolean;
  currentPage: Page;
  msgs: Msg[];
  isAdmin: boolean;
  chatRooms: RoomList;
  socket: Socket<any, any> | null;
  onlineUser: Record<string, string>;
};

type RoomList = {
  rooms: Room[];
  new: Msg[];
  selectedRoom: string | null;
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
};

export type ActionType =
  | ReturnType<typeof open>
  | ReturnType<typeof close>
  | ReturnType<typeof showHome>
  | ReturnType<typeof showRoom>
  | ReturnType<typeof pushMsg>
  | ReturnType<typeof setSocket>
  | ReturnType<typeof setMessages>
  | ReturnType<typeof initialize>
  | ReturnType<typeof setRooms>
  | ReturnType<typeof setNewMsg>
  | ReturnType<typeof checkNewMsg>
  | ReturnType<typeof selectRoom>
  | ReturnType<typeof setOnlineUser>
  | ReturnType<typeof setLeaveUser>;
