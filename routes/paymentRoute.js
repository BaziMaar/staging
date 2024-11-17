const express = require('express');
const router=express.Router();
const { createOrder, checkOrder } = require('../controllers/paymentHackAppController.js');
const bodyParser = require("body-parser");
router.use(bodyParser.json());
// Route for creating an order
router.post('/order/create', createOrder);
router.post('/order/status',checkOrder)

module.exports = router;
