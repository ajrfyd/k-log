import { combineReducers } from 'redux';
import notifyReducer from './notify/reducer';
import userReducer from './user/reducer';
import chatReducer from './chat/reducer';

const rootReducer = combineReducers({
  notify: notifyReducer,
  user: userReducer,
  chat: chatReducer
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
