import React from 'react';
import './MiniCartPopup.scss';
import { Button } from "react-bootstrap";

const MiniCartPopup = ({ cartItems, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="mini-cart-overlay">
      <div className="mini-cart-popup">
        <div className="mini-cart-header">
          <h2>Your Cart</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="mini-cart-content">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            <ul className="cart-items-list">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.color} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name} (x{item.quantity})</h4> {/* Show quantity here */}
                    <p className="cart-item-size">Size: {item.size}</p>
                    <p className="cart-item-price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price * item.quantity)} {/* Calculate total price */}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mini-cart-footer">
          <Button onClick={onClose} className="continue-shopping-button">
            Continue Shopping
          </Button>
          <Button className="view-cart-button" href="/cart">
            View Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniCartPopup;
