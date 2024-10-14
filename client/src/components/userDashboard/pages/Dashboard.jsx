// Dashboard.js
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import UserProfile from '../UserProfile/UserProfile';
import UserAddress from '../UserProfile/UserAddress';
import Orders from '../Orders/Orders';
import OrderTracking from '../OrderTracking/OrderTracking';
import ChangePassword from '../ChangePassword/ChangePassword';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Navigate to="profile" />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="address" element={<UserAddress />} />
          <Route path="orders" element={<Orders />} />
          <Route path="track-order" element={<OrderTracking />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
