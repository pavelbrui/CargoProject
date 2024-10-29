// src/components/EditOrderModal.js
import React from 'react';
import Modal from 'react-modal';
import './EditOrderModal.css';

const EditOrderModal = ({
  isEditing,
  editingOrder,
  statusEnums,
  saveEditedOrder,
  cancelEditing,
  handleEditInputChange,
}) => {
  return (
    <Modal
      isOpen={isEditing}
      onRequestClose={cancelEditing}
      contentLabel="Edit Order"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h3>Edit Order</h3>
        <button className="close-modal-button2" onClick={cancelEditing}>&times;</button>
      </div>
      {editingOrder && (
        <div className="modal-body">
          <fieldset>
            <legend>Order Information</legend>
            <label>
              Direction
              <input type="text" value={editingOrder.direction} disabled className="input-field" />
            </label>
            <label>
              Payment Currency
              <input type="text" value={editingOrder.paymentCurrency} disabled className="input-field" />
            </label>
            <label>
              Delivery Type
              <input type="text" value={editingOrder.deliveryType} disabled className="input-field" />
            </label>
            <label>
              Status
              <select
                value={editingOrder.status}
                onChange={(e) => handleEditInputChange('status', e.target.value)}
                className="select-field"
              >
                {statusEnums?.__type?.enumValues?.map(({ name }) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </label>
          </fieldset>
        </div>
      )}
      <div className="modal-footer">
        <button className="save-button" onClick={saveEditedOrder}>Save Changes</button>
        <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
      </div>
    </Modal>
  );
};

export default EditOrderModal;
