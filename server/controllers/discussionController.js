import mongoose from 'mongoose';
import Discussion from '../models/discussion.js';

// @desc    Get all discussions for a company
// @route   GET /api/discussions/:company
export const getDiscussionsByCompany = async (req, res) => {
  try {
    const company = req.params.company;
    const threads = await Discussion.find({ company })
      .populate('userId', 'name email') // Populate user info for display
      .sort({ createdAt: -1 });
    res.status(200).json(threads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to load discussions' });
  }
};

// @desc    Add a new discussion message for a company
// @route   POST /api/discussions/:company
export const addDiscussionByCompany = async (req, res) => {
  try {
    const { message } = req.body;
    const { company } = req.params;

    if (!message || !message.trim()) {
      return res.status(400).json({ msg: 'Message is required' });
    }

    if (message.length > 500) {
      return res.status(400).json({ msg: 'Message must be 500 characters or less' });
    }

    const newDiscussion = new Discussion({
      userId: req.userId, // from authMiddleware
      company,
      message: message.trim(),
      createdAt: new Date(),
    });

    const saved = await newDiscussion.save();
    
    // Populate user info before sending response
    await saved.populate('userId', 'name email');
    
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to post discussion' });
  }
};

// @desc    Delete a discussion
// @route   DELETE /api/discussions/:id
export const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid discussion ID' });
    }

    // Find the discussion
    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion not found' });
    }

    // Check if the user owns this discussion
    if (discussion.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ msg: 'Not authorized to delete this discussion' });
    }

    // Delete the discussion
    await Discussion.findByIdAndDelete(id);

    res.status(200).json({ 
      msg: 'Discussion deleted successfully',
      deletedId: id 
    });

  } catch (err) {
    console.error('Delete discussion error:', err);
    res.status(500).json({ msg: 'Failed to delete discussion' });
  }
};