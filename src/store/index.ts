import { combineReducers } from 'redux';
import notifyReducer from './notify/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
  notify: notifyReducer,
  user: userReducer
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
