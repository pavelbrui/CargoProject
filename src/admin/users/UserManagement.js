// src/admin/UserManagement.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, GET_ENUM } from '../../graphql/queries';
import { UPDATE_USER, DELETE_ADMIN } from '../../graphql/mutations';
import './UserManagement.css';
import Modal from 'react-modal';
import UserFilters from './UserFilters';
import EditUserModal from './EditUserModal';
import UserTable from './UserTable';
import { CircularProgress } from '@mui/material';

Modal.setAppElement('#root');

const UserManagement = () => {
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' }); // Added date filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const cursorIdRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const teamId = localStorage.getItem('currentTeamId');
  const token = localStorage.getItem('token');

  const getQueryVariables = useCallback(() => {
    return {
      teamId,
      filter: {
        username: username || undefined,
        country: country || undefined,
        fromDate: dateFilter.from || undefined,
        toDate: dateFilter.to || undefined,
      },
      paginate: { limit: itemsPerPage, cursorId: currentPage > 1 ? cursorIdRef.current : null },
    };
  }, [teamId, username, country, dateFilter, itemsPerPage, currentPage]);

  // Queries
  const { data: countryEnums } = useQuery(GET_ENUM, {
    variables: { enumName: "Country" },
  });

  const { data, refetch } = useQuery(GET_USERS, {
    variables: getQueryVariables(),
    context: { headers: { Authorization: `${token}` } },
    fetchPolicy: 'network-only',
    skip: initialLoad,
  });

  // Mutations
  const [updateUser] = useMutation(UPDATE_USER, {
    context: { headers: { Authorization: `${token}` } },
    onCompleted: () => {
      setIsEditing(false);
      refetchCurrentPage();
    },
  });

  const [deleteUser] = useMutation(DELETE_ADMIN, {
    context: { headers: { Authorization: `${token}` } },
    onCompleted: () => {
      refetchCurrentPage();
    },
  });

  useEffect(() => {
    if (data && data.admin && data.admin.users) {
      setUserData(data.admin.users);//.objects);
      cursorIdRef.current = data.admin.users.cursorId;
      setInitialLoad(false);
    }
  }, [data]);

  const refetchUsers = useCallback((pageNumber) => {
    setIsLoadingPage(true);
    refetch(getQueryVariables()).then((result) => {
      if (result.data && result.data.admin && result.data.admin.users) {
        setUserData(result.data.admin.users);//.objects);
        cursorIdRef.current = result.data.admin.users.cursorId;
      }
      setIsLoadingPage(false);
    }).catch(() => {
      setIsLoadingPage(false);
    });
  }, [getQueryVariables, refetch]);

  useEffect(() => {
    if (!initialLoad) {
      refetchUsers(currentPage);
    }
  }, [username, country, dateFilter, currentPage, initialLoad, refetchUsers]);

  const startEditingUser = (user) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const saveEditedUser = () => {
    if (!editingUser || !editingUser._id) {
      console.error('Error: User ID is missing for the update.');
      return;
    }

    const input = {
      username: editingUser.username,
      country: editingUser.country, // Ensure country is provided
    };

    updateUser({ variables: { teamId, _id: editingUser._id, input } });
  };

  const handleEditInputChange = (field, value) => {
    if (editingUser) {
      setEditingUser((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleDeleteUser = (userId) => {
    if (!userId) {
      console.error('Error: User ID is missing for deletion.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser({ variables: { teamId, _id: userId } })
        .then(() => {
          console.log('User deleted successfully');
        })
        .catch((err) => {
          console.error('Error deleting user:', err);
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      refetchUsers(pageNumber);
    }
  };

  const refetchCurrentPage = () => {
    refetchUsers(currentPage);
  };

  const toggleExpandUser = (userId) => {
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  // Added handleDateFilterChange function to update the dateFilter state
  const handleDateFilterChange = (field, value) => {
    setDateFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1);
    refetchUsers(1);
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>

      <UserFilters
        username={username}
        country={country}
        countryEnums={countryEnums}
        setUsername={setUsername}
        setCountry={setCountry}
        handleDateFilterChange={handleDateFilterChange} // Pass the function to UserFilters
        dateFilter={dateFilter} // Pass the dateFilter to UserFilters
      />
      {/* User Table */}
      <UserTable
        users={userData}
        expandedUserId={expandedUserId}
        toggleExpandUser={toggleExpandUser}
        startEditingUser={startEditingUser}
        handleDeleteUser={handleDeleteUser}
      />

      {isLoadingPage && (
        <div className="loading-overlay" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000
        }}>
          <CircularProgress size={60} />
        </div>
      )}

      {/* Pagination */}
      <div className="pagination-container">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          disabled={cursorIdRef.current == null || userData.length < itemsPerPage}
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        isEditing={isEditing}
        editingUser={editingUser}
        saveEditedUser={saveEditedUser}
        cancelEditing={cancelEditing}
        handleEditInputChange={handleEditInputChange}
      />
    </div>
  );
};

export default UserManagement;
