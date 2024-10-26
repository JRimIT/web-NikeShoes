import React, { useContext, useEffect, useState } from 'react';
import './Payment.scss'; // Import the SCSS file
import axiosClient from "../../api/axiosClient";
import axios from 'axios';
// import { useLocation } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';

const PayPalCheckout = () => {
    const [payPalClientId] = useState("AY4dA0xUDuJJp3NHKXFexARyfmqx5VdovdVJMuJbKTHhZujK39081EiUS1P-a5Bqb4fcEnOwDQfNk433");
    // const { cartRequest } = useContext(CartContext);
    const [orderId, setOrderId] = useState(null);
    const location = useLocation();
    const { cartRequest } = location.state || {};
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
                    }
                }).render('#paypal-button-container');
            };
            try {
                const total = parseFloat((cartRequest.TotalAmount / 25405).toFixed(2)).toString();
                const response = await axios.post(`https://localhost:7167/api/paypal/order?amount=${total}`);
                setOrderId(response.data.orderId);
            }
            catch (error) {
                console.error("Error fetching data", error);
            }
            try {
                const captureResponse = await axios.post(`http://localhost:7167/api/paypal/capture?orderId=${orderId.id}`);
                if (!captureResponse.ok) {
                    throw new Error('Capture failed');
                }
                window.location.href = '/success';
                // logic here
            }
            catch (error) {
                console.error("Error capturing data", error);
            }
            document.body.appendChild(script);

            return () => {
                const paypalButtonsContainer = document.querySelector('#paypal-button-container');
                if (paypalButtonsContainer) {
                    paypalButtonsContainer.innerHTML = ''; // Clean up the buttons
                }
            };
        };
        fetchData();
    }, [payPalClientId, cartRequest]);

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


// import React, { useContext, useEffect, useState } from 'react';
// import './Payment.scss';
// import axios from 'axios';
// import { CartContext } from '../../context/CartContext';

// const PayPalCheckout = () => {
//     const [payPalClientId] = useState("AY4dA0xUDuJJp3NHKXFexARyfmqx5VdovdVJMuJbKTHhZujK39081EiUS1P-a5Bqb4fcEnOwDQfNk433");
//     const { cartRequest } = useContext(CartContext);
//     const [orderId, setOrderId] = useState(null);

//     useEffect(() => {
//         const loadPayPalScript = async () => {
//             // Load PayPal SDK script
//             const script = document.createElement('script');
//             script.src = `https://www.paypal.com/sdk/js?client-id=AY4dA0xUDuJJp3NHKXFexARyfmqx5VdovdVJMuJbKTHhZujK39081EiUS1P-a5Bqb4fcEnOwDQfNk433&currency=USD`;
//             script.async = true;

//             script.onload = async () => {
//                 window.paypal.Buttons({
//                     style: {
//                         layout: 'vertical',
//                         color: 'silver',
//                         tagline: 'false'
//                     },
//                     createOrder: async () => {
//                         try {
//                             // Call your CreateOrder API endpoint to get the orderId
//                             const orderResponse = await axios.post(`https://localhost:7167/api/paypal/order?amount=500`);
//                             setOrderId(orderResponse.data.orderId);
//                             console.log("Create orderId: ", orderResponse.data.orderId);
//                         } catch (error) {
//                             console.error("Error creating order:", error);
//                             alert("Failed to create PayPal order.");
//                         }
//                     },
//                     onApprove: async () => {
//                         try {
//                             // Capture order by calling Capture API with the approved orderId
//                             const captureResponse = await axios.post(`http://localhost:7167/api/paypal/capture?orderId=${orderId.id}`);
                            
//                             if (captureResponse.status === 200) {
//                                 window.location.href = '/success';
//                             } else {
//                                 alert("Capture failed");
//                             }
//                         } catch (error) {
//                             console.error("Capture error:", error);
//                             alert("Error capturing order.");
//                         }
//                     }
//                 }).render('#paypal-button-container');
//             };

//             document.body.appendChild(script);

//             return () => {
//                 const paypalButtonsContainer = document.querySelector('#paypal-button-container');
//                 if (paypalButtonsContainer) {
//                     paypalButtonsContainer.innerHTML = ''; // Clean up PayPal buttons on unmount
//                 }
//             };
//         };

//         loadPayPalScript();
//     }, [payPalClientId, cartRequest.TotalAmount]);

//     return (
//         <div className="checkout-container">
//             <h4>Order Summary</h4>
//             <p>Amount: <strong>{cartRequest.TotalAmount} USD</strong></p>
//             <div id="paypal-button-container" className="paypal_button"></div>
//         </div>
//     );
// };

// export default PayPalCheckout;
