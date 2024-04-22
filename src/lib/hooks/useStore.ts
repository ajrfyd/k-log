import { useSelector } from 'react-redux';
import { RootReducerType } from '@/store';

export const useNotifyMessages = () =>
  useSelector((state: RootReducerType) => state.notify);
