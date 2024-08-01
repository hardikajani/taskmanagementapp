import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png'

import Input from '../../components/Common/Input'
import Button from "../../components/Common/Button";
import api from "../../utils/baseURL";


function Signup() {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {

        const createUser = await api.post('/api/users/register', formData);
        
        if (createUser && createUser.data.message === "Success") {
          
          navigate('/login', { replace: true });
          setFormData({ displayName: '', email: '', password: '', confirmPassword: '' });
          setErrors({});
                    
        } else {
          console.error("Create user failed:", createUser);
        }

      } catch (error) {
        console.error(error);
        // Handle error response from API
        if (error.response) {
          const errorData = error.response.data;
          if (typeof errorData === 'object') {
            setErrors(errorData);
          } else {
            setErrors({ general: errorData.message });
          }
        } else {
          console.error('Error creating user account:', error.message);
          setErrors({ general: error.message });
        }
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    const { displayName, email, password, confirmPassword } = formData;
    if (!displayName) {
      errors.displayName = 'Please enter your display name';
    }
    if (!email) {
      errors.email = 'Please enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!password) {
      errors.password = 'Please enter a password';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
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
          Create an account
        </h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="displayName"
            label="Display Name"
            value={formData.displayName}
            onChange={handleChange}
            error={errors.displayName}
          />
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
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <div className="pt-2">
            <Button type="submit" className="bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Create account
            </Button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm">
          Already registered?{' '}
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup;