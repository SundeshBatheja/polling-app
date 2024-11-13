const config = require('./config/config');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const port = config.SERVER_PORT;
const Routes = require('./routes/index');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();


connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(Routes);

// Create HTTP server and Socket.io instance
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});

// Attach io instance to app for use in controllers
app.set('io', io);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { server, io };
