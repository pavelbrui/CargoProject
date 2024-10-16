// src/components/LoginForm.js
import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_USER } from '../graphql/queries';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess, onRegister, onForgotPassword }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const [loginUser] = useLazyQuery(LOGIN_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            const { data } = await loginUser({ variables: { user: formData } });
            if (data?.public?.login?.password?.accessToken) {
                const accessToken = data.public.login.password.accessToken;
                localStorage.setItem('token', accessToken);
                onLoginSuccess();
            } else if (data?.public?.login?.password?.hasError) {
                handleLoginError(data.public.login.password.hasError);
            } else {
                console.error('Login response did not include an access token');
                setError('Unexpected error occurred. Please try again.');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Network error occurred. Please try again later.');
        }
    };

    const handleLoginError = (errorType) => {
        switch (errorType) {
            case 'CONFIRM_EMAIL_BEFOR_LOGIN':
                setError('Please confirm your email before logging in.');
                break;
            case 'INVALID_LOGIN_OR_PASSWORD':
                setError('Invalid login or password. Please try again.');
                break;
            case 'CANNOT_FIND_CONNECTED_USER':
                setError('Cannot find a user connected with these credentials.');
                break;
            case 'YOU_PROVIDED_OTHER_METHOD_OF_LOGIN_ON_THIS_EMAIL':
                setError('You provided a different method of login for this email.');
                break;
            case 'UNEXPECTED_ERROR':
                setError('An unexpected error occurred. Please try again.');
                break;
            default:
                setError('An unknown error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="username">Email:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="login-button">Login</button>
                </div>
                <div className="login-options">
    <Link to="/register">
        <button type="button" className="registration-button" onClick={onRegister}>Register</button>
    </Link>
    <button type="button" className="forgot-password-button" onClick={onForgotPassword}>Forgot Password?</button>
</div>
            </form>
        </div>
    );
};

export default LoginForm;
