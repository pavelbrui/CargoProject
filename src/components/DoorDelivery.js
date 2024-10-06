// DoorDelivery.js
import React from 'react';

const DoorDelivery = ({ formData, handleCheckboxChange, t }) => {
    return (
        <fieldset style={formStyles.fieldset}>
            <legend style={formStyles.legend}>{t.doorDelivery}</legend>
            <div style={formStyles.row}>
                <label>
                    <input type="checkbox" name="fromDoor" checked={formData.fromDoor} onChange={handleCheckboxChange} />
                    {t.fromDoor}
                </label>
            </div>
            <div style={formStyles.row}>
                <label>
                    <input type="checkbox" name="toDoor" checked={formData.toDoor} onChange={handleCheckboxChange} />
                    {t.toDoor}
                </label>
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
};

export default DoorDelivery;
