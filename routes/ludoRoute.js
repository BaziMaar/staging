const express = require('express');
const router = express.Router();
const { generateController } = require('../controllers/ludoController.js');

module.exports = (io) => {
    generateController(io);  // Initialize the controller with the io instance
    return router;
};