// src/admin/EditUserModal.js
import React from 'react';
import Modal from 'react-modal';
import './EditUserModal.css';

const EditUserModal = ({ isEditing, editingUser, saveEditedUser, cancelEditing, handleEditInputChange }) => {
  return (
    <Modal
      isOpen={isEditing}
      onRequestClose={cancelEditing}
      contentLabel="Edit User"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h3>Edit User</h3>
        <button className="close-modal-button" onClick={cancelEditing}>&times;</button>
      </div>
      {editingUser && (
        <div className="modal-body">
          <fieldset>
            <legend>User Information</legend>
            <label>
              Username
              <input
                type="text"
                value={editingUser.username}
                onChange={(e) => handleEditInputChange('username', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              Country
              <input
                type="text"
                value={editingUser.country}
                onChange={(e) => handleEditInputChange('country', e.target.value)}
                className="input-field"
              />
            </label>
          </fieldset>
        </div>
      )}
      <div className="modal-footer">
        <button className="save-button" onClick={saveEditedUser}>Save Changes</button>
        <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
      </div>
    </Modal>
  );
};

export default EditUserModal;
