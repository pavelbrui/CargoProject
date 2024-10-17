import React from 'react';
import { useLanguage, translationsOrderForm } from '../../LanguageContext';

const SimpleModal = ({ orderDetails, onClose }) => {
    const { language } = useLanguage(); // Get the current language
    const t = translationsOrderForm[language]; // Access the translations for the current language

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>{t.orderSuccess}</h2> {/* Translated header */}
                <h3>{t.orderDetails}</h3> {/* Translated sub-header */}
                <p><strong>{t.userEmail}:</strong> {orderDetails?.userEmail}</p>
                <p><strong>{t.direction}:</strong> {orderDetails?.direction}</p>
                <p><strong>{t.from}:</strong> {orderDetails.from.fullName}, {orderDetails.from.country}, {orderDetails.from.addressGoogleString}</p>
                <p><strong>{t.to}:</strong> {orderDetails.to.fullName}, {orderDetails.to.country}, {orderDetails.to.addressGoogleString}</p>
                <p><strong>{t.deliveryType}:</strong> {orderDetails.deliveryType}</p>
                <p><strong>{t.ownerType}:</strong> {orderDetails.ownerType}</p>
                <p><strong>{t.paymentCurrency}:</strong> {orderDetails.paymentCurrency}</p>
                <p><strong>{t.totalPrice}:</strong> {orderDetails.totalPrice} {orderDetails.paymentCurrency}</p>
                
                <h4>{t.elements}:</h4> {/* Translated section header */}
                <ul>
                    {orderDetails.elements.map((element, index) => (
                        <li key={index}>
                            <strong>{t.description}:</strong> {element.description}, 
                            <strong> {t.dimensions}:</strong> {element.length}x{element.width}x{element.height}, 
                            <strong> {t.weight}:</strong> {element.weight}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} style={modalStyles.button}>{t.close}</button> {/* Translated button */}
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
        backgroundColor: '#b60d0d',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default SimpleModal;
