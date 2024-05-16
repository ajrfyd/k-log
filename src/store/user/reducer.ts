import { type InitialStateType, type ActionType } from './types';

const initialState: InitialStateType = {
  nickName: '',
  token: '',
  isLogin: false,
  loginType: 'i',
  role: 'user',
  id: ''
};

const userReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'user_LOGIN':
      return {
        ...state,
        ...action.payload,
        isLogin: true
      };
    case 'user_LOGOUT':
      return {
        ...state,
        isLogin: false,
        token: '',
        nickName: ''
      };

    default:
      return state;
  }
};

export default userReducer;
