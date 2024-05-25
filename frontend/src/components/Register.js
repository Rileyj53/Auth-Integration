import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Auth.css';
import GoogleLoginButton from './GoogleLoginButton';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required')
});

const Register = ({ setAuth }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (result.message !== 'User registered successfully') {
        alert(result.message);
      } else {
        localStorage.setItem('authToken', result.token);
        setAuth(true);
        window.location.href = '/protected';
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
      <div className="container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          {errors.firstName && <div className="error-message">{errors.firstName.message}</div>}
          {errors.lastName && <div className="error-message">{errors.lastName.message}</div>}
          {errors.email && <div className="error-message">{errors.email.message}</div>}
          {errors.password && <div className="error-message">{errors.password.message}</div>}

          <input
              type="text"
              {...register('firstName')}
              placeholder="First Name"
          />

          <input
              type="text"
              {...register('lastName')}
              placeholder="Last Name"
          />

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

          <button type="submit">Register</button>
          <GoogleLoginButton setAuth={setAuth} />
          <a href="/login" className="link">Already have an account? Sign in</a>
        </form>
      </div>
  );
};

export default Register;