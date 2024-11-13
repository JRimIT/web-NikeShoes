import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartRequest, setCartRequest] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState(0);
    const [captureId, setCaptureId] = useState("");
    
    return (
        <CartContext.Provider value={{ cartRequest, setCartRequest, orders, setOrders, orderId, setOrderId, captureId, setCaptureId }}>
            {children}
        </CartContext.Provider>
    );
};
