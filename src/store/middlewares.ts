import { io, Socket } from 'socket.io-client';
import { Middleware, AnyAction } from 'redux';
import { setSocket, socketDisconnect } from './socket/action';
import { initUser, login } from './userr/action';
import { RootReducerType } from '.';
import { notify } from './notify/actions';
import { canPlayAudio } from '../lib/utils/canPlay';

const { VITE_ENV, VITE_API_URL } = import.meta.env;

export const socketMiddleware = (): Middleware<{}, RootReducerType> => {
  let socket: Socket | null = null;

  return (store) => (next) => (action: AnyAction) => {
    if (!isSocketAction(action)) return next(action);
    // console.log(isSocketAction(action), action.type);
    // console.log('Here is Socket Middleware');
    // console.log(action);

    switch (action.type) {
      case 'socket_INIT_SOCKET':
        if (socket !== null) socket.close();
        socket = io(
          VITE_ENV !== 'development' ? VITE_API_URL : 'http://localhost:8800',
          {
            transports: ['websocket'],
            withCredentials: true,
            auth: {
              // nickName: user.nickName
            }
          }
        );

        store.dispatch(setSocket({ socketId: socket.id }));

        //! Connected!
        socket.on('connect', () => {
          store.dispatch(setSocket({ socketId: socket!.id, socket }));
        });

        socket.on('decodedUser', (user) => {
          const loginUser = {
            nickName: user.nickName,
            role: user.role,
            socketId: socket!.id as string,
            id: user.userId,
            roomId: user.roomId
          };

          //* roomId 필요
          // setStorage('userInfo', loginUser);
          store.dispatch(login(loginUser));
        });

        socket.on('unknownUser', (user) => {
          store.dispatch(
            initUser({
              nickName: user,
              role: 'user',
              socketId: socket!.id as string,
              id: null,
              roomId: null
            })
          );
        });

        socket.on('receiveMsg', (_) => {
          //msg { msg, msgId, msgState, roomId, };
          const { chatT } = store.getState();
          const { visible, show } = chatT;
          if (!visible && !show) {
            notify('새로운 메시지가 있습니다.', 'info')(
              store.dispatch,
              store.getState,
              undefined
            );
            if (canPlayAudio()) {
              const s = new Audio('/assets/sounds/notification.mp3');
              s.play();
            }
          }
        });
        //Todo localstorage set
        //Todo isLogin과 roomId는 닉네임셀렉트 페이지
        socket.on('disconnect', () => store.dispatch(socketDisconnect()));

        break;
      case 'socket_SOCKET_DISCONNECT':
        if (socket !== null) socket.close();
        socket = null;
        break;
      default:
        return next(action);
    }
  };
};

export const userMiddleware: Middleware =
  (_) => (next) => (action: AnyAction) => {
    if (action.type === 'user_USER_LOGIN') {
      // alert('!!!');
      // const { user2 } = store.getState();
      // console.log(user2, 'ASDASDASDASD');
      // if (user2.nickName !== null) {
      //   notify(`${user2.nickName}님 환영합니다.`)(
      //     store.dispatch,
      //     store.getState,
      //     undefined
      //   );
      // }
      // store.dispatch(notify(`Test님 환영합니다.`));
      return next(action);
    }
    next(action);
  };

export const logger: Middleware = (_) => (next) => (action) => {
  console.log(`%c${action.type}`, 'color: red');
  next(action);
  console.log(`%c${action.type}`, 'color: blue');
};

// const isSocketAction = (action: AnyAction): action is SocketAction => {
//   return /^socket\//.test(action.type);
// };

const isSocketAction = (action: AnyAction) => {
  //& action이 plain object가 아니거나 type이 문자열이 아닌 경우를 처리
  if (typeof action !== 'object' || !action || typeof action.type !== 'string')
    return false;
  return action.type.split('_')[0] === 'socket';
};
