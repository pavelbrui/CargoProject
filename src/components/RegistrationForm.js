// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        country: 'PL'
    });
    const [errorMessage, setErrorMessage] = useState('');
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
        try {
            const { data } = await registerUser({ variables: { user: {...formData} } });
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
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
