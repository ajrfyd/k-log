import { type SocketStore, type SocketAction } from './type';

const initialState: SocketStore = {
  socket: null,
  socketId: null,
  isConnected: false,
  onlineUser: []
};

const socketReducer = (
  state = initialState,
  action: SocketAction
): SocketStore => {
  switch (action.type) {
    case 'socket_INIT_SOCKET':
      return {
        ...state
      };
    case 'socket_SOCKET_DISCONNECT':
      return {
        ...state,
        onlineUser: [],
        isConnected: false,
        socketId: null
      };
    case 'socket_SET_SOCKET':
      return {
        ...state,
        ...action.payload
      };
    // case 'socket_CHAT_OPEN':
    //   return {
    //     ...state,
    //     isOpen: true
    //   };
    // case 'socket_CHAT_CLOSE':
    //   return {
    //     ...state,
    //     isOpen: false
    //   };
    // case 'socket_SET_MSGS':
    //   return {
    //     ...state,
    //     msgs: action.payload
    //   };
    // case 'socket_SET_MSG':
    //   return {
    //     ...state,
    //     msgs: [...state.msgs, action.payload]
    //   };
    case 'socket_SET_ONLINE':
      return {
        ...state,
        onlineUser: action.payload
      };
    default:
      return state;
  }
};

export default socketReducer;
