import express from 'express';
import {
  getDiscussionsByCompany,
  addDiscussionByCompany
} from '../controllers/discussionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:company', getDiscussionsByCompany);
router.post('/:company', authMiddleware, addDiscussionByCompany);

export default router;
