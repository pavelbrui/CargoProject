
import { Routes, Route, NavLink } from 'react-router-dom';
//import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import PricingManagement from './PricingManagement';

import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries';

  

const AdminDashboard = () => {
  const token = sessionStorage.getItem('token');
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
      sessionStorage.setItem('currentTeamId', firstTeamId);
    }
  }, [data]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error loading admin details: {error.message}</p>;
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* <div>
      <h1>User Profile</h1>
      {/* Display user data 
      <p>Username: {data?.user.me?.username}</p>
      <h2>Teams</h2>
      <ul>
        {data?.user.me?.teams.map(team => (
          <li key={team}>{team}</li>
        ))}
      </ul>
    </div> */}
      <nav>
        <ul>
          {/* <li><NavLink to="users">User Management</NavLink></li> */}
          <li><NavLink to="orders">Order Management</NavLink></li>
          <li><NavLink to="pricing">Pricing Management</NavLink></li>
        </ul>
      </nav>
      <Routes>
        {/* <Route path="users" element={<UserManagement />} /> */}
        <Route path="orders" element={<OrderManagement />} />
        <Route path="pricing" element={<PricingManagement />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;