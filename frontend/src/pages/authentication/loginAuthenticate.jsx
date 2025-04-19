import GenericForm from '@/components/shared/GenericForm';
import { useState } from 'react';
import { loginForm } from '@/config';
import { Link } from 'react-router-dom';
const initialState = {
  email: '',
  password: '',
};
const LoginAuthenticate = () => {
  const [formData, setFormData] = useState(initialState);
  function onSubmit(event) {
    event.preventDefault();
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
