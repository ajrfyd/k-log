import { useSelector } from 'react-redux';
import { RootReducerType } from '@/store';

export const useNotifyMessages = () =>
  useSelector((state: RootReducerType) => state.notify);

export const useUserState = () =>
  useSelector((store: RootReducerType) => store.user);
