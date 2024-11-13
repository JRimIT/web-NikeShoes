// routes/discount.js
const express = require('express');
const db = require('../config/db'); // Giả định bạn đã cấu hình kết nối MySQL
const router = express.Router();

// Route để xác minh mã giảm giá
router.post('/verify', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Discount code is required.' });
  }

  const query = `
    SELECT discount_id, code, discount_type, amount, start_date, end_date, is_active
    FROM Discounts
    WHERE code = ? AND is_active = TRUE
  `;

  db.query(query, [code], (err, results) => {
    if (err) {
      console.error('Error verifying discount code:', err);
      return res.status(500).json({ message: 'Error verifying discount code.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Invalid or inactive discount code.' });
    }

    const discount = results[0];
    const currentDate = new Date();

    if ((discount.start_date && currentDate < new Date(discount.start_date)) ||
        (discount.end_date && currentDate > new Date(discount.end_date))) {
      return res.status(400).json({ message: 'Discount code is not valid at this time.' });
    }

    res.status(200).json({
      message: 'Discount code is valid.',
      discount: {
        id: discount.discount_id,
        code: discount.code,
        type: discount.discount_type,
        amount: discount.amount,
      }
    });
  });
});

module.exports = router;
