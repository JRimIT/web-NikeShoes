const express = require('express');
const router = express.Router();
const { createOrder, captureOrder } = require('../controller/paypalController');

router.post('/order', createOrder);
router.post('/capture', captureOrder);

module.exports = router;
