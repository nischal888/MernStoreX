import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from './authenticationSlice';
import adminProductsSlice from '@/store/adminProductSlice';

const store = configureStore({
	reducer: {
		authenticate: authenticateReducer,
		adminProduct: adminProductsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
