// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import './RegistrationForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        country: 'PL'
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registerUser] = useMutation(REGISTER_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        try {
            const { data } = await registerUser({ variables: { user: { ...formData } } });
            if (data?.public?.register?.registered) {
                alert('Registration successful!');
            } else if (data?.public?.register?.hasError) {
                handleRegisterError(data.public.register.hasError);
            }
        } catch (err) {
            console.error('Error registering user:', err);
        }
    };

    const handleRegisterError = (error) => {
        switch (error) {
            case 'USERNAME_EXISTS':
                setErrorMessage('Username already exists. Please choose a different email.');
                break;
            case 'PASSWORD_WEAK':
                setErrorMessage('Password is too weak. Please choose a stronger password.');
                break;
            case 'INVITE_DOMAIN_INCORRECT':
                setErrorMessage('Invite domain is incorrect.');
                break;
            case 'LINK_EXPIRED':
                setErrorMessage('The registration link has expired.');
                break;
            case 'USERNAME_INVALID':
                setErrorMessage('Username is invalid. Please provide a valid email.');
                break;
            default:
                setErrorMessage('Unexpected error occurred. Please try again later.');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };

    return (
        <div className="registration-container">
            <form className="registration-form" onSubmit={handleSubmit}>
                <h2 className="registration-title">Register</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="show-password-icon"
                            onClick={toggleShowPassword}
                        >
                            <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <div className="password-input-container">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="show-password-icon"
                            onClick={toggleShowConfirmPassword}
                        >
                            <i className={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                        </span>
                    </div>
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
