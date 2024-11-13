import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartContext from "../../context/CartContext";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const transactionId = '8XF226245G730503T'; // Replace with dynamic ID as needed
    const { captureId } = useContext(CartContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://localhost:7167/api/paypal/transaction?transactionId=${captureId}`);
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transaction data.');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [captureId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Transaction Details</h1>
      {transactions ? (
        <div>
          <p><strong>ID:</strong> {transactions.id}</p>
          <p><strong>Status:</strong> {transactions.status}</p>
          <p><strong>Amount:</strong> {transactions.purchase_units[0].payments.captures[0].amount.value} {transactions.purchase_units[0].payments.captures[0].amount.currency_code}</p>
          <p><strong>Payer Name:</strong> {transactions.payer.name.given_name} {transactions.payer.name.surname}</p>
          <p><strong>Email:</strong> {transactions.payer.email_address}</p>
          <p><strong>Create Time:</strong> {transactions.purchase_units[0].payments.captures[0].create_time}</p>
        </div>
      ) : (
        <p>No transaction data available.</p>
      )}
    </div>
  );
};

export default TransactionsPage;
