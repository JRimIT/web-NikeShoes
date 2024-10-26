<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import axiosClient from "../../../api/axiosClient";
import './CartPage.scss';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
=======
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import axios from "../../../utils/axios.customize";
import "./CartPage.scss";
>>>>>>> Truong

function CartPage() {
  const { setCartRequest } = useContext(CartContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [loadingAction, setLoadingAction] = useState(false);
  const [userId, setUserId] = useState(null);
  const shippingFee = 0;
<<<<<<< HEAD
  const sale = '10%';
  const discount = 100000;

  const parsePrice = (price) => Number(parseFloat(price.replaceAll(',', '')).toFixed(2));
  const formatPrice = (price) => `${price.toLocaleString('vi-VN')}₫`;
=======
  const sale = '99.9%';
  const discount = 200000;

  const parsePrice = (price) => Number(price.replaceAll(",", ""));
  const formatPrice = (price) => `${price.toLocaleString("vi-VN")}₫`;
>>>>>>> Truong

  const calculateSubtotal = () =>
    cart.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);

  const subtotal = calculateSubtotal();
<<<<<<< HEAD
  const _total = (subtotal + shippingFee - discount) * (1 - 10 / 1000);
=======
  // const total = (subtotal + shippingFee - discount) * (1 - 999 / 1000);
  const total = (subtotal + shippingFee - discount);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
    if (userData && userData.user_id) {
      setUserId(userData.user_id); // Set userId from userData
      console.log(userData.user_id);
    }
  }, []);
>>>>>>> Truong

  useEffect(() => {
    const fetchCart = async () => {
      // if (!userId) return; // Don't fetch if userId is not set
      try {
        console.log(userId);
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(response.data || []); // Handle empty or null data        
      } catch (error) {
        console.error(
          "Error fetching cart:",
          error.message,
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleQuantityChange = async (id, newQuantity) => {
    // if (newQuantity < 1) return;
    if (newQuantity < 1 || newQuantity > 10) {
      console.warn('Quantity must be between 1 and 10.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/cart/${userId}/${id}`, { quantity: newQuantity });
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cart_item_id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${id}`);
      setCart((prevCart) =>
        prevCart.filter((item) => item.cart_item_id !== id)
      );
    } catch (error) {
      console.error(
        "Error deleting item:",
        error.message,
        error.response?.data
      );
    }
  };

<<<<<<< HEAD
  const handleCheckout = async () => {
    // await axiosClient.post(`paypal/order`, cart)
    //   .then(response => {
    //     console.log('Order created: ', response.data);
    //     navigate('/payment');
    //   })
    //   .catch(error => console.error('Error creating order: ', error));
    if (cart.length === 0) {
      console.error('Empty cart');
      return;
    }
    const cartRequest = {
      CartItems: cart.map(item => ({
        CartItemId: item.cart_item_id,
        CartId: item.cart_id,
        ProductId: item.product_id,
        Quantity: item.quantity,
        ProductName: item.name,
        Price: parsePrice(item.price),
        CartColor: item.cart_color,
        CartSize: item.cart_size,
        Image: item.image,
        ProductColor: item.available_colors,
        ProductSize: item.available_sizes,
        Description: item.description
      })),
      TotalAmount: _total
    };
    setCartRequest(cartRequest);
    const cartId = cart[1]?.cart_id;
    if (cartId) {
      try {
        await axiosClient.delete(`carts/${cartId}`);
        await axiosClient.post(`orders/`, cartRequest);
        navigate('/payment', { state: { cartRequest } });
        // await axios.post(`http://localhost:7167/api/paypal/order`, {
        //   total: total
        // });
        // , { state: { CartRequest }}
      } catch (error) {
        console.error('Error navigating to payment page: ', error);
      }
    } else {
      console.error('No cartId found to delete.');
    }
    
=======
  const handleCheckout = () => {
    setLoading(true); // Block UI during checkout
    setTimeout(() => {
      alert("Checkout successful!");
      setCart([]); // Clear cart for demo
      setLoading(false);
    }, 1500);
>>>>>>> Truong
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="cart-container">
      <h2 className="mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <h4>Your cart is empty.</h4>
          <Button variant="primary" href="/products-men/All">
            Shop Now
          </Button>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            {cart.map((item) => (
              <div className="cart-item" key={item.cart_item_id}>
                <img
                  src={item.cart_color || item.cart_color}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <h5>{item.name}</h5>
                  <p>{formatPrice(parsePrice(item.price))}</p>
                  <p>Size: {item.cart_size}</p>
                </div>
                <div className="quantity-container">
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.cart_item_id,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="quantity-control"
                  />
                  <FaTrashAlt
                    onClick={() => handleRemove(item.cart_item_id)}
                    className="remove-button" 
                  />
                </div>
              </div>
            ))}
          </Col>
<<<<<<< HEAD
          <Col md={4}>
            <div className="border p-3 rounded" style={{ backgroundColor: '#f9f9f9' }}>
              <h4>Order Summary</h4>
              <p>Subtotal: <strong>{formatPrice(subtotal)}</strong></p>
              <p>Shipping: <strong>Free</strong></p>
              <p>Sale: <strong>{sale}</strong></p>
              <p>Discount: <strong>-{formatPrice(discount)}</strong></p>
              <h5>Total: <strong>{formatPrice(_total)}</strong></h5>
              {/* <PayPalCheckout total={total}/> */}
              <Button
                variant="dark"
                className="w-100 mt-3"
                onClick={handleCheckout}
                disabled={loading || loadingAction}
                style={{ fontSize: '1.2rem' }}
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
            </div>
=======
          <Col md={4} className="order-summary">
            <h4>Order Summary</h4>
            <p>Subtotal: <strong>{formatPrice(subtotal)}</strong></p>
            <p>Shipping: <strong>Free</strong></p>
            {/* <p>Sale: <strong>{sale}</strong></p> */}
            <p>Discount: <strong>-{formatPrice(discount)}</strong></p>
            <h5>Total: <strong>{formatPrice(total)}</strong></h5>
            <Button
              variant="dark"
              className="w-100 mt-3 checkout-button"
              onClick={handleCheckout}
              disabled={loading || loadingAction}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </Button>
>>>>>>> Truong
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default CartPage;
