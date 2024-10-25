// src/admin/OrderManagement.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ORDERS, GET_ENUM } from '../../graphql/queries';
import { UPDATE_ORDER_STATUS, DELETE_ORDER } from '../../graphql/mutations';
import './OrderManagement.css';
import Modal from 'react-modal';
import OrderFilters from './OrderFilters';
import EditOrderModal from './EditOrderModal';
import OrderTable from './OrderTable';
import { CircularProgress } from '@mui/material';

Modal.setAppElement('#root');



const OrderManagement = () => {
  const [orderData, setOrderData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [fromCountry, setFromCountry] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [deliveryType, setDeliveryType] = useState('');
  const [ownerType, setOwnerType] = useState('');
  const [fromDoor, setFromDoor] = useState('');
  const [toDoor, setToDoor] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const cursorIdRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const teamId = localStorage.getItem('currentTeamId');
  const token = localStorage.getItem('token');
  

  const getQueryVariables = useCallback(() => {
    return {
      teamId,
      sort: { field: "CREATED_AT", order: true },
      fieldFilter: {
        direction: fromCountry && toCountry ? `${fromCountry}_${toCountry}` : undefined,
        deliveryType: deliveryType || undefined,
        ownerType: ownerType || undefined,
        fromDoor: fromDoor ? fromDoor === 'true' : undefined,
        toDoor: toDoor ? toDoor === 'true' : undefined,
        status: status || undefined,
      },
      dateFilter: dateFilter.from || dateFilter.to ? { from: dateFilter.from, to: dateFilter.to } : undefined,
      paginate: { limit: itemsPerPage, cursorId: currentPage > 1 ? cursorIdRef.current : null },
    };
  }, [teamId, fromCountry, toCountry, deliveryType, ownerType, fromDoor, toDoor, status, dateFilter, itemsPerPage, currentPage]);
  
   
 
  // Queries
  const { data: countryEnums } = useQuery(GET_ENUM, {
    variables: { enumName: "Country" },
  });

  const { data: statusEnums } = useQuery(GET_ENUM, {
    variables: { enumName: "OrderStatus" },
  });

  const { data: deliveryTypeEnums } = useQuery(GET_ENUM, {
    variables: { enumName: "DeliveryType" },
  });

  const { data: ownerTypeEnums } = useQuery(GET_ENUM, {
    variables: { enumName: "OwnerType" },
  });

  const { data, refetch } = useQuery(GET_ORDERS, {
    variables: getQueryVariables(),
    context: { headers: { Authorization: `${token}` } },
    fetchPolicy: 'network-only',
    skip: !initialLoad,
  });

  // Mutations
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, {
    context: { headers: { Authorization: `${token}` } },
    onCompleted: () => {
      setIsEditing(false);
      refetchCurrentPage();
    },
  });

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    context: { headers: { Authorization: `${token}` } },
    onCompleted: () => {
      refetchCurrentPage();
    },
  });
  

  useEffect(() => {
    if (data && data.admin && data.admin.orders) {
      setOrderData(data.admin.orders.objects);
      cursorIdRef.current = data.admin.orders.cursorId;
      setInitialLoad(false);
    }
  }, [data]);

  const refetchOrders = useCallback((pageNumber) => { 
      setIsLoadingPage(true);
      refetch(getQueryVariables()).then((result) => {
        if (result.data && result.data.admin && result.data.admin.orders) {
          setOrderData(result.data.admin.orders.objects);
          cursorIdRef.current = result.data.admin.orders.cursorId;
        }
        setIsLoadingPage(false);
      }).catch(() => {
        setIsLoadingPage(false);
      });
  }, [getQueryVariables, refetch]);

  useEffect(() => {
    if (!initialLoad) {
      refetchOrders(currentPage);
    }
    setInitialLoad(false);
  }, [fromCountry, toCountry, deliveryType, ownerType, fromDoor, toDoor, status, dateFilter, currentPage, initialLoad, refetchOrders]);

  const startEditingOrder = (order) => {
    setEditingOrder(order);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingOrder(null);
  };

  const saveEditedOrder = () => {
    if (!editingOrder || !editingOrder._id) {
      console.error('Error: Order ID is missing for the update.');
      return;
    }

    const input = {
      status: editingOrder.status,
      totalPrice: editingOrder.totalPrice, // Ensure totalPrice is provided
    };

    updateOrderStatus({ variables: { teamId, _id: editingOrder._id, input } });
  };

  const handleEditInputChange = (field, value) => {
    if (editingOrder) {
      setEditingOrder((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (!orderId) {
      console.error('Error: Order ID is missing for deletion.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder({ variables: { teamId, _id: orderId } })
        .then(() => {
          console.log('Order deleted successfully');
        })
        .catch((err) => {
          console.error('Error deleting order:', err);
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      refetchOrders(pageNumber);
    }
  };

  const handleDateFilterChange = (field, value) => {
    setDateFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1);
    refetchOrders(1);
  };

  const refetchCurrentPage = () => {
    refetchOrders(currentPage);
  };

  const toggleExpandOrder = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const handleSwapCountries = () => {
    setFromCountry((prevFromCountry) => {
      setToCountry(prevFromCountry);
      return toCountry;
    });
  };

  return (
    <div className="order-management-container">
      <OrderFilters
        fromCountry={fromCountry}
        toCountry={toCountry}
        deliveryType={deliveryType}
        ownerType={ownerType}
        fromDoor={fromDoor}
        toDoor={toDoor}
        status={status}
        dateFilter={dateFilter}
        countryEnums={countryEnums}
        deliveryTypeEnums={deliveryTypeEnums}
        ownerTypeEnums={ownerTypeEnums}
        statusEnums={statusEnums}
        setFromCountry={setFromCountry}
        setToCountry={setToCountry}
        setDeliveryType={setDeliveryType}
        setOwnerType={setOwnerType}
        setFromDoor={setFromDoor}
        setToDoor={setToDoor}
        setStatus={setStatus}
        handleDateFilterChange={handleDateFilterChange}
        handleSwapCountries={handleSwapCountries}
      />
      {/* Order Table */}
      <OrderTable
        orderData={orderData}
        expandedOrderId={expandedOrderId}
        toggleExpandOrder={toggleExpandOrder}
        startEditingOrder={startEditingOrder}
        handleDeleteOrder={handleDeleteOrder}
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
          disabled={cursorIdRef.current == null || orderData.length < itemsPerPage}
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      {/* Edit Order Modal */}
      <EditOrderModal
        isEditing={isEditing}
        editingOrder={editingOrder}
        statusEnums={statusEnums}
        saveEditedOrder={saveEditedOrder}
        cancelEditing={cancelEditing}
        handleEditInputChange={handleEditInputChange}
      />
    </div>
  );
};

export default OrderManagement;
