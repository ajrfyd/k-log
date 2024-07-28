import { useCallback, useEffect } from 'react';
import { useUserState2, useChatTState } from './useStore';
import { useDispatch } from 'react-redux';
import { setMsgs, setMsg, selectRoom } from '@/store/chatt/action';
import useGetMessages from '../queries/useGetMessages';
import useGetMessagesById from '../queries/useGetMessagesById';
import { Msg } from '../api/types';
import { visibleHandler } from '@/store/chatt/action';

const useChat2 = () => {
  const dispatch = useDispatch();
  const { role } = useUserState2();
  const { msgs, selectedRoom } = useChatTState();
  const { data = [], isSuccess } = useGetMessages({
    enabled: role === 'user'
  });
  const { data: dataById } = useGetMessagesById(selectedRoom);

  const saveMsgs = useCallback((msgs: Msg[]) => dispatch(setMsgs(msgs)), []);

  const saveMsg = useCallback((msg: Msg) => dispatch(setMsg(msg)), []);

  const setRoomHandler = useCallback(
    (roomId: string) => dispatch(selectRoom(roomId)),
    []
  );

  const setVisible = useCallback(
    (visible: boolean) => dispatch(visibleHandler(visible)),
    []
  );

  useEffect(() => {
    if (role === 'admin') return;
    if (msgs.length) return;
    if (isSuccess && data) saveMsgs(data);
  }, [data, isSuccess, role, msgs]);

  useEffect(() => {
    if (!dataById) return;
    saveMsgs(dataById);
  }, [selectedRoom, dataById]);

  return { msgs, saveMsgs, saveMsg, setRoomHandler, selectedRoom, setVisible };
};

export default useChat2;
