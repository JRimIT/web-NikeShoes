import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartRequest, setCartRequest] = useState(null);
    const [orders, setOrders] = useState([]);
    
    return (
        <CartContext.Provider value={{ cartRequest, setCartRequest, orders, setOrders }}>
            {children}
        </CartContext.Provider>
    );
};
