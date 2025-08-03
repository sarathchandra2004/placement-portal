import express from 'express';
import { getUserById, getCurrentUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get current user profile (protected route)
router.get('/me', authMiddleware, getCurrentUser);

// Get any user profile by ID (public route)
router.get('/:id', getUserById);

export default router;