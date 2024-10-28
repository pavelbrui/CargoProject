// src/admin/UserTable.js
import React from 'react';
import './UserTable.css';

const UserTable = ({ users, startEditingUser, handleDeleteUser }) => {
  console.log((users));
  
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Full Name</th>
          <th>Email Confirmed</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user._id} className="user-row">
            <td>{user.username}</td>
            <td>{user.fullName || 'N/A'}</td>
            <td>{user.emailConfirmed ? 'Yes' : 'No'}</td>
            <td>{user.createdAt}</td>
            <td>
              <button className="edit-button" onClick={() => startEditingUser(user)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
