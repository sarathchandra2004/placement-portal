import express from 'express';
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  getMyExperiences,
  deleteExperience
} from '../controllers/experienceController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/mine', authMiddleware, getMyExperiences);
router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);
router.post('/', authMiddleware, createExperience);
router.put('/:id', authMiddleware, updateExperience);
router.delete('/:id', authMiddleware, deleteExperience);


export default router;
