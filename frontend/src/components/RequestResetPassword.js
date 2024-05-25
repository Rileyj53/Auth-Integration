import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Auth.css';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required')
});

const RequestResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [requestError, setRequestError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://localhost:8080/auth/request-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (result.message !== 'Password reset link sent to your email') {
                setRequestError(result.message);
                setSuccessMessage('');
            } else {
                setRequestError('');
                setSuccessMessage(result.message);
            }
        } catch (err) {
            console.error('Request reset error:', err);
            setRequestError('An error occurred. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Reset Password</h2>
                {requestError && <div className="error-message">{requestError}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errors.email && <div className="error-message">{errors.email.message}</div>}

                <input
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                />

                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default RequestResetPassword;
