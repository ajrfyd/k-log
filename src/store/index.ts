import { combineReducers } from 'redux';
import notifyReducer from './notify/reducer';

const rootReducer = combineReducers({
  notify: notifyReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
