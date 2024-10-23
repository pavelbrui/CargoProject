import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { MY_ORDERS_QUERY } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import { useLanguage, translationsOrderForm } from '../LanguageContext';
import './MyOrdersForm.css';


const MyOrdersForm = () => {
    const { language } = useLanguage();
    const t = translationsOrderForm[language];  // Get translations for the selected language

    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token'); // Get the token from localStorage

    const [fetchOrders, { loading, error, data }] = useLazyQuery(MY_ORDERS_QUERY, {
        fetchPolicy: 'network-only',
        context: {
            headers: {
                Authorization: token ? `${token}` : "",
            },
        },
    });

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token, fetchOrders]);

    useEffect(() => {
        if (data && data.user && data.user.myOrders) {
            setOrders(data.user.myOrders);
        }
    }, [data]);

    const toggleDetails = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, showDetails: !order.showDetails } : order
            )
        );
    };
    const navigate = useNavigate();
    if(error && !orders.length) {
       localStorage.clear();
       return navigate('/my_orders')
    };

    
    return (
        <div className="my-orders-container">
            <h2>{t.myOrdersTitle}</h2>
            {loading && <p>{t.loading}</p>}
            {error && !orders.length && (
                <p className="error-message">{t.errorInvalidToken}</p>
            )}
            {orders.length === 0 && !loading && !error ? (
                <p>{t.noOrdersFound}</p>
            ) : (
                <div className="orders-cards-container">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <div className="order-card-header">
                                <h3>{t.orderNumber} #{order._id}</h3>
                                <button className="details-button" onClick={() => toggleDetails(order._id)}>
                                    {order.showDetails ? t.hideDetails : t.viewDetails}
                                </button>
                            </div>
                            <div className="order-card-summary">
                                <p><strong>{t.direction}:</strong> {order.direction}</p>
                                <p><strong>{t.deliveryType}:</strong> {order.deliveryType}</p>
                                <p><strong>{t.totalPrice}:</strong> {order.totalPrice} {order.paymentCurrency}</p>
                                <p><strong>{t.status}:</strong> {order.status || t.na}</p>
                                <p><strong>{t.createdAt}:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            {order.showDetails && (
                                <div className="order-details">
                                    <div className="order-details-section">
                                        <h4>{t.orderDetails}</h4>
                                        <p><strong>{t.description}:</strong> {order.description || t.na}</p>
                                        <p><strong>{t.notes}:</strong> {order.notes || t.na}</p>
                                    </div>
                                    <div className="order-details-section">
                                        <h4>{t.fromAddress}</h4>
                                        <p><strong>{t.flat}:</strong> {order.from?.flat || t.na}</p>
                                        <p><strong>{t.phone}:</strong> {order.from?.phone}</p>
                                        <p><strong>{t.address}:</strong> {order.from?.addressGoogleString}</p>
                                    </div>
                                    <div className="order-details-section">
                                        <h4>{t.toAddress}</h4>
                                        <p><strong>{t.flat}:</strong> {order.to?.flat || t.na}</p>
                                        <p><strong>{t.phone}:</strong> {order.to?.phone}</p>
                                        <p><strong>{t.address}:</strong> {order.to?.addressGoogleString}</p>
                                    </div>
                                    <div className="dimensions-details">
                                        <h4>{t.dimensions}:</h4>
                                        {order.elements.length > 0 ? (
                                            order.elements.map((element, index) => (
                                                <div key={index} className="dimension-item">
                                                    <p><strong>{t.length}:</strong> {element.length}</p>
                                                    <p><strong>{t.width}:</strong> {element.width}</p>
                                                    <p><strong>{t.height}:</strong> {element.height}</p>
                                                    <p><strong>{t.weight}:</strong> {element.weight}</p>
                                                    <p><strong>{t.description}:</strong> {element.description}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>{t.noDimensionsFound}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrdersForm;
