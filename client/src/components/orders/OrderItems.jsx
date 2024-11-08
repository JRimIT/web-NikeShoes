// src/components/OrderItem/OrderItem.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import "./OrderItems.scss";
import { CartContext } from "../../context/CartContext";

const OrderItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { cartRequest } = useContext(CartContext);

    const END_POINT = {
        ORDER_ITEMS: "order-items"
    };

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await axiosClient.get(`${END_POINT.ORDER_ITEMS}/${id}`);
                setOrderItems(response); // Assuming response is an array of order items
            } catch (error) {
                setError("Error fetching order items");
                console.error("Error fetching order items", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderItems();
    }, [id]);

    const handlePayment = async () => {
        const pendingOrder = orderItems.find(item => item.order.orderStatus === "pending");
        if (pendingOrder) {
            navigate("/cart");
        }
    };

    if (loading) return <p>Loading order details...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="order-item-container">
            <h2>Order Items</h2>
            {orderItems.length > 0 ? (
                orderItems.map(item => (
                    <div key={item.orderItemId} className="order-item-details">
                        <p><strong>Order ID:</strong> {item.orderId}</p>
                        <p><strong>Product Name:</strong> {item.product.name}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Price:</strong> ${item.price}</p>
                        <p><strong>Total:</strong> ${item.order.totalAmount}</p>
                        <p><strong>Status:</strong> {item.order.orderStatus}</p>
                    </div>
                ))
            ) : (
                <p>Order items not found.</p>
            )}
            {orderItems.some(item => item.order.orderStatus === "pending") && (
                <button onClick={handlePayment}>Continue to Payment</button>
            )}
        </div>
    );
};

export default OrderItem;
