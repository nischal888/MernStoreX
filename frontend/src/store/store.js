import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from './auth-slice';

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
  },
});

export default store;
