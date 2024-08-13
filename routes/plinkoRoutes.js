const express = require('express');
const router = express.Router();
const { generateController } = require('../controllers/plinkoController');

module.exports = (io) => {
    generateController(io);  // Initialize the controller with the io instance
    return router;
};
