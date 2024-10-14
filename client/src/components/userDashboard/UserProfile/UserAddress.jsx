// UserAddress.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './UserAddress.scss';

const UserAddress = () => {
  const [address, setAddress] = useState({
    address_line: '123 ABC Street',
    city: 'Ho Chi Minh City',
    postal_code: '700000',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submit logic
    console.log('Shipping address updated:', address);
  };

  return (
    <div className="user-address">
      <h2>Đổi địa chỉ giao hàng</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address_line">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="text"
            name="address_line"
            value={address.address_line}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Thành phố</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={address.city}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="postal_code">
          <Form.Label>Mã bưu điện</Form.Label>
          <Form.Control
            type="text"
            name="postal_code"
            value={address.postal_code}
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

export default UserAddress;
