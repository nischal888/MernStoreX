import { Navigate, useLocation } from 'react-router-dom';

function AuthChecker({ isAuthenticated, user, children }) {
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
    if (user?.role === 'ADMIN') {
      return <Navigate to="/administration/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  if (
    isAuthenticated &&
    user?.role !== 'ADMIN' &&
    paramLocation.pathname.includes('administration')
  ) {
    return <Navigate to="/unauthorize-page" />;
  }
  if (
    isAuthenticated &&
    user?.role === 'ADMIN' &&
    paramLocation.pathname.includes('/shop')
  ) {
    return <Navigate to="/administration/dashboard" />;
  }
  return <>{children}</>;
}

export default AuthChecker;
