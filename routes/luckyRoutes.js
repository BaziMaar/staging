// generateRoutes.js
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const { generateAndBroadcastNumber, sendLuckyMoney ,receiveForMoney,getLuckyTransactions,getLuckyEntry} = require('../controllers/luckyWheelController');
const { verifyDeviceId } = require('../middlewares/verifyDeviceId');

module.exports = (io) => {
  // Route to trigger number generation and broadcast
  router.get('/currentLucky', (req, res) => {
    generateAndBroadcastNumber(io);
    res.send('Generate Lucky route');
  });
  router.get('/getLuckyTrans',getLuckyTransactions)
  router.get('/getLuckyEntry',getLuckyEntry)
  // Route to handle sending money
  router.post('/sendLuckyMoney',verifyDeviceId, async (req, res) => {
    const { phone, color, amount,avatar } = req.body;

    try {
      const response=await sendLuckyMoney(io, phone,color, amount);
      res.status(200).json({ response:response });
    } catch (error) {
      console.error('Error sending money:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.post('/receiveMoney',verifyDeviceId, async (req, res) => {
    const { phone, color, amount } = req.body;

    try {
      const response=await receiveForMoney(io, phone,color, amount);
      res.status(200).json({ response:response });
    } catch (error) {
      console.error('Error sending money:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  return router;
};
