import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from './authenticationSlice';

const store = configureStore({
	reducer: {
		authenticate: authenticateReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
