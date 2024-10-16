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


    const handleAddressChange = (e, addressType) => {
        const { name, value } = e.target;
        if (addressType === 'from') {
            setFromAddress({ ...fromAddress, [name]: value });
        } else {
            setToAddress({ ...toAddress, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent page reload

        onSubmit({
            from: fromAddress,
            to: toAddress,
            userEmail,  // Przekazanie email
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
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
