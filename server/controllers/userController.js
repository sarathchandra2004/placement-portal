import User from "../models/user.js";
import Experience from "../models/Experience.js";

// @desc    Get user profile by ID
// @route   GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Get user's experiences
    const experiences = await Experience.find({ userId: req.params.id }).sort({ createdAt: -1 });

    res.status(200).json({
      user,
      experiences,
      experienceCount: experiences.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Get user's experiences
    const experiences = await Experience.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      user,
      experiences,
      experienceCount: experiences.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};