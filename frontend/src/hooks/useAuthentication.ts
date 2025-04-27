import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useAuthentication = () => {
	const { isAuthenticated, user, isLoading } = useSelector(
		(state: RootState) => state.authenticate
	);
	return { isAuthenticated, user, isLoading };
};
