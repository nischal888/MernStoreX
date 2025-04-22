import { User } from '../../types/User';
export interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User | null;
}
