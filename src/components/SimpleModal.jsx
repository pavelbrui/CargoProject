import React from 'react';

const SimpleModal = ({ orderDetails, onClose }) => {
    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>Twoje zamówienie zostało wysłane!</h2>
                <h3>Szczegóły zamówienia:</h3>
                <p><strong>Email:</strong> {orderDetails.userEmail}</p>
                <p><strong>Od:</strong> {orderDetails.from.fullName}, {orderDetails.from.country}, {orderDetails.from.addressGoogleString}</p>
                <p><strong>Do:</strong> {orderDetails.to.fullName}, {orderDetails.to.country}, {orderDetails.to.addressGoogleString}</p>
                <p><strong>Typ dostawy:</strong> {orderDetails.deliveryType}</p>
                <p><strong>Właściciel:</strong> {orderDetails.ownerType}</p>
                <p><strong>Waluta:</strong> {orderDetails.paymentCurrency}</p>
                <p><strong>Cena całkowita:</strong> {orderDetails.totalPrice} {orderDetails.paymentCurrency}</p>
                
                <h4>Elementy zamówienia:</h4>
                <ul>
                    {orderDetails.elements.map((element, index) => (
                        <li key={index}>
                            <strong>Opis:</strong> {element.description}, 
                            <strong> Wymiary:</strong> {element.length}x{element.width}x{element.height}, 
                            <strong> Waga:</strong> {element.weight}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} style={modalStyles.button}>Zamknij</button>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        width: '80%',
        maxWidth: '500px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default SimpleModal;
