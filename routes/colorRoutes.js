// generateRoutes.js
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const { generateAndBroadcastNumber, sendColorMoney ,receiveMoney,getResultTransactions,getColorTransactions} = require('../controllers/colorController');
const { verifyDeviceId } = require('../middlewares/verifyDeviceId');

module.exports = (io) => {
  // Route to trigger number generation and broadcast
  router.get('/currentColor', (req, res) => {
    generateAndBroadcastNumber(io);
    res.send('Generate Color route');
  });
  router.get('/getColorResultTrans',getResultTransactions)
  router.get('/getColorTrans',getColorTransactions)
  // Route to handle sending money
  router.post('/sendColorMoney', async (req, res) => {
    const { phone, color,number,size, amount,avatar,globalNumber } = req.body;

    try {
      const response=await sendColorMoney(io, phone,color,number,size, amount,globalNumber);
      console.log(response)
      res.status(200).json({ response:response });
    } catch (error) {
      console.error('Error sending money:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.post('/receiveColorMoney', async (req, res) => {
    const { phone, color,number,size, amount,globalNumber } = req.body;

    try {
      const response=await receiveMoney(io, phone,color,number,size, amount,globalNumber);x
      res.status(200).json({ response:response });
    } catch (error) {
      console.error('Error sending money:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  return router;
};
