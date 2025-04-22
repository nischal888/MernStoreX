import { User } from '../../types/User';
export interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User | null;
}
export interface LoginFormData {
	email: string;
	password: string;
}
export interface RegisterFormData {
	userName: string;
	email: string;
	password: string;
}
export interface RegisterResponse {
	success: boolean;
	message: string;
}

export interface LoginResponse {
	success: boolean;
	message: string;
	user: User | null;
}
