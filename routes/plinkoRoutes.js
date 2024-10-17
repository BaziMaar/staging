const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { generateController, savePlinkoEntry } = require('../controllers/plinkoController');

// Middleware
app.use(bodyParser.json()); // to parse JSON request body

// Initialize socket.io
generateController(io);

// Define your routes
app.post('/savePlinkoEntry', savePlinkoEntry(io)); // Post route for saving Plinko data

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
