import { Dispatch } from 'redux';
import { NotifyMessageType, ToastMsgType } from './types';

export const NOTIFY = 'notify_NOTIFY' as const;
export const ENQ_NOTIFY = 'notify_ENQ_NOTIFY' as const;
export const DEQ_NOTIFY = 'notify_DEQ_NOTIFY' as const;

export const notify =
  (msg: string, msgType: ToastMsgType = 'info', disappearTime = 3000): any =>
  async (dispatch: Dispatch) => {
    dispatch(reqNotify());
    try {
      dispatch(
        enqNotify({
          msg,
          disappearTime,
          uuid: Math.floor(Date.now() - Math.random()),
          msgType
        })
      );
      setTimeout(() => dispatch(deqNotify()), disappearTime);
    } catch (e) {
      console.log(e);
      dispatch(
        enqNotify({
          msg: 'Something was wrong!',
          msgType: 'error',
          disappearTime,
          uuid: Math.floor(Date.now() - Math.random())
        })
      );
    }
  };

export const reqNotify = () => ({ type: NOTIFY });

export const enqNotify = ({
  msg,
  disappearTime,
  msgType,
  uuid
}: NotifyMessageType) => ({
  type: ENQ_NOTIFY,
  payload: { msg, disappearTime, msgType, uuid }
});

export const deqNotify = () => ({ type: DEQ_NOTIFY });
