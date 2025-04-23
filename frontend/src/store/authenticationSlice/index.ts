import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	AuthState,
	LoginFormData,
	LoginResponse,
	RegisterFormData,
	RegisterResponse,
} from './types';

const initialState: AuthState = {
	isAuthenticated: false,
	isLoading: false,
	user: null,
};

export const userRegistration = createAsyncThunk<
	RegisterResponse,
	RegisterFormData
>('/authenticate/register', async (formData) => {
	const response = await axios.post(
		'http://localhost:8000/api/authenticate/register',
		formData,
		{
			withCredentials: true,
		}
	);
	return response.data;
});
export const userLogin = createAsyncThunk<LoginResponse, LoginFormData>(
	'/authenticate/login',
	async (formData) => {
		const response = await axios.post(
			'http://localhost:8000/api/authenticate/login',
			formData,
			{
				withCredentials: true,
			}
		);
		return response.data;
	}
);

export const checkAuthStatus = createAsyncThunk(
	'/authenticate/status',
	async (formData) => {
		const response = await axios.get(
			'http://localhost:8000/api/authenticate/status',

			{
				withCredentials: true,
				headers: {
					'Cache-Control': 'no-store,no-cache,must-revalidate,proxy-revalidate',
				},
			}
		);
		return response.data;
	}
);

const authenticateSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserInfo: (state, action) => {},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userRegistration.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(userRegistration.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(userRegistration.rejected, (state) => {
				state.isLoading = true;
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(userLogin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.success ? action.payload.user : null;
				state.isAuthenticated = action.payload.success;
			})
			.addCase(userLogin.rejected, (state) => {
				state.isLoading = true;
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(checkAuthStatus.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(checkAuthStatus.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.success ? action.payload.user : null;
				state.isAuthenticated = action.payload.success;
			})
			.addCase(checkAuthStatus.rejected, (state) => {
				state.isLoading = true;
				state.user = null;
				state.isAuthenticated = false;
			});
	},
});

export const { setUserInfo } = authenticateSlice.actions;
export default authenticateSlice.reducer;
