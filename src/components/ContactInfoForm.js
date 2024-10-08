import React, { useState } from 'react';
import { useLanguage, translationsOrderForm } from '../LanguageContext'; // Import the language context
import './ContactInfoForm.css'; // Import the styles

const ContactInfoForm = ({ onSubmit }) => {
    const { language } = useLanguage(); // Get the current language
    const t = translationsOrderForm[language]; // Access translations based on current language

    const [fromAddress, setFromAddress] = useState({
        fullName: '', // Add FullName to the state
        flat: '',
        phone: '',
        addressGoogleString: '',
    });
    const [toAddress, setToAddress] = useState({
        fullName: '', // Add FullName to the state
        flat: '',
        phone: '',
        addressGoogleString: '',
    });

    const [email, setEmail] = useState('');
    const [phoneNumber] = useState('');

    const handleAddressChange = (e, addressType) => {
        const { name, value } = e.target;
        if (addressType === 'from') {
            setFromAddress({ ...fromAddress, [name]: value });
        } else {
            setToAddress({ ...toAddress, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            from: fromAddress,
            to: toAddress,
            contact: {
                email,
                phoneNumber,
            }
        });
    };

    // const [sendOrder] = useMutation(SEND_ORDER);

    // const [loading, setLoading] = useState(false);
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true)
        
    //     const dimensionsInput = [{
    //         length:  0,
    //         width:  0,
    //         height:  0,
    //         weight: 0,
    //         description: '',
    //     }];

    //     const input = {
    //         from: fromAddress,
    //         to: toAddress,
    //         paymentCurrency: 'USD',
    //         direction: `USA_PL`,
    //         deliveryType: "SEA",
    //         elements: dimensionsInput,
    //         userEmail: '',
    //         fromDoor: true,
    //         ownerType: 'PRIVAT',
    //         phoneNumber: '687875',
    //         toDoor: true,
    //         totalPrice: 56, // Use the calculated price in the submission
    //     };

    //     try {
           
    //         const result = await sendOrder({ variables: { input } });
    //         console.log('Order submitted:', result.data.user.sendOrder);
    //         // Clear form or show success message
    //     } catch (err) {
    //           if (err.graphQLErrors) {
    //     err.graphQLErrors.forEach(({ message }) => {
    //         console.error('GraphQL error:', message);
    //     });
    // } else if (err.networkError) {
    //     console.error('Network error:', err.networkError);
    // } else {
    //     console.error('Error submitting order:', err.message);
    // }
    //     }
    // };

    return (
        <form className="contact-info-form" onSubmit={handleSubmit}>
            <fieldset>
                <legend>{t.contactInformation}</legend>
                <div className="form-group">
                    <label>{t.email}:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </fieldset>

            {/* Address for Sender */}
            <fieldset>
                <legend>{t.fromAddress}</legend>
                <div className="form-group">
                    <label>{t.fullName}:</label> {/* Add FullName input */}
                    <input
                        type="text"
                        name="fullName"
                        value={fromAddress.fullName}
                        onChange={(e) => handleAddressChange(e, 'from')}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>{t.flat}:</label>
                    <input
                        type="text"
                        name="flat"
                        value={fromAddress.flat}
                        onChange={(e) => handleAddressChange(e, 'from')}
                    />
                </div>
                <div className="form-group">
                    <label>{t.phone}:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={fromAddress.phone}
                        onChange={(e) => handleAddressChange(e, 'from')}
                    />
                </div>
                <div className="form-group">
                    <label>{t.addressGoogle}:</label>
                    <input
                        type="text"
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
                    <label>{t.fullName}:</label> {/* Add FullName input */}
                    <input
                        type="text"
                        name="fullName"
                        value={toAddress.fullName}
                        onChange={(e) => handleAddressChange(e, 'to')}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>{t.flat}:</label>
                    <input
                        type="text"
                        name="flat"
                        value={toAddress.flat}
                        onChange={(e) => handleAddressChange(e, 'to')}
                    />
                </div>
                <div className="form-group">
                    <label>{t.phone}:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={toAddress.phone}
                        onChange={(e) => handleAddressChange(e, 'to')}
                    />
                </div>
                <div className="form-group">
                    <label>{t.addressGoogle}:</label>
                    <input
                        type="text"
                        name="addressGoogleString"
                        value={toAddress.addressGoogleString}
                        onChange={(e) => handleAddressChange(e, 'to')}
                        required
                    />
                </div>
            </fieldset>

            <button type="submit" className="submit-btn">{t.sendOrder}</button>
        </form>
    );
};

export default ContactInfoForm;
