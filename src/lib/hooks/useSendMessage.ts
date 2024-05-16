import { useMutation } from '@tanstack/react-query';
import { Msg, ServerDefaultResponseType } from '../api/types';
import { sendMsg } from '../api/api';

const useSendMessage = (
  msg: string,
  onSuccesFn: (result: ServerDefaultResponseType<Msg>) => void,
  onErrorFn: (e: Error) => void,
  roomId?: string
) => {
  const { data, mutate } = useMutation({
    mutationKey: ['sendMsg'],
    mutationFn: () => sendMsg(msg, roomId),
    onSuccess: onSuccesFn,
    onError: onErrorFn
  });

  return { data, mutate };
};

export default useSendMessage;
