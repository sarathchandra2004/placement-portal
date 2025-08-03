import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ES6 module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://placement-portal-client.onrender.com', // Replace with actual URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from React build (if you're serving both from same server)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Import routes one by one to identify the problematic one
console.log('Loading auth routes...');
try {
  const { default: authRoutes } = await import('./routes/authRoutes.js');
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading auth routes:', error.message);
}

console.log('Loading user routes...');
try {
  const { default: userRoutes } = await import('./routes/userRoutes.js');
  app.use('/api/users', userRoutes);
  console.log('✅ User routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading user routes:', error.message);
}

console.log('Loading experience routes...');
try {
  const { default: experienceRoutes } = await import('./routes/experienceRoutes.js');
  app.use('/api/experiences', experienceRoutes);
  console.log('✅ Experience routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading experience routes:', error.message);
}

console.log('Loading discussion routes...');
try {
  const { default: discussionRoutes } = await import('./routes/discussionRoutes.js');
  app.use('/api/discussions', discussionRoutes);
  console.log('✅ Discussion routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading discussion routes:', error.message);
}

// Catch-all handler: send back React's index.html file for any non-API routes
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
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
  });
})
.catch(err => console.error("❌ MongoDB connection error:", err));