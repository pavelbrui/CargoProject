import React from 'react';
import OrderForm from '../components/OrderForm';
import DndProvider from './../DndProvider';

const Home = () => {
    return (
        <DndProvider>
            <OrderForm />
        </DndProvider>
    );
};

export default Home;