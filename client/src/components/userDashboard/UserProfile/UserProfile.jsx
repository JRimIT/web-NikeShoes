// UserProfile.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './UserProfile.scss';

const UserProfile = () => {
  const [user, setUser] = useState({
    username: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '0123456789',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submit logic
    console.log('User data updated:', user);
  };

  return (
    <div className="user-profile">
      <h2>Update User Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Lưu thay đổi
        </Button>
      </Form>
    </div>
  );
};

export default UserProfile;
