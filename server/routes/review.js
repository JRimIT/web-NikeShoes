// server/routes/reviews.js
const express = require('express');
const db = require('../config/db'); // Import MySQL connection
const router = express.Router();

// Route to add a review
router.post('/add-review', (req, res) => {
  const { userId, productId, rating, comment } = req.body;

  if (!userId || !productId || !rating) {
    return res.status(400).json({
      message: 'User ID, Product ID, and Rating are required.',
    });
  }

  const insertQuery = `
    INSERT INTO Reviews (user_id, product_id, rating, comment) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertQuery, [userId, productId, rating, comment], (err) => {
    if (err) {
      console.error('Error adding review:', err);
      return res.status(500).json({ message: 'Error adding review.' });
    }
    res.status(201).json({ message: 'Review added successfully.' });
  });
});

// Route to get all reviews for a product
router.get('/api/reviews/:productId', (req, res) => {
  const { productId } = req.params;

  const query = `
    SELECT r.review_id, r.rating, r.comment, r.review_date, u.user_id, u.username
    FROM Reviews r
    JOIN Users u ON r.user_id = u.user_id
    WHERE r.product_id = ?
    ORDER BY r.review_date DESC
  `;

  db.query(query, [productId], (err, rows) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      return res.status(500).json({ message: 'Error fetching reviews.' });
    }
    res.status(200).json(rows);
  });
});

// Route to delete a review
router.delete('/api/reviews/:reviewId', (req, res) => {
  const { reviewId } = req.params;

  const deleteQuery = `DELETE FROM Reviews WHERE review_id = ?`;

  db.query(deleteQuery, [reviewId], (err, result) => {
    if (err) {
      console.error('Error deleting review:', err);
      return res.status(500).json({ message: 'Error deleting review.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    res.status(200).json({ message: 'Review deleted successfully.' });
  });
});

module.exports = router;
