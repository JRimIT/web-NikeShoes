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
    const { id } = location.state || {};
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
                            if (response.id) {
                                const orderID = response.id;
                                console.log(orderID);
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
                            console.log(approvedOrderId);
                            if (!approvedOrderId) {
                                throw new Error("No order ID found.");
                            }
                            const captureResponse = await axiosClient.post(`paypal/capture?orderId=${approvedOrderId}`);
                            
                            if (captureResponse.status === 200) {
                                // navigate(`/success`, { state: { id } });
                                return captureResponse;
                            }
                            console.log("Capture successful, proceeding with patch and delete...");
                        }
                        catch (error) {
                            console.error("Error capturing data or handling subsequent requests: ", error);
                        }
                    }
                }).render('#paypal-button-container');
            }
            document.body.appendChild(script);
            // 
            
            // try {
            //     console.log(id.data);
            //     await axiosClient.patch(`orders/${id}`, { orderStatus: "processing"});
            //     console.log("Order status updated successfully");
                
            //     await axiosClient.delete(`carts/${cartRequest.CartId}`);
            //     console.log(`Cart ${cartRequest.CartId} deleted successfully`);

            // }
            // catch (error) {
            //     console.error("Error patch data: ", error);
            // }
        };
        fetchData();
        return () => {
            const paypalButtonsContainer = document.querySelector('#paypal-button-container');
            if (paypalButtonsContainer) {
                paypalButtonsContainer.innerHTML = ''; // Clean up the buttons
            }
        };
    }, [payPalClientId, cartRequest, navigate, id]);

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
