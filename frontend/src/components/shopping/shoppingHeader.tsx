import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { logoutUser } from '@/store/authenticationSlice';
// import UserCartWrapper from "./cart-wrapper";
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingViewHeaderNavigation } from '@/config';
import { fetchCartItems } from '@/store/cartSlice';
import UserCartWrapper from '@/components/shopping/cartWrapper';
import { Label } from '../ui/label';

function ShopNavigation() {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	function handleNavigate(getCurrentMenuItem) {
		sessionStorage.removeItem('filters');
		const currentFilter =
			getCurrentMenuItem.id !== 'home' &&
			getCurrentMenuItem.id !== 'products' &&
			getCurrentMenuItem.id !== 'search'
				? {
						category: [getCurrentMenuItem.id],
				  }
				: null;

		sessionStorage.setItem('filters', JSON.stringify(currentFilter));

		location.pathname.includes('listing') && currentFilter !== null
			? setSearchParams(
					new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
			  )
			: navigate(getCurrentMenuItem.path);
	}

	return (
		<nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
			{shoppingViewHeaderNavigation.map((navItem) => (
				<Label
					onClick={() => handleNavigate(navItem)}
					className="text-sm font-normal cursor-pointer"
					key={navItem.id}
				>
					{navItem.label}
				</Label>
			))}
		</nav>
	);
}
function HeaderRightContent() {
	const { user } = useSelector((state) => state.authenticate);
	const { cartItems } = useSelector((state) => state.shopCarts);
	const [openCartSheet, setOpenCartSheet] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(logoutUser());
	}

	useEffect(() => {
		dispatch(fetchCartItems(user?.id));
	}, [dispatch]);

	return (
		<div className="flex lg:items-center lg:flex-row flex-col gap-4">
			<Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
				<Button
					onClick={() => setOpenCartSheet(true)}
					variant="outline"
					size="icon"
					className="relative"
				>
					<ShoppingCart className="w-6 h-6" />
					<span className="absolute top-[-5px] right-[2px] font-medium text-sm">
						{cartItems?.items?.length || 0}
					</span>
					<span className="sr-only">User cart</span>
				</Button>
				<UserCartWrapper
					setOpenCartSheet={setOpenCartSheet}
					cartItems={
						cartItems && cartItems.items && cartItems.items.length > 0
							? cartItems.items
							: []
					}
				/>
			</Sheet>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="bg-black">
						<AvatarFallback className="bg-black text-white font-medium">
							{user?.userName[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="right" className="w-56">
					<DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => navigate('/shop/account')}>
						<UserCog className="mr-2 h-4 w-4" />
						Account
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleLogout}>
						<LogOut className="mr-2 h-4 w-4" />
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
function shoppingHeader() {
	const { isAuthenticated } = useSelector((state) => state.authenticate);
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="flex h-16 items-center justify-between px-4 md:px-6">
				<Link to="/shop/home" className="flex items-center gap-2">
					<span className="font-bold text-xl">Mern</span>
				</Link>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="lg:hidden">
							<Menu className="h-6 w-6" />
							<span className="sr-only">Toggle header menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-full max-w-xs">
						<ShopNavigation />
						<HeaderRightContent />
					</SheetContent>
				</Sheet>
				<div className="hidden lg:block">
					<ShopNavigation />
				</div>

				<div className="hidden lg:block">
					<HeaderRightContent />
				</div>
			</div>
		</header>
	);
}

export default shoppingHeader;
