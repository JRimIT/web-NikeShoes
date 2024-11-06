import React, { useContext, useEffect, useState } from 'react';
import './Payment.scss'; // Import the SCSS file
import axiosClient from "../../api/axiosClient";
import axios from '../../utils/axios.customize';
// import { useLocation } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';

const PayPalCheckout = () => {
    const [payPalClientId] = useState("AY4dA0xUDuJJp3NHKXFexARyfmqx5VdovdVJMuJbKTHhZujK39081EiUS1P-a5Bqb4fcEnOwDQfNk433");
    // const { cartRequest } = useContext(CartContext);
    const location = useLocation();
    const { cartRequest } = location.state || {};
    const { orderId } = useContext(CartContext);
    const { orders } = useContext(CartContext);
    const navigate = useNavigate();    
    
    useEffect(() => {
        const fetchData = async () => {
            
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${payPalClientId}&currency=USD`;
            script.async = true;
           
            script.onload = async () => {
                 // Render PayPal button
                window.paypal.Buttons({
                    style: {
                        layout: 'vertical',
                        color: 'silver',
                        tagline: 'false'
                    },
                    createOrder: async () => {
                        try {
                            const total = parseFloat((cartRequest.TotalAmount / 25405).toFixed(2)).toString();
                            const response = await axiosClient.post(`paypal/order?amount=${total}`);
                            
                            const orderResponse = await axiosClient.post(`orders/`, cartRequest);
                            console.log('Order created: ', orderResponse);

                            if (response.id) {
                                const orderID = response.id;
                                return orderID;
                            } 
                            else 
                            {
                                throw new Error("Order ID not found in response");
                            }  
                        } 
                        catch (error)
                        {
                            console.error("Error creating order", error);
                            alert("Failed to create PayPal order.");
                        }
                    },
                    onApprove: async (data) => {
                        try {
                            const approvedOrderId = data.orderID;
                            if (!approvedOrderId) {
                                throw new Error("No order ID found.");
                            }
                            const captureResponse = await axiosClient.post(`paypal/capture?orderId=${approvedOrderId}`);
                            
                            if (captureResponse.status === 200) {
                                console.log("Capture successful, proceeding with patch and delete...");  
                            }
                            await axiosClient.delete(`carts/${cartRequest.CartId}`);
                            console.log(`Cart ${cartRequest.CartId} deleted successfully`);

                            // console.log(orderId);
                            // await axiosClient.patch(`orders/${orderId}`, { orderStatus: "processing"});
                            // console.log("Order status updated successfully");

                            navigate(`/success`);
                        }
                        catch (error) {
                            console.error("Error capturing data or handling subsequent requests: ", error);
                        }
                    }
                }).render('#paypal-button-container');
            }
            document.body.appendChild(script);
        };
        fetchData();
        return () => {
            const paypalButtonsContainer = document.querySelector('#paypal-button-container');
            if (paypalButtonsContainer) {
                paypalButtonsContainer.innerHTML = ''; // Clean up the buttons
            }
        };
    }, [payPalClientId, cartRequest, navigate, orderId]);

    return (
        <div className="checkout-container">
            <h4>Order Summary</h4>
            <p>Amount: <strong>{(cartRequest.TotalAmount / 25405).toFixed(2)} USD</strong></p>
            <div id="paypal-button-container" className="paypal_button" ></div>
            <button className="return-cart-button" onClick={() => navigate('/cart')}>
                Return to Cart
            </button>
        </div>
    );
};

export default PayPalCheckout;
