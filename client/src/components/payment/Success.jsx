import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import './Success.scss'; // Import file CSS nếu cần
import axiosClient from "../../api/axiosClient";
import { CartContext } from '../../context/CartContext';


const Success = () => {
    const navigate = useNavigate();
    const { cartRequest } = useContext(CartContext);
    const location = useLocation();
    const { id } = location.state || {};

    const handleBackToHome = async () => {
        try {
            console.log(id.data);
            await axiosClient.patch(`orders/${id}`, { orderStatus: "processing"});
            console.log("Order status updated successfully");

            await axiosClient.delete(`carts/${cartRequest.CartId}`);
            console.log(`Cart ${cartRequest.CartId} deleted successfully`);
            // logic here
        }
        catch (error) {
            console.error("Error patch or delete data: ", error);
        }
        navigate('/cart'); // Chuyển hướng về trang chủ
    };

    return (
        <div className="success-payment-container">
            <h1>Payment Successful!</h1>
            <p>Thank you for your payment. Your transaction has been completed successfully.</p>
            <button onClick={handleBackToHome} className="back-home-button">
                Go to Home
            </button>
        </div>
    );
};

export default Success;
