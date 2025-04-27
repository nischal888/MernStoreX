import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { User } from '../../types/User';
import { useAuthentication } from '@/hooks/useAuthentication';
interface AuthenticationCheckerProps {
	children?: ReactNode;
}

const AuthenticationChecker = ({ children }: AuthenticationCheckerProps) => {
	const { isAuthenticated, user, isLoading } = useAuthentication();
	const paramLocation = useLocation();
	if (isLoading) return <div>Loading...</div>;

	if (
		!isAuthenticated &&
		!(
			paramLocation.pathname.includes('/login') ||
			paramLocation.pathname.includes('/register')
		)
	) {
		return <Navigate to="/authenticate/login" />;
	}
	if (
		isAuthenticated &&
		(paramLocation.pathname.includes('/login') ||
			paramLocation.pathname.includes('/register'))
	) {
		if (user?.role === 'admin') {
			return <Navigate to="/administration/dashboard" />;
		} else {
			return <Navigate to="/shop/home" />;
		}
	}
	if (
		isAuthenticated &&
		user?.role !== 'admin' &&
		paramLocation.pathname.includes('administration')
	) {
		return <Navigate to="/unauthorize-page" />;
	}
	if (
		isAuthenticated &&
		user?.role === 'admin' &&
		paramLocation.pathname.includes('/shop')
	) {
		return <Navigate to="/administration/dashboard" />;
	}
	return <>{children}</>;
};

export default AuthenticationChecker;
