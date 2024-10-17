import React, { useState, useEffect, useCallback } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useLanguage, translationsOrderForm } from '../../LanguageContext';
import ContactInfoForm from './ContactInfoForm';
import ElementInputs from './ElementInputs';
import DeliveryOptions from './DeliveryOptions';
import PriceDisplay from './PriceDisplay';
import SimpleModal from './SimpleModal';  // Modal Component for success/error messages
import { SEND_ORDER } from '../../graphql/mutations';
import { CALCULATE_ORDER } from '../../graphql/queries';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        paymentCurrency: 'PLN',
        fromCountry: 'USA',
        toCountry: 'PL',
        deliveryType: 'AIR',
        ownerType: 'PRIVAT',
        elements: [{ length: '', width: '', height: '', weight: '', description: '' }],
        fromDoor: false,
        toDoor: false,
    });

    const [contactInfo, setContactInfo] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [calculatedPrice, setCalculatedPrice] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    const { language } = useLanguage();
    const t = translationsOrderForm[language];

    const [calculateOrder] = useLazyQuery(CALCULATE_ORDER, {
        onCompleted: (data) => {
            const price = data.public.calculateMyOrder;
            setCalculatedPrice({ amount: price, currency: formData.paymentCurrency });
        },
        onError: (error) => console.error('Error calculating price:', error),
    });

    const [sendOrder] = useMutation(SEND_ORDER, {
        onCompleted: (data) => {
            setOrderSuccess(true);
            setOrderDetails({ ...formData, ...contactInfo, totalPrice: calculatedPrice?.amount });
        },
        onError: (error) => setOrderError('Error sending order. Please try again.'),
    });

    const handleCalculatePrice = useCallback(async () => {
        const input = createOrderInput(formData);
        try {
            await calculateOrder({ variables: { input } });
        } catch (error) {
            console.error('Error calculating price:', error);
        }
    }, [formData, calculateOrder]);

    const handleSendOrderSubmit = async () => {
        if (!contactInfo || !calculatedPrice) {
            setShowContactForm(true);
            return;
        }

        const input = createSendOrderInput(contactInfo, formData, calculatedPrice);
        try {
            await sendOrder({ variables: { input } });
        } catch (err) {
            console.error('Error sending order:', err);
        }
    };

    const handleContactInfoSubmit = (info) => {
        setContactInfo(info);
        sendOrderMutation(info);
    };

    const sendOrderMutation = (info = contactInfo) => {
        if (!info || !calculatedPrice) return;

        const input = createSendOrderInput(info, formData, calculatedPrice);
        sendOrder({ variables: { input } });
    };

    useEffect(() => {
        handleCalculatePrice();
    }, [formData, handleCalculatePrice]);

    const handleModalClose = () => {
        setOrderSuccess(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            paymentCurrency: 'PLN',
            fromCountry: 'USA',
            toCountry: 'PL',
            deliveryType: 'AIR',
            ownerType: 'PRIVAT',
            elements: [{ length: '', width: '', height: '', weight: '', description: '' }],
            fromDoor: false,
            toDoor: false,
        });
        setContactInfo(null);
        setShowContactForm(false);
        setCalculatedPrice(null);
        setOrderDetails(null);
    };

    return (
        <div className="order-form">
            <h2>{t.submitOrder}</h2>
            {orderSuccess && orderDetails?.userEmail && (
                <SimpleModal orderDetails={orderDetails} onClose={handleModalClose} />
            )}

            <DeliveryOptions formData={formData} setFormData={setFormData} t={t} />
            <ElementInputs formData={formData} setFormData={setFormData} t={t} />
            <PriceDisplay calculatedPrice={calculatedPrice} t={t} />

            {showContactForm ? (
                <ContactInfoForm onSubmit={handleContactInfoSubmit} />
            ) : (
                <button
                    onClick={handleSendOrderSubmit}
                    className="submit-button"
                    style={formStyles.addButton}
                >
                    {t.createOrder}
                </button>
            )}

            {orderError && <div className="error-message">{orderError}</div>}
        </div>
    );
};

const createOrderInput = (formData) => {
    return {
        paymentCurrency: formData.paymentCurrency,
        direction: `${formData.fromCountry}_${formData.toCountry}`,
        deliveryType: formData.deliveryType,
        ownerType: formData.ownerType,
        elements: formData.elements.map(dim => ({
            length: parseFloat(dim.length) || 0,
            width: parseFloat(dim.width) || 0,
            height: parseFloat(dim.height) || 0,
            weight: parseFloat(dim.weight) || 0,
            description: dim.description || '',
        })),
        fromDoor: formData.fromDoor,
        toDoor: formData.toDoor,
    };
};

const createSendOrderInput = (contactInfo, formData, calculatedPrice) => {
    return {
        userEmail: contactInfo.userEmail,
        from: {
            country: formData.fromCountry,
            fullName: contactInfo.from.fullName,
            phone: contactInfo.from.phone,
            addressGoogleString: contactInfo.from.addressGoogleString,
        },
        to: {
            country: formData.toCountry,
            fullName: contactInfo.to.fullName,
            phone: contactInfo.to.phone,
            addressGoogleString: contactInfo.to.addressGoogleString,
        },
        direction: `${formData.fromCountry}_${formData.toCountry}`,
        deliveryType: formData.deliveryType,
        ownerType: formData.ownerType,
        paymentCurrency: formData.paymentCurrency,
        totalPrice: calculatedPrice?.amount || 0,
        elements: formData.elements.map(dim => ({
            length: parseFloat(dim.length) || 0,
            width: parseFloat(dim.width) || 0,
            height: parseFloat(dim.height) || 0,
            weight: parseFloat(dim.weight) || 0,
            description: dim.description || '',
        })),
        fromDoor: formData.fromDoor,
        toDoor: formData.toDoor,
    };
};

export default OrderForm;

const formStyles = { 
    addButton: {
        display: 'flex',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#b60d0d',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '20px',
    },
};
