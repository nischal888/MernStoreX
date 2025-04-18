import GenericForm from '@/components/shared/GenericForm';
import { useState } from 'react';
import { registerForm } from '@/config';
import { Link } from 'react-router-dom';

const initialState = {
  usrName: '',
  email: '',
  password: '',
};

const RegisterAuthenticate = () => {
  const [formData, setFormData] = useState(initialState);
  function onSubmit() {
    console.log('got it');
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
