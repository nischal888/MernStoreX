import { Outlet } from 'react-router-dom';
import AdminSideNavigation from './AdminSidenav';
import AdminHeader from './AdminHeader';
import { useState } from 'react';

function AdminLayout() {
	const [toggleSideBar, setToggleSideBar] = useState(false);
	return (
		<div className="flex min-h-screen w-ful">
			<AdminSideNavigation
				toggle={toggleSideBar}
				setToggle={setToggleSideBar}
			/>
			<div className="flex flex-1 flex-col">
				<AdminHeader setToggle={setToggleSideBar} />
				<main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
					<Outlet></Outlet>
				</main>
			</div>
		</div>
	);
}

export default AdminLayout;
