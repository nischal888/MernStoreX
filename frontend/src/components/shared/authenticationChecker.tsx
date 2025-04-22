import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { User } from '../../types/User';
interface AuthenticationCheckerProps {
	isAuthenticated: boolean;
	user: User | null;
	children?: ReactNode;
}

const AuthenticationChecker = ({
	isAuthenticated,
	user,
	children,
}: AuthenticationCheckerProps) => {
	const paramLocation = useLocation();
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
