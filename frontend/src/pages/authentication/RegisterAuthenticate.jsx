import GenericForm from '@/components/shared/GenericForm';
import { useState } from 'react';
import { registerForm } from '@/config';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegistration } from '../../store/authenticationSlice';
import { useToast } from '@/hooks/use-toast';

const initialState = {
	userName: '',
	email: '',
	password: '',
};

const RegisterAuthenticate = () => {
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { toast } = useToast();
	function onSubmit(e) {
		e.preventDefault();
		dispatch(userRegistration(formData)).then((data) => {
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
				<h1 className="text-3xl font-bold tracking-tight text-foreground">
					Create new account
				</h1>
				<p className="mt-2">
					Already Registered?
					<Link
						className="font-medium ml-2 text-primary hover:underline"
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
