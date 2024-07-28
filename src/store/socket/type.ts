import { Socket } from 'socket.io-client';
import {
  initSocket,
  socketDisconnect,
  setSocket,
  setOnlineUser
} from './action';

export type Char1 = 'A' | 'B';

// export type Msg = {
//   msgId: number;
//   msgType: Char1;
//   msg: string;
//   contactIp: string;
//   msgState: Char1;
//   createUserId: string;
//   roomId: string;
//   updatedAt: Date;
//   createdAt: Date;
//   deletedAt: Date;
//   deleteUserId: string;
// };

export type SocketStore = {
  socket: Socket | null;
  isConnected: boolean;
  socketId: string | null;
  onlineUser: Record<string, string>[];
};

export type SocketAction =
  | ReturnType<typeof initSocket>
  | ReturnType<typeof socketDisconnect>
  | ReturnType<typeof setSocket>
  | ReturnType<typeof setOnlineUser>;
