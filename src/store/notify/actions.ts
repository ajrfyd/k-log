import { Dispatch } from 'redux';
import { NotifyMessageType } from './types';

export const NOTIFY = 'notify_NOTIFY' as const;
export const ENQ_NOTIFY = 'notify_ENQ_NOTIFY' as const;
export const DEQ_NOTIFY = 'notify_DEQ_NOTIFY' as const;

export const notify =
  (msg: string, disappearTime = 3000) =>
  (dispatch: Dispatch) => {
    dispatch(reqNotify());
    try {
      dispatch(
        enqNotify({
          msg,
          disappearTime,
          uuid: Math.floor(Date.now() - Math.random()),
        }),
      );
      setTimeout(() => dispatch(deqNotify()), disappearTime);
    } catch (e) {
      console.log(e);
      dispatch(
        enqNotify({
          msg: 'Something was wrong!',
          disappearTime,
          type: 'error',
        }),
      );
    }
  };

export const reqNotify = () => ({ type: NOTIFY });

export const enqNotify = ({
  msg,
  disappearTime,
}: Partial<NotifyMessageType>) => ({
  type: ENQ_NOTIFY,
  payload: { msg, disappearTime },
});

export const deqNotify = () => ({ type: DEQ_NOTIFY });
