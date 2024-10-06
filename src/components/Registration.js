import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const REGISTER_USER = gql`
    mutation RegisterUser($input: RegisterUserInput!) {
        user {
            register(input: $input) {
                id
                email
            }
        }
    }
`;

const Registration = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
            await registerUser({ variables: { input: formData } });
            alert('Registration successful!');
        } catch (err) {
            console.error('Error registering user:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Registration;