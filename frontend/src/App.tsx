import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthenticationLayout from './components/authentication/AuthenticateLayout';
import LoginAuthenticate from './pages/authentication/LoginAuthenticate';
import RegisterAuthenticate from './pages/authentication/RegisterAuthenticate';
import AdminLayout from './components/administration/AdminLayout';
import AdminOrders from './pages/administration/AdminOrders';
import AdminProducts from './pages/administration/AdminProducts';
import AdminDashboard from './pages/administration/AdminDashboard';
import ShoppingLayout from './components/shopping/shoppingLayout';
import PageNotFound from './pages/pagenotfound';
import ShoppingAccount from './pages/shopping/ShoppingAccount';
import ShoppingCheckout from './pages/shopping/ShoppingCheckout';
import ShoppingHome from './pages/shopping/ShoppingHome';
import ShoppingList from './pages/shopping/ShoppingList';
import UnauthorizePage from './pages/unauthorizepage';
import AuthenticationChecker from './components/shared/authenticationChecker';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuthStatus } from '@/store/authenticationSlice';
import type { AppDispatch } from '@/store/store';

function App() {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(checkAuthStatus());
	}, [dispatch]);

	return (
		<div className="flex flex-col overflow-hidden bg-white max-w-[1440px]">
			<Routes>
				<Route path="/" element={<AuthenticationChecker />} />
				<Route
					path="/authenticate"
					element={
						<AuthenticationChecker>
							<AuthenticationLayout />
						</AuthenticationChecker>
					}
				>
					<Route path="login" element={<LoginAuthenticate />} />
					<Route path="register" element={<RegisterAuthenticate />} />
				</Route>
				<Route
					path="/administration"
					element={
						<AuthenticationChecker>
							<AdminLayout />
						</AuthenticationChecker>
					}
				>
					<Route path="dashboard" element={<AdminDashboard />} />
					<Route path="orders" element={<AdminOrders />} />
					<Route path="products" element={<AdminProducts />} />
				</Route>
				<Route
					path="/shop"
					element={
						<AuthenticationChecker>
							<ShoppingLayout />
						</AuthenticationChecker>
					}
				>
					<Route path="home" element={<ShoppingHome />} />
					<Route path="lists" element={<ShoppingList />} />
					<Route path="checkout" element={<ShoppingCheckout />} />
					<Route path="account" element={<ShoppingAccount />} />
				</Route>
				<Route path="/unauthorize-page" element={<UnauthorizePage />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</div>
	);
}

export default App;
