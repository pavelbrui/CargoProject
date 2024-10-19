import React, { useEffect, useState } from 'react';
import MyOrdersForm from '../components/MyOrdersForm';
import LoginForm from '../components/LoginForm';

const MyOrders = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
        else {setIsLoggedIn(false)}
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div>
            {isLoggedIn ? <MyOrdersForm /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
        </div>
    );
};

export default MyOrders;
