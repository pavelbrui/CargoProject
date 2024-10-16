import React from 'react';

const PriceDisplay = ({ calculatedPrice, t }) => {
    return calculatedPrice ? (
        <div style={formStyles.priceContainer}>
            <h3 style={formStyles.priceHeader}>{t.calculatePrice}: {calculatedPrice.amount} {calculatedPrice.currency}</h3>
        </div>
    ) : null;
};

const formStyles = {
    priceContainer: {
        //border: '2px solid #b60d0d',
        //backgroundColor: '#b88e2f',
        //borderRadius: '20px',
        //boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        //padding: '2px',
        textAlign: 'center',
        //marginBottom: '20px',
    },
    priceHeader: {
        //color: '#b60d0d',
        fontWeight: 'bold',
        fontSize: '24px',
    },
};

export default PriceDisplay;
