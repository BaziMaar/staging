const express = require('express');
const router=express.Router();
const { createOrder, checkOrder } = require('../controllers/paymentHackAppController.js');

// Route for creating an order
router.post('/order/create', createOrder);
router.post('/order/status',checkOrder)

module.exports = router;
