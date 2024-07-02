import { combineReducers } from 'redux';
import notifyReducer from './notify/reducer';
import userReducer from './user/reducer';
import chatReducer from './chat/reducer';
import postReducer from './post/reducer';

const rootReducer = combineReducers({
  notify: notifyReducer,
  user: userReducer,
  chat: chatReducer,
  post: postReducer
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
