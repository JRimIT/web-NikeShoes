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
    // const { orderId } = useContext(CartContext);
    const orderId = localStorage.getItem('orderId');
    const { setCaptureId } = useContext(CartContext);
    const navigate = useNavigate();
    const [total, setTotal] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            const currencyResponse = await fetch('https://api.exchangerate-api.com/v4/latest/VND');
            const data = await currencyResponse.json();
            const rate = data.rates.USD; // Conversion rate for VND to USD
            const total = parseFloat((cartRequest.TotalAmount * rate).toFixed(2)).toString();
            setTotal(total);

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
                            const response = await axiosClient.post(`paypal/order?amount=${total}`);

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
                            // console.log(captureResponse);
                            // console.log(captureResponse.purchase_units);
                            // Assuming `response` is the object from the API response
                            if (captureResponse.purchase_units && captureResponse.purchase_units.length > 0) {
                                // Accessing the first purchase unit
                                const firstPurchaseUnit = captureResponse.purchase_units[0];

                                // Check if `payments` and `captures` exist and have data
                                if (firstPurchaseUnit.payments && firstPurchaseUnit.payments.captures && firstPurchaseUnit.payments.captures.length > 0) {
                                    // Accessing the `id` from the first capture in `captures`
                                    const captureId = firstPurchaseUnit.payments.captures[0].id;

                                    console.log('Capture ID:', captureId);
                                    setCaptureId(captureId);
                                } else {
                                    console.log('No captures found in the purchase units.');
                                }
                            } else {
                                console.log('No purchase units found.');
                            }

                            if (captureResponse.status === 200) {
                                console.log("Capture successful, proceeding with patch and delete...");  
                                console.log(captureResponse.status);
                            }

                            const orderResponse = await axiosClient.post(`orders/`, cartRequest);
                            console.log('Order created: ', orderResponse);

                            await axiosClient.delete(`carts/${cartRequest.CartId}`);
                            console.log(`Cart ${cartRequest.CartId} deleted successfully`);

                            const storedOrderIds = JSON.parse(localStorage.getItem('orderIds'));
                            console.log(storedOrderIds);

                            // chua fix
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
    }, [payPalClientId, cartRequest, navigate, orderId, setTotal]);

    return (
        <div className="checkout-container">
            <h4>Order Summary</h4>
            <p>Amount: <strong>{total} USD</strong></p>
            <div id="paypal-button-container" className="paypal_button" ></div>
            <button className="return-cart-button" onClick={() => navigate('/cart')}>
                Return to Cart
            </button>
        </div>
    );
};

export default PayPalCheckout;
