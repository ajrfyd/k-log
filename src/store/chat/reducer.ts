import { ActionType, InitialState } from './types';

const initialState: InitialState = {
  show: false,
  currentPage: 'home',
  msgs: [],
  isAdmin: false,
  chatRooms: {
    rooms: [],
    new: [],
    selectedRoom: null
  },
  socket: null,
  onlineUser: {}
};

const chatReducer = (
  state = initialState,
  action: ActionType
): InitialState => {
  switch (action.type) {
    case 'chat_CHAT_SHOW':
      return {
        ...state,
        show: true
      };
    case 'chat_CHAT_CLOSE':
      return {
        ...state,
        show: false
      };
    case 'chat_SHOW_HOME':
      return {
        ...state,
        currentPage: 'home'
      };
    case 'chat_SHOW_ROOM':
      return {
        ...state,
        currentPage: 'room'
      };
    case 'chat_CHAT_CONNECTED':
      return {
        ...state,
        socket: action.payload
      };
    case 'chat_SET_MSGS':
      return {
        ...state,
        msgs: [...action.payload]
      };
    case 'chat_PUSH_MSG':
      return {
        ...state,
        msgs: [...state.msgs, action.payload]
      };
    case 'chat_CHAT_INITIALIZE':
      return {
        ...state,
        show: false,
        currentPage: 'home',
        msgs: [],
        isAdmin: false
      };
    case 'chat_SET_ROOMS':
      return {
        ...state,
        chatRooms: {
          // rooms: [...action.paylaod],
          // new: [],
          // selectedRoom: null
          ...state.chatRooms,
          rooms: [...action.paylaod]
        },
        isAdmin: true
      };
    case 'chat_SET_NEW_MSG':
      return {
        ...state,
        chatRooms: {
          ...state.chatRooms,
          new: [...state.chatRooms.new, action.payload]
        }
      };
    case 'chat_CHECK_MSG':
      return {
        ...state,
        chatRooms: {
          ...state.chatRooms,
          new: state.chatRooms.new.filter(
            ({ roomId }) => roomId !== action.payload
          )
        }
      };
    case 'chat_SELCECT_ROOM':
      return {
        ...state,
        chatRooms: {
          ...state.chatRooms,
          selectedRoom: action.payload
        }
      };
    case 'chat_ONLINE_USRE':
      return {
        ...state,
        onlineUser: {
          ...action.payload
        }
      };
    case 'chat_LEAVE_USER':
      return {
        ...state,
        onlineUser: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default chatReducer;
