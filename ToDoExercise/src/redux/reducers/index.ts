import { combineReducers } from "redux";
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  taskReducer
});
export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;