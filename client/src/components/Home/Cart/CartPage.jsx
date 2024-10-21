import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import './CartPage.scss';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [loadingAction, setLoadingAction] = useState(false); // New action loading state
  const [userId] = useState(3); // Temporary static userId
   // const [userId, setUserId] = useState(null);
  const shippingFee = 0;
  const sale = '99.9%';
  const discount = 100000;

  const parsePrice = (price) => Number(price.replaceAll(',', ''));
  const formatPrice = (price) => `${price.toLocaleString('vi-VN')}₫`;

  const calculateSubtotal = () =>
    cart.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);

  const subtotal = calculateSubtotal();
  const total = (subtotal + shippingFee - discount) * (1 - 999 / 1000);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(response.data || []); // Handle empty or null data
      } catch (error) {
        console.error('Error fetching cart:', error.message, error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchCart();
  }, [userId]);

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    setLoadingAction(true); // Set loading state for action

    try {
      await axios.put(`http://localhost:5000/api/cart/${userId}/${id}`, { quantity: newQuantity });

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cart_item_id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    } finally {
      setLoadingAction(false); // Turn off loading state
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${id}`);
      setCart((prevCart) => prevCart.filter((item) => item.cart_item_id !== id));
    } catch (error) {
      console.error('Error deleting item:', error.message, error.response?.data);
    }
  };

  const handleCheckout = () => {
    setLoading(true); // Block UI during checkout
    setTimeout(() => {
      alert('Checkout successful!');
      setCart([]); // Clear cart for demo
      setLoading(false);
    }, 1500);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="py-5">
      <h2 className="mb-4" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <h4>Your cart is empty.</h4>
          <Button variant="primary" href="/products-men/Shoe">Shop Now</Button>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            {cart.map((item) => (
              <Row key={item.cart_item_id} className="align-items-center mb-4 border-bottom pb-3">
                <Col xs={4} md={3}>
                  <Image src={item.card_color || item.cart_color} fluid className="border" />
                </Col>
                <Col xs={8} md={5}>
                  <h5 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{item.name}</h5>
                  <p className="text-muted" style={{ fontSize: '1rem' }}>
                    {formatPrice(parsePrice(item.price))}
                  </p>
                  <p style={{ fontSize: '1rem' }}>Size: {item.cart_size}</p>
                </Col>
                <Col xs={6} md={2}>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.cart_item_id, parseInt(e.target.value, 10))
                    }
                    style={{ textAlign: 'center' }}
                    disabled={loadingAction}
                  />
                </Col>
                <Col xs={6} md={2}>
                  <FaTrashAlt
                    onClick={() => handleRemove(item.cart_item_id)}
                    style={{ color: 'black', cursor: 'pointer', fontSize: '1.5rem' }}
                  />
                </Col>
              </Row>
            ))}
          </Col>
          <Col md={4}>
            <div className="border p-3 rounded" style={{ backgroundColor: '#f9f9f9' }}>
              <h4>Order Summary</h4>
              <p>Subtotal: <strong>{formatPrice(subtotal)}</strong></p>
              <p>Shipping: <strong>Free</strong></p>
              <p>Sale: <strong>{sale}</strong></p>
              <p>Discount: <strong>-{formatPrice(discount)}</strong></p>
              <h5>Total: <strong>{formatPrice(total)}</strong></h5>
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
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default CartPage;
