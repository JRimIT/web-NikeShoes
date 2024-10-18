import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from 'react-router-dom';
import "./Orders.scss";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const END_POINT = {
        ORDERS: "orders"
    }

    const fetchData = async () => {
        try {
            const response = await axiosClient.get(`${END_POINT.ORDERS}`);
            setOrders(response);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleOrdersClick = (id) => {
        navigate(`/order-items/${id}`); // Make sure you're using the correct ID here
    };

    return (
        <div className="order-container">
        <h2 className="title">Your Orders</h2>
        {orders.length === 0 ? (
            <p className="no-orders">No orders available</p>
        ) : (
            <div className="orders-grid">
                {orders.map(order => (
                    <div
                        className="order-card"
                        key={order.orderId} 
                        onClick={() => handleOrdersClick(order.orderId)}
                    >
                        <div className="order-header">
                            <h3>Order #{order.orderId}</h3>
                            <span className={`status ${order.orderStatus}`}>
                                {order.orderStatus}
                            </span>
                        </div>
                        <div className="order-details">
                            <p>Total: <span className="amount">${order.totalAmount}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
    )
};

export default Orders;