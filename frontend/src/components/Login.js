import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Auth.css';
import GoogleLoginButton from './GoogleLoginButton';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required')
});

const Login = ({ setAuth }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (result.message !== 'Logged in successfully') {
        setLoginError(result.message);
      } else {
        localStorage.setItem('authToken', result.token);
        setAuth(true);
        window.location.href = '/protected';
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('An error occurred during login. Please try again.');
    }
  };

  return (
      <div className="container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          {loginError && <div className="error-message">{loginError}</div>}
          {errors.email && <div className="error-message">{errors.email.message}</div>}
          {errors.password && <div className="error-message">{errors.password.message}</div>}

          <input
              type="email"
              {...register('email')}
              placeholder="Email"
          />

          <input
              type="password"
              {...register('password')}
              placeholder="Password"
          />

          <button type="submit">Login</button>
          <GoogleLoginButton setAuth={setAuth} />
          <a href="/register" className="link">Don't have an account? Sign up</a>
          <a href="/request-reset-password" className="link">Forgot password?</a>
        </form>
      </div>
  );
};

export default Login;
