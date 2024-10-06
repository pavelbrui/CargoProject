// OrderActions.js
import React from 'react';
import ContactInfoForm from './ContactInfoForm'; 


const OrderActions = ({ handleCalculatePrice, calculatedPrice, t, showContactForm, setShowContactForm, handleContactInfoSubmit }) => {
    return (
        <>
            <button type="button" onClick={handleCalculatePrice} style={formStyles.calculateButton}>
                {t.calculatePrice}
            </button>

            {/* Display the calculated price */}
            {calculatedPrice && (
                <p style={formStyles.price}>{t.calculatedPrice}: {calculatedPrice}</p>
            )}

            <button type="button" onClick={() => setShowContactForm(true)} style={formStyles.submitButton}>
                {t.createOrder}
            </button>

            {showContactForm && (
                <ContactInfoForm onSubmit={handleContactInfoSubmit} />
            )}
        </>
    );
};

const formStyles = {
    calculateButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '15px',
    },
    submitButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    price: {
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
};

export default OrderActions;
