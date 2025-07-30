import mongoose from 'mongoose';
import Discussion from '../models/discussion.js';

// @desc    Get all discussions for a company
// @route   GET /api/discussions/:company
export const getDiscussionsByCompany = async (req, res) => {
  try {
    const company = req.params.company;
    const threads = await Discussion.find({ company }).sort({ createdAt: -1 });
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

    if (!message) {
      return res.status(400).json({ msg: 'Message is required' });
    }

    const newDiscussion = new Discussion({
      userId: req.userId, // from authMiddleware
      company,
      message,
      createdAt: new Date(),
    });

    const saved = await newDiscussion.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to post discussion' });
  }
};
