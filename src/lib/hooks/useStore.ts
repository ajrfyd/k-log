import { useSelector } from 'react-redux';
import { RootReducerType } from '@/store';

export const useNotifyMessages = () =>
  useSelector((store: RootReducerType) => store.notify);

export const useUserState = () =>
  useSelector((store: RootReducerType) => store.user);

export const useChatState = () =>
  useSelector((store: RootReducerType) => store.chat);

export const usePostState = () =>
  useSelector((store: RootReducerType) => store.post);

export const useChatTState = () =>
  useSelector((store: RootReducerType) => store.chatT);

export const useUserState2 = () =>
  useSelector((store: RootReducerType) => store.user2);

export const useSocketState = () =>
  useSelector((store: RootReducerType) => store.socket);
