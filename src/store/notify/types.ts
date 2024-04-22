import { enqNotify, deqNotify, reqNotify } from './actions';

export type NotifyMessageType = {
  msg: string;
  disappearTime?: number;
  uuid?: number;
  type: 'info' | 'error';
};

export type NotifyActionType =
  | ReturnType<typeof reqNotify>
  | ReturnType<typeof enqNotify>
  | ReturnType<typeof deqNotify>;
