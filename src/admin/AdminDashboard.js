// src/admin/AdminDashboard.js
import React, { useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import UserManagement from './users/UserManagement';
import OrderManagement from './orders/OrderManagement';
import PricingManagement from './prices/PricingManagement';
import { useQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const token = localStorage.getItem('token');
  const { data, loading, error } = useQuery(GET_USER_DETAILS, {
    fetchPolicy: 'network-only',
    context: {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    },
  });

  useEffect(() => {
    if (data && data.user?.me && data.user.me.teams.length > 0) {
      const firstTeamId = data.user.me.teams[0];
      localStorage.setItem('currentTeamId', firstTeamId);
    }
  }, [data]);

  if (loading) return <p className="loading-message">Loading user details...</p>;
  if (error) return <p className="error-message">Error loading admin details: {error.message}</p>;

  return (
    <div className="admin-dashboard-container">
      
      <nav className="nav-menu">
        <ul>
          <li ><label className="nav-item1">PL-CARGO (Admin Dashboard)</label> </li>
          <li></li>
          <li>
            <NavLink to="orders" className={({ isActive }) => (isActive ? 'active' : '')}>Order Management</NavLink>
          </li>
          <li>
            <NavLink to="pricing" className={({ isActive }) => (isActive ? 'active' : '')}>Pricing Management</NavLink>
          </li>
          <li>
            <NavLink to="users" className={({ isActive }) => (isActive ? 'active' : '')}>User Management</NavLink>
          </li>
        </ul>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="orders" element={<OrderManagement />} />
          <Route path="pricing" element={<PricingManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
