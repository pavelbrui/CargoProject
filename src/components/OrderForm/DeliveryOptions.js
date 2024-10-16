import React from 'react';
import { Tooltip } from 'react-tooltip';

const DeliveryOptions = ({ formData, setFormData, t }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleReverse = () => {
        setFormData(prev => ({
            ...prev,
            fromCountry: prev.toCountry,
            toCountry: prev.fromCountry,
        }));
    };

    return (
        <fieldset style={formStyles.fieldset}>
            <legend style={formStyles.legend}>{t.deliveryInformation}</legend>

            {/* Kierunek przesyłki - Od i Do w jednej linii */}
            <div style={formStyles.directionRowCloseAligned}>
                <div style={formStyles.fieldGroupSmall}>
                    <label htmlFor="fromCountry" style={formStyles.labelBlack}>
                        {t.fromCountry}
                        <Tooltip content={t.fromCountryTooltip} id="from-country-tooltip" />
                    </label>
                    <select
                        id="fromCountry"
                        name="fromCountry"
                        value={formData.fromCountry}
                        onChange={handleChange}
                        style={formStyles.select}
                        aria-describedby="from-country-tooltip"
                        required
                    >
                        <option value="USA">{t.usa}</option>
                        <option value="CAN">{t.canada}</option>
                        <option value="PL">{t.poland}</option>
                        <option value="BY">{t.belarus}</option>
                        <option value="RU">{t.russia}</option>
                        <option value="IL">{t.israel}</option>
                    </select>
                </div>

                <button onClick={handleReverse} style={formStyles.reverseButton}>&#8596;</button>

                <div style={formStyles.fieldGroupSmall}>
                    <label htmlFor="toCountry" style={formStyles.labelBlack}>
                        {t.toCountry}
                        <Tooltip content={t.toCountryTooltip} id="to-country-tooltip" />
                    </label>
                    <select
                        id="toCountry"
                        name="toCountry"
                        value={formData.toCountry}
                        onChange={handleChange}
                        style={formStyles.select}
                        aria-describedby="to-country-tooltip"
                        required
                    >
                        <option value="PL">{t.poland}</option>
                        <option value="USA">{t.usa}</option>
                        <option value="CAN">{t.canada}</option>
                        <option value="BY">{t.belarus}</option>
                        <option value="RU">{t.russia}</option>
                        <option value="IL">{t.israel}</option>
                    </select>
                </div>
            </div>

            {/* Blok z ownerType, deliveryType, paymentCurrency i Courier Service */}
            <div style={formStyles.cardBlockCombinedAligned}>
                <div style={formStyles.fieldRowCombinedAligned}>
                    <div style={formStyles.fieldGroupInline}>
                        <label htmlFor="ownerType" style={formStyles.labelBlack}>
                            {t.ownerType}
                            <Tooltip content={t.ownerTypeTooltip} id="owner-type-tooltip" />
                        </label>
                        <select
                            id="ownerType"
                            name="ownerType"
                            value={formData.ownerType}
                            onChange={handleChange}
                            style={formStyles.select}
                            aria-describedby="owner-type-tooltip"
                            required
                        >
                            <option value="PRIVAT">{t.privateOwner}</option>
                            <option value="BISNES">{t.businessOwner}</option>
                        </select>
                    </div>

                    <div style={formStyles.fieldGroupInline}>
                        <label htmlFor="deliveryType" style={formStyles.labelBlack}>
                            {t.deliveryType}
                            <Tooltip content={t.deliveryTypeTooltip} id="delivery-type-tooltip" />
                        </label>
                        <select
                            id="deliveryType"
                            name="deliveryType"
                            value={formData.deliveryType}
                            onChange={handleChange}
                            style={formStyles.select}
                            aria-describedby="delivery-type-tooltip"
                            required
                        >
                            <option value="AIR">{t.airDelivery}</option>
                            <option value="SEA">{t.seaDelivery}</option>
                            <option value="TRAIN">{t.trainDelivery}</option>
                        </select>
                    </div>

                    <div style={formStyles.fieldGroupInline}>
                        <label htmlFor="paymentCurrency" style={formStyles.labelBlack}>
                            {t.paymentCurrency}
                            <Tooltip content={t.paymentCurrencyTooltip} id="payment-currency-tooltip" />
                        </label>
                        <select
                            id="paymentCurrency"
                            name="paymentCurrency"
                            value={formData.paymentCurrency}
                            onChange={handleChange}
                            style={formStyles.select}
                            aria-describedby="payment-currency-tooltip"
                            required
                        >
                            <option value="PLN">{t.poland}</option>
                            <option value="USD">{t.usa}</option>
                            <option value="BYR">{t.belarus}</option>
                            <option value="RUB">{t.russia}</option>
                        </select>
                    </div>
                </div>

                <div style={formStyles.checkboxesRowInlineAlignedCenteredContainer}>
                    <div style={formStyles.checkboxesRowInlineAlignedCentered}>
                        <label style={formStyles.labelBlack}>{t.courierService}:</label>
                        <div style={formStyles.checkboxGroupInlineAlignedCentered}>
                            <input
                                type="checkbox"
                                id="fromDoor"
                                name="fromDoor"
                                checked={formData.fromDoor}
                                onChange={handleCheckboxChange}
                                style={formStyles.checkbox}
                            />
                            <label htmlFor="fromDoor" style={formStyles.checkboxLabel}>
                                {t.fromDoor}
                            </label>
                        </div>

                        <div style={formStyles.checkboxGroupInlineAlignedCentered}>
                            <input
                                type="checkbox"
                                id="toDoor"
                                name="toDoor"
                                checked={formData.toDoor}
                                onChange={handleCheckboxChange}
                                style={formStyles.checkbox}
                            />
                            <label htmlFor="toDoor" style={formStyles.checkboxLabel}>
                                {t.toDoor}
                            </label>
                        </div>
                    </div>
                </div>
                
            </div>
        </fieldset>
         
    );
};

export default DeliveryOptions;

const formStyles = {
    fieldset: {
        //border: '1px solid #b88e2f',
        //padding: '25px',
        //marginBottom: '25px',
        borderRadius: '12px',
       // backgroundColor: '#fff',
       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    legend: {
        fontSize: '22px',
        fontWeight: 'bold',
        //color: '#b88e2f',
        padding: '0 10px',
    },
    directionRowCloseAligned: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '5px',
    },
    fieldGroupSmall: {
        width: '45%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardBlockCombinedAligned: {
        border: '1px solid #b88e2f',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
       // backgroundColor: '#f8f5f1',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    fieldRowCombinedAligned: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '15px',
    },
    row: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    },
    label: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#b60d0d',
        marginBottom: '8px',
    },
    labelBlack: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '8px',
    },
    select: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'border 0.3s ease',
    },
    reverseButton: {
        padding: '8px 12px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#f8f5f1',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        alignSelf: 'center',
        marginTop: '25px',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    checkbox: {
        marginRight: '10px',
        transform: 'scale(1.3)',
    },
    checkboxLabel: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
    },
    header: {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#b60d0d',
        backgroundColor: '#f8f5f1',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '15px',
    },
    headerSmall: {
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
        backgroundColor: '#f8f5f1',
        padding: '2px',
        borderRadius: '2px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    checkboxesRowInlineAlignedCenteredContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    checkboxesRowInlineAlignedCentered: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
    },
    checkboxGroupInlineAlignedCentered: {
        display: 'flex',
        alignItems: 'center',
    },
};