import { InitialStateType, ActionType } from './types';

const initialState: InitialStateType = {
  nickName: null,
  token: null,
  role: 'user',
  id: null,
  roomId: null,
  socketId: null,
  recentConnect: new Date(Date.now()),
  isLogin: false
};

const userRReducer = (
  state = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case 'user_INIT_USER':
      return {
        ...state,
        ...action.payload
      };
    case 'user_USER_LOGIN':
      return {
        ...state,
        ...action.payload,
        isLogin: true,
        recentConnect: new Date(Date.now())
      };
    case 'user_USER_LOGOUT':
      return {
        ...state,
        nickName: `unknown-${Date.now()}`,
        isLogin: false,
        id: null,
        roomId: null,
        recentConnect: new Date(Date.now()),
        role: 'user',
        token: null
      };
    case 'user_SET_USERINFO':
      console.log(action.payload, '<ASDASDA');
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default userRReducer;
