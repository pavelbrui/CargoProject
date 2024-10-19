import React, { useState } from 'react';
import { useLanguage, translationsOrderForm } from '../../LanguageContext';
import './ContactInfoForm.css'; // Import the styles

const ContactInfoForm = ({ onSubmit }) => {
    const { language } = useLanguage();
    const t = translationsOrderForm[language];

    const [fromAddress, setFromAddress] = useState({
        fullName: '',
        flat: '',
        phone: '',
        addressGoogleString: '',
    });

    const [toAddress, setToAddress] = useState({
        fullName: '',
        flat: '',
        phone: '',
        addressGoogleString: '',
    });

    const [userEmail, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
        setErrors(prev => ({ ...prev, email: isValid ? '' : 'Invalid email format' }));
        return isValid;
    };

    const validatePhone = (phone, addressType) => {
        const isValid = phone.length > 7 && /^[+0-9]+$/.test(phone);
        setErrors(prev => ({
            ...prev,
            [`${addressType}Phone`]: isValid ? '' : 'Phone must be more then 7 digits'
        }));
        return isValid;
    };

    const handleAddressChange = (e, addressType) => {
        const { name, value } = e.target;
        if (addressType === 'from') {
            setFromAddress({ ...fromAddress, [name]: value });
            if (name === 'phone') validatePhone(value, 'from');
        } else {
            setToAddress({ ...toAddress, [name]: value });
            if (name === 'phone') validatePhone(value, 'to');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submission
        if (!validateEmail(userEmail) ||
            !validatePhone(fromAddress.phone, 'from') ||
            !validatePhone(toAddress.phone, 'to')) {
            alert('Please correct the errors before submitting.');
            return;
        }

        onSubmit({
            from: fromAddress,
            to: toAddress,
            userEmail,
        });
    };

    return (
        <form className="contact-info-form" onSubmit={handleSubmit}>
            <fieldset>
                <legend>{t.contactInformation}</legend>
                <div className="form-group">
                    <label htmlFor="userEmail">{t.userEmail}:</label>
                    <input
                        type="email"
                        id="email"
                        value={userEmail}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                        required
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
            </fieldset>

            {/* Address for Sender */}
            <fieldset>
                <legend>{t.fromAddress}</legend>
                <div className="form-group">
                    <label htmlFor="fromFullName">{t.fullName}:</label>
                    <input
                        type="text"
                        id="fromFullName"
                        name="fullName"
                        value={fromAddress.fullName}
                        onChange={(e) => handleAddressChange(e, 'from')}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fromFlat">{t.flat}:</label>
                    <input
                        type="text"
                        id="fromFlat"
                        name="flat"
                        value={fromAddress.flat}
                        onChange={(e) => handleAddressChange(e, 'from')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fromPhone">{t.phone}:</label>
                    <input
                        type="tel"
                        id="fromPhone"
                        name="phone"
                        value={fromAddress.phone}
                        onChange={(e) => handleAddressChange(e, 'from')}
                        required
                    />
                    {errors.fromPhone && <div className="error-message">{errors.fromPhone}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="fromAddressGoogle">{t.addressGoogle}:</label>
                    <input
                        type="text"
                        id="fromAddressGoogle"
                        name="addressGoogleString"
                        value={fromAddress.addressGoogleString}
                        onChange={(e) => handleAddressChange(e, 'from')}
                        required
                    />
                </div>
            </fieldset>

            {/* Address for Receiver */}
            <fieldset>
                <legend>{t.toAddress}</legend>
                <div className="form-group">
                    <label htmlFor="toFullName">{t.fullName}:</label>
                    <input
                        type="text"
                        id="toFullName"
                        name="fullName"
                        value={toAddress.fullName}
                        onChange={(e) => handleAddressChange(e, 'to')}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="toFlat">{t.flat}:</label>
                    <input
                        type="text"
                        id="toFlat"
                        name="flat"
                        value={toAddress.flat}
                        onChange={(e) => handleAddressChange(e, 'to')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="toPhone">{t.phone}:</label>
                    <input
                        type="tel"
                        id="toPhone"
                        name="phone"
                        value={toAddress.phone}
                        onChange={(e) => handleAddressChange(e, 'to')}
                        required
                    />
                    {errors.toPhone && <div className="error-message">{errors.toPhone}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="toAddressGoogle">{t.addressGoogle}:</label>
                    <input
                        type="text"
                        id="toAddressGoogle"
                        name="addressGoogleString"
                        value={toAddress.addressGoogleString}
                        onChange={(e) => handleAddressChange(e, 'to')}
                        required
                    />
                </div>
            </fieldset>

            <button type="submit" className="submit-btn">
                {t.createOrder}
            </button>
        </form>
    );
};

export default ContactInfoForm;
