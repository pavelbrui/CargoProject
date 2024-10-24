import React, { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

const DeliveryOptions = ({ formData, setFormData, t }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            direction: name === 'fromCountry' || name === 'toCountry' ? `${formData.fromCountry}_${formData.toCountry}` : prev.direction,
        }));
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
            direction: `${prev.toCountry}_${prev.fromCountry}`,
        }));
    };

    useEffect(() => {
        // Disconnect ResizeObserver on unmount to prevent loop error
        return () => {
            if (window.ResizeObserver) {
                const allObservers = document.querySelectorAll('[data-tooltip-id]');
                allObservers.forEach(observer => observer.disconnect && observer.disconnect());
            }
        };
    }, []);

    return (
        <fieldset style={formStyles.fieldset}>
            <legend style={formStyles.legend}>{t.deliveryInformation}</legend>

            {/* Direction row for 'from' and 'to' countries */}
            <div style={formStyles.directionRowGrid}>
                <div style={formStyles.fieldGroupSmallCentered}>
                    <label htmlFor="fromCountry" style={formStyles.labelBlack} data-tooltip-id="from-country-tooltip" data-tooltip-content={t.fromCountryTooltip}>
                        {t.fromCountry}
                    </label>
                    <select
                        id="fromCountry"
                        name="fromCountry"
                        value={formData.fromCountry}
                        onChange={handleChange}
                        style={formStyles.selectCompact}
                        required
                    >
                        <option value="USA">{t.usa}</option>
                        <option value="CAN">{t.canada}</option>
                        <option value="PL">{t.poland}</option>
                        <option value="BY">{t.belarus}</option>
                        <option value="RU">{t.russia}</option>
                        <option value="IL">{t.israel}</option>
                    </select>
                    <Tooltip anchorSelect="[data-tooltip-id='from-country-tooltip']" place="top" effect="solid" observe={false} />
                </div>

                <button onClick={handleReverse} style={formStyles.reverseButton}>&#8596;</button>

                <div style={formStyles.fieldGroupSmallCentered}>
                    <label htmlFor="toCountry" style={formStyles.labelBlack} data-tooltip-id="to-country-tooltip" data-tooltip-content={t.toCountryTooltip}>
                        {t.toCountry}
                    </label>
                    <select
                        id="toCountry"
                        name="toCountry"
                        value={formData.toCountry}
                        onChange={handleChange}
                        style={formStyles.selectCompact}
                        required
                    >
                        <option value="PL">{t.poland}</option>
                        <option value="USA">{t.usa}</option>
                        <option value="CAN">{t.canada}</option>
                        <option value="BY">{t.belarus}</option>
                        <option value="RU">{t.russia}</option>
                        <option value="IL">{t.israel}</option>
                    </select>
                    <Tooltip anchorSelect="[data-tooltip-id='to-country-tooltip']" place="top" effect="solid" observe={false} />
                </div>
            </div>

            {/* Block for ownerType, deliveryType, paymentCurrency, and Courier Service */}
            <div style={formStyles.cardBlockCombinedAligned}>
                <div style={formStyles.fieldRowCombinedAligned}>
                    <div style={formStyles.fieldGroupInline}>
                        <label htmlFor="ownerType" style={formStyles.labelBlack} data-tooltip-id="owner-type-tooltip" data-tooltip-content={t.ownerTypeTooltip}>
                            {t.ownerType}
                        </label>
                        <select
                            id="ownerType"
                            name="ownerType"
                            value={formData.ownerType}
                            onChange={handleChange}
                            style={formStyles.select}
                            required
                        >
                            <option value="PRIVAT">{t.privateOwner}</option>
                            <option value="BISNES">{t.businessOwner}</option>
                        </select>
                        <Tooltip anchorSelect="[data-tooltip-id='owner-type-tooltip']" place="top" effect="solid" observe={false} />
                    </div>

                    <div style={formStyles.fieldGroupInline}>
                        <label htmlFor="deliveryType" style={formStyles.labelBlack} data-tooltip-id="delivery-type-tooltip" data-tooltip-content={t.deliveryTypeTooltip}>
                            {t.deliveryType}
                        </label>
                        <select
                            id="deliveryType"
                            name="deliveryType"
                            value={formData.deliveryType}
                            onChange={handleChange}
                            style={formStyles.select}
                            required
                        >
                            <option value="AIR">{t.airDelivery}</option>
                            <option value="SEA">{t.seaDelivery}</option>
                            <option value="TRAIN">{t.trainDelivery}</option>
                        </select>
                        <Tooltip anchorSelect="[data-tooltip-id='delivery-type-tooltip']" place="top" effect="solid" observe={false} />
                    </div>

                    <div style={formStyles.fieldGroupInline}>
                        <label htmlFor="paymentCurrency" style={formStyles.labelBlack} data-tooltip-id="payment-currency-tooltip" data-tooltip-content={t.paymentCurrencyTooltip}>
                            {t.paymentCurrency}
                        </label>
                        <select
                            id="paymentCurrency"
                            name="paymentCurrency"
                            value={formData.paymentCurrency}
                            onChange={handleChange}
                            style={formStyles.select}
                            required
                        >
                            <option value="PLN">{t.poland}</option>
                            <option value="USD">{t.usa}</option>
                            <option value="BYR">{t.belarus}</option>
                            <option value="RUB">{t.russia}</option>
                        </select>
                    </div>
                </div>
                <Tooltip anchorSelect="[data-tooltip-id='payment-currency-tooltip']" place="top" effect="solid" observe={false} />

                <div style={formStyles.checkboxesRowInlineAlignedCenteredContainer}>
                    <div style={formStyles.checkboxesRowInlineAlignedCentered}>
                        <label style={formStyles.labelBlack} data-tooltip-id="courier-service-tooltip" data-tooltip-content={t.courierServiceTooltip}>{t.courierService}:</label>
                        <Tooltip anchorSelect="[data-tooltip-id='courier-service-tooltip']" place="top" effect="solid" observe={false} />
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
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    legend: {
        fontSize: '22px',
        fontWeight: 'bold',
        padding: '0 10px',
    },
    directionRowGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    fieldGroupSmallCentered: {
        textAlign: 'center',
    },
    selectCompact: {
        width: '70%',
        padding: '12px',
        borderRadius: '8px',
        //border: '1px solid #b88e2f',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'border 0.3s ease',
        margin: '0 auto',
    },
    reverseButton: {
        padding: '8px 12px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#f8f5f1',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        alignSelf: 'center',
        marginTop: '25px',
    },
    cardBlockCombinedAligned: {
        border: '1px solid #b88e2f',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    fieldRowCombinedAligned: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '15px',
    },
    labelBlack: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '8px',
    },
    select: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'border 0.3s ease',
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
