// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import axiosClient from "../../api/axiosClient";
// import { useNavigate } from 'react-router-dom';
// import "./Orders.scss";

// const Orders = () => {
//     const [orders, setOrders] = useState([]);
//     const navigate = useNavigate();

//     const END_POINT = {
//         ORDERS: "orders"
//     }

//     const fetchData = async () => {
//         try {
//             const response = await axiosClient.get(`${END_POINT.ORDERS}`);
//             setOrders(response);
//         } catch (error) {
//             console.error("Error fetching data", error);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleOrdersClick = (id) => {
//         navigate(`/order-items/${id}`); // Make sure you're using the correct ID here
//     };

//     return (
//         <div className="order-container">
//         <h2 className="title">Your Orders</h2>
//         {orders.length === 0 ? (
//             <p className="no-orders">No orders available</p>
//         ) : (
//             <div className="orders-grid">
//                 {orders.map(order => (
//                     <div
//                         className="order-card"
//                         key={order.orderId} 
//                         onClick={() => handleOrdersClick(order.orderId)}
//                     >
//                         <div className="order-header">
//                             <h3>Order #{order.orderId}</h3>
//                             <span className={`status ${order.orderStatus}`}>
//                                 {order.orderStatus}
//                             </span>
//                         </div>
//                         <div className="order-details">
//                             <p>Total: <span className="amount">${order.totalAmount}</span></p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )}
//     </div>
//     )
// };

// export default Orders;

// import React, { useEffect, useState, useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import axiosClient from "../../api/axiosClient";
// import "./Orders.scss";
// import { CartContext } from "../../context/CartContext";

// const Orders = () => {
//     const { orders, setOrders } = useContext(CartContext);
//     const navigate = useNavigate();

//     const END_POINT = {
//         ORDERS: "orders"
//     }

//     const fetchData = async () => {
//         try {
//             const response = await axiosClient.get(`${END_POINT.ORDERS}`);
//             setOrders(response);
//         } catch (error) {
//             console.error("Error fetching data", error);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     // const handleOrdersClick = (id, status) => {
//     //     if (status === 'pending') {
//     //         navigate('/payment', { state: { orderId: id } });
//     //     } else {
//     //         navigate(`/order-items/${id}`);
//     //     }
//     // };

//     const handleOrdersClick = (id) => {
//         navigate(`/order-items/${id}`);
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
//                             {/* {order.orderStatus === 'pending' && (
//                                 <button className="pay-now-button" onClick={() => handleOrdersClick(order.orderId, 'pending')}>
//                                     Continue to Payment
//                                 </button>
//                             )} */}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// };

// export default Orders;

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import "./Orders.scss";
import { CartContext } from "../../context/CartContext";

const Orders = () => {
    const { orders, setOrders } = useContext(CartContext);
    const navigate = useNavigate();
    
    // State to manage the popup visibility and the current order details
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState(null);
    const [userId, setUserId] = useState(null);

    const END_POINT = {
        ORDERS: "orders"
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
        if (userData && userData.user_id) {
          setUserId(userData.user_id); // Set userId from userData
          console.log(userData.user_id);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) { // Check if userId is set before making the API call
                try {
                    const response = await axiosClient.get(`${END_POINT.ORDERS}/${userId}`);
                    setOrders(response); // Ensure you set response.data if your data is nested
                } catch (error) {
                    console.error("Error fetching data", error);
                }
            }
        };
    
        fetchData();
    }, [userId]);

    const handleOrdersClick = (id, status) => {
        if (status === 'pending') {
            navigate('/payment', { state: { id } });
        } else {
            navigate(`/order-items/${id}`);
        }
    };

    // Functions to show and hide the popup
    const handleMouseEnter = (order) => {
        setPopupContent(order);
        setPopupVisible(true);
    };

    const handleMouseLeave = () => {
        setPopupVisible(false);
        setPopupContent(null);
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
                            onClick={() => handleOrdersClick(order.orderId, order.orderStatus)}
                            onMouseEnter={() => handleMouseEnter(order)}
                            onMouseLeave={handleMouseLeave}
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
            {/* Popup to show order details */}
            {popupVisible && popupContent && (
                <div className="order-popup">
                    <h3>Order Details</h3>
                    <p>Order ID: {popupContent.orderId}</p>
                    <p>Status: {popupContent.orderStatus}</p>
                    <p>Total: ${popupContent.totalAmount}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
    
};

export default Orders;

