const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const cors = require('cors');
const app = express();
const expressServer = http.createServer(app);
const io = socketIO(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const walletRoute = require('./routes/walletRoutes');
// Import the generateAndBroadcastNumber and sendMoney functions
const { generateAndBroadcastNumber, sendMoney } = require('./controllers/generateController');
const luckyWheelController = require('./controllers/luckyWheelController');
const dragonTigerController = require('./controllers/dragonTigerController');
const colorController = require('./controllers/colorController');

// Use CORS middleware with options to allow all origins
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Serve HTML file for testing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const MONGODB_USERNAME = encodeURIComponent(process.env.MONGODB_USERNAME);
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD);
const MONGODB_DBNAME = process.env.MONGODB_DBNAME;

// Check if the MongoDB URI is defined
if (!MONGODB_USERNAME || !MONGODB_PASSWORD || !MONGODB_DBNAME) {
  console.error('MongoDB connection details are incomplete. Please check your environment variables.');
  process.exit(1); // Exit the application if MongoDB URI is not defined
}

const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.zwwed4z.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("mongodb connected successfully...."))
  .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected.');
});

// Import the generate route and use it under the '/api' path
const generateRoutes = require('./routes/generateRoutes');
app.use('/api', generateRoutes(io));

const userRoutes = require('./routes/userRoute');
const minesRoute = require('./routes/minesRoute');
const luckyRoute = require('./routes/luckyRoutes');
const colorRoute = require('./routes/colorRoutes');
const dragonTigerRoute = require('./routes/dragonTigerRoutes');
app.use('/user', userRoutes);
app.use('/wallet', walletRoute);
app.use('/mines', minesRoute);
app.use('/lucky', luckyRoute(io));
app.use('/color', colorRoute(io));
app.use('/dragon', dragonTigerRoute(io));

// Start the Express server on port 3000
const EXPRESS_PORT = 3000;
expressServer.listen(EXPRESS_PORT, () => {
  console.log(`Express server running on port ${EXPRESS_PORT}`);
  generateAndBroadcastNumber(io);
  luckyWheelController.generateAndBroadcastNumber(io);
  colorController.generateAndBroadcastNumber(io);
  dragonTigerController.generateAndBroadcastNumber(io);
});

// Start Socket.IO on port 4000
const SOCKET_IO_PORT = 4000;
io.listen(SOCKET_IO_PORT, () => {
  console.log(`Socket.IO server running on port ${SOCKET_IO_PORT}`);
});

// Example: Send Money functionality
app.post('/api/sendMoney', express.json(), async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  try {
    await sendMoney(io, senderId, receiverId, amount);
    res.status(200).json({ message: 'Money sent successfully' });
  } catch (error) {
    console.error('Error sending money:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
