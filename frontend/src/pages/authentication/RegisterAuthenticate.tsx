import GenericForm from '@/components/shared/GenericForm';
import { useState } from 'react';
import { registerForm } from '@/config';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegistration } from '../../store/authenticationSlice';
import { useToast } from '@/hooks/use-toast';
import type { AppDispatch } from '@/store/store';
import {
	RegisterFormData,
	RegisterResponse,
} from '@/store/authenticationSlice/types';

const initialState = {
	userName: '',
	email: '',
	password: '',
};

const RegisterAuthenticate = () => {
	const [formData, setFormData] = useState<RegisterFormData>(initialState);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { toast } = useToast();
	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		dispatch(userRegistration(formData)).then((data: any) => {
			if (data?.payload?.success) {
				toast({
					title: data?.payload?.message,
				});
				navigate('/authenticate/login');
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
				<h1 className="text-3xl font-medium tracking-tight text-foreground">
					Create new account
				</h1>
				<p className="mt-2">
					Already Registered?
					<Link
						className="font-normal ml-2 text-primary hover:underline"
						to="/authenticate/login"
					>
						Login
					</Link>
				</p>
			</div>
			<GenericForm
				formElements={registerForm}
				buttonText={'Register'}
				formData={formData}
				setFormData={setFormData}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default RegisterAuthenticate;
