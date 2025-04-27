import {
	BadgeCheck,
	ChartNoAxesCombined,
	LayoutDashboard,
	ShoppingBasket,
} from 'lucide-react';
import { Fragment } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
interface AdminSideNavigationProps {
	toggle: boolean;
	setToggle: Dispatch<SetStateAction<boolean>>;
}
interface NavigationListsProps {
	setToggle?: Dispatch<SetStateAction<boolean>>; // Only used in mobile view
}
const adminNavigationLists = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		path: '/administration/dashboard',
		icon: <LayoutDashboard />,
	},
	{
		id: 'products',
		label: 'Products',
		path: '/administration/products',
		icon: <ShoppingBasket />,
	},
	{
		id: 'orders',
		label: 'Orders',
		path: '/administration/orders',
		icon: <BadgeCheck />,
	},
];

function NavigationLists({ setToggle }: NavigationListsProps) {
	const navigate = useNavigate();

	return (
		<nav className="mt-8 flex-col flex gap-2">
			{adminNavigationLists.map((menuItem) => (
				<div
					key={menuItem.id}
					onClick={() => {
						navigate(menuItem.path);
						setToggle ? setToggle(false) : null;
					}}
					className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
				>
					{menuItem.icon}
					<span>{menuItem.label}</span>
				</div>
			))}
		</nav>
	);
}

function AdminSideNavigation({ toggle, setToggle }: AdminSideNavigationProps) {
	const navigate = useNavigate();

	return (
		<Fragment>
			<Sheet open={toggle} onOpenChange={setToggle}>
				<SheetContent side="left" className="w-64">
					<div className="flex flex-col h-full">
						<SheetHeader className="border-b">
							<SheetTitle className="flex gap-2 mt-5 mb-5">
								<ChartNoAxesCombined size={30} />
								<span className="text-2xl font-extrabold">Admin Panel</span>
							</SheetTitle>
						</SheetHeader>
						<NavigationLists setToggle={setToggle} />
					</div>
				</SheetContent>
			</Sheet>
			<aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
				<div
					onClick={() => navigate('/administration/dashboard')}
					className="flex cursor-pointer items-center gap-2"
				>
					<ChartNoAxesCombined size={30} />
					<h1 className="text-2xl font-extrabold">Admin Panel</h1>
				</div>
				<NavigationLists />
			</aside>
		</Fragment>
	);
}

export default AdminSideNavigation;
