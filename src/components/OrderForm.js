import React, { useState, useEffect, useCallback } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import DraggableDimensionInput from './DraggableDimensionInput';
import { useLanguage, translationsOrderForm } from '../LanguageContext';
import ContactInfoForm from './ContactInfoForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//import { useDrop } from 'react-dnd';
import SimpleModal from './SimpleModal';  // Importuj komponent modalu

import { SEND_ORDER } from '../graphql/mutations';
import { CALCULATE_ORDER } from '../graphql/queries';


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
    const [orderDetails, setOrderDetails] = useState(null);  // Zmienna do przechowywania szczegółów zamówienia
    const { language } = useLanguage();

    const [calculateOrder] = useLazyQuery(CALCULATE_ORDER, {
        onCompleted: (data) => {
            const price = data.public.calculateMyOrder;
            setCalculatedPrice({ amount: price, currency: formData.paymentCurrency });
            setFormData((prevState) => ({
                ...prevState,
                totalPrice: price,
            }));
        },
        onError: (error) => {
            console.error('Error calculating price:', error);
        }
    });

    const [sendOrder] = useMutation(SEND_ORDER, {
        onCompleted: (data) => {
            setOrderSuccess(true);
            setOrderError(null);
            console.log('Order successfully sent:', data);
            
            // Zapisz szczegóły zamówienia, aby przekazać do modalu
            setOrderDetails({
                ...formData,
                ...contactInfo,
                totalPrice: calculatedPrice?.amount,
            });
        },
        onError: (error) => {
            setOrderError('Error sending order. Please try again.');
            console.error('Error sending order:', error);
        }
    });

    const t = translationsOrderForm[language];


    const handleCalculatePrice = useCallback(async () => {
        const isDimensionsValid = formData.elements.every(dim =>
            dim.length && dim.width && dim.height && dim.weight
        );

        if (isDimensionsValid && formData.paymentCurrency && formData.fromCountry && formData.toCountry) {
            const input = {
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

            try {
                await calculateOrder({ variables: { input } });
            } catch (error) {
                console.error('Error calculating price:', error);
            }
        }
    }, [formData, calculateOrder]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleDimensionChange = (index, e) => {
        const { name, value } = e.target;
        const newDimensions = [...formData.elements];
        newDimensions[index] = { ...newDimensions[index], [name]: value };
        setFormData(prev => ({ ...prev, elements: newDimensions }));
    };

    const addDimension = () => {
        setFormData(prev => ({
            ...prev,
            elements: [...prev.elements, { length: '', width: '', height: '', weight: '', description: '' }],
        }));
    };

    const removeDimension = (index) => {
        const newDimensions = formData.elements.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, elements: newDimensions }));
    };

    const moveDimension = (fromIndex, toIndex) => {
        const newDimensions = [...formData.elements];
        const [removed] = newDimensions.splice(fromIndex, 1);
        newDimensions.splice(toIndex, 0, removed);
        setFormData({ ...formData, elements: newDimensions });
    };
    

    useEffect(() => {
        handleCalculatePrice();
    }, [formData, handleCalculatePrice]);

    // const handleSendOrderSubmit = async () => {
    //     console.log('Form submitted:', contactInfo, formData);
    
    //     // Sprawdź, czy dane kontaktowe istnieją
    //     if (!contactInfo || !calculatedPrice) {
    //         setShowContactForm(true);
    //         console.error('Brakuje informacji o kontakcie lub cenie');
    //         return;
    //     }
    
    //     // Sprawdź, czy pola from i to są poprawnie zainicjowane w contactInfo
    //     if (!contactInfo.from || !contactInfo.to) {
    //         console.error('Brakuje informacji o nadawcy lub odbiorcy w danych kontaktowych');
    //         return;
    //     }
    
    //     // Sprawdź, czy phone jest ustawiony dla from i to
    //     if (!contactInfo.from.phone || !contactInfo.to.phone) {
    //         console.error('Brakuje numeru telefonu w danych nadawcy lub odbiorcy');
    //         return;
    //     }

    const handleSendOrderSubmit = async () => {
        if (!contactInfo || !calculatedPrice) {
            setShowContactForm(true);
            console.error('Brakuje informacji o kontakcie lub cenie');
            return;
        }

        if (!contactInfo.from || !contactInfo.to || !contactInfo.from.fullName || !contactInfo.to.fullName) {
            console.error('Brakuje pełnego imienia i nazwiska nadawcy lub odbiorcy');
            return;
        }

        const input = {
            userEmail: contactInfo.userEmail,
            from: {
                fullName: contactInfo.from.fullName,
                phone: contactInfo.from.phone,
                //country: { code: formData.fromCountry },
                addressGoogleString: contactInfo.from.addressGoogleString,
            },
            to: {
                fullName: contactInfo.to.fullName,
                phone: contactInfo.to.phone,
                //country: { code: formData.toCountry },
                addressGoogleString: contactInfo.to.addressGoogleString,
            },
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

        try {
            await sendOrder({ variables: { input } });
        } catch (err) {
            console.error('Błąd podczas wysyłania zamówienia:', err);
        }
    };

    const handleContactInfoSubmit = (info) => {
        setContactInfo(info);
        handleSendOrderSubmit();  
    };

    const closeModal = () => {
        setOrderSuccess(false);
    };

    return (
        <div style={formStyles.container}>
            <h2 style={formStyles.header}>{t.submitOrder}</h2>
            
            {/* Jeśli zamówienie zostało wysłane, wyświetl modal */}
            {orderSuccess && orderDetails && (
                <SimpleModal orderDetails={orderDetails} onClose={closeModal} />
            )}

            <fieldset style={formStyles.fieldset}>
            <legend style={formStyles.legend}>{t.deliveryInformation}</legend>

<div style={formStyles.row}>
    <label htmlFor="ownerType">{t.ownerType}:</label>
    <select id="ownerType" name="ownerType" value={formData.ownerType} onChange={handleChange} style={formStyles.input} required>
        <option value="PRIVAT">{t.privateOwner}</option>
        <option value="BISNES">{t.businessOwner}</option>
    </select>
</div>

<div style={formStyles.row}>
    <label htmlFor="fromCountry">{t.fromCountry}:</label>
    <select id="fromCountry" name="fromCountry" value={formData.fromCountry} onChange={handleChange} style={formStyles.input} required>
        <option value="USA">USA</option>
        <option value="CAN">Canada</option>
        <option value="PL">Poland</option>
        <option value="BY">Belarus</option>
        <option value="RU">Russia</option>
        <option value="IL">Israel</option>
    </select>
</div>

<div style={formStyles.row}>
    <label htmlFor="toCountry">{t.toCountry}:</label>
    <select id="toCountry" name="toCountry" value={formData.toCountry} onChange={handleChange} style={formStyles.input} required>
        <option value="PL">Poland</option>
        <option value="USA">USA</option>
        <option value="CAN">Canada</option>
        <option value="BY">Belarus</option>
        <option value="RU">Russia</option>
        <option value="IL">Israel</option>
    </select>
</div>

<div style={formStyles.row}>
    <label htmlFor="paymentCurrency">{t.paymentCurrency}:</label>
    <select id="paymentCurrency" name="paymentCurrency" value={formData.paymentCurrency} onChange={handleChange} style={formStyles.input} required>
        <option value="PLN">PLN</option>
        <option value="USD">USD</option>
        <option value="BYR">BYR</option>
        <option value="RUB">RUB</option>
    </select>
</div>

<div style={formStyles.row}>
    <label htmlFor="deliveryType">{t.deliveryType}:</label>
    <select id="deliveryType" name="deliveryType" value={formData.deliveryType} onChange={handleChange} style={formStyles.input} required>
        <option value="AIR">{t.airDelivery}</option>
        <option value="SEA">{t.seaDelivery}</option>
        <option value="TRAIN">{t.trainDelivery}</option>
    </select>
</div>

<div style={formStyles.row}>
    <label htmlFor="fromDoor">{t.fromDoor}:</label>
    <input
        type="checkbox"
        id="fromDoor"
        name="fromDoor"
        checked={formData.fromDoor}
        onChange={handleCheckboxChange}
    />
</div>

<div style={formStyles.row}>
    <label htmlFor="toDoor">{t.toDoor}:</label>
    <input
        type="checkbox"
        id="toDoor"
        name="toDoor"
        checked={formData.toDoor}
        onChange={handleCheckboxChange}
    />
</div>

<div style={formStyles.row}>
    <h3>{t.dimensions}</h3>
    <TransitionGroup>
        {formData.elements.map((element, index) => (
            <CSSTransition key={index} timeout={500} classNames="fade">
                <DraggableDimensionInput
                    index={index}
                    dimension={element}
                    handleDimensionChange={handleDimensionChange}
                    removeDimension={removeDimension}
                    moveDimension={moveDimension}
                />
            </CSSTransition>
        ))}
    </TransitionGroup>
    <button type="button" onClick={addDimension} style={formStyles.button}>{t.addElement}</button>
</div>

{calculatedPrice && (
    <div style={formStyles.priceContainer}>
        <h3 style={formStyles.priceHeader}>{t.calculatePrice}: {calculatedPrice.amount} {calculatedPrice.currency}</h3>
    </div>
)}
</fieldset>

{orderSuccess && (
<div style={formStyles.successMessage}>
    {t.orderSuccess}
</div>
)}

{orderError && (
<div style={formStyles.errorMessage}>
    {orderError}
</div>
)}

           

            {showContactForm ? (
                <ContactInfoForm onSubmit={handleContactInfoSubmit} />
            ) : (
                <button type="button" onClick={handleContactInfoSubmit} style={formStyles.button}>
                    {t.createOrder}
                </button>
            )}
        </div>
    );
};

// const formStyles = {
//     container: {
//         padding: '20px',
//         maxWidth: '700px',
//         margin: '20px auto',
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         fontFamily: 'Arial, sans-serif',
//         backgroundColor: '#f9f9f9',
//         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//     },
//     header: {
//         textAlign: 'center',
//         fontSize: '24px',
//         marginBottom: '20px',
//         color: '#333',
//     },
//     fieldset: {
//         border: '1px solid #ccc',
//         padding: '15px',
//         marginBottom: '20px',
//         borderRadius: '5px',
//         backgroundColor: '#fff',
//     },
//     button: {
//         padding: '10px 20px',
//         backgroundColor: '#4CAF50',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     }
// };


export default OrderForm;













const formStyles = {
    container: {
        padding: '20px',
        maxWidth: '700px',
        margin: '20px auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    header: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    fieldset: {
        border: '1px solid #ccc',
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    legend: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    row: {
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: '60%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    priceContainer: {
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
    },
    priceHeader: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    successMessage: {
        padding: '10px',
        marginTop: '20px',
        backgroundColor: '#dff0d8',
        border: '1px solid #d6e9c6',
        color: '#3c763d',
        borderRadius: '5px',
        textAlign: 'center',
    },
    errorMessage: {
        padding: '10px',
        marginTop: '20px',
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        color: '#721c24',
        borderRadius: '5px',
        textAlign: 'center',
    },
};

