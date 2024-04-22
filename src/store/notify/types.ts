import { enqNotify, deqNotify, reqNotify } from './actions';

export type ToastMsgType = 'info' | 'error';

export type NotifyMessageType = {
  msg: string;
  disappearTime?: number;
  uuid?: number;
  msgType?: ToastMsgType;
};

export type NotifyActionType =
  | ReturnType<typeof reqNotify>
  | ReturnType<typeof enqNotify>
  | ReturnType<typeof deqNotify>;
