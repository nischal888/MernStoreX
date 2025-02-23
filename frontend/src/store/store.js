import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from './authentication-slice';

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
  },
});

export default store;
