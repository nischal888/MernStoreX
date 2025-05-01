import { Button } from '../ui/button';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/authenticationSlice';
interface AdminHeaderProps {
	setToggle: Dispatch<SetStateAction<boolean>>;
}
function AdminHeader({ setToggle }: AdminHeaderProps) {
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(logoutUser());
	}
	return (
		<header className="flex items-center justify-between px-4 py-3 bg-background border-b">
			<Button onClick={() => setToggle(true)} className="lg:hidden sm:block">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>

				<span className="sr-only">Toggle Menu</span>
			</Button>
			<div className="flex flex-1 justify-end">
				<Button
					onClick={handleLogout}
					className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
						/>
					</svg>
					Logout
				</Button>
			</div>
		</header>
	);
}

export default AdminHeader;
