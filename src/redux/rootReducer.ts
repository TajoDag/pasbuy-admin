import { combineReducers } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import loadingReducer from './reducers/loadingReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  notification: notificationReducer,
  user: userReducer,
});

export default rootReducer;