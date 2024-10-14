// Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <Nav className="flex-column sidebar">
      <NavLink to="profile" className="nav-link">User Profile</NavLink>
      <NavLink to="address" className="nav-link">Address</NavLink>
      <NavLink to="orders" className="nav-link">Order History</NavLink>
      <NavLink to="track-order" className="nav-link">Order Tracking</NavLink>
      <NavLink to="change-password" className="nav-link">Change password</NavLink>
    </Nav>
  );
};

export default Sidebar;
