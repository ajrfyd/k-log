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
