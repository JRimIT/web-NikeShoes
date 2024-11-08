// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosClient from "../../api/axiosClient";
// import "./Orders.scss";
// import { CartContext } from "../../context/CartContext";

// const Orders = () => {
//     const { orders, setOrders, setOrderId } = useContext(CartContext);
//     const navigate = useNavigate();
    
//     // State to manage the popup visibility and the current order details
//     const [popupVisible, setPopupVisible] = useState(false);
//     const [popupContent, setPopupContent] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const { cartRequest } = useContext(CartContext);

//     const END_POINT = {
//         ORDERS: "orders"
//     }

//     useEffect(() => {
//         const userData = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
//         if (userData && userData.user_id) {
//           setUserId(userData.user_id); // Set userId from userData
//           console.log(userData.user_id);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (userId) { // Check if userId is set before making the API call
//                 try {
//                     const response = await axiosClient.get(`${END_POINT.ORDERS}/${userId}`);
//                     setOrders(response); // Ensure you set response.data if your data is nested
//                     console.log("Orders fetched and set in context:", response.data);
//                 } catch (error) {
//                     console.error("Error fetching data", error);
//                 }
//             }
//         };
    
//         fetchData();
//     }, [userId, setOrders]);

//     const handleOrdersClick = (id) => {
//         navigate(`/order-items/${id}`);
//     };

//     // Functions to show and hide the popup
//     const handleMouseEnter = (order) => {
//         setPopupContent(order);
//         setPopupVisible(true);
//     };

//     const handleMouseLeave = () => {
//         setPopupVisible(false);
//         setPopupContent(null);
//     };

//     return (
//         <div className="order-container">
//             <h2 className="title">Your Orders</h2>
//             {orders.length === 0 ? (
//                 <p className="no-orders">No orders available</p>
//             ) : (
//                 <div className="orders-grid">
//                     {orders.map(order => (
//                         <div
//                             className="order-card"
//                             key={order.orderId}
//                             onClick={() => handleOrdersClick(order.orderId, order.orderStatus)}
//                             onMouseEnter={() => handleMouseEnter(order)}
//                             onMouseLeave={handleMouseLeave}
//                         >
//                             <div className="order-header">
//                                 <h3>Order #{order.orderId}</h3>
//                                 <span className={`status ${order.orderStatus}`}>
//                                     {order.orderStatus}
//                                 </span>
//                             </div>
//                             <div className="order-details">
//                                 <p>Total: <span className="amount">${order.totalAmount}</span></p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {/* Popup to show order details */}
//             {popupVisible && popupContent && (
//                 <div className="order-popup">
//                     <h3>Order Details</h3>
//                     <p>Order ID: {popupContent.orderId}</p>
//                     <p>Status: {popupContent.orderStatus}</p>
//                     <p>Total: ${popupContent.totalAmount}</p>
//                     {/* Add more details as needed */}
//                 </div>
//             )}
//         </div>
//     );
    
// };

// export default Orders;

import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Orders.scss";
import { FaEye, FaTrashAlt } from "react-icons/fa";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    const END_POINT = {
        ORDERS: "orders",
    };

    // Fetch user ID from localStorage
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.user_id) {
        setUserId(userData.user_id);
        }
    }, []);

    // Fetch orders for the logged-in user
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                const response = await axiosClient.get(`${END_POINT.ORDERS}/${userId}`);
                setOrders(response);
                } catch (error) {
                console.error("Error fetching data", error);
                }
            }
        };

        fetchData();
    }, [userId]);

    // View order details
    const handleViewOrder = (orderId) => {
        navigate(`/order-items/${orderId}`);
    };

    // Remove order
    const handleRemoveOrder = async (orderId) => {
        try {
        await axiosClient.delete(`${END_POINT.ORDERS}/${orderId}`);
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
        toast.info("Order removed.");
        } catch (error) {
        console.error("Error removing order:", error.message);
        toast.error("Failed to remove order.");
        }
    };

    return (
        <div className="orders-container">
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick />

        <h2>Your Orders</h2>

        {orders.length === 0 ? (
            <div className="text-center">
            <h4>No orders available.</h4>
            <Button variant="primary" href="/products-men/All" className="button">
                Shop Now
            </Button>
            </div>
        ) : (
            <div
            className={`orders-grid ${
                orders.length === 1 ? "one-item" : orders.length === 2 ? "two-items" : ""
            }`}
            >
            {orders.map((order) => (
                <div key={order.orderId} className="order-item">
                <div className="order-header">
                    <h4>Order #{order.orderId}</h4>
                    <span className={`status ${order.orderStatus}`}>{order.orderStatus}</span>
                </div>
                <div className="order-details">
                    <p>
                    Total:{" "}
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(order.totalAmount)}
                    </p>
                </div>

                <div className="button-group">
                    <Button
                    className="icon-button"
                    onClick={() => handleViewOrder(order.orderId)}
                    variant="outline-info"
                    >
                    <FaEye size={24} />
                    </Button>
                    <Button
                    className="icon-button"
                    onClick={() => handleRemoveOrder(order.orderId)}
                    variant="outline-danger"
                    >
                    <FaTrashAlt size={24} />
                    </Button>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default Orders;

