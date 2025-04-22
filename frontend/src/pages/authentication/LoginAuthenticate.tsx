import GenericForm from '@/components/shared/GenericForm';
import { useState } from 'react';
import { loginForm } from '@/config';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin } from '../../store/authenticationSlice';
import type { AppDispatch } from '@/store/store';
import { useToast } from '@/hooks/use-toast';
import { LoginFormData } from '@/store/authenticationSlice/types';

const initialState: LoginFormData = {
	email: '',
	password: '',
};
const LoginAuthenticate = () => {
	const [formData, setFormData] = useState<LoginFormData>(initialState);
	const dispatch = useDispatch<AppDispatch>();
	const { toast } = useToast();

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		dispatch(userLogin(formData)).then((data: any) => {
			if (data?.payload?.success) {
				toast({
					title: data?.payload?.message,
				});
			} else {
				toast({
					title: data?.payload?.message,
					variant: 'destructive',
				});
			}
		});
	}
	return (
		<div className="mx-auto w-full max-w-md space-y-6">
			<div className="text-center">
				<h1 className="text-3xl font-bold tracking-tight text-foreground">
					Login in to your account
				</h1>
				<p className="mt-2">
					Do not have an account?
					<Link
						className="font-medium ml-2 text-primary hover:underline"
						to="/authenticate/register"
					>
						Register
					</Link>
				</p>
			</div>
			<GenericForm
				formElements={loginForm}
				buttonText={'Login'}
				formData={formData}
				setFormData={setFormData}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default LoginAuthenticate;
