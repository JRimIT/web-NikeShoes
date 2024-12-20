// // src/components/OrderItem/OrderItem.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosClient from "../../api/axiosClient";
// import "./OrderItems.scss";

// const OrderItem = () => {
//     const { id } = useParams();
//     const [orderItem, setOrderItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const END_POINT = {
//         ORDER_ITEMS: "order-items"
//     }

//     const fetchOrderItem = async () => {
//         try {
//             const response = await axiosClient.get(`${END_POINT.ORDER_ITEMS}/${id}`);
//             setOrderItem(response);
//         } catch (error) {
//             setError("Error fetching order item details");
//             console.error("Error fetching order item", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchOrderItem();
//     }, [id]);

//     if (loading) return <p>Loading order details...</p>;
//     if (error) return <p className="error-message">{error}</p>;

//     return (
//         <div className="order-item-container">
//             <h2>Order Item Details</h2>
//             {orderItem ? (
//                 <div className="order-item-details">
//                     <p><strong>Order ID:</strong> {orderItem.orderId}</p>
//                     <p><strong>Product Name:</strong> {orderItem.product.name}</p>
//                     <p><strong>Quantity:</strong> {orderItem.quantity}</p>
//                     <p><strong>Price:</strong> ${orderItem.price}</p>
//                     <p><strong>Total:</strong> ${orderItem.order.totalAmount}</p>
//                     <p><strong>Status:</strong> {orderItem.order.orderStatus}</p>
//                 </div>
//             ) : (
//                 <p>Order details not found.</p>
//             )}
//         </div>
//     );
// };

// export default OrderItem;

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import "./OrderItems.scss";
import { CartContext } from "../../context/CartContext";

const OrderItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderItem, setOrderItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const END_POINT = {
        ORDERS: "orders",
        ORDER_ITEMS: "order-items"
    }

    const fetchOrderItem = async () => {
        try {
            const response = await axiosClient.get(`${END_POINT.ORDER_ITEMS}/${id}`);
            setOrderItem(response);
        } catch (error) {
            setError("Error fetching order item details");
            console.error("Error fetching order item", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderItem();
    }, [id]);

    const handlePayment = async () => {
        const response = await axiosClient.delete(`${END_POINT.ORDERS}/${id}`);
        console.log(response);
        // cap nhat lai cart
        if (orderItem && orderItem.order.orderStatus === 'pending') {
            navigate("/cart");
        }
    };

    if (loading) return <p>Loading order details...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="order-item-container">
            <h2>Order Item Details</h2>
            {orderItem ? (
                <div className="order-item-details">
                    <p><strong>Order ID:</strong> {orderItem.orderId}</p>
                    <p><strong>Product Name:</strong> {orderItem.product.name}</p>
                    <p><strong>Quantity:</strong> {orderItem.quantity}</p>
                    <p><strong>Price:</strong> ${orderItem.price}</p>
                    <p><strong>Total:</strong> ${orderItem.order.totalAmount}</p>
                    <p><strong>Status:</strong> {orderItem.order.orderStatus}</p>
                    {orderItem.order.orderStatus === 'pending' && (
                        <button onClick={handlePayment}>Continue to Payment</button>
                    )}
                </div>
            ) : (
                <p>Order details not found.</p>
            )}
        </div>
    );
};

export default OrderItem;

