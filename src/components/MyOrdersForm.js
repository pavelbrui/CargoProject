import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { MY_ORDERS_QUERY } from '../graphql/queries';
import './MyOrdersForm.css';

const MyOrdersForm = () => {
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

    return (
        <div className="my-orders-container">
            <h2>My Orders</h2>
            {loading && <p>Loading...</p>}
            {error && !orders.length && (
                <p className="error-message">Error: Invalid token or unauthorized access. Please try again.</p>
            )}
            {orders.length === 0 && !loading && !error ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders-table-wrapper">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Delivery Type</th>
                                <th>Owner Type</th>
                                <th>Payment Currency</th>
                                <th>Total Price</th>
                                <th>Paid</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <React.Fragment key={order._id}>
                                    <tr>
                                        <td>{order._id}</td>
                                        <td>{order.from?.addressGoogleString || 'N/A'}</td>
                                        <td>{order.to?.addressGoogleString || 'N/A'}</td>
                                        <td>{order.deliveryType}</td>
                                        <td>{order.ownerType}</td>
                                        <td>{order.paymentCurrency}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.paid ? 'Yes' : 'No'}</td>
                                        <td>{order.status || 'N/A'}</td>
                                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                                        <td>{order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'N/A'}</td>
                                        <td>
                                            <button className="details-button" onClick={() => toggleDetails(order._id)}>Details</button>
                                        </td>
                                    </tr>
                                    {order.showDetails && (
                                        <tr className="order-details-row">
                                            <td colSpan="12">
                                                <div className="order-details">
                                                    <h4>Order Details</h4>
                                                    <p><strong>Description:</strong> {order.description || 'N/A'}</p>
                                                    <p><strong>Notes:</strong> {order.notes || 'N/A'}</p>
                                                    <div className="address-details">
                                                        <h5>From Address Details</h5>
                                                        <p><strong>Flat:</strong> {order.from?.flat || 'N/A'}</p>
                                                        <p><strong>Phone:</strong> {order.from?.phone}</p>
                                                        <p><strong>Address:</strong> {order.from?.addressGoogleString}</p>
                                                    </div>
                                                    <div className="address-details">
                                                        <h5>To Address Details</h5>
                                                        <p><strong>Flat:</strong> {order.to?.flat || 'N/A'}</p>
                                                        <p><strong>Phone:</strong> {order.to?.phone}</p>
                                                        <p><strong>Address:</strong> {order.to?.addressGoogleString}</p>
                                                    </div>
                                                    <div className="dimensions-details">
                                                        <h5>Dimensions</h5>
                                                        {order.elements.length > 0 ? (
                                                            order.elements.map((element, index) => (
                                                                <div key={index} className="dimension-item">
                                                                    <p><strong>Length:</strong> {element.length}</p>
                                                                    <p><strong>Width:</strong> {element.width}</p>
                                                                    <p><strong>Height:</strong> {element.height}</p>
                                                                    <p><strong>Weight:</strong> {element.weight}</p>
                                                                    <p><strong>Description:</strong> {element.description}</p>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>No dimensions found.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrdersForm;


