import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartRequest, setCartRequest] = useState(null);

    return (
        <CartContext.Provider value={{ cartRequest, setCartRequest }}>
            {children}
        </CartContext.Provider>
    );
};
