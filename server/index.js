import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import discussionRoutes from './routes/discussionRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

// Updated CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:3000', // For local development
    'http://localhost:5173', // For Vite dev server
    'https://placement-portal-client.onrender.com',
    'https://placement-portal-server.onrender.com/api', 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Add a simple health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/discussions', discussionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'production' ? {} : err.stack 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      '/api/auth',
      '/api/users', 
      '/api/experiences',
      '/api/discussions'
    ]
  });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Server URL: ${process.env.NODE_ENV === 'production' ? 'https://your-backend-app.onrender.com' : `http://localhost:${PORT}`}`);
  });
})
.catch(err => console.error("❌ MongoDB connection error:", err));