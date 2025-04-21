import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from './authenticationSlice';

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
  },
});

export default store;
