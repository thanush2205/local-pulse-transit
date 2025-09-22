import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './config/db'; // Assuming this is your connection function
import authRoutes from './routes/authRoutes';
import dataRoutes from './routes/dataRoutes';
import setupRealtime from './utils/realtime';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Allow all origins for the frontend
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5000;

// Connect to the database and then start the server
connectDB()
  .then(() => {
    console.log('Database connected successfully.');

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/data', dataRoutes);

    // Real-time communication via Socket.io
    setupRealtime(io);

    // Start the server only after a successful database connection
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Database connection error:', error);
    process.exit(1); // Exit if database connection fails
  });