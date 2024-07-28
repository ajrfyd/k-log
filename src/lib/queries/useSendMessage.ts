import { useMutation } from '@tanstack/react-query';
import { UseMutationCustomOptions } from '../types/common';
import { BaseServerResponse } from '../types/common';
import { sendMsg } from '../api';
import { Msg } from '@/store/chatt/types';

const useSendMessage = (
  queryOptions?: UseMutationCustomOptions<BaseServerResponse<Msg>>
) =>
  useMutation({
    mutationFn: ({ msg, roomId }: { msg: string; roomId?: string | null }) =>
      sendMsg(msg, roomId),

    ...queryOptions
  });

export default useSendMessage;
