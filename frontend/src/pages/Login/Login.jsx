
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../app/features/auth/authSlice';

import logo from '../../assets/logo.png'

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import api from '../../utils/baseURL';



function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const logindUser = await api.post('/api/users/login', formData);
        
        if (!logindUser.data || !logindUser.data.data) {
          console.error('API response is invalid:');
          return;
        }
        
        const userData = logindUser.data.data.user;
        // console.log(userData);
        if (userData) {
          dispatch(login(userData));
          navigate('/dashboard', { replace: true });
          setFormData({ email: '', password: '' });
        }

      } catch (error) {

        const errorMessage = error.message;
        let errorObject = {};
        // Handle specific error codes
        if (errorMessage) {
          errorObject.general = errorMessage
        }
        setErrors(errorObject);
      }
    }
  };
  
  const validateForm = () => {
    const errors = {};
    const { email, password } = formData;

    if (!email) {
      errors.email = 'Please enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!password) {
      errors.password = 'Please enter a password';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="logo"
          src={logo}
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="email"
            label="Email address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button type="submit" className="bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </Button>
          {errors.general && <p className="text-red-500">{errors.general}</p>}
        </form>
        <p className="mt-10 text-center text-sm">
          Not registered yet?{' '}
          <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 underline">
            create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;