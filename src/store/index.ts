import { combineReducers } from 'redux';
import notifyReducer from './notify/reducer';
import userReducer from './user/reducer';
import chatReducer from './chat/reducer';
import postReducer from './post/reducer';
import chatTReducer from './chatt/reducer';
import user2Reducer from './userr/reducer';
import socketReducer from './socket/reducer';

const rootReducer = combineReducers({
  notify: notifyReducer,
  user: userReducer,
  chat: chatReducer,
  post: postReducer,
  chatT: chatTReducer,
  user2: user2Reducer,
  socket: socketReducer
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
