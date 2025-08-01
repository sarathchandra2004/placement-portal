import Experience from '../models/Experience.js';

// @desc    Get all experiences (with optional filters)
// @route   GET /api/experiences
export const getAllExperiences = async (req, res) => {
  try {
    const { company, department, type, minLPA, maxLPA } = req.query;
    let filter = {};

    if (company) filter.company = { $regex: company, $options: 'i' };
    if (department) filter.department = department;
    if (type) filter.type = type;
    if (minLPA || maxLPA) {
      filter.package = {};
      if (minLPA) filter.package.$gte = parseFloat(minLPA);
      if (maxLPA) filter.package.$lte = parseFloat(maxLPA);
    }

    const experiences = await Experience.find(filter).sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get single experience by ID
// @route   GET /api/experiences/:id
export const getExperienceById = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ msg: 'Experience not found' });
    res.status(200).json(exp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Create new experience
// @route   POST /api/experiences
export const createExperience = async (req, res) => {
  try {
    const experience = new Experience({
      ...req.body,
      userId: req.userId, // from auth middleware
      createdAt: new Date(),
    });

    const saved = await experience.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create experience' });
  }
};

// @desc    Update existing experience (only if owned by user)
// @route   PUT /api/experiences/:id
export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ msg: 'Experience not found' });
    }

    // ✅ Check ownership
    if (experience.userId.toString() !== req.userId) {
      return res.status(403).json({ msg: 'Not authorized to update this experience' });
    }

    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to update experience' });
  }
};


// @desc    Get experiences shared by current user
// @route   GET /api/experiences/mine
// @access  Private (auth middleware must populate req.userId)
export const getMyExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


// @desc    Delete an experience by ID (only if owned by user)
// @route   DELETE /api/experiences/:id
// @access  Private
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ msg: 'Experience not found' });
    }

    // Check if the logged-in user is the owner
    if (experience.userId.toString() !== req.userId) {
      return res.status(403).json({ msg: 'Not authorized to delete this experience' });
    }

    await experience.deleteOne();
    res.status(200).json({ msg: 'Experience deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to delete experience' });
  }
};

