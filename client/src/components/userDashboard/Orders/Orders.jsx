// Orders.js
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './Orders.scss';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      order_id: 1,
      date: '2024-01-12',
      status: 'delivered',
      total: 150,
    },
    {
      order_id: 2,
      date: '2024-02-01',
      status: 'pending',
      total: 300,
    },
  ]);

  return (
    <div className="orders">
      <h2>Đơn hàng đã đặt</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt</th>
            <th>Trạng thái</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>{order.total} VND</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
