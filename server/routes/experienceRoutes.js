import express from 'express';
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
} from '../controllers/experienceController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);
router.post('/', authMiddleware, createExperience);
router.put('/:id', authMiddleware, updateExperience);

export default router;
