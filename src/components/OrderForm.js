import React, { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDrop } from 'react-dnd';
import DraggableDimensionInput from './DraggableDimensionInput';
import { useLanguage, translationsOrderForm } from '../LanguageContext';
import ContactInfoForm from './ContactInfoForm';
import { SEND_ORDER } from '../graphql/mutations';
import { CALCULATE_ORDER } from '../graphql/queries';

const ITEM_TYPE = 'DIMENSION';

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
    const [calculatedPrice, setCalculatedPrice] = useState(null); // State for storing calculated price
    const { language } = useLanguage();
    
    const [calculateOrder] = useLazyQuery(CALCULATE_ORDER, {
        onCompleted: (data) => {
            const price = data.public.calculateMyOrder;
            setCalculatedPrice(price); // Store the calculated price
            setFormData((prevState) => ({
                ...prevState,
                totalPrice: price,
            }));
        },
        onError: (error) => {
            console.error('Error calculating price:', error);
        }
    });

    const [sendOrder] = useMutation(SEND_ORDER);
    const t = translationsOrderForm[language];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleDimensionChange = (index, e) => {
        const { name, value } = e.target;
        const newDimensions = [...formData.elements];
        newDimensions[index] = { ...newDimensions[index], [name]: value };
        setFormData({ ...formData, elements: newDimensions });
    };

    const addDimension = () => {
        setFormData((prevState) => ({
            ...prevState,
            elements: [...prevState.elements, { length: '', width: '', height: '', weight: '', description: '' }],
        }));
    };

    const removeDimension = (index) => {
        const newDimensions = formData.elements.filter((_, i) => i !== index);
        setFormData({ ...formData, elements: newDimensions });
    };

    const moveDimension = (fromIndex, toIndex) => {
        const newDimensions = [...formData.elements];
        const [removed] = newDimensions.splice(fromIndex, 1);
        newDimensions.splice(toIndex, 0, removed);
        setFormData({ ...formData, elements: newDimensions });
    };

    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const handleCalculatePrice = async () => {
        const input = {
            paymentCurrency: formData.paymentCurrency,
            direction: `${formData.fromCountry}_${formData.toCountry}`, // Constructing the direction from selected countries
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const dimensionsInput = formData.elements.map(dim => ({
            length: parseFloat(dim.length) || 0,
            width: parseFloat(dim.width) || 0,
            height: parseFloat(dim.height) || 0,
            weight: parseFloat(dim.weight) || 0,
            description: dim.description || '',
        }));

        const input = {
            paymentCurrency: formData.paymentCurrency,
            direction: `${formData.fromCountry}_${formData.toCountry}`,
            deliveryType: formData.deliveryType,
            elements: dimensionsInput,
            userEmail: contactInfo?.email || '',
            fromDoor: formData.fromDoor,
            ownerType: formData.ownerType,
            phoneNumber: contactInfo?.phoneNumber || '',
            toDoor: formData.toDoor,
            totalPrice: calculatedPrice || '0', // Use the calculated price in the submission
        };

        try {
            const result = await sendOrder({ variables: { input } });
            console.log('Order submitted:', result.data.user.sendOrder);
            // Clear form or show success message
        } catch (err) {
            console.error('Error submitting order:', err);
        }
    };

    const handleContactInfoSubmit = (info) => {
        setContactInfo(info);
        setShowContactForm(false);
        handleSubmit(); // Call the submit function to send the order
    };

    return (
        <form onSubmit={handleSubmit} style={formStyles.container}>
            <h2 style={formStyles.header}>{t.submitOrder}</h2>

            <fieldset style={formStyles.fieldset}>
                <legend style={formStyles.legend}>{t.deliveryInformation}</legend>
                
                <div style={formStyles.row}>
                    <label>{t.ownerType}:</label>
                    <select name="ownerType" value={formData.ownerType} onChange={handleChange} style={formStyles.input} required>
                        <option value="PRIVAT">{t.privateOwner}</option>
                        <option value="BISNES">{t.businessOwner}</option>
                    </select>
                </div>
                {/* From and To Country Selectors */}
                <div style={formStyles.row}>
                    <label>{t.fromCountry}:</label>
                    <select name="fromCountry" onChange={handleChange} style={formStyles.input} required>
                        <option value="USA">USA</option>
                        <option value="CAN">Canada</option>
                        <option value="PL">Poland</option>
                        <option value="BY">Belarus</option>
                        <option value="RU">Russia</option>
                        <option value="IL">Israel</option>
                    </select>
                </div>

                <div style={formStyles.row}>
                    <label>{t.toCountry}:</label>
                    <select name="toCountry" onChange={handleChange} style={formStyles.input} required>
                        <option value="PL">Poland</option>
                        <option value="USA">USA</option>
                        <option value="CAN">Canada</option>
                        <option value="BY">Belarus</option>
                        <option value="RU">Russia</option>
                        <option value="IL">Israel</option>
                    </select>
                </div>

                <div style={formStyles.row}>
                    <label>{t.paymentCurrency}:</label>
                    <select name="paymentCurrency" onChange={handleChange} style={formStyles.input} required>
                        <option value="PLN">Poland</option>
                        <option value="USD">USA</option>
                        <option value="BYR">Belarus</option>
                        <option value="RUB">Russia</option>
                    </select>
                </div>

                {/* Delivery Type and Owner Type Selectors */}
                <div style={formStyles.row}>
                    <label>{t.deliveryType}:</label>
                    <select name="deliveryType" value={formData.deliveryType} onChange={handleChange} style={formStyles.input} required>
                        <option value="AIR">{t.airDelivery}</option>
                        <option value="SEA">{t.seaDelivery}</option>
                        <option value="TRAIN">{t.trainDelivery}</option>
                    </select>
                </div>

              
            </fieldset>
            <fieldset style={formStyles.fieldset}>
    <legend style={formStyles.legend}>{t.doorDelivery}</legend>
    <h3 style={formStyles.row}>{t.kurier}</h3>
    <div style={formStyles.row}>
        
        <label style={formStyles.checkboxLabel}>
            <input type="checkbox" name="fromDoor" checked={formData.fromDoor} onChange={handleCheckboxChange} />
            {t.fromDoor}
        </label>
        <label style={formStyles.checkboxLabel}>
            <input type="checkbox" name="toDoor" checked={formData.toDoor} onChange={handleCheckboxChange} />
            {t.toDoor}
        </label>
    </div>
</fieldset>

            <fieldset style={formStyles.fieldset}>
                <legend style={formStyles.legend}>{t.dimensions}</legend>
                <div ref={drop} style={{ ...formStyles.dropArea, border: isOver ? '2px dashed green' : '2px solid transparent' }}>
                    <TransitionGroup>
                        {formData.elements.map((dimension, index) => (
                            <CSSTransition key={index} timeout={300} classNames="fade">
                                <DraggableDimensionInput
                                    index={index}
                                    dimension={dimension}
                                    handleDimensionChange={handleDimensionChange}
                                    removeDimension={removeDimension}
                                    moveDimension={moveDimension}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <button type="button" onClick={addDimension} style={formStyles.addButton}>{t.addPackage}</button>
            </fieldset>

            

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
        </form>
    );
};

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
    dropArea: {
        padding: '10px',
        marginBottom: '15px',
    },
    addButton: {
        display: 'block',
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '15px',
    },
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
     checkboxLabel: {
        display: 'flex',
        alignItems: 'right',
        marginRight: '1px', // Space between checkboxes
    },
};

export default OrderForm;