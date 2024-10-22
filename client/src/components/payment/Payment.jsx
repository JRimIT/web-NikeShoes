import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axiosClient from "../../api/axiosClient";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const paymentId = searchParams.get('paymentId');
  const payerId = searchParams.get('PayerID');

  const END_POINT = {
    PAYMENT: "api/paypal"
}

  useEffect(() => {
    if (paymentId && payerId) {
      executePayment();
    }
  }, [paymentId, payerId]);

  const executePayment = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.post(`${END_POINT.PAYMENT}/execute-payment`, null, {
        params: { paymentId, payerId },
      });
      if (response && response.data) {
        setPaymentSuccess(true); // Set payment success to true
      } else {
        throw new Error('Invalid response from payment execution API');
      }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Payment execution failed. Please try again.';
      setError(errorMessage);
      console.error('Error executing payment:', errorMessage || error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPayment = async () => {
    try {
      const response = await axiosClient.post('api/paypal/create-payment', null, {
        params: { totalAmount: 100.00 }, // For example, use the previous total
      });
      window.location.href = response.data.approvalUrl; // Redirect to PayPal for approval
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  if (loading) return <p>Processing your payment...</p>;

  return (
    <Container className="py-5 text-center">
      <Row>
        <Col>
          <h2 className="mb-4">Payment {paymentSuccess ? 'Successful' : 'Failed'}</h2>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : paymentSuccess ? (
            <>
              <p>Your payment was successfully completed!</p>
              <Button variant="primary" onClick={() => navigate('/')}>
                Return to Home
              </Button>
            </>
          ) : (
            <p>There was an issue processing your payment.</p>
          )}

          <hr className="my-4" />

          <Button
            variant="dark"
            className="mt-3"
            onClick={handleNewPayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay with PayPal Again'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentSuccess;
