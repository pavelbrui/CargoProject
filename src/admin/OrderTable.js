// src/components/OrderTable.js
import React from 'react';

const OrderTable = ({ orderData, expandedOrderId, toggleExpandOrder, startEditingOrder, handleDeleteOrder }) => {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Direction</th>
          <th>Payment Currency</th>
          <th>Delivery Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orderData?.map((order) => (
          <React.Fragment key={order._id}>
            <tr className="order-row">
              <td>{order.direction ? order.direction : 'N/A'}</td>
              <td>{order.paymentCurrency ? order.paymentCurrency : 'N/A'}</td>
              <td>{order.deliveryType}</td>
              <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
              <td>
                <button className="edit-button" onClick={() => startEditingOrder(order)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                <button className="expand-button" onClick={() => toggleExpandOrder(order._id)}>
                  {expandedOrderId === order._id ? 'Collapse' : 'Expand'}
                </button>
              </td>
            </tr>
            {expandedOrderId === order._id && (
              <tr className="expanded-order-details">
                <td colSpan="5">
                  <div className="expanded-details">
                    <p><strong>Client ID:</strong> {order.clientId}</p>
                    <p><strong>From:</strong> {order.from?.addressGoogleString || 'N/A'}</p>
                    <p><strong>To:</strong> {order.to?.addressGoogleString || 'N/A'}</p>
                    <p><strong>Owner Type:</strong> {order.ownerType || 'N/A'}</p>
                    <p><strong>Total Price:</strong> {order.totalPrice || 'N/A'}</p>
                    <p><strong>From Door:</strong> {order.fromDoor ? 'Yes' : 'No'}</p>
                    <p><strong>To Door:</strong> {order.toDoor ? 'Yes' : 'No'}</p>
                    <p><strong>Paid:</strong> {order.paid ? 'Yes' : 'No'}</p>
                    <p><strong>Created At:</strong> {order.createdAt}</p>
                    <p><strong>Updated At:</strong> {order.updatedAt}</p>
                    <div className="elements-container">
                      <h4>Elements:</h4>
                      {order.elements?.map((element, index) => (
                        <div key={index} className="element-details">
                          <p><strong>Length:</strong> {element.length}</p>
                          <p><strong>Width:</strong> {element.width}</p>
                          <p><strong>Height:</strong> {element.height}</p>
                          <p><strong>Weight:</strong> {element.weight}</p>
                          <p><strong>Description:</strong> {element.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
