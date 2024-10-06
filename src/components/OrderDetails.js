// OrderDetails.js
import React from 'react';

const OrderDetails = ({ formData, handleChange, t }) => {
    return (
        <fieldset style={formStyles.fieldset}>
            <legend style={formStyles.legend}>{t.deliveryInformation}</legend>

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

            <div style={formStyles.row}>
                <label>{t.ownerType}:</label>
                <select name="ownerType" value={formData.ownerType} onChange={handleChange} style={formStyles.input} required>
                    <option value="PRIVAT">{t.privateOwner}</option>
                    <option value="BISNES">{t.businessOwner}</option>
                </select>
            </div>
        </fieldset>
    );
};

const formStyles = {
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
};

export default OrderDetails;
