import express from 'express';
import {
  getDiscussionsByCompany,
  addDiscussionByCompany,
  deleteDiscussion
} from '../controllers/discussionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:company', getDiscussionsByCompany);
router.post('/:company', authMiddleware, addDiscussionByCompany);
// @route   DELETE /api/discussions/:id
// @desc    Delete a discussion by ID
// @access  Private (requires authentication)
router.delete('/:id', authMiddleware, deleteDiscussion);

export default router;
