import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from './authenticationSlice';
import adminProductsSlice from '@/store/adminProductSlice';
import shoppingProductSlice from '@/store/shoppingProductSlice';
import shoppingCartSlice from '@/store/cartSlice';

const store = configureStore({
	reducer: {
		authenticate: authenticateReducer,
		adminProducts: adminProductsSlice,
		shopProducts: shoppingProductSlice,
		shopCarts: shoppingCartSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
