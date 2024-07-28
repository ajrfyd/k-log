import { InitialState, ActionType } from './types';

const initialState: InitialState = {
  msgs: [],
  show: false,
  onlineUser: null,
  selectedRoom: null,
  visible: false
  // socket: null,
};

const chatTReducer = (
  state = initialState,
  action: ActionType
): InitialState => {
  switch (action.type) {
    case 'chat_CHAT_SET_MSG':
      return {
        ...state,
        msgs: [...state.msgs, action.payload]
      };
    case 'chat_CHAT_SET_MSGS':
      return {
        ...state,
        msgs: action.payload
      };
    case 'chat_CHAT_OPEN':
      return {
        ...state,
        show: true
      };
    case 'chat_CHAT_CLOSE':
      return {
        ...state,
        show: false
        // visible: false
      };
    case 'chat_CHAT_SELECT_ROOM':
      return {
        ...state,
        selectedRoom: action.payload
      };
    case 'chat_SET_VISIBLE':
      return {
        ...state,
        visible: action.payload
      };
    case 'chat_CHAT_INIT':
      return {
        ...state,
        msgs: [],
        visible: false
      };
    case 'chat_CHAT_LOGOUT':
      return {
        ...state,
        msgs: [],
        show: false,
        selectedRoom: null,
        visible: false
      };
    default:
      return state;
  }
};

export default chatTReducer;
